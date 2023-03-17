/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */
const eslintConfig = {
  parser: "@typescript-eslint/parser",
  plugins: ["@emotion", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  env: {
    browser: true,
    node: true,
    es2020: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "warn",
    "@emotion/pkg-renaming": "error",
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
        "newlines-between": "always",
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      // 「_」を変数名につけた場合は、変数を使用していないよって警告を出さない
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
    // Propsのソート
    "react/jsx-sort-props": "warn",
  },
  overrides: [
    {
      // tsxとcodegenで生成したコード内ではempty objectなtypeを許容する
      // https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
      files: ["*.tsx", "*.generated.ts"],
      rules: {
        "@typescript-eslint/ban-types": [
          "error",
          {
            extendDefaults: true,
            types: {
              "{}": false,
            },
          },
        ],
      },
    },
  ],
};

module.exports = eslintConfig;
