# React Native アプリ実装 TODO

## Phase 1: ビルド設定の統一
- [x] build.gradle の applicationId を `com.ateliersix.writer` に統一
- [x] iOS Xcode の Bundle Identifier を `com.ateliersix.writer` に統一
- [x] app.json の設定を確認・統一

## Phase 2: 依存関係の追加
- [x] @trpc/client をインストール
- [x] @tanstack/react-query をインストール
- [x] react-native-webview をインストール（OAuth用）
- [x] @react-native-async-storage/async-storage をインストール
- [x] axios または fetch-based HTTP クライアント

## Phase 3: 認証フロー実装
- [x] OAuth コンテキスト作成
- [x] WebView ベースの OAuth フロー実装
- [x] トークン保存・復元
- [x] ログイン画面作成
- [x] 保護されたルート実装

## Phase 4: tRPC クライアント統合
- [x] tRPC クライアント設定
- [x] React Query 統合
- [x] API ベース URL 設定
- [x] 認証ヘッダー追加

## Phase 5: 原稿生成機能実装
- [x] CreateScreen フォーム入力の修正（配列型フィールド対応）
- [x] article.generate API 呼び出し実装
- [x] 生成結果画面の実装
- [x] エラーハンドリング

## Phase 6: データ永続化
- [x] AsyncStorage 統合
- [x] ユーザー情報の保存
- [x] 生成履歴の保存
- [x] 設定情報の保存

## Phase 7: 機能テスト
- [x] ログイン・ログアウト動作確認
- [x] 原稿生成フロー確認
- [x] データ永続化確認
- [x] エラーケース確認

## Phase 8: ビルド・デプロイ
- [ ] Android APK ビルド
- [ ] iOS IPA ビルド
- [ ] Google Play 登録準備
- [ ] App Store 登録準備
