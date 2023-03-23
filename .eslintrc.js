/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node'],
  rules: {
    // Add your own custom rules here
  },
  ignorePatterns: ['build', 'node_modules', 'api'],
}
