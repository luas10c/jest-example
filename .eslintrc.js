module.exports = {
  env: {
    node: true,
    es2020: true,
    jest: true
  },
  extends: ['prettier'],
  plugins: ['prettier'],
  overrides: [
    {
      files: ['tests/**'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended']
    }
  ],
  rules: {
    'prettier/prettier': 'error'
  }
};
