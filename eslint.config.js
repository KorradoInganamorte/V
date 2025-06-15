// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // react, react-native, @react-native, expo, expo-video, @expo
            "external", // внешние библиотеки
            "internal", // ваши алиасы, если есть
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            // Сначала react, react-native, @react-native/**
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "react-native",
              group: "builtin",
              position: "after",
            },
            {
              pattern: "@react-native/**",
              group: "builtin",
              position: "after",
            },
            // Затем expo, expo-*, @expo/**
            {
              pattern: "expo",
              group: "builtin",
              position: "after",
            },
            {
              pattern: "expo-*",
              group: "builtin",
              position: "after",
            },
            {
              pattern: "@expo/**",
              group: "builtin",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react", "react-native", "@react-native/**", "expo", "expo-*", "@expo/**"],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "ignore",
        },
      ],
    },
    ignores: ["dist/*"],
  },
]);
