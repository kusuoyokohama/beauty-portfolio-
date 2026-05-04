# atelier six. Writer - React Native App ビルドガイド

React Native で実装された atelier six. Writer モバイルアプリのビルド手順です。

## 📋 必要な環境

### 共通
- **Node.js**: 18.x 以上
- **npm** または **yarn**: 最新版
- **Git**: 最新版

### Android ビルド
- **Java Development Kit (JDK)**: 17 以上
- **Android SDK**: API Level 34 以上
- **Android NDK**: r25 以上
- **Gradle**: 8.13 以上（自動ダウンロード）

### iOS ビルド（macOS のみ）
- **Xcode**: 15.0 以上
- **CocoaPods**: 最新版
- **macOS**: 12.0 以上

---

## 🚀 セットアップ手順

### 1. リポジトリをクローン

```bash
git clone https://github.com/your-username/atelier-six-writer.git
cd atelier-six-writer
```

### 2. 依存関係をインストール

```bash
npm install
# または
yarn install
```

### 3. 環境変数を設定

`.env` ファイルを作成し、以下の環境変数を設定してください：

```bash
VITE_BACKEND_URL=http://localhost:3000
VITE_APP_ID=your-manus-oauth-app-id
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
```

---

## 📱 Android ビルド

### 前提条件の確認

```bash
# Java バージョン確認（17 以上が必須）
java -version

# Android SDK のインストール確認
echo $ANDROID_HOME
```

### デバッグビルド

```bash
cd android
./gradlew assembleDebug
```

生成されたファイル: `android/app/build/outputs/apk/debug/app-debug.apk`

### リリースビルド

```bash
cd android
./gradlew assembleRelease
```

生成されたファイル: `android/app/build/outputs/apk/release/app-release.apk`

### ビルドトラブルシューティング

#### Java バージョンエラー
```
Android Gradle plugin requires Java 17 to run. You are currently using Java 11.
```

**解決方法:**
```bash
# Java 17 をインストール（macOS）
brew install openjdk@17
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# Java 17 をインストール（Ubuntu/Debian）
sudo apt-get install openjdk-17-jdk

# Java 17 をインストール（Windows）
# https://www.oracle.com/java/technologies/downloads/#java17 からダウンロード
```

#### メモリ不足エラー
```bash
# gradle.properties で JVM メモリを増やす
echo "org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=1024m" >> android/gradle.properties
```

#### Gradle デーモンエラー
```bash
cd android
./gradlew --stop
./gradlew clean
./gradlew assembleRelease
```

---

## 🍎 iOS ビルド（macOS のみ）

### 前提条件の確認

```bash
# Xcode バージョン確認
xcode-select --version

# CocoaPods インストール確認
pod --version
```

### 依存関係のインストール

```bash
cd ios
pod install
cd ..
```

### デバッグビルド

```bash
xcodebuild -workspace ios/atelierSixApp.xcworkspace \
  -scheme atelierSixApp \
  -configuration Debug \
  -derivedDataPath build
```

### リリースビルド

```bash
xcodebuild -workspace ios/atelierSixApp.xcworkspace \
  -scheme atelierSixApp \
  -configuration Release \
  -derivedDataPath build
```

### IPA ファイル生成

```bash
xcodebuild -workspace ios/atelierSixApp.xcworkspace \
  -scheme atelierSixApp \
  -configuration Release \
  -derivedDataPath build \
  -archivePath build/atelierSixApp.xcarchive \
  archive

xcodebuild -exportArchive \
  -archivePath build/atelierSixApp.xcarchive \
  -exportOptionsPlist ios/ExportOptions.plist \
  -exportPath build/ipa
```

### ビルドトラブルシューティング

#### Pod インストールエラー
```bash
cd ios
rm -rf Pods
rm Podfile.lock
pod install
cd ..
```

#### Xcode コード署名エラー
```bash
# Xcode で手動で署名設定を確認
open ios/atelierSixApp.xcworkspace
```

---

## 📦 App Store / Google Play への提出

### Android（Google Play）

1. **署名キーの生成**
   ```bash
   keytool -genkey -v -keystore ateliersix-release.keystore \
     -keyalg RSA -keysize 2048 -validity 10000 \
     -alias ateliersix-key
   ```

2. **build.gradle で署名設定**
   ```gradle
   signingConfigs {
       release {
           storeFile file('ateliersix-release.keystore')
           storePassword 'your-password'
           keyAlias 'ateliersix-key'
           keyPassword 'your-password'
       }
   }
   ```

3. **リリースビルド**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

4. **Google Play Console にアップロード**
   - https://play.google.com/console にアクセス
   - `app-release.apk` をアップロード

### iOS（App Store）

1. **Apple Developer Account の登録**
   - https://developer.apple.com にアクセス

2. **Provisioning Profile の作成**
   - Xcode で自動署名を設定

3. **TestFlight へのアップロード**
   ```bash
   xcodebuild -workspace ios/atelierSixApp.xcworkspace \
     -scheme atelierSixApp \
     -configuration Release \
     -derivedDataPath build \
     -archivePath build/atelierSixApp.xcarchive \
     archive

   xcodebuild -exportArchive \
     -archivePath build/atelierSixApp.xcarchive \
     -exportOptionsPlist ios/ExportOptions.plist \
     -exportPath build/ipa
   ```

4. **Transporter で App Store に提出**
   - Mac App Store から Transporter をダウンロード
   - IPA ファイルをアップロード

---

## 🔧 開発環境のセットアップ

### Metro バンドラーの起動

```bash
npm start
# または
yarn start
```

### Android エミュレーターで実行

```bash
# 別のターミナルで
npm run android
# または
yarn android
```

### iOS シミュレーターで実行（macOS）

```bash
# 別のターミナルで
npm run ios
# または
yarn ios
```

---

## 📚 プロジェクト構成

```
atelierSixApp/
├── App.tsx                 # メインエントリーポイント
├── app.json               # React Native 設定
├── package.json           # 依存関係
├── contexts/
│   └── AuthContext.tsx    # 認証コンテキスト
├── lib/
│   └── trpc.ts           # tRPC クライアント設定
├── screens/
│   ├── HomeScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── CreateScreen.tsx
│   ├── HistoryScreen.tsx
│   ├── SettingsScreen.tsx
│   └── LoginScreen.tsx
├── android/
│   ├── app/
│   │   ├── build.gradle
│   │   └── src/main/java/com/ateliersix/writer/
│   └── gradle/wrapper/
│       └── gradle-wrapper.properties
├── ios/
│   ├── atelierSixApp.xcodeproj
│   ├── atelierSixApp/
│   └── Podfile
└── BUILD_GUIDE.md         # このファイル
```

---

## 🐛 トラブルシューティング

### よくある問題

#### 1. `Metro bundler` が起動しない
```bash
npm start -- --reset-cache
```

#### 2. モジュールが見つからない
```bash
rm -rf node_modules
npm install
```

#### 3. ネイティブモジュールのビルドエラー
```bash
# Android
cd android && ./gradlew clean && cd ..

# iOS
cd ios && rm -rf Pods && pod install && cd ..
```

#### 4. OAuth ログインが失敗する
- `VITE_BACKEND_URL` が正しく設定されているか確認
- バックエンドサーバーが起動しているか確認
- ファイアウォール設定を確認

---

## 📞 サポート

問題が発生した場合は、以下をご確認ください：

1. **Node.js バージョン**: `node --version` で 18.x 以上か確認
2. **Java バージョン**: `java -version` で 17 以上か確認（Android）
3. **Xcode バージョン**: `xcode-select --version` で 15.0 以上か確認（iOS）
4. **ネットワーク接続**: npm パッケージのダウンロードが可能か確認

---

## 📝 ライセンス

このプロジェクトは atelier six. の内部プロジェクトです。

---

**最終更新**: 2026年5月2日
