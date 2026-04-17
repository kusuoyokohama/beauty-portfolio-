"use client";
import { useInView } from "../hooks/useInView";

const steps = [
  {
    no: "01",
    title: "ヒアリング",
    desc: "現状の業務フロー・課題・目標をヒアリング。現場スタッフのリアルな声を大切にします。",
    icon: "🎧",
    accent: "#4a7c59",
  },
  {
    no: "02",
    title: "分析・診断",
    desc: "データと業務フローを分析し、AIで自動化できる領域と投資対効果を定量的に診断します。",
    icon: "🔬",
    accent: "#7aad89",
  },
  {
    no: "03",
    title: "戦略設計",
    desc: "最短・最小コストで最大効果を生む実装ロードマップを設計。技術選定から運用体制まで提案します。",
    icon: "📐",
    accent: "#2d5a3d",
  },
  {
    no: "04",
    title: "実装・伴走",
    desc: "3週間スプリントで本番稼働。その後も数値モニタリング・改善提案で伴走します。",
    icon: "🚀",
    accent: "#c8b89a",
  },
];

export default function Process() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      id="process"
      ref={ref}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "#faf9f6" }}
    >
      {/* 背景グロー */}
      <div className="organic-glow" style={{ width:500,height:500,top:"10%",left:"50%",
        transform:"translateX(-50%)",
        background:"radial-gradient(ellipse,rgba(74,124,89,0.06) 0%,transparent 65%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
          <span className="section-label block mb-4">HOW WE WORK</span>
          <h2 style={{ fontFamily:"var(--font-display,Georgia,serif)",
            fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#2c2a26",marginBottom:"12px" }}>
            コンサルティング<span style={{ color:"#4a7c59" }}>プロセス</span>
          </h2>
          <div className="divider-gold mx-auto" style={{ marginTop:"16px" }} />
        </div>

        {/* ステップグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.no}
              className={`glass-warm rounded-2xl p-7 card-hover relative overflow-hidden transition-all duration-700
                ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}
              style={{ borderRadius:"20px", transitionDelay:`${0.12 + i * 0.12}s` }}
            >
              {/* アクセントバー */}
              <div style={{ position:"absolute",top:0,left:0,right:0,height:3,
                background:`linear-gradient(90deg,${step.accent},transparent)` }} />

              {/* ステップ番号 */}
              <div style={{ fontFamily:"var(--font-code,monospace)",fontSize:"0.62rem",
                color:step.accent,letterSpacing:"0.22em",marginBottom:"16px" }}>
                STEP {step.no}
              </div>

              {/* アイコン */}
              <div style={{ fontSize:"2.2rem",marginBottom:"14px" }}>{step.icon}</div>

              {/* タイトル */}
              <h3 style={{ fontFamily:"var(--font-display,Georgia,serif)",
                fontSize:"1.15rem",fontWeight:600,color:"#2c2a26",marginBottom:"10px" }}>
                {step.title}
              </h3>

              {/* 説明 */}
              <p style={{ fontSize:"0.82rem",color:"#5c5752",lineHeight:1.78 }}>
                {step.desc}
              </p>

              {/* コネクター（最後以外） */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10"
                  style={{ width:24,height:1,
                    background:"linear-gradient(90deg,rgba(74,124,89,0.4),rgba(74,124,89,0.1))" }} />
              )}
            </div>
          ))}
        </div>

        {/* CTAバナー */}
        <div
          className={`mt-14 glass-sage rounded-2xl p-8 text-center transition-all duration-700
            ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}
          style={{ borderRadius:"20px", transitionDelay:"0.64s" }}
        >
          <p style={{ fontFamily:"var(--font-display,Georgia,serif)",
            fontSize:"1.3rem",fontWeight:600,color:"#2d5a3d",marginBottom:"6px" }}>
            まず無料相談から始めませんか？
          </p>
          <p style={{ fontSize:"0.85rem",color:"#5c5752",marginBottom:"20px" }}>
            30分のオンラインヒアリングで、貴院・貴サロンの課題を整理します。
          </p>
          <a href="#contact" className="btn-primary" style={{ display:"inline-flex" }}>
            無料相談を予約する →
          </a>
        </div>
      </div>
    </section>
  );
}
