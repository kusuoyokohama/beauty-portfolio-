"use client";
import { useState } from "react";
import { useInView } from "../hooks/useInView";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const works = [
  { id: 1,  image: "/works/image2.webp",  title: "AIコードレビュー",         desc: "Claude CodeでリアルタイムコードレビューをVSCode上で実施",             category: "AI",  size: "large",  result: "品質 +40%"   },
  { id: 2,  image: "/works/image3.webp",  title: "マルチパネルAI開発",       desc: "Claude Codeのcode-reviewer＆テスト自動生成をVSCodeで活用",           category: "AI",  size: "large",  result: "工数 −60%"   },
  { id: 3,  image: "/works/image10.webp", title: "マルチAIパイプライン",      desc: "analyzer→builder→reviewerの3SubAgent自律パイプライン構築",           category: "AI",  size: "large",  result: "完全自律化"   },
  { id: 4,  image: "/works/image11.webp", title: "build-and-reviewコマンド", desc: "分析→実装→検証の完全自律ワークフローをコマンド1発で実行",             category: "AI",  size: "large",  result: "3ステップ統合" },
  { id: 5,  image: "/works/image7.webp",  title: "ChatGPT会話ログ分析",      desc: "ChatGPT会話ログをClaudeで解析・アカウント統計を自動算出",             category: "AI",  size: "large",  result: "統計自動化"   },
  { id: 6,  image: "/works/image4.webp",  title: "カスタムスキル構築",        desc: "Claude CodeにカスタムSkillを実装しスキル自動移動を実現",               category: "AI",  size: "medium", result: "自動移動"     },
  { id: 7,  image: "/works/image5.webp",  title: "文字数カウントAI",          desc: "LLMトークン最適化のための文字数カウント専門エージェント",               category: "AI",  size: "medium", result: "最適化"       },
  { id: 8,  image: "/works/image8.webp",  title: "ファイル要約スキル",         desc: "file-summarizerスキルでMarkdown構造化要約を自動出力",                 category: "AI",  size: "medium", result: "自動要約"     },
  { id: 9,  image: "/works/image9.webp",  title: "SEO最適化要約AI",           desc: "file-summarizerにSEOキーワード最適化ステップを追加実装",               category: "AI",  size: "medium", result: "SEO強化"      },
  { id: 10, image: "/works/image12.webp", title: "builder-agent実装",         desc: "TypeScript静的検証ゼロエラー確認までAIが自律コーディング",             category: "AI",  size: "medium", result: "0エラー"      },
  { id: 11, image: "/works/image16.webp", title: "Googleスプレッド連携",      desc: "ClaudeがGoogleスプレッドシートを直接操作・データ入力を自動化",         category: "AI",  size: "medium", result: "入力自動化"   },
  { id: 12, image: "/works/image18.webp", title: "Claude in Chrome連携",      desc: "VSCodeターミナルとChromeをClaude Codeブリッジで統合制御",             category: "AI",  size: "medium", result: "統合制御"     },
  { id: 13, image: "/works/image14.webp", title: "Webスクレイピング自動化",   desc: "ClaudeがYahooニュース等を横断閲覧・情報収集を自動化",                 category: "Web", size: "medium", result: "収集自動化"   },
  { id: 14, image: "/works/image17.webp", title: "Webニュース自動収集",        desc: "Claude HaikuがYahooニュースをブラウザ操作でリアルタイム収集",         category: "Web", size: "medium", result: "リアルタイム"  },
  { id: 15, image: "/works/image19.webp", title: "多ソースニュース比較",       desc: "Claude Haikuが複数ニュースサイトを横断・トピック比較を自動生成",       category: "Web", size: "medium", result: "横断比較"     },
  { id: 16, image: "/works/image.webp",   title: "ぷよゲームGitHub公開",      desc: "Next.js製ぷよゲームをVercelにデプロイ・GitHub公開",                   category: "Web", size: "medium", result: "デプロイ完了"  },
  { id: 17, image: "/works/image15.webp", title: "Seleniumログイン自動化",    desc: "Selenium経由でログイン→安全区域アクセスを自動実行",                   category: "Web", size: "small",  result: "ログイン自動化" },
  { id: 18, image: "/works/image6.webp",  title: "会議テンプレ自動生成",      desc: "Claude Code Skillで会議議事録Markdownを即時生成",                     category: "AI",  size: "small",  result: "即時生成"     },
  { id: 19, image: "/works/image13.webp", title: "reviewer-agent検証",         desc: "3SubAgentパイプラインの分析→改善→検証レポートをモバイル表示",         category: "AI",  size: "small",  result: "検証完了"     },
];

const FILTERS = ["All", "AI", "Web"] as const;

function WorkCard({ w, delay, inView }: {
  w: typeof works[number];
  delay: string;
  inView: boolean;
}) {
  const isLarge = w.size === "large";

  return (
    <div
      className={`relative rounded-2xl overflow-hidden group transition-all duration-700
        ${isLarge ? "md:col-span-2 md:row-span-2" : ""}
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        transitionDelay: delay,
        /* アスペクト比で高さを自動計算（固定px廃止→レスポンシブ対応） */
        aspectRatio: isLarge ? "16/9" : "4/3",
      }}
    >
      {/* 実績画像 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE}${w.image}`}
        alt={w.title}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.19,1,0.22,1)" }}
        className="group-hover:scale-105"
      />

      {/* 結果バッジ（常時表示） */}
      <div className="absolute top-3 right-3 z-20"
        style={{ background: "rgba(250,249,246,0.92)", border: "1px solid rgba(74,124,89,0.35)",
          borderRadius: 6, padding: "3px 10px" }}>
        <span style={{ fontFamily: "var(--font-code,monospace)", fontSize: "0.6rem",
          color: "#4a7c59", letterSpacing: "0.06em" }}>{w.result}</span>
      </div>

      {/* ホバーオーバーレイ */}
      <div className="glass-photo absolute inset-0 z-10 flex flex-col justify-end p-5
        opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <span style={{ fontFamily: "var(--font-code,monospace)", fontSize: "0.6rem",
          color: "#7aad89", letterSpacing: "0.12em", marginBottom: 8 }}>{w.category}</span>
        <h3 style={{ fontFamily: "var(--font-display,Georgia,serif)",
          fontSize: isLarge ? "1.3rem" : "1rem", fontWeight: 700,
          color: "#faf9f6", marginBottom: 6, lineHeight: 1.3 }}>{w.title}</h3>
        <p style={{ fontSize: "0.75rem", color: "rgba(250,249,246,0.82)", lineHeight: 1.65,
          display: isLarge ? "block" : "-webkit-box",
          WebkitLineClamp: isLarge ? undefined : 2,
          WebkitBoxOrient: isLarge ? undefined : "vertical" as const,
          overflow: "hidden" }}>{w.desc}</p>
      </div>
    </div>
  );
}

export default function Works() {
  const [activeFilter, setActiveFilter] = useState<typeof FILTERS[number]>("All");
  const { ref, inView } = useInView<HTMLElement>();

  const filtered = activeFilter === "All" ? works : works.filter((w) => w.category === activeFilter);

  return (
    <section id="works" ref={ref} className="relative py-28 px-6" style={{ background: "#f3efe8" }}>
      <div className="organic-glow" style={{ width: 400, height: 400, top: "10%", right: "5%",
        background: "radial-gradient(ellipse,rgba(74,124,89,0.07) 0%,transparent 65%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className={`text-center mb-12 transition-all duration-700
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="section-label block mb-4">PROJECTS</span>
          <h2 style={{ fontFamily: "var(--font-display,Georgia,serif)",
            fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#2c2a26", marginBottom: 12 }}>
            制作<span style={{ color: "#4a7c59" }}>実績</span>
          </h2>
          <div className="divider-gold mx-auto" style={{ marginTop: 16 }} />
        </div>

        {/* フィルタータブ */}
        <div className={`flex justify-center gap-3 mb-10 transition-all duration-700
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "0.1s" }}>
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{
                padding: "7px 20px", borderRadius: 99, fontSize: "0.78rem",
                fontFamily: "var(--font-code,monospace)", letterSpacing: "0.06em",
                cursor: "pointer", transition: "all 0.25s ease", border: "1px solid",
                background: activeFilter === f ? "#4a7c59" : "rgba(250,249,246,0.7)",
                color: activeFilter === f ? "#faf9f6" : "#5c5752",
                borderColor: activeFilter === f ? "#4a7c59" : "rgba(200,184,154,0.4)",
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Bentoグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {filtered.map((w, i) => (
            <WorkCard key={w.id} w={w} inView={inView} delay={`${0.08 + i * 0.06}s`} />
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: "0.72rem",
          color: "#9b9490", fontFamily: "var(--font-code,monospace)", letterSpacing: "0.08em" }}>
          {filtered.length} PROJECTS
        </p>
      </div>
    </section>
  );
}
