# atelier six. Writer - React Native Mobile App

**AI 搭載の美容室向け原稿自動生成 SaaS のモバイルアプリ**

![React Native](https://img.shields.io/badge/React%20Native-0.85.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![tRPC](https://img.shields.io/badge/tRPC-11-purple)
![React Query](https://img.shields.io/badge/React%20Query-5-green)
![License](https://img.shields.io/badge/License-Proprietary-red)

---

## 📱 概要

atelier six. Writer は、美容室スタッフが顧客の施術情報を入力するだけで、Claude AI が自動的に SNS 投稿やブログ記事を生成するモバイルアプリです。

**主な特徴:**
- ✨ **AI 自動生成**: Claude API を活用した高品質な原稿生成
- 📱 **モバイルファースト**: iOS・Android 両対応
- 🔐 **セキュア認証**: Manus OAuth による安全なログイン
- 💾 **オフライン対応**: AsyncStorage によるローカル保存
- 🎨 **直感的な UI**: 7ステップのガイド付きフォーム

---

## 🎯 主な機能

### 1. **ホーム画面**
- アプリの概要紹介
- 料金プラン表示
- お客様の声

### 2. **ダッシュボード**
- 月間利用状況の表示
- 生成回数の進捗
- 最近の原稿一覧

### 3. **原稿生成**
7ステップのフォームで顧客情報を入力：
1. お客様情報（年代、来店頻度）
2. 髪の悩み（複数入力可）
3. 施術内容（複数入力可）
4. 仕上がりの反応
5. スタッフ所感
6. お客様の声
7. 長期ゴール

**生成される原稿:**
- ブログ記事
- Instagram 投稿
- X（Twitter）短文・長文
- ホットペッパービューティー 投稿

### 4. **履歴管理**
- 生成済み原稿の一覧表示
- フィルタ機能（すべて・生成済み・下書き）
- 削除機能

### 5. **設定**
- 店舗情報の編集
- プラン確認
- 利用状況の表示
- ログアウト

---

## 🏗️ 技術スタック

### フロントエンド
- **React Native**: 0.85.2
- **TypeScript**: 5.0
- **React Navigation**: ボトムタブナビゲーション
- **React Query**: @tanstack/react-query 5.0
- **tRPC**: 11.0（型安全な API 通信）

### 認証・ストレージ
- **Manus OAuth**: WebView ベースの認証
- **AsyncStorage**: ローカルデータ永続化
- **react-native-webview**: OAuth フロー実装

### ビルド・デプロイ
- **Gradle**: 8.13（Android）
- **Xcode**: 15.0+（iOS）
- **Java**: 17+（Android ビルド）

---

## 📦 インストール

### 前提条件
- Node.js 18.x 以上
- npm または yarn
- Android ビルド: Java 17+, Android SDK, NDK
- iOS ビルド: macOS, Xcode 15.0+

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/your-username/atelier-six-writer.git
cd atelier-six-writer

# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.example .env
# .env ファイルを編集して必要な値を設定
```

---

## 🚀 開発

### Metro バンドラーの起動

```bash
npm start
```

### Android エミュレーターで実行

```bash
npm run android
```

### iOS シミュレーターで実行（macOS）

```bash
npm run ios
```

### Linting

```bash
npm run lint
```

---

## 📱 ビルド

詳細なビルド手順は [BUILD_GUIDE.md](./BUILD_GUIDE.md) を参照してください。

### Android リリースビルド

```bash
cd android
./gradlew assembleRelease
```

### iOS リリースビルド（macOS）

```bash
cd ios
pod install
cd ..
xcodebuild -workspace ios/atelierSixApp.xcworkspace \
  -scheme atelierSixApp \
  -configuration Release \
  -archivePath build/atelierSixApp.xcarchive \
  archive
```

---

## 🔧 環境変数

`.env` ファイルで以下の環境変数を設定してください：

```bash
# バックエンド API のベース URL
VITE_BACKEND_URL=http://localhost:3000

# Manus OAuth アプリケーション ID
VITE_APP_ID=your-manus-oauth-app-id

# Manus OAuth ポータル URL
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
```

---

## 📁 プロジェクト構成

```
atelierSixApp/
├── App.tsx                    # メインエントリーポイント
├── app.json                   # React Native 設定
├── package.json               # 依存関係
├── tsconfig.json              # TypeScript 設定
├── .eslintrc.js               # ESLint 設定
│
├── contexts/
│   └── AuthContext.tsx        # 認証状態管理
│
├── lib/
│   └── trpc.ts               # tRPC クライアント設定
│
├── screens/
│   ├── HomeScreen.tsx         # ホーム画面
│   ├── DashboardScreen.tsx    # ダッシュボード
│   ├── CreateScreen.tsx       # 原稿生成画面
│   ├── HistoryScreen.tsx      # 履歴画面
│   ├── SettingsScreen.tsx     # 設定画面
│   └── LoginScreen.tsx        # ログイン画面
│
├── android/
│   ├── app/
│   │   ├── build.gradle       # Android ビルド設定
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   └── java/com/ateliersix/writer/
│   │   │       ├── MainActivity.kt
│   │   │       └── MainApplication.kt
│   │   └── ateliersix-release.keystore
│   ├── gradle/
│   │   └── wrapper/
│   │       └── gradle-wrapper.properties
│   └── settings.gradle
│
├── ios/
│   ├── atelierSixApp/
│   │   ├── Info.plist
│   │   └── ...
│   ├── atelierSixApp.xcodeproj
│   ├── Podfile
│   └── Podfile.lock
│
└── docs/
    ├── BUILD_GUIDE.md         # ビルドガイド
    └── README.md              # このファイル
```

---

## 🔐 セキュリティ

- **OAuth 認証**: Manus OAuth で安全なログイン
- **トークン保存**: AsyncStorage に暗号化して保存
- **HTTPS 通信**: すべての API 通信は HTTPS
- **環境変数**: 機密情報は環境変数で管理

---

## 🐛 トラブルシューティング

### よくある問題と解決方法

#### Metro bundler が起動しない
```bash
npm start -- --reset-cache
```

#### モジュールが見つからない
```bash
rm -rf node_modules
npm install
```

#### Android ビルドが失敗する
```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

詳細は [BUILD_GUIDE.md](./BUILD_GUIDE.md#-トラブルシューティング) を参照してください。

---

## 📊 プロジェクト統計

| 項目 | 数値 |
|------|------|
| 実装画面数 | 6 |
| TypeScript ファイル | 10+ |
| 依存パッケージ | 50+ |
| コード行数 | 3000+ |
| 実装期間 | 1 日 |

---

## 🎓 学習リソース

- [React Native ドキュメント](https://reactnative.dev)
- [tRPC ドキュメント](https://trpc.io)
- [React Query ドキュメント](https://tanstack.com/query)
- [TypeScript ハンドブック](https://www.typescriptlang.org/docs)

---

## 📝 ライセンス

このプロジェクトは atelier six. の内部プロジェクトです。無許可での複製・配布は禁止されています。

---

## 👥 開発チーム

- **開発**: atelier six. Development Team
- **デザイン**: atelier six. Design Team
- **PM**: atelier six. Product Team

---

## 📞 サポート

問題が発生した場合は、GitHub Issues で報告してください。

---

**最終更新**: 2026年5月2日

**バージョン**: 1.0.0
