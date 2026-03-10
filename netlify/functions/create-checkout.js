const stripe = require('stripe')((process.env.STRIPE_SECRET_KEY || '').trim());

// Stripe Price IDs — configured in Stripe Dashboard
// Set these as environment variables in Netlify
const PRICE_MAP = JSON.parse(process.env.STRIPE_PRICE_MAP || '{}');
// Example STRIPE_PRICE_MAP:
// {
//   "noah-station:manual": "price_xxxxx",
//   "noah-station:workflow": "price_xxxxx",
//   "noah-station:vip": "price_xxxxx"
// }

exports.handler = async (event) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    try {
        const { projectId, tier, userId, email, successUrl, cancelUrl } = JSON.parse(event.body);

        if (!projectId || !tier || !userId || !email) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
        }

        const priceKey = `${projectId}:${tier}`;
        const priceId = PRICE_MAP[priceKey];

        if (!priceId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: `ไม่พบ Price ID สำหรับ ${projectId} (${tier})`,
                    debugKeys: Object.keys(PRICE_MAP)
                })
            };
        }

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'promptpay'],
            mode: 'payment',
            customer_email: email,
            customer_creation: 'always',
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            allow_promotion_codes: true,
            metadata: {
                projectId,
                tier,
                userId
            },
            success_url: successUrl || `${process.env.URL}/success.html?project=${projectId}&tier=${tier}`,
            cancel_url: cancelUrl || `${process.env.URL}/theater.html?project=${projectId}`
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ url: session.url })
        };

    } catch (err) {
        console.error('Checkout error:', err);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: err.message })
        };
    }
};
