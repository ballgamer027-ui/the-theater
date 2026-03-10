const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Tier hierarchy for upgrade detection
const TIER_LEVELS = { manual: 1, workflow: 2, vip: 3 };

exports.handler = async (event) => {
    const headers = {
        'Content-Type': 'application/json'
    };

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const sig = event.headers['stripe-signature'];
    let stripeEvent;

    try {
        stripeEvent = stripe.webhooks.constructEvent(
            event.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid signature' }) };
    }

    // Handle checkout.session.completed event
    if (stripeEvent.type === 'checkout.session.completed') {
        const session = stripeEvent.data.object;
        const { projectId, tier, userId } = session.metadata;

        if (!projectId || !tier || !userId) {
            console.error('Missing metadata in checkout session:', session.id);
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing metadata' }) };
        }

        try {
            // Check if user already has a lower tier → upgrade
            const { data: existing } = await supabase
                .from('purchases')
                .select('id, tier')
                .eq('user_id', userId)
                .eq('project_id', projectId);

            // Only insert if user doesn't already have this or higher tier
            const existingLevel = existing?.length > 0
                ? Math.max(...existing.map(p => TIER_LEVELS[p.tier] || 0))
                : 0;
            const newLevel = TIER_LEVELS[tier] || 0;

            if (newLevel > existingLevel) {
                const { error: insertError } = await supabase
                    .from('purchases')
                    .upsert({
                        user_id: userId,
                        project_id: projectId,
                        tier: tier,
                        stripe_payment_id: session.payment_intent,
                        stripe_checkout_session_id: session.id,
                        amount: session.amount_total,
                        currency: session.currency,
                        status: 'completed',
                        purchased_at: new Date().toISOString()
                    }, {
                        onConflict: 'user_id,project_id,tier'
                    });

                if (insertError) {
                    console.error('Purchase insert error:', insertError);
                    return { statusCode: 500, headers, body: JSON.stringify({ error: insertError.message }) };
                }

                console.log(`✅ Purchase recorded: ${userId} → ${projectId} (${tier})`);
            } else {
                console.log(`ℹ️ User already has ${tier} or higher for ${projectId}`);
            }

            // Update stripe_customer_id in profile
            if (session.customer) {
                await supabase
                    .from('profiles')
                    .update({ stripe_customer_id: session.customer })
                    .eq('id', userId);
            }

        } catch (err) {
            console.error('Database error:', err);
            return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
        }
    }

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ received: true })
    };
};
