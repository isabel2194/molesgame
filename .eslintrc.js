module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended",
  "plugin:react/recommended",
  "plugin:prettier/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        ".eslintrc.{js,cjs}",
      ],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react","react-hooks"
  ],
  rules: {
    "no-unused-vars": "error",
    "no-console": "warn",
    "prettier/prettier": "error",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  settings:{
    react: {
      version: "detect",
    },
  },
};
