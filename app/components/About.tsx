"use client";
import { useInView } from "../hooks/useInView";

const highlights = [
  { icon:"🌿", label:"AI自動化",    desc:"Claude APIで\n業務効率化を実現" },
  { icon:"💄", label:"美容×Tech",   desc:"業界特化の\nソリューション" },
  { icon:"⚡", label:"高速開発",    desc:"提案から3週間で\n本番稼働" },
  { icon:"🌐", label:"クラウド展開", desc:"Vercelで\nゼロコンフィグ運用" },
];

export default function About() {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section id="about" ref={ref} className="relative py-28 px-6 overflow-hidden" style={{ background:"#faf9f6" }}>
      <div className="organic-glow" style={{ width:500,height:500,bottom:"-10%",left:"-5%",
        background:"radial-gradient(ellipse,rgba(200,184,154,0.15) 0%,transparent 60%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* 左 */}
          <div className={`transition-all duration-700 ${inView?"opacity-100 translate-x-0":"opacity-0 -translate-x-8"}`}
            style={{ transitionDelay:"0.1s" }}>
            <span className="section-label block mb-4">ABOUT ME</span>
            <h2 style={{ fontFamily:"var(--font-display,Georgia,serif)",
              fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#2c2a26",lineHeight:1.1 }}>
              <span style={{ color:"#4a7c59" }}>自己</span>紹介
            </h2>
            <div className="divider-sage" style={{ margin:"16px 0 28px" }} />

            <div className="glass-warm rounded-2xl p-8 space-y-5" style={{ borderRadius:"20px" }}>
              {[
                "美容業界に特化したAI自動化エンジニアです。サロン・クリニックの業務効率化を、最新のAI技術とWebシステムで実現することをミッションとしています。",
                "Claude APIを活用したSNS投稿自動生成・顧客分析ダッシュボードなど、美容ビジネスの現場課題を解決するプロダクト開発を得意とします。",
                "Next.js・TypeScript・TailwindCSSをメインスタックとし、Vercelによる高速デプロイでスピーディな開発サイクルを実現します。",
              ].map((t,i) => (
                <p key={i} style={{ fontSize:"0.88rem",color:"#5c5752",lineHeight:1.85 }}>{t}</p>
              ))}
              {/* hi-techメタ情報 */}
              <div style={{ paddingTop:"16px",borderTop:"1px solid rgba(200,184,154,0.3)",
                display:"flex",gap:"28px" }}>
                {[{ label:"STACK",value:"Next.js / TypeScript" },{ label:"AI MODEL",value:"Claude 3.5 Sonnet" }]
                  .map(item => (
                  <div key={item.label}>
                    <div style={{ fontFamily:"var(--font-code,monospace)",fontSize:"0.58rem",
                      color:"#7aad89",letterSpacing:"0.22em",marginBottom:"3px" }}>{item.label}</div>
                    <div style={{ fontSize:"0.78rem",color:"#5c5752" }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右 */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item,i) => (
              <div
                key={i}
                className={`glass-warm rounded-2xl p-6 card-hover text-center transition-all duration-700
                  ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}
                style={{ borderRadius:"18px",transitionDelay:`${0.22+i*0.1}s` }}
              >
                <span style={{ fontSize:"2.4rem",display:"block",marginBottom:"12px" }}>{item.icon}</span>
                <div style={{ fontFamily:"var(--font-display,Georgia,serif)",fontWeight:600,
                  fontSize:"0.95rem",color:"#2d5a3d",marginBottom:"6px" }}>{item.label}</div>
                <div style={{ fontSize:"0.73rem",color:"#9b9490",lineHeight:1.6,whiteSpace:"pre-line" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
