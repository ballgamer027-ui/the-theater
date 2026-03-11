// ============================================
// THE ARCHITECT'S THEATER — Application Logic
// Per-Project Tier System + Real Noah Station Data
// ============================================

// --- Tier Config (Per-Project) ---
const TIERS = {
  free: { level: 0, label: 'Free Preview', color: 'free', icon: '👁️' },
  manual: { level: 1, label: 'Manual Pack', color: 'manual', icon: '📖', price: '1,590.-' },
  workflow: { level: 2, label: 'Workflow Pack', color: 'workflow', icon: '⚙️', price: '5,900.-' },
  vip: { level: 3, label: 'VIP Run-With-You', color: 'vip', icon: '👑', price: '15,900.-' }
};

// --- User State ---
const USER_STATE = {
  name: 'Guest',
  initials: 'G',
  email: null,
  userId: null,
  avatar: null,
  // Per-project purchases: projectId → tier purchased
  purchases: {}
};

function getUserTierForProject(projectId) {
  return USER_STATE.purchases[projectId] || 'free';
}

function canAccessModule(projectId, requiredTier) {
  const userTier = getUserTierForProject(projectId);
  return TIERS[userTier].level >= TIERS[requiredTier].level;
}

// --- Mock Data Store ---
const PROJECTS = [
  {
    id: 'noah-station',
    title: 'Noah Station',
    tagline: 'ระบบ Autonomous YouTube Live Stream — 7 n8n Workflows, AI Dual Persona, Self-Healing 24/7',
    posterUrl: 'assets/poster-noah.jpg',
    heroUrl: 'assets/poster-noah.jpg',
    spotlight: true,
    videoTitle: 'Noah Station — Full System Walkthrough',
    videoSubtitle: 'คัมภีร์สร้างสถานีที่ไม่เคยหลับ',
    youtubeUrl: 'https://www.youtube.com/embed/HIz0N5lInio?vq=hd1080&modestbranding=1&rel=0',
    deploymentGuideUrl: 'https://noahstation.netlify.app/',
    stats: { chapters: 7, workflows: 7, personas: 2, uptime: '24/7' },
    pricing: {
      manual: {
        price: '1,590.-',
        subtitle: 'สำหรับคนที่อยาก "ทำเอง" แต่ไม่อยากเสียเวลางม',
        features: [
          'Diagnostic + ติดตั้ง Node.js, OBS Studio, VLC (2 แนวทาง)',
          'สคริปต์ n8n + PM2 Auto-Start พร้อมข้ามบั๊ก .cmd',
          'คู่มือ Google Cloud API — OAuth 5 Block จบครบ',
          'Quickstart / Smoke Test เช็คว่าระบบมาถูกทางใน 30 นาที',
          '1 Workflow ตัวหลัก (Live Reply Basic) สำหรับตอบแชทอัตโนมัติ'
        ],
        cta: 'เริ่มจากคู่มือเต็มระบบ',
        targetAudience: 'คนเริ่มต้น หรือคนที่อยากคุมเองแต่ต้องการเส้นทางชัด'
      },
      workflow: {
        price: '5,900.-',
        subtitle: 'สำหรับคนที่อยากได้ "ระบบเต็ม" พร้อมใช้งานจริง',
        features: [
          '7 Workflows (The 7 Pillars) ชุดเต็มของ Noah Station',
          'Google Sheets Template + Mapping Guide (ต่อให้ตรง ไม่บิ่ว)',
          'โครง Ops พื้นฐาน (Kill Switch / Watchdog / Health Check)',
        ],
        cta: 'เอาไฟล์พร้อมรัน',
        targetAudience: 'คนที่อยากได้ระบบครบ แล้วเอาไปประกอบใช้งานจริงทันที',
        popular: true
      },
      vip: {
        price: '15,900.-',
        subtitle: 'สำหรับคนที่ไม่อยากเสี่ยง และอยากให้ระบบขึ้นจริงตาม Checklist',
        features: [
          'กลุ่ม VIP สำหรับซัพพอร์ตแบบใกล้ชิด (LINE / Discord)',
          'ช่วยไล่บั๊ก เช็ค config และปรับจุดเสี่ยงจนระบบนิ่ง',
          'พาไปจนถึงจุดที่คุณรันได้จริง ไม่ค้างกลางทาง'
        ],
        cta: 'เข้ากลุ่ม VIP SUPPORT',
        targetAudience: 'คนที่ต้องการผลลัพธ์และไม่อยากเสียเวลาลองผิดลองถูก',
        note: '* ไม่รับแก้ให้จนจบ — มีคอมมูคอยตอบ + AI ซัพพอร์ต'
      }
    },
    phases: [
      {
        id: 'foundation',
        label: 'Foundation — ตั้งค่าเครื่อง',
        modules: [
          {
            id: 'welcome',
            icon: '🚀',
            title: 'Welcome & System Overview',
            shortDesc: 'ภาพรวมระบบ Noah Station ทั้งหมด',
            requiredTier: 'free',
            description: 'ทำความเข้าใจโครงสร้าง Noah Station — ระบบ 2-Node, 7 Workflows, AI Dual Persona (Noah & Neon), Self-Healing Watchdog ทั้งหมดทำงานอัตโนมัติ 24/7',
            techSpecs: {
              architecture: '2-Node System',
              workflows: '7 Core Pillars',
              aiPersonas: 'Noah 🌙 + Neon ✦',
              uptime: '24/7 Zero-Touch'
            },
            codeSnippet: `> initializing noah_station.core ...
> loading 7 workflows ...
> connecting YouTube API ✓
> connecting Google Sheets ✓
> connecting OpenRouter LLM ✓
> connecting OBS WebSocket ✓
> persona: Noah 🌙 ... ONLINE
> persona: Neon ✦ ... ONLINE
> status: ALL SYSTEMS NOMINAL
> deployment guide ready. BEGIN.

Chapters: 7   Workflows: 7   AI Personas: 2   Uptime Target: 24/7`,
            codeLang: 'bash'
          },
          {
            id: 'software-diagnostic',
            icon: '🔍',
            title: 'Software Diagnostic & OBS/VLC Setup',
            shortDesc: 'ติดตั้ง Node.js + OBS + VLC — 2 แนวทาง',
            requiredTier: 'manual',
            description: 'เช็คอาวุธในเครื่องก่อน แล้วติดตั้งเฉพาะตัวที่ขาด — มี 2 Layer: Layer 1 (Modular) สำหรับคนมีของเดิม ติดตั้งแยกส่วนไม่ยุ่งกับ PATH เก่า / Layer 2 (1-Click Bare-Metal) สำหรับเครื่องเปล่า ลงรวดเดียวทั้งก้อน',
            techSpecs: {
              nodeJs: 'v20 / v22 LTS',
              obs: 'OBS Studio (Latest)',
              vlc: 'VLC Media Player',
              method: 'winget install'
            },
            codeSnippet: `# ╔══════════════════════════════════════════╗
# ║  Layer 1: Diagnostic & Modular Setup    ║
# ║  สำหรับคนมีของเดิมอยู่แล้ว                  ║
# ╚══════════════════════════════════════════╝

# 1) เช็คอาวุธในเครื่อง (Diagnostic)
node -v    # ต้องขึ้น v20 หรือ v22 (LTS) ห้ามใช้ v25
pm2 -v     # เช็คสถานะตัวคุม Process

# 2) ติดตั้งแยกส่วน (A la carte)
# ขาดตัวไหน ก๊อปเฉพาะบรรทัดนั้นไปรัน
winget install -e --id OpenJS.NodeJS.LTS
winget install -e --id VideoLAN.VLC --silent
winget install -e --id OBSProject.OBSStudio --silent

# ╔══════════════════════════════════════════╗
# ║  Layer 2: 1-Click Bare-Metal            ║
# ║  สำหรับเครื่องล้างใหม่แบบบอส                 ║
# ╚══════════════════════════════════════════╝

# Golden Path สำหรับเครื่องเปล่า
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
winget install -e --id VideoLAN.VLC --silent
winget install -e --id OBSProject.OBSStudio --silent`,
            codeLang: 'powershell'
          },
          {
            id: 'n8n-pm2-setup',
            icon: '🧠',
            title: 'n8n + PM2 — ปลุกสมองกล & Auto-Start',
            shortDesc: 'ติดตั้ง n8n, PM2, ฝังระบบ Auto-Start ตอนเปิดเครื่อง',
            requiredTier: 'manual',
            description: 'รันใน PowerShell หน้าต่างใหม่ — ล้างแคชเก่า ติดตั้ง n8n + pm2 ลบ process ผีดิบ สั่งรันด้วย Absolute Path เพื่อข้ามบั๊ก .cmd บน Windows แล้วบันทึกสถานะฝังระบบ Auto-Start ตอนเปิดเครื่อง',
            techSpecs: {
              runtime: 'n8n (Global)',
              processManager: 'PM2',
              autoStart: 'pm2-windows-startup',
              port: 'localhost:5678'
            },
            codeSnippet: `# ╔══════════════════════════════════════════╗
# ║  Block 2: ปลุกเสกสมองกลและ Auto-Start     ║
# ║  รันใน PowerShell หน้าต่างใหม่              ║
# ╚══════════════════════════════════════════╝

# 1) ล้างแคชขยะ และติดตั้งสมองกล n8n + pm2
npm cache clean --force
npm install -g n8n pm2

# 2) ลบ Process ผีดิบ (ถ้ามี)
#    สั่งรัน n8n แบบยิงตรงข้ามบั๊ก .cmd
pm2 delete n8n
pm2 start "$env:APPDATA\\npm\\node_modules\\n8n\\bin\\n8n" --name n8n

# 3) เซฟสถานะ และฝังตัวลง Windows Startup
npm install -g pm2-windows-startup
pm2 save
pm2-startup install

# ✅ Verify — เปิด browser ไปที่
# http://localhost:5678
# ถ้าเห็นหน้า n8n = สำเร็จ!`,
            codeLang: 'powershell'
          },
          {
            id: 'google-cloud-api',
            icon: '🔑',
            title: 'Google Cloud API — เชื่อมเส้นประสาท',
            shortDesc: 'สร้าง OAuth, ต่อ YouTube API + Google Sheets',
            requiredTier: 'manual',
            description: 'สร้าง "เส้นประสาท" เชื่อม n8n เข้า Google Cloud — เปิด Sheets API + Drive API คู่กัน ตั้ง OAuth Consent Screen เป็น External เพิ่ม Test User ให้ผ่าน Bypass สร้าง Client ID แบบ Web Application ใส่ Redirect URI ไปที่ localhost:5678 แล้วเสียบกุญแจเข้า n8n Credentials',
            techSpecs: {
              apis: 'Sheets API + Drive API',
              auth: 'OAuth 2.0 Client',
              redirect: 'localhost:5678/rest/oauth2-credential/callback',
              scopes: 'sheets + drive'
            },
            codeSnippet: `// ╔══════════════════════════════════════════╗
// ║  Google Cloud API Setup — 5 Blocks       ║
// ╚══════════════════════════════════════════╝

// Block 1: เปิดโปรเจกต์ & ปลุกพลัง API
// → console.cloud.google.com
// → สร้าง Project: "Noah-Station-API"
// → APIs & Services > Library > Enable:
//    ✅ Google Sheets API
//    ✅ Google Drive API  (บังคับเปิดคู่กัน)

// Block 2: OAuth Consent Screen
// → User type: External (Gmail ส่วนตัว)
// → App name: "Noah-Station"
// → Email: ใส่ทั้ง Support + Developer contact

// Block 3: ปลดล็อก Test User ⚠️ จุดตายที่ 1
// → Audience > Test users > + Add users
// → ใส่ Gmail ของคุณ (ไม่ทำ = n8n เชื่อมต่อไม่ได้!)

// Block 4: ปั๊มกุญแจ API ⚠️ จุดตายที่ 2
// → Clients > Create OAuth client
// → Type: Web application
// → Name: "n8n-local-worker"
// → Authorized redirect URIs:
//    http://localhost:5678/rest/oauth2-credential/callback
// → Copy Client ID + Client Secret

// Block 5: เสียบกุญแจเข้าสมองกล
// → n8n > Credentials > Add Credential
// → เลือก "Google Sheets OAuth2 API"
// → วาง Client ID + Secret
// → Sign in with Google > Allow
// → ✅ เสร็จสิ้น! n8n พร้อมดึงข้อมูล Sheets`,
            codeLang: 'javascript'
          },
          {
            id: 'wf-live-reply-basic',
            icon: '💬',
            title: 'Live Reply Basic (1 Workflow)',
            shortDesc: 'Workflow ตัวหลักสำหรับตอบแชท Live แบบพื้นฐาน',
            requiredTier: 'manual',
            description: 'Workflow แรกที่ได้ใน Manual Pack — ระบบตอบแชท YouTube Live อัตโนมัติแบบ Basic: รับ chat message ผ่าน Webhook → ส่งให้ AI ประมวลผล → ตอบกลับอัตโนมัติ เหมาะสำหรับเริ่มต้นทดสอบระบบว่าทุกอย่างเชื่อมต่อถูกต้อง',
            techSpecs: {
              trigger: 'YouTube Chat Webhook',
              ai: 'OpenRouter LLM',
              response: 'Auto-reply to Chat',
              type: 'Smoke Test Workflow'
            },
            workflowFile: 'n8n-workflows/Basic Live Reply .json',
            codeSnippet: `// ⚙️ WORKFLOW LOGIC: 💬 Live Reply Basic
// --------------------------------------------------
// 1. 📡 ระบบดักฟังแชท YouTube Live (ผ่าน Webhook)
// 2. 🧠 ส่งข้อความเข้า OpenRouter (AI Model)
// 3. 📤 เอาคำตอบที่ AI คิดได้ ยิงกลับเข้า YouTube Live
// --------------------------------------------------

// 💡 ACTION REQUIRED (หลังกด Copy):
// [ ] โหนด 🤖 AI Reply: ใส่ API Key ของ OpenRouter (ถ้ายังไม่มีให้สมัครสร้าง Key ก่อน)
// [ ] โหนด 📤 Send Reply: ต่อ Google Credential ขากลับ
// [ ] อย่าลืมเสียบ Webhook URL เข้ากับ Stream Deck หรือระบบที่คุณใช้ยิงแชทมา`,
            codeLang: 'javascript'
          }
        ]
      },
      {
        id: 'engine-room',
        label: 'Engine Room — 7 Core Workflows',
        modules: [
          {
            id: 'wf-master-state-sync',
            icon: '①',
            title: 'Master State Sync',
            shortDesc: 'YouTube API → ตรวจ active stream → เขียน Status ลง Sheets',
            requiredTier: 'workflow',
            description: 'Workflow แรกที่เป็นหัวใจ — ดึงสถานะ Live Stream จาก YouTube API ทุก 5 นาที, เขียนลง Google Sheets เป็น Bridge Control เพื่อให้ Workflow อื่นอ่านค่าไปใช้',
            techSpecs: {
              trigger: 'Schedule (5 min)',
              type: 'CLOUD',
              api: 'YouTube Data API v3',
              output: 'Google Sheets (Status)'
            },
            workflowFile: 'n8n-workflows/Master State Sync.json',
            codeSnippet: `// ⚙️ WORKFLOW LOGIC: ① Master State Sync
// --------------------------------------------------
// 1. ⏱️ ทริกเกอร์ทำงานอัตโนมัติทุกๆ 5 นาที
// 2. 📡 ยิง API เช็คหลังบ้าน YouTube ว่า "ตอนนี้สตรีม Live อยู่ไหม?"
// 3. ⚖️ เช็คเงื่อนไข (If/Else):
//    🟢 ถ้า Live อยู่ -> อัปเดต Google Sheets เป็น "Active" พร้อมดึง Chat ID
//    🔴 ถ้าหลุด/ปิดสตรีม -> อัปเดต Google Sheets เป็น "Offline"
// --------------------------------------------------

// 💡 ACTION REQUIRED (สิ่งที่คุณต้องทำหลังกด Copy):
// [ ] โหนด 🔍 Check Active Stream: เลือก Credential เป็น Google Account ของคุณ
// [ ] โหนด 🟢 Set Active: ใส่ ID ไฟล์ Google Sheets ของคุณ
// [ ] โหนด 🔴 Set Offline: ใส่ ID ไฟล์ Google Sheets ของคุณ (ไฟล์เดียวกัน)
// [ ] เปิดสวิตช์ Active (มุมขวาบน) ให้เป็น ON เพื่อเริ่มให้ระบบทำงาน 24/7`,
            codeLang: 'javascript'
          },
          {
            id: 'wf-eclipse-protocol',
            icon: '②',
            title: 'Eclipse Protocol',
            shortDesc: 'AI Dual Persona — Noah 🌙 & Neon ✦ Chat Engine',
            requiredTier: 'workflow',
            description: 'ระบบ AI ตอบแชทอัตโนมัติ — แยก persona 2 ตัว: Noah (สุขุม รอบรู้) กับ Neon (สนุก กวน) สลับกันตอบตาม context ผ่าน OpenRouter LLM',
            techSpecs: {
              trigger: 'YouTube Chat Webhook',
              model: 'OpenRouter LLM',
              personas: 'Noah 🌙 + Neon ✦',
              context: 'RAG + Chat History'
            },
            workflowFile: 'n8n-workflows/Noah Station_ Eclipse Protocol.json',
            codeSnippet: `// ⚙️ WORKFLOW LOGIC: ② Eclipse Protocol
// --------------------------------------------------
// 1. 📡 ดึงแชทล่าสุดจาก YouTube 
// 2. 💾 อ่าน User Profile จาก Sheets (กรองคนหน้าใหม่/ขาประจำ/VIP)
// 3. 🧠 คำนวณความทรงจำ Context (เขาเคยคุยเรื่องอะไรมาบ้าง)
// 4. 🔀 ตัดสินใจใช้ Persona (พี่ Noah สายชิลล์ หรือ น้อง Neon สายซ่า)
// 5. 📤 ยิงคำตอบลง YouTube Chat แบบแนบเนียน
// --------------------------------------------------

// 💡 ACTION REQUIRED (หลังกด Copy):
// [ ] โหนด Code ( Build Queue ): เลื่อนหา MY_BOT_NAMES แล้วเปลี่ยนเป็นชื่อน้องบอทของคุณ
// [ ] โหนด Code ( State Logic ): เลื่อนหา MY_CREATOR_NAMES ใส่ชื่อบัญชีแชทบอสของคุณ (จะได้ยศ GOD)
// [ ] โหนด Sheets ทุกอัน: เปลี่ยน Google Sheet ID ชี้ไปบ้านใหม่ของคุณให้ครบ
// [ ] โหนด 🤖 AI: ต่อ OpenRouter API Key`,
            codeLang: 'javascript'
          },
          {
            id: 'wf-social-engagement',
            icon: '③',
            title: 'Social Engagement',
            shortDesc: 'Automated DJ + Shift Scheduling',
            requiredTier: 'workflow',
            description: 'ระบบจัด DJ Schedule อัตโนมัติ — สลับ persona Noah/Neon ตามเวลา, โพสต์ Community Tab, ตอบ Social แบบอัตโนมัติ',
            techSpecs: {
              trigger: 'Schedule + Event',
              shift: 'Noah (Day) / Neon (Night)',
              social: 'YouTube Community Tab',
              engagement: 'Auto-reply + Posts'
            },
            workflowFile: 'n8n-workflows/Social Engagement Agent.json',
            codeSnippet: `// ⚙️ WORKFLOW LOGIC: ③ Social Engagement Agent
// --------------------------------------------------
// 1. ⏰ แยกกะการทำงาน (Day/Night Shift)
// 2. 📱 สุ่มเป้าหมาย Social (เช่น ตั้งสเตตัส Community Tab หรือ อัปเดต X/Twitter)
// 3. 🧠 สั่ง AI วางสคริปต์กวนๆ ตามสถานการณ์ปัจจุบัน
// 4. 📢 บรอดแคสต์ข้อความลงหน้าโซเชียลแบบอัตโนมัติ
// --------------------------------------------------

// 💡 ACTION REQUIRED (หลังกด Copy):
// [ ] โหนด Google Sheets: ต่อ Credential และใส่ Sheet ID ของคลังมุก/สคริปต์
// [ ] โหนด OpenRouter: ใส่ API Key
// [ ] โหนด โพสต์เป้าหมาย: ผูกบัญชี Social ที่ต้องการ (เช่น YouTube API สำหรับ Community)`,
            codeLang: 'javascript'
          },
          {
            id: 'wf-focus-start',
            icon: '④',
            title: 'Night Focus START',
            shortDesc: 'เปิด Live Stream อัตโนมัติ',
            requiredTier: 'workflow',
            description: 'Workflow ที่สั่งเริ่ม Live Stream อัตโนมัติ — เชื่อม OBS WebSocket, ตั้ง Scene, เริ่ม Broadcast ผ่าน YouTube API โดยไม่ต้องแตะเครื่อง',
            techSpecs: {
              trigger: 'Schedule / Manual',
              obs: 'OBS WebSocket v5',
              action: 'Start Broadcast',
              fallback: 'Retry 3 times'
            },
            workflowFile: 'n8n-workflows/🌙 Night Focus START.json',
            codeSnippet: `// ⚙️ WORKFLOW LOGIC: ④ Night Focus START
// --------------------------------------------------
// 1. 🚦 รับ Signal ให้เปิดสถานี (จาก webhook หรือปุ่มรัน)
// 2. 🎛️ ยิงคำสั่งเข้า OBS WebSocket ให้เปลี่ยน Scene เป็น "Starting..."
// 3. 📡 สั่ง YouTube สร้าง Live Broadcast ใหม่
// 4. 🎥 Bind (ผูก) สตรีมคีย์เข้ากับ YouTube
// 5. 🚀 สั่ง Go Live! (พร้อมบันทึกสถานะลง Bridge Control)
// --------------------------------------------------

// 💡 ACTION REQUIRED (หลังกด Copy):
// [ ] โหนด 🎥 OBS: ใส่ Password ของ OBS WebSocket คุกเข่ารับคำสั่ง (ทริค: ตั้งในเครื่องตัวเอง)
// [ ] โหนด 📡 YouTube: ต่อ Account ช่องสตรีม
// [ ] โหนด 💾 Sheets: ผูก Sheet ID แจ้งสถานะว่า "สตรีมติดแล้ว!"`,
            codeLang: 'javascript'
          },
          {
            id: 'wf-focus-stop',
            icon: '⑤',
            title: 'Night Focus STOP',
            shortDesc: 'ปิด Live Stream + Cleanup อัตโนมัติ',
            requiredTier: 'workflow',
            description: 'ปิด Live Stream อย่างสะอาด — Stop OBS, End YouTube Broadcast, บันทึกสถิติลง Sheets, แจ้งเตือนผ่าน LINE Notify',
            techSpecs: {
              trigger: 'Schedule / Manual',
              action: 'Stop Broadcast',
              cleanup: 'Stats → Sheets',
              notify: 'LINE Notify'
            },
            workflowFile: 'n8n-workflows/🌙 Night Focus STOP.json',
            codeSnippet: `// ⚙️ WORKFLOW LOGIC: ⑤ Night Focus STOP
// --------------------------------------------------
// 1. 🚦 รับ Signal จบสตรีม
// 2. 🎛️ สั่ง OBS เปลี่ยน Scene เป็น "Offline / นอนหลับ"
// 3. 📡 สั่ง YouTube หยุด Broadcast (ตัดภาพ)
// 4. 📊 สรุปสถิติ (คนดูแชท, ยอดวิว) -> ยัดลง Sheets
// 5. 📱 ยิง LINE แจ้งเตือนบอสว่า "ปิดสถานีเรียบร้อยครับ"
// --------------------------------------------------

// 💡 ACTION REQUIRED (หลังกด Copy):
// [ ] โหนด 🎥 OBS: เช็ค WebSocket Password
// [ ] โหนด 📡 YouTube: ต่อ Credential ช่อง
// [ ] โหนด 📱 LINE Notify: ผูก Token แจ้งเตือนส่วนตัว`,
            codeLang: 'javascript'
          },
          {
            id: 'wf-music-engine',
            icon: '⑥',
            title: 'Music Engine v4',
            shortDesc: 'Time & Weather-based Music Matrix',
            requiredTier: 'workflow',
            description: 'ระบบเลือกเพลงอัจฉริยะ — เปลี่ยน playlist ตามเวลาของวัน + สภาพอากาศ + mood ของ chat ให้บรรยากาศ stream เปลี่ยนไปตามธรรมชาติ',
            techSpecs: {
              trigger: 'Every 30 min',
              matrix: 'Time × Weather × Mood',
              source: 'YouTube Playlist API',
              vlc: 'VLC HTTP Interface'
            },
            workflowFile: 'n8n-workflows/🎧 Noah station v4.json',
            codeSnippet: `// ⚙️ WORKFLOW LOGIC: ⑥ Music Engine v4
// --------------------------------------------------
// 1. 🕒 เช็คเวลาปัจจุบัน (เช้า / บ่าย / ดึก)
// 2. 🌤️ เช็คสภาพอากาศจริงๆ (ฝนตก / แดดออก / หนาว)
// 3. 🎵 เปิดคำภีร์ Music Matrix เลือก Playlist ที่ตรงฟีลที่สุด
// 4. 📻 สั่งโปรแกรมเล่นเพลง (เช่น VLC หรือ Spotify) ให้เปิดเพลย์ลิสต์นั้น
// 5. 📝 โพสต์ชื่อเพลงที่กำลังเล่นลงจอ (ผ่าน Text File ทะลุ OBS)
// --------------------------------------------------

// 💡 ACTION REQUIRED (หลังกด Copy):
// [ ] โหนด 🌤️ Weather API: ใส่ API Key ของ OpenWeatherMap
// [ ] โหนด 📻 เครื่องเล่นเพลง: เซ็ตค่า Credential ของ VLC / Spotify (ถ้ามี)
// [ ] โหนด 📝 อัปเดตชื่อเพลง: ชี้ Path ปลายทางไปที่โฟลเดอร์ Text บนคอมพิวเตอร์ของคุณ`,
            codeLang: 'javascript'
          },
          {
            id: 'wf-watchdog',
            icon: '⑦',
            title: 'Watchdog Protocol',
            shortDesc: 'Self-Healing — Auto-recover 24/7',
            requiredTier: 'workflow',
            description: 'ระบบซ่อมตัวเอง — เช็ค health ทุก service ทุก 5 นาที, ถ้า stream ตาย → restart อัตโนมัติ, ถ้า n8n ค้าง → restart PM2, แจ้งเตือนทุกเหตุการณ์ผ่าน LINE',
            techSpecs: {
              healthcheck: 'Every 5 min',
              recovery: 'Auto-restart + Fallback',
              alerting: 'LINE Notify',
              uptime: '99.9% Target'
            },
            workflowFile: 'n8n-workflows/🛡️ Watchdog Protocol.json',
            codeSnippet: `// ⚙️ WORKFLOW LOGIC: ⑦ Watchdog Protocol (Auto-heal)
// --------------------------------------------------
// 1. 🛡️ รันลูปเช็คชีพจรทุกๆ 5 นาที
// 2. 🩺 ยิงขอ Health Status จากระบบทั้งหมด (OBS / n8n / Net / YouTube)
// 3. ⚖️ ถ้าพบว่า "ล่ม/ค้าง":
//    - ถ้า OBS เด้ง -> สั่งรันขึ้นมาใหม่
//    - ถ้าเน็ตตัด -> สั่ง Wait แล้วต่อคิว Reconnect
// 4. 📱 รีพอร์ตบอสทาง LINE ทันที
// --------------------------------------------------

// 💡 ACTION REQUIRED (หลังกด Copy):
// [ ] โหนด 🩺 สุขภาพ: เซ็ต Target เช็ค IP หรือ Service ที่รันอยู่
// [ ] โหนด 📲 LINE Notify: ผูก Token และปรับข้อความเตือนภัยตื่นตูม`,
            codeLang: 'javascript'
          }
        ]
      },
      {
        id: 'operations',
        label: 'Operations & Zero-Touch',
        modules: [
          {
            id: 'bridge-control',
            icon: '🔗',
            title: 'Bridge Control (Shared State)',
            shortDesc: 'Google Sheets เป็น Single Source of Truth',
            requiredTier: 'workflow',
            description: 'Google Sheets Template ที่เป็นศูนย์กลางข้อมูล — ทุก Workflow อ่านเขียนจากที่เดียว: สถานะ Stream, DJ On-Duty, Current Playlist, Health Status',
            techSpecs: {
              type: 'Google Sheets',
              sheets: 'BridgeControl, StreamLog, Config',
              access: 'All 7 Workflows',
              sync: 'Real-time'
            },
            codeSnippet: `// Google Sheets — Bridge Control Layout
// Sheet: "BridgeControl"
// ┌─────────────┬──────────────────┐
// │ Key         │ Value            │
// ├─────────────┼──────────────────┤
// │ stream_live │ true             │
// │ dj_on_duty  │ noah             │
// │ playlist_id │ PLxxxx_night     │
// │ viewers     │ 42               │
// │ last_check  │ 2026-03-10 23:55 │
// │ health      │ NOMINAL          │
// │ uptime_hrs  │ 168.5            │
// └─────────────┴──────────────────┘`,
            codeLang: 'text'
          },
          {
            id: 'zero-touch',
            icon: '🤖',
            title: 'Zero-Touch Streaming',
            shortDesc: 'ปล่อยมือได้ ระบบรันเอง 24/7',
            requiredTier: 'vip',
            description: 'Deployment Checklist สุดท้าย — เช็คทุกจุดว่าระบบพร้อมรันแบบ Zero-Touch จริงๆ: PM2 auto-start, Watchdog cron, OBS headless, Cloudflare Tunnel persistent',
            techSpecs: {
              deployment: 'Full Checklist',
              automation: 'Cron + PM2',
              monitoring: 'LINE + Sheets',
              support: 'VIP Group Only'
            },
            codeSnippet: `# Zero-Touch Deployment Checklist\n# ✅ Pre-Flight\npm2 status                    # All services online\ncrontab -l                    # Watchdog scheduled\ncloudflared tunnel list       # Tunnel active\nobs --version                 # OBS headless ready\n\n# ✅ Go-Live Sequence\npm2 start noah-n8n            # Start n8n\nsleep 5\ncurl localhost:5678/healthz   # Verify n8n\ncurl -X POST localhost:5678/webhook/focus-start  # Start stream\n\n# ✅ Verify\n# → YouTube Studio: Stream LIVE\n# → Google Sheets: BridgeControl updated\n# → LINE: No error alerts\n# → Chat: AI responding\n\necho "🟢 NOAH STATION IS ONLINE — ZERO TOUCH ACTIVE"`,
            codeLang: 'bash'
          },
          {
            id: 'troubleshooting',
            icon: '🛡️',
            title: 'Failure Patterns & คู่มือแก้กรรม',
            shortDesc: 'อาการยอดฮิต และวิธีแก้ตลับเมตร 1-2-3',
            requiredTier: 'workflow',
            description: 'รวมอาการพังยอดฮิตของระบบ Auto — API ล่ม, Token หมดอายุ, n8n ค้างจอขาว — พร้อมวิธีเชือดบั๊กสไตล์ Dark Architect',
            techSpecs: {
              issue: 'Google Token Expired',
              solution: 'Re-authenticate credentials',
              issue2: 'n8n RAM Leak',
              solution2: 'PM2 auto-restart rule'
            },
            codeSnippet: `// 💡 คู่มือซ่อมฉุกเฉิน (เดี๋ยวบอสมาเติมของจริง)\n\n// อาการ 1: n8n ค้าง จอขาว\n// สาเหตุ: RAM เต็ม หรือ Process ผีดิบ\n// วิธีแก้: เปิด PowerShell แล้วรันคำสั่งนี้\npm2 restart n8n\n\n// อาการ 2: YouTube API หลุด\n// สาเหตุ: Token หมดอายุ 7 วัน\n// วิธีแก้: เข้า n8n -> Credentials -> Reconnect Google`,
            codeLang: 'javascript'
          },
          {
            id: 'monetization',
            icon: '🤑',
            title: 'Monetization & Scaling',
            shortDesc: 'วิธีทำเงินจากสถานีที่หลับไม่เป็น',
            requiredTier: 'vip',
            description: 'ระบบเสร็จแล้ว แล้วเงินล่ะ? — วิธีเอาสถานีไปรับสปอนเซอร์, ดึงคนเข้า LINE OA ฟันกำไร, และโมเดลรับจ้างเปิดสถานีให้คนอื่น',
            techSpecs: {
              model1: 'Sponsorship Placement',
              model2: 'Lead Gen to LINE OA',
              model3: 'Station-as-a-Service',
              expected: 'Passive Income'
            },
            codeSnippet: `// 💡 โมเดลทำเงินจาก Noah Station (เดี๋ยวบอสมาเติม)\n\n# 1. รับ Sponsor วางโลโก้บน Live\n# เนื่องจาก Live รัน 24/7 = 720 ชั่วโมง/เดือน\n# สามารถขาย Ad Placement ให้แบรนด์ได้ในราคา x,xxx บาท/เดือน\n\n# 2. ดูดคนเข้า LINE OA\n# ให้ Neon (AI) แจกโค้ดลับในแชทให้คนแอด LINE\n# เปลี่ยน Viewers เป็น Lead เก็บไว้ทำ CRM\n\n# 3. รับจ้างเปิดสถานี (SaaS)\n# รับจ้างรันระบบให้ช่องคนอื่น เก็บรายเดือน`,
            codeLang: 'markdown'
          },
          {
            id: "secret-bonus",
            icon: "🔥",
            title: "VIP Discord & เทคนิคขั้นเทพ",
            shortDesc: "กุญแจเข้ากลุ่มลับ และ Technical Support",
            type: "architecture",
            requiredTier: "vip",
            description: "สำหรับเพื่อนชาว VIP นี่คือกุญแจเข้าสู่ Discord ลับของเรา ที่นี่จะมีบอท Noah คอยซัพพอร์ต 24/7 และเป็นที่พูดคุยเทคนิคสาย Dark ที่เปิดเผยที่อื่นไม่ได้",
            techSpecs: {
              access: 'Discord Private Server',
              support: '24/7 AI + VIP Human Loop',
              community: 'Exclusive Members Only',
              status: 'Classified'
            },
            codeSnippet: `// 💀 [CLASSIFIED INFORMATION]\n// [ACCESS GRANTED FOR VIP ONLY]\n\n// 1. คัดลอกลิงก์ด้านล่างนี้ไปเปิดใน Browser\nconst discordInvite = "https://discord.gg/YOUR_INVITE_LINK_HERE";\n\n// 2. เมื่อเข้าไปแล้ว ให้ไปที่ห้อง #verify เพื่อยืนยันตัวตน\n// 3. หลังจากนั้นห้อง #vip-support จะเปิดออก\n// 4. พิมพ์ถามปัญหาหรือพูดคุยเทคนิคในห้องนั้นได้เลย บอท Noah สแตนด์บายอยู่ 24/7`,
            codeLang: 'javascript'
          }
        ]
      }
    ]
  },
  {
    id: 'bourneken-workspace',
    title: 'Bourneken workspace',
    tagline: 'Digital Lifeform — ระบบปฏิบัติการส่วนตัวที่ Sync ข้ามมิติ',
    posterUrl: 'assets/poster-bourneken.jpg',
    heroUrl: 'assets/poster-bourneken.jpg',
    spotlight: false,
    comingSoon: true
  },
  {
    id: 'line-crm',
    title: 'LINE CRM Bot',
    tagline: 'ระบบ CRM อัจฉริยะบน LINE OA — ปิดการขายอัตโนมัติ',
    posterUrl: 'assets/poster-linecrm.jpg',
    heroUrl: 'assets/poster-linecrm.jpg',
    spotlight: false,
    comingSoon: true
  },
  {
    id: 'darkweb-monitor',
    title: 'DarkWeb Monitor',
    tagline: 'ระบบเฝ้าระวังภัยคุกคาม — Scan ข้อมูลรั่วไหลอัตโนมัติ',
    posterUrl: 'assets/poster-darkweb.jpg',
    heroUrl: 'assets/poster-darkweb.jpg',
    spotlight: false,
    comingSoon: true
  },
  {
    id: 'ai-secretary',
    title: 'AI Secretary',
    tagline: 'เลขาอัจฉริยะ — จัดการนัดหมาย ตอบเมล์ สรุปงาน',
    posterUrl: 'assets/poster-ai-secretary.jpg',
    heroUrl: 'assets/poster-ai-secretary.jpg',
    spotlight: false,
    comingSoon: true
  }
];

// ============================================
// LOBBY PAGE LOGIC
// ============================================

function initLobby() {
  renderTopBar();
  renderHeroSpotlight();
  renderProjectGrid();
  initAnimations();
}

function renderTopBar() {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;

  const isLoggedIn = !!USER_STATE.userId;

  const userHTML = isLoggedIn
    ? `<div class="topbar-user" style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:0.75rem;color:var(--text-muted);">${USER_STATE.email || ''}</span>
        ${USER_STATE.avatar
      ? `<img src="${USER_STATE.avatar}" alt="avatar" style="width:32px;height:32px;border-radius:50%;border:2px solid var(--gold);cursor:pointer;" onclick="signOut()" title="กดเพื่อ Logout">`
      : `<div class="user-avatar" onclick="signOut()" style="cursor:pointer;" title="กดเพื่อ Logout">${USER_STATE.initials}</div>`
    }
      </div>`
    : `<button onclick="showAuthModal()" class="btn btn-ghost" style="font-size:0.8rem;padding:6px 16px;">
        🔑 เข้าสู่ระบบ
      </button>`;

  topbar.innerHTML = `
    <a href="index.html" class="topbar-logo">
      <div class="topbar-logo-icon">🎭</div>
      <div class="topbar-title">THE ARCHITECT'S <span>THEATER</span></div>
    </a>
    ${userHTML}
  `;
}

function renderHeroSpotlight() {
  const hero = document.getElementById('hero-spotlight');
  if (!hero) return;

  const spotlight = PROJECTS.find(p => p.spotlight);
  if (!spotlight) return;

  const userTier = getUserTierForProject(spotlight.id);
  const tierInfo = TIERS[userTier];
  const hasPurchased = userTier !== 'free';

  hero.innerHTML = `
    <img src="${spotlight.heroUrl}" alt="${spotlight.title}" class="hero-bg"
         onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, #0a0a1a, #1a102e, #0f1a2a)';">
    <div class="hero-content">
      <div class="hero-tag">⭐ SPOTLIGHT PROJECT</div>
      <h1 class="hero-title font-display">${spotlight.title}</h1>
      <p class="hero-desc">${spotlight.tagline}</p>
      ${hasPurchased ? `<div class="hero-owned-badge"><span class="tier-badge ${tierInfo.color}">${tierInfo.icon} ${tierInfo.label}</span></div>` : ''}
      <div class="hero-actions">
        <a href="theater.html?project=${spotlight.id}" class="btn btn-gold">
          ${hasPurchased ? '▶ เข้าชมคู่มือเต็มระบบ' : '👁️ ดูรายละเอียด'}
        </a>
        <button class="btn btn-ghost" onclick="document.getElementById('projects').scrollIntoView({behavior:'smooth'})">
          📋 ดูทั้งหมด
        </button>
      </div>
    </div>
  `;
}

function renderProjectGrid() {
  const grid = document.getElementById('project-grid');
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((project, i) => {
    const isComingSoon = project.comingSoon;
    const delayClass = `animate-fade-in-up animate-delay-${(i % 4) + 1}`;
    const userTier = getUserTierForProject(project.id);
    const hasPurchased = userTier !== 'free';

    let badgeHTML = '';
    if (hasPurchased) {
      const tierInfo = TIERS[userTier];
      badgeHTML = `<span class="project-tier-tag ${tierInfo.color}">${tierInfo.icon} ${tierInfo.label}</span>`;
    } else if (!isComingSoon && project.pricing) {
      badgeHTML = `<span class="project-tier-tag price-tag">ตั้งแต่ ${project.pricing.manual.price}</span>`;
    }

    const cardContent = `
      <img src="${project.posterUrl}" alt="${project.title}" class="project-poster"
           onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, #0e0e1a ${Math.random() * 20}%, #1a0e2a ${50 + Math.random() * 20}%, #0a1a2e 100%)';">
      <div class="project-overlay">
        ${badgeHTML}
        <h3 class="project-name">${project.title}</h3>
        <p class="project-tagline">${project.tagline}</p>
      </div>
      ${isComingSoon ? '<div class="coming-soon-badge">COMING SOON</div>' : ''}
    `;

    if (isComingSoon) {
      return `<div class="project-card coming-soon ${delayClass}">${cardContent}</div>`;
    }
    return `<a href="theater.html?project=${project.id}" class="project-card ${delayClass}">${cardContent}</a>`;
  }).join('');
}

// ============================================
// THEATER ROOM LOGIC
// ============================================

let currentProject = null;
let currentModule = null;

function initTheater() {
  renderTopBar();

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('project');

  currentProject = PROJECTS.find(p => p.id === projectId);

  if (!currentProject || !currentProject.phases) {
    document.body.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;text-align:center;padding:2rem;">
        <div style="font-size:4rem;margin-bottom:1rem;">🎭</div>
        <h1 style="font-family:Outfit,sans-serif;font-size:2rem;margin-bottom:0.5rem;">Project Not Found</h1>
        <p style="color:var(--text-secondary);margin-bottom:2rem;">โปรเจกต์นี้ยังไม่พร้อมให้เข้าชม</p>
        <a href="index.html" class="btn btn-gold">← กลับหน้า Lobby</a>
      </div>
    `;
    return;
  }

  renderStage();
  renderMap();
  renderEngineEmpty();
  renderPricingPanel();

  // Auto-select first accessible module
  const firstModule = findFirstAccessibleModule();
  if (firstModule) {
    selectModule(firstModule.phaseId, firstModule.moduleId);
  }
}

function findFirstAccessibleModule() {
  for (const phase of currentProject.phases) {
    for (const mod of phase.modules) {
      if (canAccessModule(currentProject.id, mod.requiredTier)) {
        return { phaseId: phase.id, moduleId: mod.id };
      }
    }
  }
  if (currentProject.phases.length > 0 && currentProject.phases[0].modules.length > 0) {
    return {
      phaseId: currentProject.phases[0].id,
      moduleId: currentProject.phases[0].modules[0].id
    };
  }
  return null;
}

function renderStage() {
  const stage = document.getElementById('the-stage');
  if (!stage) return;

  const userTier = getUserTierForProject(currentProject.id);
  const tierInfo = TIERS[userTier];
  const videoPlayerHTML = currentProject.youtubeUrl ? `
    <div class="video-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); background: #000;">
      <iframe src="${currentProject.youtubeUrl}" 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
      </iframe>
    </div>
  ` : `
    <div class="stage-video-container">
      <img src="${currentProject.heroUrl}" alt="${currentProject.title}" class="stage-poster"
           onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, #0e0e1a, #1a0e2a, #0a1a2e)';">
      <button class="stage-play-btn" onclick="alert('🎬 Video playback coming soon!')">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </div>
  `;

  stage.innerHTML = `
    ${videoPlayerHTML}
    <div class="stage-info">
      <div>
        <div class="stage-title">${currentProject.videoTitle || currentProject.title}</div>
        <div class="stage-subtitle">${currentProject.videoSubtitle || currentProject.tagline}</div>
      </div>
      <div class="stage-actions">
        <span class="tier-badge ${tierInfo.color}">${tierInfo.icon} ${tierInfo.label}</span>
        <a href="index.html" class="btn-back">← Lobby</a>
      </div>
    </div>
  `;
}

function renderMap() {
  const map = document.getElementById('the-map');
  if (!map) return;

  const phasesHTML = currentProject.phases.map((phase, pi) => {
    const modulesHTML = phase.modules.map(mod => {
      const locked = !canAccessModule(currentProject.id, mod.requiredTier);
      const tierNeeded = TIERS[mod.requiredTier];
      return `
        <div class="module-item ${locked ? 'locked' : ''}"
             data-module-id="${mod.id}" data-phase-id="${phase.id}"
             onclick="selectModule('${phase.id}', '${mod.id}')">
          <div class="module-icon">${mod.icon}</div>
          <div class="module-info">
            <div class="module-name">${mod.title}</div>
            <div class="module-desc">${mod.shortDesc}</div>
          </div>
          ${locked ? `<div class="module-lock" title="ต้องมี ${tierNeeded.label}">🔒</div>` : ''}
        </div>
      `;
    }).join('');

    const lockedCount = phase.modules.filter(m => !canAccessModule(currentProject.id, m.requiredTier)).length;

    return `
      <div class="phase-group">
        <div class="phase-header ${pi === 0 ? 'active' : ''}" onclick="togglePhase(this)">
          <span class="phase-chevron">▶</span>
          <span class="phase-number">P${pi + 1}</span>
          <span class="phase-label">${phase.label}</span>
          <span class="phase-count">${phase.modules.length} modules${lockedCount > 0 ? ' · 🔒' + lockedCount : ''}</span>
        </div>
        <div class="phase-modules ${pi === 0 ? 'expanded' : ''}">
          ${modulesHTML}
        </div>
      </div>
    `;
  }).join('');

  map.innerHTML = `
    <div class="map-header">
      <div class="map-title">📍 Module Map</div>
    </div>
    ${phasesHTML}
  `;
}

function renderEngineEmpty() {
  const header = document.getElementById('engine-header');
  const body = document.getElementById('engine-body');
  const footer = document.getElementById('engine-footer');
  if (!header || !body || !footer) return;

  header.innerHTML = `
    <div class="engine-label">// THE ENGINE</div>
    <div class="engine-module-title">Select a Module</div>
    <div class="engine-module-desc">เลือก module จาก Map ด้านซ้ายเพื่อดู Tech Specs และ Script</div>
  `;

  body.innerHTML = `
    <div class="engine-empty-state">
      <div class="empty-icon">⚙️</div>
      <div class="empty-text">เลือก module จากแผนที่ด้านซ้าย<br>เพื่อเปิดเครื่องยนต์</div>
    </div>
  `;

  footer.innerHTML = '';
}

function selectModule(phaseId, moduleId) {
  const phase = currentProject.phases.find(p => p.id === phaseId);
  if (!phase) return;
  const mod = phase.modules.find(m => m.id === moduleId);
  if (!mod) return;

  currentModule = mod;

  // Update active states
  document.querySelectorAll('.module-item').forEach(el => el.classList.remove('active'));
  const activeItem = document.querySelector(`[data-module-id="${moduleId}"]`);
  if (activeItem) activeItem.classList.add('active');

  // Expand parent phase
  const phaseGroup = activeItem?.closest('.phase-group');
  if (phaseGroup) {
    const header = phaseGroup.querySelector('.phase-header');
    const modules = phaseGroup.querySelector('.phase-modules');
    if (header && modules && !modules.classList.contains('expanded')) {
      header.classList.add('active');
      modules.classList.add('expanded');
    }
  }

  const locked = !canAccessModule(currentProject.id, mod.requiredTier);
  renderEngine(mod, locked);
}

function renderEngine(mod, locked) {
  const header = document.getElementById('engine-header');
  const body = document.getElementById('engine-body');
  const footer = document.getElementById('engine-footer');
  if (!header || !body || !footer) return;

  const tierNeeded = TIERS[mod.requiredTier];

  header.innerHTML = `
    <div class="engine-label">// THE ENGINE — ${mod.icon} ${mod.title}</div>
    <div class="engine-module-title">${mod.title}</div>
    <div class="engine-module-desc">${mod.description}</div>
  `;

  if (locked) {
    body.innerHTML = `
      <div class="lock-overlay">
        <div class="lock-content">
          <div class="engine-section-title">// Tech Specs</div>
          <div class="tech-specs">
            <div class="tech-spec-item"><div class="tech-spec-label">Runtime</div><div class="tech-spec-value">••••••</div></div>
            <div class="tech-spec-item"><div class="tech-spec-label">Platform</div><div class="tech-spec-value">••••••</div></div>
            <div class="tech-spec-item"><div class="tech-spec-label">Storage</div><div class="tech-spec-value">••••••</div></div>
            <div class="tech-spec-item"><div class="tech-spec-label">Auth</div><div class="tech-spec-value">••••••</div></div>
          </div>
          <div class="engine-section-title" style="margin-top:24px;">// Script Preview</div>
          <div class="code-block">
            <div class="code-block-header">
              <div class="code-block-dots"><span></span><span></span><span></span></div>
              <span class="code-block-lang">locked</span>
            </div>
            <div class="code-block-content">// Content is locked\n// Upgrade to ${tierNeeded.label}\n// to access this script...</div>
          </div>
        </div>
        <div class="lock-message">
          <div class="lock-icon-big">🔒</div>
          <div class="lock-text">ต้องมี ${tierNeeded.label}</div>
          <div class="lock-subtext">Module นี้ต้องซื้อ ${tierNeeded.label} (${tierNeeded.price || 'N/A'}) ขึ้นไปเพื่อปลดล็อก</div>
          <button class="btn-upgrade" onclick="scrollToPricing()">
            ⬆ ดูแพ็กเกจทั้งหมด
          </button>
        </div>
      </div>
    `;
    footer.innerHTML = `
      <button class="btn-copy-script" disabled style="opacity:0.3;cursor:not-allowed;">
        <span class="icon">🔒</span>
        LOCKED — ซื้อแพ็กเกจเพื่อปลดล็อก
      </button>
    `;
  } else {
    const specsHTML = mod.techSpecs ? Object.entries(mod.techSpecs).map(([key, val]) => `
      <div class="tech-spec-item">
        <div class="tech-spec-label">${key}</div>
        <div class="tech-spec-value">${val}</div>
      </div>
    `).join('') : '';

    body.innerHTML = `
      <div>
        <div class="engine-section-title">// Tech Specs</div>
        <div class="tech-specs">${specsHTML}</div>
      </div>
      <div>
        <div class="engine-section-title">// Script Preview</div>
        <div class="code-block">
          <div class="code-block-header">
            <div class="code-block-dots"><span></span><span></span><span></span></div>
            <span class="code-block-lang">${mod.codeLang || 'code'}</span>
          </div>
          <div class="code-block-content">${escapeHTML(mod.codeSnippet || '// No script available')}</div>
        </div>
      </div>
    `;

    footer.innerHTML = `
      <button class="btn-copy-script" onclick="copyScript(this)">
        <span class="icon">📋</span>
        1-CLICK COPY SCRIPT
      </button>
    `;
  }
}

// --- Pricing Panel ---
function renderPricingPanel() {
  const panel = document.getElementById('pricing-panel');
  if (!panel || !currentProject.pricing) return;

  const userTier = getUserTierForProject(currentProject.id);

  const cardsHTML = Object.entries(currentProject.pricing).map(([tierKey, tier]) => {
    const tierInfo = TIERS[tierKey];
    const isOwned = TIERS[userTier].level >= tierInfo.level;
    const isPopular = tier.popular;

    return `
      <div class="pricing-card ${tierInfo.color} ${isPopular ? 'popular' : ''} ${isOwned ? 'owned' : ''}">
        ${isPopular ? '<div class="popular-badge">🔥 ขายดีสุด</div>' : ''}
        ${isOwned ? '<div class="owned-badge">✅ คุณมีสิทธิ์นี้แล้ว</div>' : ''}
        <div class="pricing-card-header">
          <div class="pricing-tier-name">${tierInfo.icon} ${tierInfo.label}</div>
          <div class="pricing-price">${tier.price}</div>
          <div class="pricing-subtitle">${tier.subtitle}</div>
        </div>
        <div class="pricing-features">
          <div class="pricing-features-label">คุณจะได้:${tierKey !== 'manual' ? ` <span>(ทุกอย่างใน ${tierKey === 'workflow' ? 'TIER 1' : 'TIER 2'} + เพิ่ม)</span>` : ''}</div>
          <ul>
            ${tier.features.map(f => `<li>• ${f}</li>`).join('')}
          </ul>
          ${tier.note ? `<div class="pricing-note">${tier.note}</div>` : ''}
        </div>
        <div class="pricing-footer">
          ${tier.targetAudience ? `<div class="pricing-audience"><strong>เหมาะกับ:</strong> ${tier.targetAudience}</div>` : ''}
          ${isOwned
        ? `<button class="btn-pricing-cta owned" disabled>✅ เปิดใช้งานแล้ว</button>`
        : `<button class="btn-pricing-cta ${tierInfo.color}" onclick="handlePurchase('${currentProject.id}', '${tierKey}')">${tier.cta}</button>`
      }
        </div>
      </div>
    `;
  }).join('');

  panel.innerHTML = `
    <div class="pricing-section-header">
      <div class="pricing-section-icon">🎫</div>
      <h2 class="pricing-section-title">Implementation Tiers</h2>
      <p class="pricing-section-subtitle">เลือกแพ็กเกจที่เหมาะกับคุณ — ทุก Tier คือทางลัด ไม่ใช่ซื้อช่อง แต่ซื้อเพื่อสร้างช่องของคุณเอง</p>
    </div>
    <div class="pricing-grid">
      ${cardsHTML}
    </div>
    <div class="pricing-disclaimer">
      <p>💡 คุณไม่ได้ซื้อช่องแบบผม — คุณซื้อทางลัด เพื่อสร้างช่องแบบคุณบนโครงที่พิสูจน์แล้ว</p>
    </div>
  `;
}

function scrollToPricing() {
  const panel = document.getElementById('pricing-panel');
  if (panel) panel.scrollIntoView({ behavior: 'smooth' });
}

// --- Purchase Router ---
function handlePurchase(projectId, tierKey) {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  if (isLocalhost || typeof startCheckout === 'undefined') {
    // Demo mode for local development
    demoPurchase(projectId, tierKey);
  } else {
    // Real Stripe checkout
    startCheckout(projectId, tierKey);
  }
}

// --- Demo Purchase (Simulate — localhost only) ---
function demoPurchase(projectId, tierKey) {
  const tierInfo = TIERS[tierKey];
  if (confirm(`🎫 Demo: ซื้อ "${tierInfo.label}" สำหรับ "${currentProject.title}" (${tierInfo.price})\n\nกด OK เพื่อจำลองการซื้อ`)) {
    USER_STATE.purchases[projectId] = tierKey;
    USER_STATE.name = tierInfo.label + ' Member';
    USER_STATE.initials = tierKey === 'manual' ? 'M' : tierKey === 'workflow' ? 'W' : 'V';

    // Re-render everything
    renderTopBar();
    renderStage();
    renderMap();
    renderPricingPanel();

    if (currentModule) {
      const phase = currentProject.phases.find(p => p.modules.some(m => m.id === currentModule.id));
      if (phase) selectModule(phase.id, currentModule.id);
    }

    showToast(`✅ ซื้อ ${tierInfo.label} สำเร็จ! Module ถูกปลดล็อกแล้ว`);
  }
}

// --- Demo Tier Switcher ---
function switchTier(projectId, tier) {
  if (tier === 'free') {
    delete USER_STATE.purchases[projectId];
    USER_STATE.name = 'Guest';
    USER_STATE.initials = 'G';
  } else {
    USER_STATE.purchases[projectId] = tier;
    const tierInfo = TIERS[tier];
    USER_STATE.name = tierInfo.label;
    USER_STATE.initials = tier === 'manual' ? 'M' : tier === 'workflow' ? 'W' : 'V';
  }

  // Re-render
  if (document.getElementById('project-grid')) {
    initLobby();
  } else if (document.getElementById('the-stage')) {
    renderTopBar();
    renderStage();
    renderMap();
    renderPricingPanel();
    if (currentModule) {
      const phase = currentProject.phases.find(p => p.modules.some(m => m.id === currentModule.id));
      if (phase) selectModule(phase.id, currentModule.id);
    }
  }
}

// --- Copy to Clipboard ---
async function copyScript(btn) {
  if (!currentModule || (!currentModule.codeSnippet && !currentModule.workflowFile)) return;

  btn.innerHTML = `<span class="icon">⏳</span> กำลังคัดลอก...`;

  let textToCopy = currentModule.codeSnippet;

  if (currentModule.workflowFile) {
    try {
      const response = await fetch(currentModule.workflowFile);
      if (!response.ok) throw new Error("File not found");
      textToCopy = await response.text();
    } catch (err) {
      console.error("Fetch error:", err);
      btn.innerHTML = `<span class="icon">❌</span> โหลด Workflow ไม่สำเร็จ`;
      setTimeout(() => {
        btn.innerHTML = `<span class="icon">📋</span> 1-CLICK COPY WORKFLOW`;
      }, 2000);
      return;
    }
  }

  if (!textToCopy) return;

  try {
    await navigator.clipboard.writeText(textToCopy);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  btn.classList.add('copied');
  btn.innerHTML = `<span class="icon">✅</span> COPIED TO CLIPBOARD!`;
  setTimeout(() => {
    btn.classList.remove('copied');
    btn.innerHTML = currentModule.workflowFile ? `<span class="icon">📋</span> 1-CLICK COPY WORKFLOW` : `<span class="icon">📋</span> 1-CLICK COPY SCRIPT`;
  }, 2000);
}

// --- Phase Accordion ---
function togglePhase(header) {
  const modules = header.nextElementSibling;
  const isExpanded = modules.classList.contains('expanded');
  header.classList.toggle('active', !isExpanded);
  modules.classList.toggle('expanded', !isExpanded);
}

// --- Toast Notification ---
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- Utilities ---
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-fade-in-up').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}
