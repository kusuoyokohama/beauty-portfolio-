"use client";

/* Hero はページ最上部 → JS不要の純粋CSS animationで実装 */

const EXP = "cubic-bezier(0.19,1,0.22,1)";

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

function fadeUp(delay: string) {
  return { animation: `fadeInUp 0.9s ${EXP} ${delay} both` } as React.CSSProperties;
}
function fadeRight(delay: string) {
  return { animation: `fadeInRight 0.9s ${EXP} ${delay} both` } as React.CSSProperties;
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden grid-faint"
      style={{ background: "linear-gradient(160deg,#faf9f6 0%,#f3efe8 55%,#ede8e0 100%)" }}
    >
      {/* 有機的グロー */}
      <div className="organic-glow" style={{ width:680,height:680,top:"-20%",right:"-12%",
        background:"radial-gradient(ellipse,rgba(74,124,89,0.09) 0%,transparent 65%)" }} />
      <div className="organic-glow" style={{ width:420,height:420,bottom:"0%",left:"-8%",
        background:"radial-gradient(ellipse,rgba(200,184,154,0.18) 0%,transparent 65%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full pt-28 pb-20">
        <div className="grid md:grid-cols-12 gap-10 items-center">

          {/* 左：テキスト */}
          <div className="md:col-span-7 space-y-7">
            <div style={fadeUp("0.1s")}>
              <span className="section-label">BEAUTY × AI CONSULTING</span>
            </div>

            <h1 style={{
              ...fadeUp("0.22s"),
              fontFamily:"var(--font-display,Georgia,serif)",
              fontSize:"clamp(2.8rem,5.5vw,4.4rem)",
              fontWeight:700, lineHeight:1.1, color:"#2c2a26",
            }}>
              美容の未来を、<br />
              <span style={{ color:"#4a7c59" }}>戦略と技術</span>で<br />
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
              <a href="#works"   className="btn-primary">事例を見る <span>→</span></a>
              <a href="#contact" className="btn-ghost">無料相談する</a>
            </div>

            <div style={{
              ...fadeUp("0.54s"),
              width:80,height:1,background:"linear-gradient(90deg,#c8b89a,transparent)",
            }} />

            <div style={{ ...fadeUp("0.64s"), display:"flex",flexWrap:"wrap",gap:"40px" }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily:"var(--font-code,monospace)",fontSize:"2.2rem",
                    fontWeight:700,color:"#2d5a3d",lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontSize:"0.72rem",color:"#9b9490",marginTop:"4px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 右：サービスカード */}
          <div className="md:col-span-5" style={fadeRight("0.3s")}>
            <div className="glass-warm animate-float"
              style={{ borderRadius:"26px",padding:"28px" }}>
              <div style={{ display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px" }}>
                <div style={{ width:8,height:8,borderRadius:"50%",background:"#4a7c59",
                  boxShadow:"0 0 8px rgba(74,124,89,0.55)" }} />
                <span className="section-label">SERVICE OVERVIEW</span>
              </div>

              {services.map((item) => (
                <div key={item.title} style={{ display:"flex",alignItems:"flex-start",gap:"14px",
                  padding:"12px 0",borderBottom:"1px solid rgba(200,184,154,0.25)" }}>
                  <span style={{ fontSize:"1.35rem",flexShrink:0,marginTop:"2px" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight:600,fontSize:"0.88rem",color:"#2c2a26",marginBottom:"2px" }}>{item.title}</div>
                    <div style={{ fontSize:"0.78rem",color:"#9b9490",lineHeight:1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}

              <div className="subtle-glow" style={{ marginTop:"14px",padding:"9px 14px",
                borderRadius:"10px",background:"rgba(74,124,89,0.07)",
                border:"0.5px solid rgba(74,124,89,0.3)",
                display:"flex",alignItems:"center",gap:"10px" }}>
                <span style={{ width:7,height:7,borderRadius:"50%",background:"#4a7c59",flexShrink:0,
                  boxShadow:"0 0 6px rgba(74,124,89,0.6)" }} />
                <span style={{ fontFamily:"var(--font-code,monospace)",fontSize:"0.62rem",
                  color:"#7aad89",letterSpacing:"0.1em" }}>STATUS</span>
                <span style={{ fontSize:"0.8rem",color:"#5c5752" }}>現在、新規案件受付中</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* スクロールヒント */}
      <div style={{ position:"absolute",bottom:"32px",left:"50%",transform:"translateX(-50%)",
        display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",opacity:0.38,
        ...fadeUp("1.0s") }}>
        <span className="section-label">SCROLL</span>
        <div className="animate-float" style={{ width:1,height:38,
          background:"linear-gradient(to bottom,#4a7c59,transparent)" }} />
      </div>
    </section>
  );
}
