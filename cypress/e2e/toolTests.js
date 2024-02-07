///<reference types="cypress"/>
/// <reference types="cypress-downloadfile"/>


const path = require('path')

let downloadsFolder = Cypress.config('downloadsFolder')

const urls = new Map();
urls.set('live',Cypress.env('LIVE_URL'))
urls.set('dev',Cypress.env('DEV_URL')) 

const sizes= new Map();
sizes.set('desktop',[1000, 660])
// sizes.set('mobile','iphone-x')


urls.forEach((urlValue,urlKey)=>{

    sizes.forEach((sizeValue,sizeKey) => {

    
        describe('toolTests '+urlKey+' '+sizeKey,()=>{
    
            var inboxId
            let emailAddress
            // beforeEach(() => {
                
            // })

            before(()=>{
                cy.createInbox().then(inbox => {
                    cy.removeDownloadsFiles()
                    // verify a new inbox was created
                    cy.wrap(inbox).should('not.be.undefined');
                
                    // save the inboxId for later checking the emails
                    inboxId = inbox.id
                    Cypress.env('inboxId', inboxId)

                    
                    emailAddress = inbox.emailAddress;
                    Cypress.env('emailAddress', emailAddress)
                })
            })

            beforeEach(()=>{
                cy.screenSize({size:sizeValue})
                // cy.visitpage({url:urlValue})
            })

            it('Synoptic run in hebrew mode',()=>{
                cy.removeDownloadsFiles()
                cy.synopticRun({language:'Hebrew',files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt']})
                cy.enterEmail()
                cy.synopticRun({language:'Hebrew',files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt']})
                cy.enterEmail()
                cy.downloadEmailResultsFile({vertical:'var'}).then(filename => {
                    Cypress.env('var', filename)
                    cy.readExcelFile(filename)
                    .then(list=>{
                        cy.wrap(list[0][0]).should('contain','חוליןDaf2b_1')
                        cy.wrap(list[0][1]).should('contain','חוליןDaf2b_2')
                    })
                })
                cy.downloadEmailResultsFile({vertical:'horiz'}).then(horizfile => {
                    Cypress.env('horiz', horizfile)
                })

            })
        
            it('Synoptic run in english mode',()=>{
                cy.synopticRun({language:'English',files:['חוליןDaf2b_2.docx','חוליןDaf2b_3.docx']})
                cy.enterEmail()
                cy.downloadEmailResultsFile({vertical:'var'}).then(filename => {
                    cy.readExcelFile(filename)
                    .then(list=>{
                        cy.wrap(list[0][0]).should('contain','חוליןDaf2b_2')
                        cy.wrap(list[0][1]).should('contain','חוליןDaf2b_3')
                    })
                })
            })
        
            it('Synoptic run of word file and txt file',()=>{
                cy.synopticRun({language:'English',files:['חוליןDaf2b_1.docx','חוליןDaf2b_3.txt']})
                cy.enterEmail()
                cy.downloadEmailResultsFile({vertical:'var'}).then(filename => {
                    cy.readExcelFile(filename)
                    .then(list=>{
                        cy.wrap(list[0][0]).should('contain','חוליןDaf2b_')
                        cy.wrap(list[0][1]).should('contain','חוליןDaf2b_3')
                    })
                })
            })
        
            it('Not sufficiently similar message in english',()=>{
                cy.synopticRun({language:'English',files:['כתובות.txt','חולין.txt']})
                cy.enterEmail()
                cy.get('.error-message').invoke('text').then((text) => {
                    cy.wrap(text).should('contain','Error received')
                    cy.wrap(text).should('contain','כתובות.txt')
                    cy.wrap(text).should('contain','[This means the data in the version') 
                    cy.wrap(text).should('contain','listed above is not sufficiently similar to the other')
                    cy.wrap(text).should('contain','to perform a synopsis.]')
                  })
            })

            it('Not sufficiently similar message in hebrew',()=>{
                cy.synopticRun({language:'Hebrew',files:['כתובות.txt','חולין.txt']})
                cy.enterEmail()
                cy.get('.error-message').invoke('text').then((text) => {
                    cy.wrap(text).should('contain','התקבלה הודעת שגיאה')
                    cy.wrap(text).should('contain','כתובות.txt')
                    cy.wrap(text).should('contain','[הקבצים ברשימה הנזכרת אינם דומים מספיק לקבצים האחרים') 
                    cy.wrap(text).should('contain','שנכללים בהשוואת הגרסאות.]')
                    cy.wrap(text).should('contain','אפשר למחוק את הקבצים החריגים או לאפשר להם להיכלל')
                    cy.wrap(text).should('contain','בהשוואת הגרסאות.')
                  })
            })
        
        
            it('Synoptic run with large file in english mode',()=>{
                cy.synopticRun({language:'English',files:['כתובות.txt','כתובות1.txt']})
                cy.enterEmail()
                cy.get('.px-5').should('contain','The synopsis results will be sent via email')
            })
        
            it('Synoptic run with large file in english mode',()=>{
                cy.synopticRun({language:'Hebrew',files:['כתובות.txt','כתובות1.txt']})
                cy.enterEmail()
                cy.get('.px-5').should('contain','קובץ התוצאות של השוואת הגרסאות ישלח לדוא״ל')
            })
        
            it('Go Back button befor results page',()=>{
                cy.synopticRun({language:'English',files:['חולין.txt','כתובות.txt']})
                cy.enterEmail()
                cy.get('button').contains('Upload new files').click({force:true})
                cy.get('.file-upload > .col-sm-9').should('be.visible')
            })

            it('Go Back button befor results page',()=>{
                cy.synopticRun({language:'Hebrew',files:['חולין.txt','כתובות.txt']})
                cy.enterEmail()
                cy.get('button').contains('חזרה למסך הראשי').click({force:true})
                cy.get('.file-upload > .col-sm-9').should('be.visible')
            })
        
            it('All rows in table are correct(2 txt files)',()=>{
                cy.readExcelFile(Cypress.env('var'))
                    .then(list=>{
                        cy.wrap(list[0][0]).should('contain','חוליןDaf2b_1')
                        cy.wrap(list[0][1]).should('contain','חוליןDaf2b_2')
                        cy.testAllRows(list.slice(1))
                    })
            })
        
            it('All rows in table are correct(3 txt files)',()=>{
                cy.synopticRun({
                    language:'Hebrew',
                    files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','חוליןDaf2b_3.txt']
                })
                cy.enterEmail()
                cy.downloadEmailResultsFile({vertical:'var'}).then(filename => {
                    cy.readExcelFile(filename)
                    .then(list=>{
                        cy.wrap(list[0][0]).should('contain','חוליןDaf2b_1')
                        cy.wrap(list[0][1]).should('contain','חוליןDaf2b_2')
                        cy.wrap(list[0][2]).should('contain','חוליןDaf2b_3')
                        cy.testAllRows(list.slice(1))
                    })
                })
            })
        
            
        
        
           
        
        
        
            it('Errer message in hebrew for file with only english text',()=>{
                cy.synopticRun({
                    language:'Hebrew',
                    files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','englishText.txt']
                })
                cy.enterEmail()
                cy.get('.pt-4').should('contain','התקבלה הודעת שגיאה')
                cy.get('.px-5').should('contain','"englishText.txt"')
            })
        
        
            it('Errer message in english for file with only english text',()=>{
                cy.synopticRun({
                    language:'English',
                    files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','englishText.txt']
                })
                cy.enterEmail()
                cy.get('.pt-4').should('contain','Error receive')
                cy.get('.px-5').should('contain','"englishText.txt"')
            })
        
            
            it('File with only english text was deleted from list of uploads',()=>{
                cy.synopticRun({
                    language:'Hebrew',
                    files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','englishText.txt']
                })
                cy.enterEmail()
                cy.get('button').contains('חזרה למסך הראשי').click({force:true})
                cy.get('.uppy-Dashboard-Item-actionWrapper').children().next().eq(2).click({force:true})
                cy.get('.file-upload > .col-sm-3 > .settings > #apply-synopsis').click({force: true})
                const  success_message= ['The files were successfully uploaded', 'הקבצים הועלו בהצלחה']
                const regex = new RegExp(`${success_message.join('|')}`, 'g')
                cy.get('.env-wrapper > .mt-1',{timeout:60000}).contains(regex,{timeout:60000}).should('exist')
                cy.get('#input-email-upload').type('lomibluth@gmail.com')
                cy.get('#email-form > .btn').click({force: true})
                cy.get('.px-5').should('contain','קובץ התוצאות של השוואת הגרסאות ישלח לדוא״ל')
            })
        
        
        
            it('Remove file with test different text and retry',()=>{
                cy.synopticRun({
                    language:'Hebrew',
                    files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','חוליןDaf3b_1.txt']
                })
                cy.enterEmail()
                cy.get('.outlier-btns > .mx-2').click({force:true})
                cy.get('.px-5').should('contain','קובץ התוצאות של השוואת הגרסאות ישלח לדוא״ל')
            })
        
            it('Allow outliers',()=>{
                cy.synopticRun({
                    language:'Hebrew',
                    files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','חוליןDaf3b_1.txt']
                })
                cy.enterEmail()
                cy.get('.outlier-btns > .btn-primary').click({force:true})
                cy.get('.px-5').should('contain','קובץ התוצאות של השוואת הגרסאות ישלח לדוא״ל')
            })
        
        
        
            it('All Column in horizontal txt file are correct',()=>{          
                    cy.readExcelFile(Cypress.env('horiz'))
                    // returns an array of lines read from Excel file
                    .then((list) => {
                        if(urlKey=='dev'){
                            cy.wrap(list[1].length).should('eq',239)
                        }else if(urlKey=='live'){
                            cy.wrap(list[1].length).should('eq',239)
                        }
                        cy.testHorizontalMatrix(list)
                    })
            })
        
            it('All rows in vertical word file are correct',()=>{
                cy.readExcelFile(Cypress.env('var'))
                    // returns an array of lines read from Excel file
                    .then((list) => {
                        if(urlKey=='dev'){
                            cy.wrap(list.length).should('eq',239)
                        }else if(urlKey=='live'){
                            cy.wrap(list.length).should('eq',239)
                        }
                    cy.testVerticalMatrix(list)
                })
            })      
           
               
            // // it('Number of lines in horizontal txt file of a Large file',()=>{
            // //     cy.readExcelFile('6d4983e2-d56f-4968-955c-fe1f219f82f0-horiz.xlsx')
            // //         // returns an array of lines read from Excel file
            // //         .then((list) => {
            // //             cy.wrap(list.length).should('eq',3)
            // //             cy.wrap(list[1].length).should('eq',15759)
            // //         })
            // // })
        
            // // it('Number of Columns in Vertical txt file of a Large file',()=>{
            // //     cy.readExcelFile('6d4983e2-d56f-4968-955c-fe1f219f82f0-vert.xlsx')
            // //         // returns an array of lines read from Excel file
            // //         .then((list) => {
            // //             cy.wrap(list.length).should('eq',15759)
            // //             cy.wrap(list[1].length).should('eq',3)
            // //         })
            // // })
        
            
        
        
            
        
            it('run snake',()=>{
                cy.runSnake({file:'64c7cb70-7ec9-4ac9-ba3a-d784e92db10b-horiz.xlsx',
                    numColumnsPerRow:undefined,blankRows:undefined,includeSynopsisSnakeFile:true,
                    Language:'Hebrew'}).then(()=>{
                    cy.getSnakeMatrix().then((matrix) => {
                        cy.wrap(matrix).should('not.be.null')
                    })
                })
            })
        
        
            it('1 columns per row test',()=>{
                cy.removeDownloadsFiles()
                let columnsPerRow=1
                cy.runSnake({file:'64c7cb70-7ec9-4ac9-ba3a-d784e92db10b-horiz.xlsx',
                    numColumnsPerRow:undefined,blankRows:undefined,
                    numColumnsPerRow:columnsPerRow,
                    Language:'Hebrew'
                }).then(()=>{
                    cy.getSnakeMatrix().then((matrix) => {
                        cy.testNumColumnsPerRow(matrix,columnsPerRow)
                    })
                })
            })
        
            it('20 columns per row test',()=>{
                let columnsPerRow=20
                cy.removeDownloadsFiles()
                cy.runSnake({file:'64c7cb70-7ec9-4ac9-ba3a-d784e92db10b-horiz.xlsx',
                    numColumnsPerRow:undefined,blankRows:undefined,
                    numColumnsPerRow:columnsPerRow,
                    Language:'Hebrew'
                }).then(()=>{
                    cy.getSnakeMatrix().then((matrix) => {
                        cy.testNumColumnsPerRow(matrix,columnsPerRow)
                    })
                })
            })
        
            it('1 blank rows with Synopsis',()=>{
                let blankRows=1,numOfFiles=2
                let includeSynopsisSnakeFile=true
                cy.removeDownloadsFiles()
                // cy.removeFixturesXLSXFiles()
                cy.runSnake({file:'64c7cb70-7ec9-4ac9-ba3a-d784e92db10b-horiz.xlsx',
                    numColumnsPerRow:undefined,blankRows:blankRows,
                    includeSynopsisSnakeFile:undefined,
                    Language:'Hebrew'
                }).then(()=>{
                    cy.getSnakeMatrix().then((matrix) => {
                        if(urlKey=='dev'){
                            cy.wrap(matrix.length).should('eq',95)
                        }else if(urlKey=='live'){
                            cy.wrap(matrix.length).should('eq',95)
                        }
                        cy.testBlankRows({
                            matrix:matrix,
                            blankRows:blankRows,
                            numOfFiles:numOfFiles,
                            includeSynopsis:includeSynopsisSnakeFile
                        })
                    })
                })
            })
        
            it('5 blank rows with Synopsis',()=>{
                let blankRows=5,numOfFiles=2
                let includeSynopsisSnakeFile=true
                cy.removeDownloadsFiles()
                cy.runSnake({file:'64c7cb70-7ec9-4ac9-ba3a-d784e92db10b-horiz.xlsx',
                    numColumnsPerRow:undefined,blankRows:blankRows,
                    includeSynopsisSnakeFile:undefined,
                    Language:'Hebrew'
                }).then(()=>{
                    cy.getSnakeMatrix().then((matrix) => {
                        if(urlKey=='dev'){
                            cy.wrap(matrix.length).should('eq',187)
                        }else if(urlKey=='live'){
                            cy.wrap(matrix.length).should('eq',187)
                        }
                        cy.testBlankRows({
                            matrix:matrix,
                            blankRows:blankRows,
                            numOfFiles:numOfFiles,
                            includeSynopsis:includeSynopsisSnakeFile
                        })
                    })
                })
            })
        
            it('1 blank rows without Synopsis',()=>{
                let blankRows=1,numOfFiles=2
                let includeSynopsisSnakeFile=false
                cy.removeDownloadsFiles()
                cy.runSnake({file:'64c7cb70-7ec9-4ac9-ba3a-d784e92db10b-horiz.xlsx',
                    numColumnsPerRow:undefined,blankRows:blankRows,
                    includeSynopsisSnakeFile:includeSynopsisSnakeFile,
                    Language:'Hebrew'
                }).then(()=>{
                    cy.getSnakeMatrix().then((matrix) => {
                        if(urlKey=='dev'){
                            cy.wrap(matrix.length).should('eq',71)
                        }else if(urlKey=='live'){
                            cy.wrap(matrix.length).should('eq',71)
                        }
                        cy.testBlankRows({
                            matrix:matrix,
                            blankRows:blankRows,
                            numOfFiles:numOfFiles,
                            includeSynopsis:includeSynopsisSnakeFile
                        })
                    })
                })
            })
        
            it('5 blank rows without Synopsis',()=>{
                let blankRows=5,numOfFiles=2
                let includeSynopsisSnakeFile=false
                cy.removeDownloadsFiles()
                cy.runSnake({file:'64c7cb70-7ec9-4ac9-ba3a-d784e92db10b-horiz.xlsx',
                    numColumnsPerRow:undefined,blankRows:blankRows,
                    includeSynopsisSnakeFile:includeSynopsisSnakeFile,
                    Language:'Hebrew'
                }).then(()=>{
                    cy.getSnakeMatrix().then((matrix) => {
                        if(urlKey=='dev'){
                            cy.wrap(matrix.length).should('eq',163)
                        }else if(urlKey=='live'){
                            cy.wrap(matrix.length).should('eq',163)
                        }
                        cy.testBlankRows({
                            matrix:matrix,
                            blankRows:blankRows,
                            numOfFiles:numOfFiles,
                            includeSynopsis:includeSynopsisSnakeFile
                        })
                    })
                })
            })
        
        
        
            it('Snake has the same data as synoptic',()=>{
                let fileName
                let synopticArr, snakeArr
                cy.removeDownloadsFiles()
                cy.synopticRun({
                    language:'Hebrew',
                    files:['tehilim1mechon-mamre.txt','tehilim1chabad.txt']
                })
                cy.enterEmail()
                cy.downloadEmailResultsFile({vertical:'horiz'}).then(()=>{
                    cy.fileName().then(name=>{
                      fileName=name
                    })
                }).then(()=>{
                    cy.readExcelFile(fileName)
                    // returns an array of lines read from Excel file
                    .then((list) => {
                        synopticArr=list
                    }).then(()=>{
                        cy.moveFileDownloadsTofixtures(fileName).then(()=>{
                            cy.setLanguageMode({language:'Hebrew'})            
                            cy.runSnake({file:fileName,numColumnsPerRow:undefined,blankRows:undefined,includeSynopsisSnakeFile:true})
                        }).then(()=>{
                            cy.getSnakeMatrix().then((matrix) => {
                                snakeArr=matrix
                            })
                        }).then(()=>{
                            cy.snakeHasSameData({
                                synopticArr:synopticArr,
                                snakeArr:snakeArr,
                                blankRows:2,
                                columnsPerRow:10,
                                numBooks:2,
                                synopsis:true
                            })
                        })
                    })
        
                })
                
                
                
           
            })

            
    
    
        
    
    
    
    
    
        })  
    })
})