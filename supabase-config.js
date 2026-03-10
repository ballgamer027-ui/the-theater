// ============================================
// Supabase Configuration
// ============================================

const SUPABASE_URL = 'https://hecymikneizkaxtekjlk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlY3ltaWtuZWl6a2F4dGVramxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNzEwODksImV4cCI6MjA4ODc0NzA4OX0.dG8eK1O-eNDAPX6P0KEtEyZM9AS4WomjhYsKlL_9Ry4';

// Stripe publishable key
const STRIPE_PK = 'pk_live_51RF9adENPJgPuTuzNgmvPq3JiqHSBiT5l0rOVfBUH1J0kuDdNUSkMDlxQTleTikmTwUrZpjkCdiFXqQoXkEd3ihm00QTkdY1I8';

// Initialize Supabase client (loaded from CDN in HTML)
let supabaseClient = null;

function initSupabase() {
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabaseClient;
}

// ============================================
// Auth Functions
// ============================================

async function signInWithGoogle() {
    if (!supabaseClient) return;

    // Save current page for return
    localStorage.setItem('theater_return_to', window.location.href);

    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin + '/auth-callback.html'
        }
    });

    if (error) {
        console.error('Auth error:', error.message);
        showToast('❌ เข้าสู่ระบบไม่สำเร็จ: ' + error.message);
    }
}

async function signInWithEmail(email, password) {
    if (!supabaseClient) return;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        // Better Thai error messages
        let msg = error.message;
        if (msg.includes('Email not confirmed')) {
            msg = 'อีเมลยังไม่ได้ยืนยัน — เช็คอีเมลของคุณ หรือขอให้แอดมินปิด Email Confirmation';
        } else if (msg.includes('Invalid login credentials')) {
            msg = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
        }
        showToast('❌ ' + msg);
        return false;
    }

    showToast('✅ เข้าสู่ระบบสำเร็จ!');
    await loadUserState();
    closeAuthModal();
    // Re-render
    if (document.getElementById('project-grid')) initLobby();
    else if (document.getElementById('the-stage')) initTheater();
    return true;
}

async function signUpWithEmail(email, password) {
    if (!supabaseClient) return;

    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password
    });

    if (error) {
        let msg = error.message;
        if (msg.includes('already registered')) {
            msg = 'อีเมลนี้สมัครไว้แล้ว — ลองเข้าสู่ระบบแทน';
        }
        showToast('❌ ' + msg);
        return false;
    }

    // Check if auto-confirmed (email confirmation disabled in Supabase)
    if (data.session) {
        showToast('✅ สมัครสำเร็จ! เข้าสู่ระบบอัตโนมัติ');
        await loadUserState();
        closeAuthModal();
        if (document.getElementById('project-grid')) initLobby();
        else if (document.getElementById('the-stage')) initTheater();
    } else {
        showToast('📧 ส่ง email ยืนยันแล้ว! กรุณาเช็คอีเมลแล้วกดลิงก์ยืนยัน');
    }
    return true;
}

// ============================================
// Auth Modal
// ============================================

function showAuthModal() {
    // Remove existing modal
    closeAuthModal();

    const modal = document.createElement('div');
    modal.id = 'auth-modal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);';
    modal.onclick = (e) => { if (e.target === modal) closeAuthModal(); };

    modal.innerHTML = `
    <div style="background:var(--bg-panel);border:1px solid var(--glass-border);border-radius:var(--radius-lg);padding:2rem;width:100%;max-width:400px;position:relative;">
      <button onclick="closeAuthModal()" style="position:absolute;top:12px;right:16px;background:none;border:none;color:var(--text-muted);font-size:1.2rem;cursor:pointer;">✕</button>

      <div style="text-align:center;margin-bottom:1.5rem;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">🎭</div>
        <h2 style="font-family:Outfit,sans-serif;font-size:1.3rem;font-weight:700;margin-bottom:0.3rem;">เข้าสู่ระบบ</h2>
        <p style="font-size:0.8rem;color:var(--text-muted);">เพื่อซื้อแพ็กเกจและเข้าถึงเนื้อหาพรีเมียม</p>
      </div>

      <!-- Google Login -->
      <button onclick="signInWithGoogle()" style="width:100%;padding:12px;border-radius:var(--radius-md);background:white;color:#333;font-weight:600;font-size:0.9rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;border:none;margin-bottom:1rem;">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        เข้าสู่ระบบด้วย Google
      </button>

      <!-- Divider -->
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem;">
        <div style="flex:1;height:1px;background:var(--glass-border);"></div>
        <span style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;">หรือ</span>
        <div style="flex:1;height:1px;background:var(--glass-border);"></div>
      </div>

      <!-- Email Login -->
      <form id="auth-form" onsubmit="handleAuthForm(event)">
        <input type="email" id="auth-email" placeholder="อีเมล" required
          style="width:100%;padding:10px 14px;border-radius:var(--radius-sm);background:var(--bg-card);border:1px solid var(--glass-border);color:var(--text-primary);font-size:0.85rem;margin-bottom:0.6rem;box-sizing:border-box;">
        <input type="password" id="auth-password" placeholder="รหัสผ่าน (อย่างน้อย 6 ตัว)" required minlength="6"
          style="width:100%;padding:10px 14px;border-radius:var(--radius-sm);background:var(--bg-card);border:1px solid var(--glass-border);color:var(--text-primary);font-size:0.85rem;margin-bottom:1rem;box-sizing:border-box;">

        <button type="submit" id="auth-submit-btn" class="btn btn-gold" style="width:100%;justify-content:center;">
          เข้าสู่ระบบ
        </button>
      </form>

      <div style="text-align:center;margin-top:1rem;">
        <button id="auth-toggle-btn" onclick="toggleAuthMode()" style="background:none;border:none;color:var(--gold);font-size:0.8rem;cursor:pointer;text-decoration:underline;">
          ยังไม่มีบัญชี? สมัครสมาชิก
        </button>
      </div>
    </div>
  `;

    document.body.appendChild(modal);
}

let authMode = 'login'; // 'login' or 'signup'

function toggleAuthMode() {
    authMode = authMode === 'login' ? 'signup' : 'login';
    const btn = document.getElementById('auth-submit-btn');
    const toggle = document.getElementById('auth-toggle-btn');
    if (btn) btn.textContent = authMode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก';
    if (toggle) toggle.textContent = authMode === 'login' ? 'ยังไม่มีบัญชี? สมัครสมาชิก' : 'มีบัญชีแล้ว? เข้าสู่ระบบ';
}

async function handleAuthForm(e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;

    if (authMode === 'signup') {
        await signUpWithEmail(email, password);
    } else {
        await signInWithEmail(email, password);
    }
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.remove();
    authMode = 'login';
}

async function signOut() {
    if (!supabaseClient) return;

    const { error } = await supabaseClient.auth.signOut();
    if (error) {
        console.error('Sign out error:', error.message);
    }

    // Reset user state
    USER_STATE.name = 'Guest';
    USER_STATE.initials = 'G';
    USER_STATE.email = null;
    USER_STATE.userId = null;
    USER_STATE.purchases = {};

    window.location.reload();
}

async function getCurrentUser() {
    if (!supabaseClient) return null;

    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
}

async function loadUserState() {
    const user = await getCurrentUser();

    if (user) {
        const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

        USER_STATE.name = name;
        USER_STATE.initials = initials;
        USER_STATE.email = user.email;
        USER_STATE.userId = user.id;
        USER_STATE.avatar = user.user_metadata?.avatar_url || null;

        // Ensure profile exists
        await ensureProfile(user);

        // Load purchases from DB
        await loadPurchases(user.id);
    }

    return user;
}

async function ensureProfile(user) {
    if (!supabaseClient) return;

    const { data } = await supabaseClient
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

    if (!data) {
        await supabaseClient
            .from('profiles')
            .upsert({
                id: user.id,
                email: user.email,
                display_name: user.user_metadata?.full_name || user.email?.split('@')[0],
                avatar_url: user.user_metadata?.avatar_url || null
            });
    }
}

async function loadPurchases(userId) {
    if (!supabaseClient) return;

    const { data: purchases, error } = await supabaseClient
        .from('purchases')
        .select('project_id, tier')
        .eq('user_id', userId);

    if (error) {
        console.error('Error loading purchases:', error.message);
        return;
    }

    // Convert to map: { projectId: highestTier }
    USER_STATE.purchases = {};
    if (purchases) {
        for (const p of purchases) {
            const existing = USER_STATE.purchases[p.project_id];
            if (!existing || TIERS[p.tier].level > TIERS[existing].level) {
                USER_STATE.purchases[p.project_id] = p.tier;
            }
        }
    }
}

// ============================================
// Stripe Checkout
// ============================================

async function startCheckout(projectId, tier) {
    const user = await getCurrentUser();

    if (!user) {
        showToast('🔑 กรุณาเข้าสู่ระบบก่อนซื้อ');
        setTimeout(() => showAuthModal(), 500);
        return;
    }

    const tierInfo = TIERS[tier];
    const project = PROJECTS.find(p => p.id === projectId);
    if (!project || !project.pricing || !project.pricing[tier]) return;

    showToast('⏳ กำลังเปิดหน้าชำระเงิน...');

    try {
        const response = await fetch('/.netlify/functions/create-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                projectId,
                tier,
                userId: user.id,
                email: user.email,
                successUrl: `${window.location.origin}/success.html?project=${projectId}&tier=${tier}`,
                cancelUrl: window.location.href
            })
        });

        const { url, error } = await response.json();

        if (error) {
            showToast('❌ ' + error);
            return;
        }

        // Redirect to Stripe Checkout
        window.location.href = url;
    } catch (err) {
        console.error('Checkout error:', err);
        showToast('❌ ไม่สามารถเปิดหน้าชำระเงินได้');
    }
}

// ============================================
// Auth State Change Listener
// ============================================

function setupAuthListener() {
    if (!supabaseClient) return;

    supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            loadUserState().then(() => {
                if (document.getElementById('project-grid')) {
                    initLobby();
                } else if (document.getElementById('the-stage')) {
                    initTheater();
                }
            });
        }
    });
}
