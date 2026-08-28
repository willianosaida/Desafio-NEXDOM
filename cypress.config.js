const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://nexdom.tec.br',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    defaultCommandTimeout: 10000
  },
  env: {
    githubApiUrl: 'https://api.github.com'
  }
});
