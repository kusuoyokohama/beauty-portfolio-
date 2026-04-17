import type { Config } from "tailwindcss";

// Tailwind CSS v4 では設定の大半を globals.css の @theme で管理します。
// このファイルはコンテンツパスの指定など最小限の用途のみ使用します。
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
};

export default config;
