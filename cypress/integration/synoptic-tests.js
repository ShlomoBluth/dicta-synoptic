///<reference types="cypress"/>


const path = require('path')


//run basic tests on synoptic
describe('synoptic-tests',()=>{

    let downloadsFolder = Cypress.config('downloadsFolder')

    beforeEach(() => {
        cy.visit('/')
    })

    // const validateExcelFile = (filename) => {
    //     const downloadedFilename = path.join(downloadsFolder, filename)
    
    //     //ensure the file has been saved before trying to parse it
    //     cy.readFile(downloadedFilename, 'binary', { timeout: 60000 })
    //     .should((buffer) => {
    //         // by having length assertion we ensure the file has text
    //         // since we don't know when the browser finishes writing it to disk
    
    //         // Tip: use expect() form to avoid dumping binary contents
    //         // of the buffer into the Command Log
    //         expect(buffer.length).to.eq(100)
    //     })
    
    //     cy.log('**the file exists**')
    
        
    //     // the first utility library we use to parse Excel files
    //     // only works in Node, thus we can read and parse
    //     // the downloaded file using cy.task
    //     cy.task('readExcelFile', downloadedFilename)
    //     // returns an array of lines read from Excel file
    //     .should('have.length', 253)
    //     .then((list) => {
    //     //     expect(list[0], 'header line').to.deep.equal([
    //     //     "חולין",
    //     //     "מתני'‏",
    //     //     "<big><strong>הכל</strong></big>",
    //     //     "שוחטין",
    //     //     "ושחיטתן",
    //     //     "כשרה",
    //     //     "חוץ",
    //     //     "מחרש",
    //     //     "שוטה",
    //     //     "וקטן",
    //     //     "שמא"
    //     //   ])
    //     })
    // })

    // it('Synoptic run in hebrew mode',()=>{
    //     cy.synopticRun({language:'Hebrew',files:['חולין.txt','כתובות.txt']})
    //     cy.waitForRequest()
    //     cy.get('#tableBody > :nth-child(3)').within(()=>{
    //         cy.get(':nth-child(2)').should('contain','מסכת')
    //         cy.get(':nth-child(3)').should('contain','מסכת:כתובות')
    //     })
    // })

    // it('Synoptic run in english mode',()=>{
    //     cy.synopticRun({language:'English',files:['חולין.txt','כתובות.txt']})
    //     cy.waitForRequest()
    //     cy.get('#tableBody > :nth-child(3)').within(()=>{
    //         cy.get(':nth-child(2)').should('contain','מסכת')
    //         cy.get(':nth-child(3)').should('contain','מסכת:כתובות')
    //     })
    // })

    // it('All rows in table are correct(2 files)',()=>{
    //     cy.synopticRun({language:'Hebrew',files:['חולין.txt','כתובות.txt']})
        // cy.waitForRequest()
        // cy.get('div[class="btn-left"]').click({force:true})
    //     cy.get('table').within(()=>{
    //         cy.get('[class="first-row"]').within(()=>{
    //             cy.get('th[class="second-col"]').first().should('contain','חולין')
    //             cy.get('th[class="second-col"]').next().should('contain','כתובות')
    //         })       
    //         cy.get('tr').not('[class="first-row"]').then(rows=>{
    //             cy.testAllRows(rows)
    //         })
    //     })
    // })

    // it('All rows in table are correct(3 files)',()=>{
    //     // const levenshtein = require('js-levenshtein');
    //     // cy.log(levenshtein('טמא', 'אמר'))
    //     cy.synopticRun({
    //         language:'Hebrew',
    //         files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','חוליןDaf2b_3.txt']
    //     })
    //     cy.waitForRequest()
    //     cy.get('div[class="btn-left"]').click({force:true})
    //     cy.get('table').within(()=>{
    //         cy.get('[class="first-row"]').within(()=>{
    //             cy.get('th[class="second-col"]').first().should('contain','חוליןDaf2b_1')
    //             .next().should('contain','חוליןDaf2b_2').next().should('contain','חוליןDaf2b_3')
    //         })
    //         cy.get('tr').not('[class="first-row"]').then(rows=>{
    //             cy.testAllRows(rows)
    //         })
    //     })
    // })


    
    // it('File with only english text',()=>{
        // cy.synopticRun({
        //     language:'Hebrew',
        //     files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','englishText.txt']
        // })
    //     cy.get('div[class*="uploads-failed-box"]').should('be.visible').within(()=>{
    //         cy.get('p').contains('The server rejected the following file').should('be.visible')
    //         cy.get('li').contains('englishText.txt').should('be.visible')
    //         cy.get('p').contains('We have removed the above file from your upload list').should('be.visible')
    //     })
    //     cy.get('button').contains('חזרה').click({force:true})
    //     cy.get('[class="file-name-wrap"]').contains('חוליןDaf2b_1').should('exist')
    //     cy.get('[class="file-name-wrap"]').contains('חוליןDaf2b_2').should('exist')
    //     cy.get('[class="file-name-wrap"]').contains('englishText').should('not.exist')
    //     cy.get('button').contains('התחל').click({force:true})
    //     cy.waitForRequest()
    //     cy.get('div[class="btn-left"]').click({force:true})
    //     cy.get('table').within(()=>{
    //         cy.get('[class="first-row"]').within(()=>{
    //             cy.get('th[class="second-col"]').first().should('contain','חוליןDaf2b_1')
    //             .next().should('contain','חוליןDaf2b_2')
    //         })       
    //         cy.get('tr').not('[class="first-row"]').then(rows=>{
    //             cy.testAllRows(rows)
    //         })
    //     })
    // })

    // it('Remove file with test different text and retry',()=>{
    //     cy.synopticRun({
    //         language:'English',
    //         files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','חוליןDaf3b_1.txt']
    //     })
    //     cy.get('div[class*="row failed-with-message"]').should('be.visible').within(()=>{
    //         cy.get('p').contains('The server sent the following error messages:').should('be.visible')
    //         cy.get('[class*=error-messages]').within(()=>{
    //             cy.get('li').contains('outlier: חוליןDaf3b_1.txt').should('be.visible')
    //             cy.get('li').contains('[This means the above data in the version(s) listed above is not'
    //             +' sufficiently similar to the others to be included in a standard synopsis.]')
    //             .should('be.visible')
    //             cy.get('li').contains('You can remove outlier(s) and try again, or allow outliers in the'
    //             +' synopsis, set AllowOutliers to true in a synopsis.settings.json file').should('be.visible')
    //         })
    //     })
    //     cy.get('button').contains('Remove and Retry').click({force:true})
    //     cy.waitForRequest()
    //     cy.get('div[class="btn-left"]').click({force:true})
    //     cy.get('table').within(()=>{
    //         cy.get('[class="first-row"]').within(()=>{
    //             cy.get('th[class="second-col"]').first().should('contain','חוליןDaf2b_1')
    //             .next().should('contain','חוליןDaf2b_2')
    //         })       
    //         cy.get('tr').not('[class="first-row"]').then(rows=>{
    //             cy.testAllRows(rows)
    //         })
    //     })
    // })

    // it('Remove file with test different text and retry',()=>{
    //     cy.synopticRun({
    //         language:'English',
    //         files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','חוליןDaf3b_1.txt']
    //     })
    //     cy.get('div[class*="row failed-with-message"]').should('be.visible').within(()=>{
    //         cy.get('p').contains('The server sent the following error messages:').should('be.visible')
    //         cy.get('[class*=error-messages]').within(()=>{
    //             cy.get('li').contains('outlier: חוליןDaf3b_1.txt').should('be.visible')
    //             cy.get('li').contains('[This means the above data in the version(s) listed above is not'
    //             +' sufficiently similar to the others to be included in a standard synopsis.]')
    //             .should('be.visible')
    //             cy.get('li').contains('You can remove outlier(s) and try again, or allow outliers in the'
    //             +' synopsis, set AllowOutliers to true in a synopsis.settings.json file').should('be.visible')
    //         })
    //     })
    //     cy.get('button').contains('Allow outliers').click({force:true})
    //     cy.waitForRequest()
    //     cy.get('div[class="btn-left"]').click({force:true})
    //     cy.get('table').within(()=>{
    //         cy.get('[class="first-row"]').within(()=>{
    //             cy.get('th[class="second-col"]').first().should('contain','חוליןDaf2b_1')
    //             .next().should('contain','חוליןDaf2b_2').next().should('contain','חוליןDaf3b_1')
    //         })       
    //         cy.get('tr').not('[class="first-row"]').then(rows=>{
    //             cy.testAllRows(rows)
    //         })
    //     })
    // })

    // it('Snake test',()=>{
    //     cy.removeDownloadsFiles()
    //     cy.synopticRun({
    //         language:'Hebrew',
    //         files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt']
    //     })
    //     cy.waitForRequest()
    //     let fileName
    //     //cy.get('div[class="btn-left"]').click({force:true})
    //     cy.window().document().then(function (doc) {
    //         doc.addEventListener('click', () => {
    //           setTimeout(function () { doc.location.reload() }, 5000)
    //         })
    //         cy.get('a').contains('הורד את כל התוצאות').click({force:true})
    //     }).then(()=>{
    //         cy.exec('dir cypress\\downloads /s /b').its('stdout').then(stdout=>{
    //             fileName=stdout.substring(stdout.lastIndexOf('\\')+1)
    //         })
    //     }).then(()=>{
    //         cy.setLanguageMode('Hebrew')
    //         cy.get('span').contains('תצוגת קובץ').click({force:true})
    //         cy.exec('move-file cypress/downloads/'+fileName+' cypress/fixtures/'+fileName)
    //         cy.get('input[type="file"]').attachFile(fileName)
    //         cy.get('button').contains('התחל').click({force:true})
    //     })
    // })

    it('Synopsis builder download',()=>{
        // cy.removeDownloadsFiles()
        // cy.removeFixturesXLSXFiles()
        // cy.synopticRun({
        //     language:'Hebrew',
        //     files:['test1.txt','test2.txt']
        // })
        // cy.waitForRequest()
        // let fileName
        // cy.get('div[class="btn-left"]').click({force:true})
        // cy.window().document().then(function (doc) {
        //     doc.addEventListener('click', () => {
        //       setTimeout(function () { doc.location.reload() }, 5000)
        //     })
        //     cy.get('a').contains('הורד את כל התוצאות').click({force:true})
        // }).then(()=>{
        //     cy.exec('dir cypress\\downloads /s /b').its('stdout').then(stdout=>{
        //         fileName=stdout.substring(stdout.lastIndexOf('\\')+1)
        //     })
        // }).then(()=>{
            //const filename = path.join(downloadsFolder,'test3000lines.xlsx')
            //cy.readFile(filename,'binary',{timeout:15000}).should('not.be.null')
            const downloadedFilename = path.join(downloadsFolder,'test3000lines.xlsx')
            cy.task('readExcelFile', downloadedFilename,{timeout:900000})
            // returns an array of lines read from Excel file
            .should('have.length', 93530)
            // .then((list) => {
            //     cy.wrap(list[0]).should('have.length',15)
            //     cy.log(list[2][1])
            //     for(let i=1;i<list[2].length;i++){
            //         if(list[2][i]=='** Major **'||list[2][i]=='** Minor'){
            //             expect(list[1][i]).not.eq(list[0][i])
            //         }else if(list[2][i]=='** Gap **'){
            //             expect(((list[1][i]==undefined)||(list[0][i]==undefined))).to.be.true
            //         }else{
            //             expect(list[1][i]).eq(list[0][i])
            //         }
            //     }
            // })
        //})
    })


})