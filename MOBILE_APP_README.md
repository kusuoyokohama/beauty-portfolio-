# atelier six. Writer - React Native Mobile App

このディレクトリには、atelier six. Writer の React Native モバイルアプリケーションが含まれています。

## 📱 概要

**atelier six. Writer** は、美容室スタッフが顧客の施術情報を入力するだけで、Claude AI が自動的に SNS 投稿やブログ記事を生成するモバイルアプリです。

## 🎯 主な機能

- ✨ **AI 自動生成**: Claude API による高品質な原稿生成
- 📱 **クロスプラットフォーム**: iOS・Android 両対応
- 🔐 **セキュア認証**: Manus OAuth による安全なログイン
- 💾 **データ永続化**: AsyncStorage によるローカル保存
- 🎨 **直感的な UI**: 7ステップのガイド付きフォーム

## 📂 ディレクトリ構成

```
mobile-app/
├── README.md              # 詳細なプロジェクト説明
├── BUILD_GUIDE.md         # ビルド手順（Android・iOS）
├── .env.example           # 環境変数テンプレート
├── App.tsx                # メインエントリーポイント
├── app.json               # React Native 設定
├── package.json           # 依存関係
├── contexts/
│   └── AuthContext.tsx    # 認証状態管理
├── lib/
│   └── trpc.ts           # tRPC クライアント設定
├── screens/
│   ├── HomeScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── CreateScreen.tsx
│   ├── HistoryScreen.tsx
│   ├── SettingsScreen.tsx
│   └── LoginScreen.tsx
├── android/               # Android ビルド設定
└── ios/                   # iOS ビルド設定
```

## 🚀 クイックスタート

### 1. 依存関係をインストール

```bash
cd mobile-app
npm install
```

### 2. 環境変数を設定

```bash
cp .env.example .env
# .env ファイルを編集して Manus OAuth 情報を入力
```

### 3. 開発環境で実行

```bash
# Metro バンドラーを起動
npm start

# 別のターミナルで Android または iOS を実行
npm run android    # Android エミュレーター
npm run ios        # iOS シミュレーター（macOS のみ）
```

## 📱 ビルド

### Android リリースビルド

```bash
cd mobile-app/android
./gradlew assembleRelease
```

生成ファイル: `app/build/outputs/apk/release/app-release.apk`

### iOS リリースビルド（macOS のみ）

```bash
cd mobile-app/ios
pod install
cd ..
xcodebuild -workspace ios/atelierSixApp.xcworkspace \
  -scheme atelierSixApp \
  -configuration Release \
  -archivePath build/atelierSixApp.xcarchive \
  archive
```

## 📚 詳細ドキュメント

- **[README.md](./mobile-app/README.md)** - プロジェクト概要、機能説明、セットアップ手順
- **[BUILD_GUIDE.md](./mobile-app/BUILD_GUIDE.md)** - 詳細なビルド手順、トラブルシューティング

## 🔧 必要な環境

### 共通
- Node.js 18.x 以上
- npm または yarn

### Android ビルド
- Java 17 以上
- Android SDK (API Level 34+)
- Android NDK

### iOS ビルド（macOS のみ）
- Xcode 15.0 以上
- CocoaPods

## 🏗️ 技術スタック

- **React Native**: 0.85.2
- **TypeScript**: 5.0
- **tRPC**: 11.0（型安全な API 通信）
- **React Query**: @tanstack/react-query 5.0
- **Manus OAuth**: WebView ベースの認証
- **AsyncStorage**: ローカルデータ永続化

## 🐛 トラブルシューティング

### よくある問題

#### Metro bundler が起動しない
```bash
npm start -- --reset-cache
```

#### モジュールが見つからない
```bash
rm -rf node_modules
npm install
```

#### Android ビルドエラー
```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

詳細は [BUILD_GUIDE.md](./mobile-app/BUILD_GUIDE.md) を参照してください。

## 📊 プロジェクト統計

| 項目 | 数値 |
|------|------|
| 実装画面数 | 6 |
| TypeScript ファイル | 10+ |
| 依存パッケージ | 50+ |
| コード行数 | 3000+ |

## 📝 ライセンス

このプロジェクトは atelier six. の内部プロジェクトです。

---

**最終更新**: 2026年5月4日
