"use client";

/* Hero: NanoBanana Pro kawaii × pastel アップグレード版
   hero-bg.webp が /public/ に存在すればそちらを使用、なければCSS背景にフォールバック */

const EXP = "cubic-bezier(0.19,1,0.22,1)";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const stats = [
  { value: "50+",  label: "プロジェクト実績" },
  { value: "97%",  label: "クライアント満足度" },
  { value: "3年+", label: "業界経験" },
];

const services = [
  { icon: "🌿", title: "AI業務自動化",  desc: "SNS投稿・顧客フォロー・予約管理を自動化" },
  { icon: "📊", title: "データ分析",    desc: "顧客行動を可視化し、施策を最適化" },
  { icon: "🎯", title: "戦略コンサル",  desc: "美容業界の知見×最新技術で成長を設計" },
  { icon: "⚡", title: "スピード実装",  desc: "提案から3週間で本番稼働" },
];

// kawaii パステルアクセント装飾
const floatingIcons = [
  { icon: "✨", top: "12%", left: "8%",  size: "1.4rem", delay: "0.3s", opacity: 0.7 },
  { icon: "💻", top: "20%", right: "5%", size: "1.6rem", delay: "0.8s", opacity: 0.6 },
  { icon: "🌸", top: "65%", left: "5%",  size: "1.2rem", delay: "0.5s", opacity: 0.65 },
  { icon: "⭐", top: "80%", right: "8%", size: "1.1rem", delay: "1.0s", opacity: 0.55 },
  { icon: "🎨", top: "45%", left: "3%",  size: "1.3rem", delay: "0.6s", opacity: 0.6 },
];

function fadeUp(delay: string) {
  return { animation: `fadeInUp 0.9s ${EXP} ${delay} both` } as React.CSSProperties;
}
function fadeRight(delay: string) {
  return { animation: `fadeInRight 0.9s ${EXP} ${delay} both` } as React.CSSProperties;
}

export default function Hero() {
  const heroBg = `${BASE}/hero-bg.webp`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden grid-faint"
      style={{
        background: "linear-gradient(160deg,#fdf6f9 0%,#f0eef8 35%,#e8f4f0 70%,#faf9f6 100%)",
      }}
    >
      {/* Hero背景画像（Unsplash: ピンク×パープルネオン基板） */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `url(https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80)`,
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.13,
      }} />

      {/* kawaii パステルグロー */}
      <div className="organic-glow" style={{ width:700,height:700,top:"-15%",right:"-10%",
        background:"radial-gradient(ellipse,rgba(255,182,213,0.18) 0%,transparent 65%)" }} />
      <div className="organic-glow" style={{ width:500,height:500,bottom:"-5%",left:"-8%",
        background:"radial-gradient(ellipse,rgba(167,210,227,0.16) 0%,transparent 65%)" }} />
      <div className="organic-glow" style={{ width:380,height:380,top:"30%",left:"25%",
        background:"radial-gradient(ellipse,rgba(200,184,154,0.1) 0%,transparent 65%)" }} />

      {/* フローティング装飾アイコン */}
      {floatingIcons.map((item, i) => (
        <div key={i} className="animate-float" style={{
          position: "absolute",
          top: item.top, left: item.left, right: item.right,
          fontSize: item.size, opacity: item.opacity,
          animation: `softFloat 3.5s ease-in-out ${item.delay} infinite`,
          pointerEvents: "none", zIndex: 1,
          filter: "drop-shadow(0 2px 6px rgba(255,160,200,0.3))",
        }}>{item.icon}</div>
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full pt-28 pb-20">
        <div className="grid md:grid-cols-12 gap-10 items-center">

          {/* 左：テキスト */}
          <div className="md:col-span-7 space-y-7">
            <div style={fadeUp("0.1s")}>
              {/* kawaii バッジ */}
              <div style={{ display:"inline-flex",alignItems:"center",gap:8,
                background:"linear-gradient(135deg,rgba(255,182,213,0.25),rgba(167,210,227,0.25))",
                border:"1px solid rgba(255,182,213,0.4)",borderRadius:99,padding:"5px 16px",marginBottom:8 }}>
                <span style={{ fontSize:"0.75rem" }}>🌸</span>
                <span className="section-label" style={{ color:"#c47eb5",letterSpacing:"0.22em" }}>BEAUTY × AI CONSULTING</span>
              </div>
            </div>

            <h1 style={{
              ...fadeUp("0.22s"),
              fontFamily:"var(--font-display,Georgia,serif)",
              fontSize:"clamp(2.8rem,5.5vw,4.4rem)",
              fontWeight:700, lineHeight:1.1, color:"#2c2a26",
            }}>
              美容の未来を、<br />
              <span style={{ background:"linear-gradient(135deg,#4a7c59,#7aad89)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                backgroundClip:"text" }}>戦略と技術</span>で<br />
              設計する。
            </h1>

            <p style={{
              ...fadeUp("0.34s"),
              fontSize:"1rem",color:"#5c5752",lineHeight:1.85,maxWidth:"460px",
            }}>
              AI自動化・デジタル変革を通じて、美容サロン・クリニック・
              ブランドが抱える課題を解決するコンサルティングサービス。
            </p>

            <div style={{ ...fadeUp("0.44s"), display:"flex",flexWrap:"wrap",gap:"16px" }}>
              <a href="#works" className="btn-primary" style={{
                background:"linear-gradient(135deg,#4a7c59,#7aad89)",
                boxShadow:"0 4px 20px rgba(74,124,89,0.35)",
              }}>事例を見る <span>→</span></a>
              <a href="#contact" className="btn-ghost" style={{
                border:"1.5px solid rgba(196,126,181,0.45)",color:"#c47eb5",
              }}>無料相談する</a>
            </div>

            {/* kawaii パステル区切り */}
            <div style={{ ...fadeUp("0.54s"), display:"flex",alignItems:"center",gap:12 }}>
              <div style={{ width:60,height:1.5,background:"linear-gradient(90deg,#ffb6d5,#a7d2e3,transparent)",borderRadius:2 }} />
              <span style={{ fontSize:"0.8rem" }}>✨</span>
              <div style={{ width:40,height:1.5,background:"linear-gradient(90deg,#a7d2e3,transparent)",borderRadius:2 }} />
            </div>

            <div style={{ ...fadeUp("0.64s"), display:"flex",flexWrap:"wrap",gap:"40px" }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily:"var(--font-code,monospace)",fontSize:"2.2rem",
                    fontWeight:700,
                    background:"linear-gradient(135deg,#2d5a3d,#4a7c59)",
                    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                    backgroundClip:"text", lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontSize:"0.72rem",color:"#9b9490",marginTop:"4px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 右：サービスカード */}
          <div className="md:col-span-5" style={fadeRight("0.3s")}>
            <div className="animate-float"
              style={{ borderRadius:"26px",padding:"28px",
                background:"rgba(255,255,255,0.72)",
                backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
                border:"1px solid rgba(255,182,213,0.3)",
                boxShadow:"0 8px 40px rgba(196,126,181,0.12), 0 2px 8px rgba(0,0,0,0.04)" }}>

              <div style={{ display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px" }}>
                <div style={{ width:8,height:8,borderRadius:"50%",
                  background:"linear-gradient(135deg,#ffb6d5,#a7d2e3)",
                  boxShadow:"0 0 10px rgba(255,182,213,0.7)" }} />
                <span className="section-label" style={{ color:"#c47eb5" }}>SERVICE OVERVIEW</span>
              </div>

              {services.map((item, idx) => (
                <div key={item.title} style={{ display:"flex",alignItems:"flex-start",gap:"14px",
                  padding:"12px 0",borderBottom:"1px solid rgba(255,182,213,0.2)" }}>
                  <span style={{ fontSize:"1.35rem",flexShrink:0,marginTop:"2px" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight:600,fontSize:"0.88rem",color:"#2c2a26",marginBottom:"2px" }}>{item.title}</div>
                    <div style={{ fontSize:"0.78rem",color:"#9b9490",lineHeight:1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}

              {/* kawaii ステータスバッジ */}
              <div style={{ marginTop:"14px",padding:"10px 14px",borderRadius:"12px",
                background:"linear-gradient(135deg,rgba(255,182,213,0.15),rgba(167,210,227,0.15))",
                border:"1px solid rgba(255,182,213,0.35)",
                display:"flex",alignItems:"center",gap:"10px" }}>
                <span style={{ width:7,height:7,borderRadius:"50%",flexShrink:0,
                  background:"linear-gradient(135deg,#ffb6d5,#a7d2e3)",
                  boxShadow:"0 0 8px rgba(255,182,213,0.8)",display:"block" }} />
                <span style={{ fontFamily:"var(--font-code,monospace)",fontSize:"0.62rem",
                  color:"#c47eb5",letterSpacing:"0.1em" }}>STATUS</span>
                <span style={{ fontSize:"0.8rem",color:"#5c5752" }}>現在、新規案件受付中 🌸</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* スクロールヒント */}
      <div style={{ position:"absolute",bottom:"32px",left:"50%",transform:"translateX(-50%)",
        display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",opacity:0.4,
        ...fadeUp("1.0s") }}>
        <span className="section-label" style={{ color:"#c47eb5" }}>SCROLL</span>
        <div className="animate-float" style={{ width:1,height:38,
          background:"linear-gradient(to bottom,#ffb6d5,transparent)" }} />
      </div>
    </section>
  );
}
