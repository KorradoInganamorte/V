// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

const imports = require("eslint-plugin-import")
const tailwindcss = require("eslint-plugin-tailwindcss")

module.exports = defineConfig([
  expoConfig,
  {
    plugins: {
      tailwindcss,
      imports,
    },
    rules: {
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
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
              pattern: "react-native-*",
              group: "builtin",
              position: "after",
            },
            {
              pattern: "@react-native/**",
              group: "builtin",
              position: "after",
            },
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
      'tailwindcss/classnames-order': ['warn', {
        classGroups: [
          ['static', 'fixed', 'absolute', 'relative', 'sticky'],
          ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'contents', 'hidden'],
          ['h-\\S+', 'min-h-\\S+', 'max-h-\\S+'],
          ['w-\\S+', 'min-w-\\S+', 'max-w-\\S+'],
          'others',
        ]
       }]
    },
    ignores: ["dist/*"],
  },
]);
