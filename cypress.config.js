const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'x3jgv2',
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 30000,
  experimentalFetchPolyfill: true,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'dicta-shared/reporter-config.json',
  },
  env: {
    DEV_URL: 'https://synoptic-dev--condescending-darwin-5b410d.netlify.app/',
    LIVE_URL: 'https://synoptic.dicta.org.il/',
    TOOL_TESTS: true,
    REQUESTS_TESTS: false,
    RECORD_KEY: 'c1c71d00-c206-4fa2-b4db-f76af85e322f',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://synoptic-dev--condescending-darwin-5b410d.netlify.app/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
