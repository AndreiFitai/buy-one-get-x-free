module.exports = {
  env: {
    node: true,
    es2021: true,
    mocha: true,
  },
  extends: ["airbnb-base", "eslint-config-prettier"],
  plugins: ["eslint-plugin-prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
  },
};
