

const { defineConfig } = require('cypress')
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')
const readXlsxFile = require('read-excel-file/node')


module.exports = defineConfig({
  videoe:true,
  projectId: 'x3jgv2',
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 30000*10,
  requestTimeout: 30000,
  pageLoadTimeout: 300000,
  experimentalFetchPolyfill: true,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'dicta-shared/reporter-config.json',
  },
  env: {
    DEV_URL: 'https://synoptic-dev--condescending-darwin-5b410d.netlify.app/',
    LIVE_URL: 'https://synoptic.dicta.org.il/',
    TOOL_TESTS: true,
    REQUESTS_TESTS: true,
    RECORD_KEY: 'c1c71d00-c206-4fa2-b4db-f76af85e322f',
    API_KEY: '2d3fa11eac4a5ebb6af11d8a190b771d0d034d50e318aa6a8f6604139ebffd61',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    // setupNodeEvents(on, config) {
    //   return require('./cypress/plugins/index.js')(on, config)
    // },
    baseUrl: 'https://synoptic-dev--condescending-darwin-5b410d.netlify.app/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      on('task', {downloadFile,
        readExcelFile (filename) {
        // we must read the Excel file using Node library
        // and can return the parsed list to the browser
        // for the spec code to validate it
        console.log('reading Excel file %s', filename)
        console.log('from cwd %s', process.cwd())
        return readXlsxFile(filename)
        },  
      })
    },
    // setupNodeEvents(on, config) {
      
    // }
  },
})




