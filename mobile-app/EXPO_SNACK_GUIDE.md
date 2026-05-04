# Expo Snack でのプレビュー方法

このガイドでは、Expo Snack を使用して atelier six. Writer アプリをブラウザでプレビューする方法を説明します。

## 🎯 Expo Snack とは

**Expo Snack** は、Web ブラウザで React Native アプリを実行・プレビューできるオンラインエディタです。インストール不要で、すぐにアプリを試すことができます。

- **URL**: https://snack.expo.dev
- **特徴**: リアルタイムプレビュー、QR コードでモバイル実機確認可能

---

## 📱 プレビュー方法

### 方法 1: コードをコピー＆ペースト（最も簡単）

1. **Expo Snack にアクセス**
   - https://snack.expo.dev を開く

2. **snack-app.tsx をコピー**
   ```bash
   cat /home/ubuntu/atelierSixApp/snack-app.tsx
   ```

3. **Snack のエディタに貼り付け**
   - 左側のコードエディタをすべて選択（Ctrl+A）
   - `snack-app.tsx` の内容を貼り付け

4. **プレビュー確認**
   - 右側に iOS/Android のプレビューが表示されます
   - 各タブをクリックして画面を切り替え

### 方法 2: GitHub からインポート

1. **このリポジトリを GitHub にプッシュ**
   ```bash
   cd /home/ubuntu/beauty-portfolio-
   git push origin main
   ```

2. **Snack で GitHub リポジトリをインポート**
   - Expo Snack にアクセス
   - File → Open from GitHub
   - `kusuoyokohama/beauty-portfolio-` を入力
   - `mobile-app/snack-app.tsx` を選択

3. **プレビュー確認**

---

## 🎨 アプリの機能

### 画面構成（5 つのタブ）

#### 1. **ホーム画面**
- アプリの概要紹介
- 主な機能の説明
- 料金プラン表示

#### 2. **ダッシュボード**
- 月間利用状況の表示
- 生成回数の進捗バー
- 最近の原稿一覧

#### 3. **原稿生成**
- 7 ステップのフォーム
- プログレスバー表示
- 各ステップで情報入力

#### 4. **履歴**
- 生成済み原稿の一覧
- フィルタ機能（すべて・生成済み・下書き）
- ステータスバッジ表示

#### 5. **設定**
- 店舗情報編集
- プラン情報表示
- ログアウト機能

---

## 🔄 リアルタイム編集

Expo Snack ではコードを編集すると、リアルタイムでプレビューが更新されます：

1. **コードを編集**
   - 左側のエディタでコードを変更

2. **プレビューが自動更新**
   - 右側のプレビューが即座に反映

3. **エラーが発生した場合**
   - 下部のエラーパネルに詳細が表示されます

---

## 📱 モバイル実機での確認

Expo Snack では、QR コードを使用してモバイル実機でプレビューできます：

1. **Expo アプリをインストール**
   - iOS: App Store で「Expo Go」をインストール
   - Android: Google Play で「Expo Go」をインストール

2. **QR コードをスキャン**
   - Snack の右上に QR コードが表示されます
   - Expo Go アプリでスキャン

3. **リアルタイムプレビュー**
   - モバイル実機でアプリが起動
   - コード編集が即座に反映

---

## 💡 カスタマイズ方法

### 色を変更する

`styles` オブジェクト内の色値を変更：

```typescript
// 例：メインカラーを変更
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6366f1', // ← この値を変更
  },
});
```

### テキストを変更する

各画面コンポーネント内のテキストを編集：

```typescript
<Text style={styles.heroTitle}>atelier six. Writer</Text>
// ↓
<Text style={styles.heroTitle}>あなたのアプリ名</Text>
```

### 新しい画面を追加する

1. **新しいコンポーネント関数を作成**
   ```typescript
   const NewScreen = () => (
     <View>
       <Text>新しい画面</Text>
     </View>
   );
   ```

2. **Tab.Screen を追加**
   ```typescript
   <Tab.Screen
     name="New"
     component={NewScreen}
     options={{ title: '新規' }}
   />
   ```

---

## 🚀 本番環境での実行

Snack でのプレビューは開発用です。本番環境では、ユーザーの環境で以下を実行してください：

```bash
cd mobile-app
npm install
npm start
npm run android    # または npm run ios
```

詳細は [BUILD_GUIDE.md](./BUILD_GUIDE.md) を参照してください。

---

## 🐛 トラブルシューティング

### プレビューが表示されない

1. **ページをリロード**
   - ブラウザを F5 でリロード

2. **キャッシュをクリア**
   - ブラウザのキャッシュをクリア
   - 再度アクセス

### QR コードがスキャンできない

1. **Expo Go アプリが最新版か確認**
   - App Store / Google Play で更新

2. **ネットワーク接続を確認**
   - デバイスが同じ Wi-Fi に接続しているか確認

### エラーが表示される

1. **エラーメッセージを確認**
   - 下部のエラーパネルに詳細が表示されます

2. **コードをリセット**
   - File → Reset Snack

---

## 📚 参考リンク

- **Expo Snack**: https://snack.expo.dev
- **React Native ドキュメント**: https://reactnative.dev
- **Expo ドキュメント**: https://docs.expo.dev

---

**楽しい開発を！** 🎉
