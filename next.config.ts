import type { NextConfig } from "next";

// GitHub Pages へのデプロイ時は NEXT_PUBLIC_BASE_PATH=/リポジトリ名 を設定する
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",        // 静的HTML生成
  trailingSlash: true,     // GitHub Pages でのルーティング対応
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,     // 静的エクスポートではNext.js画像最適化を無効化
  },
};

export default nextConfig;
