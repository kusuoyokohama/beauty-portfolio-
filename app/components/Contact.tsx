"use client";
import { useState } from "react";
import { useInView } from "../hooks/useInView";

const contacts = [
  { icon:"✉️", label:"Email",    value:"sixmnr1146@gmail.com", href:"mailto:sixmnr1146@gmail.com", accent:"#7aad89" },
  { icon:"⌥",  label:"GitHub",   value:"github.com",           href:"https://github.com",           accent:"#4a7c59" },
  { icon:"💼", label:"LinkedIn", value:"linkedin.com/in/",     href:"https://linkedin.com",          accent:"#c8b89a" },
];

export default function Contact() {
  const { ref, inView } = useInView<HTMLElement>();
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" ref={ref} className="relative py-28 px-6 overflow-hidden"
      style={{ background:"#2c2a26" }}>
      <div className="absolute inset-0 grid-faint opacity-30" />
      <div className="organic-glow" style={{ width:600,height:600,top:"-20%",left:"50%",
        transform:"translateX(-50%)",
        background:"radial-gradient(ellipse,rgba(74,124,89,0.13) 0%,transparent 60%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* ヘッダー */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
          <span className="section-label block mb-4" style={{ color:"#7aad89" }}>CONTACT</span>
          <h2 style={{ fontFamily:"var(--font-display,Georgia,serif)",
            fontSize:"clamp(2rem,4.5vw,3.2rem)",fontWeight:700,color:"#faf9f6",
            marginBottom:"12px",lineHeight:1.15 }}>
            お気軽に<span style={{ color:"#7aad89" }}>ご連絡を</span>
          </h2>
          <p style={{ fontSize:"0.88rem",color:"rgba(250,249,246,0.5)",lineHeight:1.8 }}>
            AI自動化・美容Techに関するご相談はいつでもどうぞ。初回相談は無料です。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* お問い合わせフォーム */}
          <div
            className={`transition-all duration-700 ${inView?"opacity-100 translate-x-0":"opacity-0 -translate-x-8"}`}
            style={{ transitionDelay:"0.15s" }}
          >
            <div className="glass-deep rounded-2xl p-8" style={{ borderRadius:"20px",
              border:"1px solid rgba(200,184,154,0.14)" }}>
              <h3 style={{ fontFamily:"var(--font-display,Georgia,serif)",fontSize:"1.2rem",
                fontWeight:600,color:"#faf9f6",marginBottom:"24px" }}>
                メッセージを送る
              </h3>

              {sent ? (
                <div style={{ textAlign:"center",padding:"40px 0" }}>
                  <div style={{ fontSize:"2.5rem",marginBottom:"12px" }}>🌿</div>
                  <p style={{ color:"#7aad89",fontSize:"0.9rem",fontFamily:"var(--font-display,Georgia,serif)",
                    fontWeight:600 }}>送信しました。ありがとうございます。</p>
                  <p style={{ color:"rgba(250,249,246,0.4)",fontSize:"0.78rem",marginTop:"6px" }}>
                    2営業日以内にご返信いたします。
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display:"flex",flexDirection:"column",gap:"16px" }}>
                  {[
                    { id:"name",    label:"お名前",         type:"text",     placeholder:"山田 花子" },
                    { id:"email",   label:"メールアドレス", type:"email",    placeholder:"your@email.com" },
                  ].map(f => (
                    <div key={f.id}>
                      <label style={{ display:"block",fontFamily:"var(--font-code,monospace)",
                        fontSize:"0.62rem",color:"#7aad89",letterSpacing:"0.15em",marginBottom:"6px" }}>
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        required
                        placeholder={f.placeholder}
                        value={form[f.id as keyof typeof form]}
                        onChange={e => setForm(p=>({...p,[f.id]:e.target.value}))}
                        style={{ width:"100%",background:"rgba(255,255,255,0.05)",
                          border:"1px solid rgba(200,184,154,0.2)",borderRadius:8,
                          padding:"10px 14px",color:"#faf9f6",fontSize:"0.88rem",outline:"none",
                          fontFamily:"var(--font-body,Inter,sans-serif)" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display:"block",fontFamily:"var(--font-code,monospace)",
                      fontSize:"0.62rem",color:"#7aad89",letterSpacing:"0.15em",marginBottom:"6px" }}>
                      メッセージ
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="ご相談内容をお聞かせください"
                      value={form.message}
                      onChange={e => setForm(p=>({...p,message:e.target.value}))}
                      style={{ width:"100%",background:"rgba(255,255,255,0.05)",
                        border:"1px solid rgba(200,184,154,0.2)",borderRadius:8,
                        padding:"10px 14px",color:"#faf9f6",fontSize:"0.88rem",outline:"none",
                        resize:"vertical",fontFamily:"var(--font-body,Inter,sans-serif)" }}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width:"100%",
                    justifyContent:"center",marginTop:"4px" }}>
                    送信する →
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* コンタクトリンク */}
          <div
            className={`flex flex-col gap-4 justify-center transition-all duration-700
              ${inView?"opacity-100 translate-x-0":"opacity-0 translate-x-8"}`}
            style={{ transitionDelay:"0.28s" }}
          >
            {contacts.map(c => (
              <a key={c.label} href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="glass-deep card-hover flex items-center gap-5 p-6 rounded-2xl"
                style={{ textDecoration:"none",borderRadius:"16px",
                  border:`1px solid ${c.accent}22`,transition:"all 0.35s var(--ease-out-expo)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=`${c.accent}55`;
                  (e.currentTarget as HTMLElement).style.background=`rgba(74,124,89,0.08)`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor=`${c.accent}22`;
                  (e.currentTarget as HTMLElement).style.background="rgba(44,42,38,0.72)"; }}>
                <span style={{ fontSize:"2rem",flexShrink:0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontFamily:"var(--font-code,monospace)",fontSize:"0.6rem",
                    color:c.accent,letterSpacing:"0.22em",marginBottom:"4px" }}>{c.label}</div>
                  <div style={{ fontSize:"0.82rem",color:"rgba(250,249,246,0.55)" }}>{c.value}</div>
                </div>
              </a>
            ))}

            {/* 補足テキスト */}
            <p style={{ fontSize:"0.78rem",color:"rgba(250,249,246,0.3)",lineHeight:1.7,
              marginTop:"8px",paddingLeft:"2px" }}>
              お返事は通常2営業日以内。<br />
              急ぎの場合はメールへ直接ご連絡ください。
            </p>
          </div>
        </div>

        {/* フッター */}
        <div style={{ marginTop:"60px",paddingTop:"24px",borderTop:"1px solid rgba(250,249,246,0.08)",
          textAlign:"center" }}>
          <p style={{ fontFamily:"var(--font-code,monospace)",fontSize:"0.62rem",
            color:"rgba(250,249,246,0.22)",letterSpacing:"0.08em" }}>
            © 2026 Beauty × AI Consulting — Built with Next.js × Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
}
