"use client";
import { useInView } from "../hooks/useInView";

/* About: NanoBanana Pro kawaii × pastel アップグレード版
   about-profile.webp が /public/ に存在すれば自動表示 */

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const highlights = [
  { icon:"🌿", label:"AI自動化",    desc:"Claude APIで\n業務効率化を実現", color:"#4a7c59", bg:"rgba(74,124,89,0.08)" },
  { icon:"💄", label:"美容×Tech",   desc:"業界特化の\nソリューション",     color:"#c47eb5", bg:"rgba(196,126,181,0.08)" },
  { icon:"⚡", label:"高速開発",    desc:"提案から3週間で\n本番稼働",       color:"#d4a853", bg:"rgba(212,168,83,0.08)"  },
  { icon:"🌐", label:"クラウド展開", desc:"Vercelで\nゼロコンフィグ運用",   color:"#5b9bd5", bg:"rgba(91,155,213,0.08)"  },
];

const techStack = ["Next.js", "TypeScript", "Claude API", "TailwindCSS", "Vercel", "React"];

export default function About() {
  const { ref, inView } = useInView<HTMLElement>();
  const profileImg = `${BASE}/about-profile.webp`;

  return (
    <section id="about" ref={ref} className="relative py-28 px-6 overflow-hidden" style={{ background:"#faf9f6" }}>
      {/* パステルグロー */}
      <div className="organic-glow" style={{ width:500,height:500,bottom:"-10%",left:"-5%",
        background:"radial-gradient(ellipse,rgba(167,210,227,0.14) 0%,transparent 60%)" }} />
      <div className="organic-glow" style={{ width:400,height:400,top:"5%",right:"-5%",
        background:"radial-gradient(ellipse,rgba(255,182,213,0.12) 0%,transparent 60%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* セクションヘッダー */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,
            background:"linear-gradient(135deg,rgba(255,182,213,0.2),rgba(167,210,227,0.2))",
            border:"1px solid rgba(255,182,213,0.35)",borderRadius:99,padding:"5px 16px",marginBottom:12 }}>
            <span style={{ fontSize:"0.75rem" }}>✨</span>
            <span className="section-label" style={{ color:"#c47eb5" }}>ABOUT ME</span>
          </div>
          <h2 style={{ fontFamily:"var(--font-display,Georgia,serif)",
            fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#2c2a26",marginBottom:12 }}>
            <span style={{ background:"linear-gradient(135deg,#4a7c59,#7aad89)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text" }}>自己</span>紹介
          </h2>
          <div style={{ width:80,height:2,background:"linear-gradient(90deg,#ffb6d5,#a7d2e3,#c8b89a)",
            borderRadius:2,margin:"0 auto" }} />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* 左：プロフィール */}
          <div className={`transition-all duration-700 ${inView?"opacity-100 translate-x-0":"opacity-0 -translate-x-8"}`}
            style={{ transitionDelay:"0.1s" }}>

            {/* プロフィール画像 + kawaii装飾 */}
            <div style={{ position:"relative",marginBottom:32,display:"flex",justifyContent:"center" }}>
              {/* 背景装飾リング */}
              <div style={{ position:"absolute",inset:-12,borderRadius:"50%",
                background:"linear-gradient(135deg,rgba(255,182,213,0.3),rgba(167,210,227,0.3))",
                filter:"blur(16px)" }} />
              {/* プロフィール画像 or kawaii アバター */}
              <div style={{ position:"relative",width:160,height:160,borderRadius:"50%",overflow:"hidden",
                border:"3px solid rgba(255,255,255,0.9)",
                boxShadow:"0 8px 32px rgba(196,126,181,0.25), 0 2px 8px rgba(0,0,0,0.08)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profileImg}
                  alt="プロフィール"
                  style={{ width:"100%",height:"100%",objectFit:"cover" }}
                  onError={(e) => {
                    // 画像未生成時はkawaii SVGアバターにフォールバック
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector("svg")) {
                      parent.style.background = "linear-gradient(135deg,#fdf0f7,#e8f4f0)";
                      parent.insertAdjacentHTML("beforeend",
                        `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:4rem">🧑‍💻</div>`
                      );
                    }
                  }}
                />
              </div>
              {/* フローティング装飾 */}
              {["🌸","⭐","✨"].map((icon, i) => (
                <div key={i} style={{
                  position:"absolute",
                  top: i === 0 ? "-8px" : i === 1 ? "20%" : "70%",
                  left: i === 0 ? "60%" : i === 1 ? "-10px" : "88%",
                  fontSize:"1.1rem",
                  animation:`softFloat ${3+i*0.5}s ease-in-out ${i*0.4}s infinite`,
                  filter:"drop-shadow(0 2px 4px rgba(255,182,213,0.5))",
                }}>{icon}</div>
              ))}
            </div>

            {/* 自己紹介テキスト */}
            <div style={{ borderRadius:"20px",padding:28,
              background:"rgba(255,255,255,0.72)",
              backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
              border:"1px solid rgba(255,182,213,0.25)",
              boxShadow:"0 4px 24px rgba(196,126,181,0.08)" }}>
              {[
                "美容業界に特化したAI自動化エンジニアです。サロン・クリニックの業務効率化を、最新のAI技術とWebシステムで実現することをミッションとしています。",
                "Claude APIを活用したSNS投稿自動生成・顧客分析ダッシュボードなど、美容ビジネスの現場課題を解決するプロダクト開発を得意とします。",
                "Next.js・TypeScript・TailwindCSSをメインスタックとし、Vercelによる高速デプロイでスピーディな開発サイクルを実現します。",
              ].map((t,i) => (
                <p key={i} style={{ fontSize:"0.88rem",color:"#5c5752",lineHeight:1.85,
                  marginBottom: i < 2 ? 16 : 0 }}>{t}</p>
              ))}

              {/* テックスタックバッジ */}
              <div style={{ paddingTop:20,borderTop:"1px solid rgba(255,182,213,0.25)",marginTop:20 }}>
                <div style={{ fontFamily:"var(--font-code,monospace)",fontSize:"0.58rem",
                  color:"#c47eb5",letterSpacing:"0.22em",marginBottom:10 }}>TECH STACK</div>
                <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                  {techStack.map(t => (
                    <span key={t} style={{ padding:"3px 10px",borderRadius:99,fontSize:"0.7rem",
                      background:"linear-gradient(135deg,rgba(255,182,213,0.15),rgba(167,210,227,0.15))",
                      border:"1px solid rgba(255,182,213,0.3)",color:"#5c5752",
                      fontFamily:"var(--font-code,monospace)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 右：ハイライトカード */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item,i) => (
              <div key={i}
                className={`rounded-2xl p-6 card-hover text-center transition-all duration-700
                  ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}
                style={{ borderRadius:"18px",transitionDelay:`${0.22+i*0.1}s`,
                  background:"rgba(255,255,255,0.72)",
                  backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
                  border:`1px solid ${item.color}22`,
                  boxShadow:`0 4px 20px ${item.color}10` }}
              >
                <div style={{ width:52,height:52,borderRadius:"50%",margin:"0 auto 14px",
                  background:item.bg,display:"flex",alignItems:"center",justifyContent:"center",
                  border:`1.5px solid ${item.color}30`,
                  boxShadow:`0 4px 16px ${item.color}20` }}>
                  <span style={{ fontSize:"1.6rem" }}>{item.icon}</span>
                </div>
                <div style={{ fontFamily:"var(--font-display,Georgia,serif)",fontWeight:700,
                  fontSize:"0.95rem",color:item.color,marginBottom:"6px" }}>{item.label}</div>
                <div style={{ fontSize:"0.73rem",color:"#9b9490",lineHeight:1.6,whiteSpace:"pre-line" }}>{item.desc}</div>
              </div>
            ))}

            {/* kawaii ステータスカード */}
            <div className={`col-span-2 rounded-2xl p-5 transition-all duration-700
              ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}
              style={{ transitionDelay:"0.62s",
                background:"linear-gradient(135deg,rgba(255,182,213,0.15),rgba(167,210,227,0.15))",
                border:"1px solid rgba(255,182,213,0.3)",
                display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,
                flexWrap:"wrap" }}>
              {[
                { label:"PROJECTS", value:"50+", icon:"🚀" },
                { label:"CLIENTS",  value:"97%",  icon:"💝" },
                { label:"YEARS",    value:"3+",   icon:"⭐" },
              ].map(s => (
                <div key={s.label} style={{ textAlign:"center",flex:1 }}>
                  <div style={{ fontSize:"1.2rem",marginBottom:4 }}>{s.icon}</div>
                  <div style={{ fontFamily:"var(--font-code,monospace)",fontSize:"1.5rem",fontWeight:700,
                    background:"linear-gradient(135deg,#4a7c59,#c47eb5)",
                    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                    backgroundClip:"text" }}>{s.value}</div>
                  <div style={{ fontSize:"0.6rem",color:"#9b9490",letterSpacing:"0.15em",
                    fontFamily:"var(--font-code,monospace)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
