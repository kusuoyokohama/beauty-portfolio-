export default {
  expo: {
    name: "atelier six. Writer",
    slug: "atelier-six-writer",
    version: "1.0.0",
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTabletMode: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro",
    },
    plugins: [
      [
        "expo-splash-screen",
        {
          image: "./assets/splash.png",
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
  },
};
