"use client";
import { useState, useEffect } from "react";

const links = [
  { label: "Works",   href: "#works" },
  { label: "About",   href: "#about" },
  { label: "Skills",  href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 transition-all duration-500`}
      style={
        scrolled
          ? {
              background: "rgba(250,249,246,0.88)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(200,184,154,0.28)",
              boxShadow: "0 2px 16px rgba(44,42,38,0.06)",
            }
          : {}
      }
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* ロゴ */}
        <a href="#hero" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "var(--font-display, Georgia, serif)",
              fontSize: "1.2rem",
              fontWeight: 600,
              color: "#2d5a3d",
              letterSpacing: "0.02em",
            }}
          >
            Beauty
          </span>
          <span
            style={{
              fontFamily: "var(--font-code, monospace)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "#7aad89",
              paddingLeft: "4px",
              borderLeft: "1px solid rgba(74,124,89,0.35)",
            }}
          >
            × AI
          </span>
        </a>

        {/* ナビリンク（デスクトップ） */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontSize: "0.875rem",
                color: "#5c5752",
                textDecoration: "none",
                fontWeight: 400,
                letterSpacing: "0.01em",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4a7c59")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#5c5752")}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary" style={{ padding: "10px 20px", fontSize: "0.8rem" }}>
            相談する
          </a>
        </div>
      </div>
    </nav>
  );
}
