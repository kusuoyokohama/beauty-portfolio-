"use client";
import { useInView } from "../hooks/useInView";

const projects = [
  {
    id: 1,
    title: "SNS 自動生成システム",
    description:
      "Claude API を活用し、美容サロン向けの Instagram・X 投稿を自動生成。施術写真からAIがキャプション・ハッシュタグを自動作成し、運用コストを週4時間 → 30分に削減した。",
    cover: "🌸",
    accentColor: "#4a7c59",
    accentBg: "rgba(74,124,89,0.07)",
    tech: ["Claude API", "Next.js", "TypeScript", "Anthropic"],
    result: "運用時間 −87%",
    size: "large",
  },
  {
    id: 2,
    title: "顧客管理 AI Dashboard",
    description:
      "来店履歴・施術データをAIが分析しリピート来店予測・失客アラートを自動化。美容クリニック向けダッシュボード。",
    cover: "📈",
    accentColor: "#c8b89a",
    accentBg: "rgba(200,184,154,0.12)",
    tech: ["React", "TailwindCSS", "Claude API", "Vercel"],
    result: "リピート率 +23%",
    size: "medium",
  },
  {
    id: 3,
    title: "Puyo Game プロトタイプ",
    description:
      "Next.js × React でゲームロジックを実証したインタラクティブプロトタイプ。AI提案UIの技術検証として制作。",
    cover: "🎮",
    accentColor: "#7aad89",
    accentBg: "rgba(122,173,137,0.09)",
    tech: ["Next.js", "React", "TypeScript", "CSS Animation"],
    result: "技術検証完了",
    size: "medium",
  },
];

type Project = (typeof projects)[number];

function Card({ p, delay, inView }: { p: Project; delay: string; inView: boolean }) {
  const large = p.size === "large";
  return (
    <div
      className={`glass-warm rounded-2xl overflow-hidden card-hover flex flex-col transition-all duration-700
        ${large ? "md:col-span-2 md:row-span-2" : ""}
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ borderRadius:"20px", transitionDelay: delay }}
    >
      {/* トップアクセントバー */}
      <div style={{ height:3, background:`linear-gradient(90deg,${p.accentColor},transparent)` }} />

      {/* カバー */}
      <div className={`relative flex items-center justify-center overflow-hidden ${large ? "h-52" : "h-36"}`}
        style={{ background:`linear-gradient(135deg,${p.accentBg},rgba(250,249,246,0.4))` }}>
        <div className="absolute inset-0 grid-faint opacity-50" />
        <span className="relative z-10" style={{ fontSize: large ? "4.5rem" : "3rem",
          filter:"drop-shadow(0 2px 8px rgba(44,42,38,0.1))" }}>{p.cover}</span>
        {/* 結果バッジ */}
        <div className="absolute top-3 right-3" style={{ background:"rgba(250,249,246,0.92)",
          border:`1px solid ${p.accentColor}33`,borderRadius:6,padding:"3px 10px" }}>
          <span style={{ fontFamily:"var(--font-code,monospace)",fontSize:"0.62rem",
            color:p.accentColor,letterSpacing:"0.05em" }}>{p.result}</span>
        </div>
      </div>

      {/* 内容 */}
      <div className="p-6 flex flex-col flex-1">
        <h3 style={{ fontFamily:"var(--font-display,Georgia,serif)",
          fontSize: large ? "1.4rem" : "1.1rem",fontWeight:600,color:"#2c2a26",marginBottom:"10px" }}>
          {p.title}
        </h3>
        <p style={{ fontSize:"0.82rem",color:"#5c5752",lineHeight:1.78,marginBottom:"16px",flexGrow:1 }}>
          {p.description}
        </p>
        {/* バッジ */}
        <div className="flex flex-wrap gap-2 mb-5">
          {p.tech.map((t) => (
            <span key={t} className="font-mono" style={{ padding:"3px 10px",borderRadius:99,
              fontSize:"0.62rem",background:p.accentBg,color:p.accentColor,
              border:`1px solid ${p.accentColor}30`,letterSpacing:"0.03em" }}>{t}</span>
          ))}
        </div>
        {/* リンク */}
        <div className="flex gap-3">
          <a href="#" style={{ padding:"6px 14px",fontSize:"0.72rem",borderRadius:6,
            background:"rgba(155,148,144,0.1)",color:"#9b9490",
            border:"1px solid rgba(155,148,144,0.2)",textDecoration:"none",
            fontFamily:"var(--font-code,monospace)",letterSpacing:"0.05em" }}>GitHub</a>
          <a href="#" style={{ padding:"6px 14px",fontSize:"0.72rem",borderRadius:6,
            background:p.accentBg,color:p.accentColor,
            border:`1px solid ${p.accentColor}33`,textDecoration:"none",
            fontFamily:"var(--font-code,monospace)",letterSpacing:"0.05em" }}>Demo →</a>
        </div>
      </div>
    </div>
  );
}

export default function Works() {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section id="works" ref={ref} className="relative py-28 px-6" style={{ background:"#f3efe8" }}>
      <div className="organic-glow" style={{ width:400,height:400,top:"10%",right:"5%",
        background:"radial-gradient(ellipse,rgba(74,124,89,0.07) 0%,transparent 65%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
          <span className="section-label block mb-4">PROJECTS</span>
          <h2 style={{ fontFamily:"var(--font-display,Georgia,serif)",
            fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#2c2a26",marginBottom:"12px" }}>
            制作<span style={{ color:"#4a7c59" }}>実績</span>
          </h2>
          <div className="divider-gold mx-auto" style={{ marginTop:"16px" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-auto">
          {projects.map((p, i) => (
            <Card key={p.id} p={p} inView={inView} delay={`${0.12 + i * 0.12}s`} />
          ))}
        </div>
      </div>
    </section>
  );
}
