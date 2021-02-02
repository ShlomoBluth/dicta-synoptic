///<reference types="cypress"/>

//const neatCSV = require('neat-csv')
const path = require('path')

//run basic tests on synoptic
describe('basicTests',()=>{

    const downloadsFolder = 'cypress/downloads'

    beforeEach(() => {
        cy.visit('https://synoptic.dicta.org.il/')
    })

    // const validateExcelFile = () => {
    //     const downloadedFilename = path.join(downloadsFolder, 'snaked_res.xlsx')
    
    //     //ensure the file has been saved before trying to parse it
    //     cy.readFile(downloadedFilename, 'binary', { timeout: 60000 })
    //     .should((buffer) => {
    //       // by having length assertion we ensure the file has text
    //       // since we don't know when the browser finishes writing it to disk
    
    //       // Tip: use expect() form to avoid dumping binary contents
    //       // of the buffer into the Command Log
    //       expect(buffer.length).to.be.gt(100)
    //     })
    
    //     cy.log('**the file exists**')
    
        
    //     // the first utility library we use to parse Excel files
    //     // only works in Node, thus we can read and parse
    //     // the downloaded file using cy.task
    //     cy.task('readExcelFile', downloadedFilename)
    //     // returns an array of lines read from Excel file
    //     .should('have.length', 4873)
    //     .then((list) => {
    //       expect(list[0], 'header line').to.deep.equal([
    //         "חולין",
    //         "מתני'‏",
    //         "<big><strong>הכל</strong></big>",
    //         "שוחטין",
    //         "ושחיטתן",
    //         "כשרה",
    //         "חוץ",
    //         "מחרש",
    //         "שוטה",
    //         "וקטן",
    //         "שמא"
    //       ])
    //     })
    //   }

    it('Synoptic run in hebrew mode',()=>{
        cy.synopticRun('Hebrew')
        cy.get('[class*="spinner"]',{timeout:1000*60*4}).should('not.exist')
        cy.get('#tableBody > :nth-child(3)').within(()=>{
            cy.get(':nth-child(2)').should('contain','מסכת')
            cy.get(':nth-child(3)').should('contain','מסכת:תמיד')
        })
    })

    it('Synoptic run in english mode',()=>{
        cy.synopticRun('English')
        cy.get('[class*="spinner"]',{timeout:1000*60*4}).should('not.exist')
        cy.get('#tableBody > :nth-child(3)').within(()=>{
            cy.get(':nth-child(2)').should('contain','מסכת')
            cy.get(':nth-child(3)').should('contain','מסכת:תמיד')
        })
    })

    // it('Synoptic run in english mode',()=>{
    //     cy.setLanguageMode('Hebrew')
    //     cy.get('#btn-radios-1 > :nth-child(2)').click()
    //     cy.get('input[type="file"]').attachFile('res.xlsx')
    //     cy.get('.px-4 > .btn').click()
    //     //cy.get('[class*="spinner"]',{timeout:1000*60}).should('not.exist')
    //     validateExcelFile()
    // })
})