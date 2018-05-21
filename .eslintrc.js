module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'prettier'],
  parserOptions: {
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'no-console': 'off'
  }
};
