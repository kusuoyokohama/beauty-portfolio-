export default function Mock() {
  return (
    <div style={{ background: "#0a0e27", minHeight: "100vh", color: "#fff", fontFamily: "monospace" }}>

      {/* Navbar */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 40px", borderBottom: "1px solid rgba(0,243,255,0.15)", background: "rgba(10,14,39,0.8)" }}>
        <span style={{ color: "#00f3ff", fontWeight: "bold", fontSize: 16 }}>AI×BEAUTY</span>
        <div style={{ display: "flex", gap: 32 }}>
          {["Works", "About", "Skills", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "120px 40px 80px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "inline-block", border: "1px solid rgba(0,243,255,0.3)", borderRadius: 99, padding: "6px 18px", color: "#00f3ff", fontSize: 11, marginBottom: 28, letterSpacing: 3 }}>
          ✦ AI AUTOMATION ENGINEER
        </div>
        <h1 style={{ fontSize: 64, fontWeight: 900, margin: "0 0 16px", background: "linear-gradient(135deg,#00f3ff,#b000ff,#ff00ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          AIが美を加速させる
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, marginBottom: 40 }}>美容業界向けAI自動化エンジニア</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <a href="#works" style={{ padding: "14px 32px", border: "1px solid #00f3ff", color: "#00f3ff", borderRadius: 8, fontSize: 14, textDecoration: "none" }}>プロジェクト一覧へ →</a>
          <a href="#contact" style={{ padding: "14px 32px", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", borderRadius: 8, fontSize: 14, textDecoration: "none" }}>お問い合わせ</a>
        </div>
      </section>

      {/* Works */}
      <section id="works" style={{ padding: "80px 40px", borderBottom: "1px solid rgba(255,255,255,0.05)", maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ color: "#00f3ff", fontSize: 11, letterSpacing: 4, textAlign: "center", marginBottom: 8 }}>PROJECTS</p>
        <h2 style={{ textAlign: "center", fontSize: 40, fontWeight: 800, marginBottom: 48 }}>制作<span style={{ color: "#00f3ff" }}>実績</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gridTemplateRows: "auto auto", gap: 16 }}>
          {[
            { title: "Puyo Game", desc: "Next.js × React でゲームロジックを実証。インタラクティブな落ちものゲームのプロトタイプ。", tech: ["Next.js", "React", "TypeScript"], color: "#00f3ff", icon: "🎮", span: true },
            { title: "SNS自動生成", desc: "Claude API × AI 投稿生成ツール。美容サロン向けに投稿を自動生成。", tech: ["Claude API", "Anthropic"], color: "#b000ff", icon: "🤖", span: false },
            { title: "顧客管理 AI Dashboard", desc: "顧客データ可視化・来店予測・リピート促進を自動化。", tech: ["React", "Claude API", "Vercel"], color: "#ff00ff", icon: "📊", span: false },
          ].map((p) => (
            <div key={p.title} style={{
              gridColumn: p.span ? "1" : "2",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${p.color}22`,
              borderRadius: 16,
              overflow: "hidden",
            }}>
              <div style={{ background: `linear-gradient(135deg, ${p.color}15, transparent)`, padding: "40px 0", textAlign: "center", fontSize: 56 }}>{p.icon}</div>
              <div style={{ padding: 24 }}>
                <h3 style={{ color: p.color, marginBottom: 8, fontSize: 18 }}>{p.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ padding: "3px 10px", borderRadius: 4, fontSize: 11, background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}30` }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <a href="#" style={{ padding: "6px 14px", fontSize: 11, borderRadius: 6, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none" }}>⌥ GitHub</a>
                  <a href="#" style={{ padding: "6px 14px", fontSize: 11, borderRadius: 6, background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}40`, textDecoration: "none" }}>▶ Demo</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: "80px 40px", borderBottom: "1px solid rgba(255,255,255,0.05)", maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ color: "#b000ff", fontSize: 11, letterSpacing: 4, marginBottom: 8 }}>ABOUT ME</p>
        <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 32 }}><span style={{ color: "#b000ff" }}>自己</span>紹介</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(176,0,255,0.2)", borderRadius: 16, padding: 28 }}>
            {["美容業界に特化したAI自動化エンジニアです。サロン・クリニックの業務効率化を最新のAI技術で実現します。", "Claude APIを活用したSNS投稿自動生成・顧客分析ダッシュボードなど、美容ビジネスの課題を解決します。", "Next.js・TypeScript・TailwindCSSをメインスタックとし、Vercelによる高速デプロイを実現します。"].map((t, i) => (
              <p key={i} style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.8, marginBottom: 12 }}>{t}</p>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["🤖", "AI自動化", "Claude APIで業務を効率化"], ["💄", "美容×Tech", "業界特化ソリューション"], ["⚡", "高速開発", "Next.js × TypeScript"], ["🌐", "クラウド展開", "Vercelでゼロコンフィグ"]].map(([icon, label, desc]) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,243,255,0.1)", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <div style={{ color: "#00f3ff", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{label}</div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ padding: "80px 40px", borderBottom: "1px solid rgba(255,255,255,0.05)", maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ color: "#ff00ff", fontSize: 11, letterSpacing: 4, textAlign: "center", marginBottom: 8 }}>TECH STACK</p>
        <h2 style={{ textAlign: "center", fontSize: 40, fontWeight: 800, marginBottom: 48 }}><span style={{ color: "#ff00ff" }}>スキル</span>セット</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {[
            { name: "AI / ML", color: "#b000ff", icon: "🧠", skills: ["Claude API", "Anthropic SDK", "プロンプトエンジニアリング", "AI自動化"] },
            { name: "Frontend", color: "#00f3ff", icon: "⚛️", skills: ["Next.js", "React", "TypeScript", "JavaScript"] },
            { name: "Styling", color: "#ff00ff", icon: "🎨", skills: ["Tailwind CSS", "Glassmorphism", "CSS Animation", "Responsive"] },
            { name: "Tools", color: "#00f3ff", icon: "🛠️", skills: ["Git", "GitHub", "Vercel", "VS Code"] },
          ].map(cat => (
            <div key={cat.name} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${cat.color}22`, borderRadius: 16, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 22 }}>{cat.icon}</span>
                <span style={{ color: cat.color, fontWeight: 700, fontSize: 12, letterSpacing: 2 }}>{cat.name}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {cat.skills.map(s => (
                  <span key={s} style={{ padding: "8px 12px", borderRadius: 8, fontSize: 12, background: `${cat.color}10`, color: "rgba(255,255,255,0.8)", border: `1px solid ${cat.color}20`, textAlign: "center" }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "80px 40px", textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
        <p style={{ color: "#00f3ff", fontSize: 11, letterSpacing: 4, marginBottom: 8 }}>CONTACT</p>
        <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 12 }}>お気軽に<span style={{ color: "#00f3ff" }}>ご連絡を</span></h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 48 }}>AI自動化・美容Techに関するご相談はいつでもどうぞ</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 48 }}>
          {[
            { icon: "✉️", label: "Email", value: "sixmnr1146@gmail.com", color: "#00f3ff" },
            { icon: "⌥", label: "GitHub", value: "github.com", color: "#b000ff" },
            { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/", color: "#ff00ff" },
          ].map(c => (
            <div key={c.label} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${c.color}22`, borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{c.icon}</div>
              <div style={{ color: c.color, fontWeight: 700, fontSize: 13, marginBottom: 6, letterSpacing: 2 }}>{c.label}</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>{c.value}</div>
            </div>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11 }}>© 2026 AI Beauty Portfolio — Built with Next.js × TailwindCSS</p>
      </section>

    </div>
  );
}
