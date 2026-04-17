"use client";
import { useInView } from "../hooks/useInView";

const categories = [
  { label:"AI / ML",   icon:"🧠", accent:"#4a7c59", bg:"rgba(74,124,89,0.08)",
    skills:["Claude API","Anthropic SDK","プロンプトエンジニアリング","AI自動化設計"] },
  { label:"FRONTEND",  icon:"⚛️", accent:"#2d5a3d", bg:"rgba(45,90,61,0.07)",
    skills:["Next.js","React","TypeScript","JavaScript"] },
  { label:"STYLING",   icon:"🎨", accent:"#c8b89a", bg:"rgba(200,184,154,0.15)",
    skills:["Tailwind CSS","Glassmorphism","CSS Animation","Responsive Design"] },
  { label:"TOOLS",     icon:"🛠", accent:"#9b9490", bg:"rgba(155,148,144,0.1)",
    skills:["Git / GitHub","Vercel","VS Code","Figma"] },
];

export default function Skills() {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section id="skills" ref={ref} className="relative py-28 px-6 overflow-hidden" style={{ background:"#f3efe8" }}>
      <div className="organic-glow" style={{ width:450,height:450,top:"20%",right:"-5%",
        background:"radial-gradient(ellipse,rgba(74,124,89,0.08) 0%,transparent 65%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
          <span className="section-label block mb-4">TECH STACK</span>
          <h2 style={{ fontFamily:"var(--font-display,Georgia,serif)",
            fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#2c2a26",marginBottom:"12px" }}>
            <span style={{ color:"#4a7c59" }}>スキル</span>セット
          </h2>
          <div className="divider-gold mx-auto" style={{ marginTop:"16px" }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat,i) => (
            <div
              key={cat.label}
              className={`glass-warm rounded-2xl overflow-hidden card-hover transition-all duration-700
                ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}
              style={{ borderRadius:"20px",transitionDelay:`${0.12+i*0.1}s` }}
            >
              <div style={{ height:3,background:`linear-gradient(90deg,${cat.accent},transparent)` }} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <span style={{ fontSize:"1.5rem" }}>{cat.icon}</span>
                  <span style={{ fontFamily:"var(--font-code,monospace)",fontSize:"0.6rem",
                    color:cat.accent,letterSpacing:"0.22em" }}>{cat.label}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {cat.skills.map(skill => (
                    <div key={skill} style={{ padding:"9px 14px",borderRadius:10,fontSize:"0.82rem",
                      background:cat.bg,color:"#5c5752",border:`1px solid ${cat.accent}20`,
                      transition:"background 0.2s ease,color 0.2s ease",cursor:"default" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background=`${cat.accent}18`;
                        (e.currentTarget as HTMLElement).style.color="#2c2a26"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background=cat.bg;
                        (e.currentTarget as HTMLElement).style.color="#5c5752"; }}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
