/// <reference types="cypress" />
/* eslint-disable no-console */
const readXlsxFile = require('read-excel-file/node')
// const AdmZip = require('adm-zip')
// const { stripIndent } = require('common-tags')
// const globby = require('globby')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // register utility tasks to read and parse Excel files
  on('task', {
    readExcelFile (filename) {
      // we must read the Excel file using Node library
      // and can return the parsed list to the browser
      // for the spec code to validate it
      console.log('reading Excel file %s', filename)
      console.log('from cwd %s', process.cwd())
      return readXlsxFile(filename)
    },

  })
}
