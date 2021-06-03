///<reference types="cypress"/>


const path = require('path')

let downloadsFolder = Cypress.config('downloadsFolder')

//run basic tests on synoptic
describe('synoptic-tests',()=>{


    beforeEach(() => {
        cy.visit('/')
    })

    

    // it('Synoptic run in hebrew mode',()=>{
    //     cy.synopticRun({language:'Hebrew',files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt']})
    //     cy.waitForRequest()
    //     cy.get('#tableBody > :nth-child(3)').within(()=>{
    //         cy.get(':nth-child(2)').should('contain','אמר')
    //         cy.get(':nth-child(3)').should('contain','אמר')
    //     })
    // })

    // it('Synoptic run in english mode',()=>{
    //     cy.synopticRun({language:'English',files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt']})
    //     cy.waitForRequest()
    //     cy.get('#tableBody > :nth-child(3)').within(()=>{
    //         cy.get(':nth-child(2)').should('contain','אמר')
    //         cy.get(':nth-child(3)').should('contain','אמר')
    //     })
    // })

    // it('Synoptic run of word file and txt file',()=>{
    //     cy.synopticRun({language:'English',files:['חוליןDaf2b_1.docx','חוליןDaf2b_2.txt']})
    //     cy.waitForRequest()
    //     cy.get('#tableBody > :nth-child(3)').within(()=>{
    //         cy.get(':nth-child(2)').should('contain','אמר')
    //         cy.get(':nth-child(3)').should('contain','אמר')
    //     })
    // })

    // // it('server crash',()=>{
    // //     cy.synopticRun({language:'Hebrew',files:['כתובות.txt','חולין.txt']})
    // //     cy.waitForRequest()
    // //     cy.get('#tableBody > :nth-child(3)').within(()=>{
    // //         cy.get(':nth-child(2)').should('contain','מסכת')
    // //         cy.get(':nth-child(3)').should('contain','מסכת')
    // //     })
    // // })


    // // it('Synoptic run with large file in english mode',()=>{
    // //     cy.synopticRun({language:'English',files:['כתובות.txt','כתובות1.txt']})
    // //     cy.serverFailureMessage('Server failure. Please try again, if the problem persists please'+
    // //     ' come back later and try again.')
    // // })

    // // it('Synoptic run with large file in english mode',()=>{
    // //     cy.synopticRun({language:'Hebrew',files:['כתובות.txt','כתובות1.txt']})
    // //     cy.serverFailureMessage('ארעה תקלה. אנא נסה שוב. במקרה שהבעיה חוזרת נסה שוב מאוחר יותר')
    // // })

    // // it('Go Back button befor results page',()=>{
    // //     cy.synopticRun({language:'English',files:['חולין.txt','כתובות.txt']})
    // //     cy.get('button').contains(/חזרה|Go Back/).click({force:true})
    // //     cy.get('[class*="spinner"]').should('not.be.visible')
    // // })

    // it('All rows in table are correct(2 txt files)',()=>{
    //     cy.synopticRun({language:'Hebrew',files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt']})
    //     cy.waitForRequest()
    //     cy.get('div[class="btn-left"]').click({force:true})
    //     cy.get('table').within(()=>{
    //         cy.get('[class="first-row"]').within(()=>{
    //             cy.get('th[class="second-col"]').first().should('contain','חוליןDaf2b_1')
    //             cy.get('th[class="second-col"]').next().should('contain','חוליןDaf2b_2')
    //         })       
    //         cy.get('tr').not('[class="first-row"]').then(rows=>{
    //             cy.testAllRows(rows)
    //         })
    //     })
    // })

    // it('All rows in table are correct(3 txt files)',()=>{
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
    //             cy.testAllRows(rows,false)
    //         })
    //     })
    // })

    // it('All rows in table are changes only',()=>{
    //     cy.synopticRun({language:'Hebrew',files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt']})
    //     cy.waitForRequest()
    //     cy.get('div[class="btn-left"]').click({force:true})
    //     //Changes only
    //     cy.get('a[id="gener-options-sropdown"]').click({force:true}).then(()=>{
    //         cy.get('ul[class="dropdown-menu drop show"]>li').eq(1).click()
    //     })
    //     cy.get('a[id="gener-options-sropdown"] > span').contains('רק שינויים').should('exist')
    //     .then(()=>{
    //         cy.get('table').within(()=>{
    //             cy.get('[class="first-row"]').within(()=>{
    //                 cy.get('th[class="second-col"]').first().should('contain','חוליןDaf2b_1')
    //                 .next().should('contain','חוליןDaf2b_2')
    //             })
    //             cy.get('tr').not('[class="first-row"]').then(rows=>{
    //                 cy.testAllRows(rows,true)
    //             })
    //         })
    //     })
        
    // })


    // it('All rows in table are correct(2 word files)',()=>{
    //     cy.synopticRun({language:'Hebrew',files:['חוליןDaf2b_1.docx','חוליןDaf2b_2.docx']})
    //     cy.waitForRequest()
    //     cy.get('div[class="btn-left"]').click({force:true})
    //     cy.get('table').within(()=>{
    //         cy.get('[class="first-row"]').within(()=>{
    //             cy.get('th[class="second-col"]').first().should('contain','חוליןDaf2b_1')
    //             cy.get('th[class="second-col"]').next().should('contain','חוליןDaf2b_2')
    //         })       
    //         cy.get('tr').not('[class="first-row"]').then(rows=>{
    //             cy.testAllRows(rows)
    //         })
    //     })
    // })

    // it('All rows in table are correct(3 word files)',()=>{
    //     cy.synopticRun({
    //         language:'Hebrew',
    //         files:['חוליןDaf2b_1.docx','חוליןDaf2b_2.docx','חוליןDaf2b_3.docx']
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



    // it('Errer message in hebrew for file with only english text',()=>{
    //     cy.synopticRun({
    //         language:'Hebrew',
    //         files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','englishText.txt']
    //     })
    //     cy.messageForFileWithOnlyEnglishText({
    //         title:'השרת דחה את הקובץ הבא:',
    //         file:'englishText.txt',
    //         removeMessage:'מחקנו את הקובץ מרשימת ההעלאות'
    //     })
    // })


    // it('Errer message in english for file with only english text',()=>{
    //     cy.synopticRun({
    //         language:'English',
    //         files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','englishText.txt']
    //     })
    //     cy.messageForFileWithOnlyEnglishText({
    //         title:'The server rejected the following file',
    //         file:'englishText.txt',
    //         removeMessage:'We have removed the above file from your upload list'
    //     })
    // })

    
    // it('File with only english text was deleted from list of uploads',()=>{
    //     cy.synopticRun({
    //         language:'Hebrew',
    //         files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','englishText.txt']
    //     })
    //     cy.get('div[class*="uploads-failed-box"]').should('be.visible')
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

    // it('Errer message in hebrew for file with different text',()=>{
    //     cy.synopticRun({
    //         language:'Hebrew',
    //         files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','חוליןDaf3b_1.txt']
    //     })
    //     cy.messageForFileWithDifferentText({
    //         title:'השרת שלח הודעת שגיאה:',
    //         outlier:'קובץ חריג: חוליןDaf3b_1.txt',
    //         description:'[הקבצים ברשימה הנזכרת אינם דומים מספיק לקבצים האחרים שנכללים בהשוואת הגרסאות.]',
    //         options:'אפשר למחוק את הקבצים החריגים או לאפשר להם להיכלל בהשוואת הגרסאות.'
    //     })
    // })


    // it('Errer message in english for file with different text',()=>{
    //     cy.synopticRun({
    //         language:'English',
    //         files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','חוליןDaf3b_1.txt']
    //     })
    //     cy.messageForFileWithDifferentText({
    //         title:'The server sent the following error messages:',
    //         outlier:'outlier: חוליןDaf3b_1.txt',
    //         description:'[This means the data in the version(s) listed above is not sufficiently '+
    //         'similar to the other(s) to be included in a standard synopsis.]',
    //         options:'You can click below, either to remove outlier(s) and try again, or to allow '+
    //         'outliers in the synopsis. (To allow them automatically in a future synopsis, '+
    //         'set AllowOutliers to true in a synopsis.settings.json file).'
    //     })
    // })

    // it('Remove file with test different text and retry',()=>{
    //     cy.synopticRun({
    //         language:'Hebrew',
    //         files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','חוליןDaf3b_1.txt']
    //     })
    //     cy.get('div[class*="failed-with-message"]').should('be.visible')
    //     cy.get('button').contains('מחקו ונסו שוב').click({force:true})
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

    // it('Allow outliers',()=>{
    //     cy.synopticRun({
    //         language:'Hebrew',
    //         files:['חוליןDaf2b_1.txt','חוליןDaf2b_2.txt','חוליןDaf3b_1.txt']
    //     })
    //     cy.get('div[class*="failed-with-message"]').should('be.visible')
    //     cy.get('button').contains('כלול קבצים חריגים').click({force:true})
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


    // it('All rows in vertical txt file are correct',()=>{
    //     cy.removeDownloadsFiles()
    //     cy.removeFixturesXLSXFiles()
    //     cy.runSynopticAndDownloadFile({
    //         file1:'tehilim1mechon-mamre.txt',
    //         file2:'tehilim1chabad.txt',
    //         vertical:true
    //     })
    //     .then(fileName=>{
    //         cy.readExcelFile(fileName)
    //         // returns an array of lines read from Excel file
    //         .then((list) => {
    //             cy.wrap(list.length).should('eq',66)
    //             cy.testVerticalMatrix(list)
    //         })
    //     })
    // })

    // it('All Column in horizontal txt file are correct',()=>{
    //     cy.removeDownloadsFiles()
    //     cy.removeFixturesXLSXFiles()
    //     cy.runSynopticAndDownloadFile({
    //         file1:'tehilim1mechon-mamre.txt',
    //         file2:'tehilim1chabad.txt'
    //     })
    //     .then(fileName=>{
    //         cy.readExcelFile(fileName)
    //         // returns an array of lines read from Excel file
    //         .then((list) => {
    //             cy.wrap(list[1].length).should('eq',66)
    //             cy.testHorizontalMatrix(list)
    //         })
    //     })
    // })

    // it('All rows in vertical word file are correct',()=>{
    //     cy.removeDownloadsFiles()
    //     cy.removeFixturesXLSXFiles()
    //     cy.runSynopticAndDownloadFile({
    //         file1:'tehilim1mechon-mamre.docx',
    //         file2:'tehilim1chabad.docx',
    //         vertical:true
    //     })
    //     .then(fileName=>{
    //         cy.readExcelFile(fileName)
    //         // returns an array of lines read from Excel file
    //         .then((list) => {
    //             cy.wrap(list.length).should('eq',66)
    //             cy.testVerticalMatrix(list)
    //         })
    //     })
    // })

    // it('All Column in horizontal word file are correct',()=>{
    //     cy.removeDownloadsFiles()
    //     cy.removeFixturesXLSXFiles()
    //     cy.runSynopticAndDownloadFile({
    //         file1:'tehilim1mechon-mamre.docx',
    //         file2:'tehilim1chabad.docx'
    //     })
    //     .then(fileName=>{
    //         cy.readExcelFile(fileName)
    //         // returns an array of lines read from Excel file
    //         .then((list) => {
    //             cy.wrap(list[1].length).should('eq',66)
    //             cy.testHorizontalMatrix(list)
    //         })
    //     })
    // })


    // // it('Number of lines in horizontal txt file of a Large file',()=>{
    // //     cy.removeDownloadsFiles()
    // //     cy.removeFixturesXLSXFiles()
    // //     cy.runSynopticAndDownloadFile({
    // //         file1:'חגיגה.txt',
    // //         file2:'מכות.txt'
    // //     })
    // //     .then(fileName=>{
    // //         cy.readExcelFile(fileName)
    // //         // returns an array of lines read from Excel file
    // //         .then((list) => {
    // //             cy.wrap(list.length).should('eq',3)
    // //             cy.wrap(list[1].length).should('eq',33766)
    // //         })
    // //     })
    // // })

    // it('Number of Columns in Vertical txt file of a Large file',()=>{
    //     cy.removeDownloadsFiles()
    //     cy.removeFixturesXLSXFiles()
    //     cy.runSynopticAndDownloadFile({
    //         file1:'חגיגה.txt',
    //         file2:'חגיגה1.txt',
    //         vertical:true})
    //     .then(fileName=>{
    //         cy.readExcelFile(fileName)
    //         // returns an array of lines read from Excel file
    //         .then((list) => {
    //             cy.wrap(list.length).should('eq',19145)
    //             cy.wrap(list[1].length).should('eq',3)
    //         })
    //     })
    // })

    // // it('Number of lines in horizontal word file of a Large file',()=>{
    // //     cy.removeDownloadsFiles()
    // //     cy.removeFixturesXLSXFiles()
    // //     cy.runSynopticAndDownloadFile({
    // //         file1:'חגיגה.docx',
    // //         file2:'מכות.docx'
    // //     })
    // //     .then(fileName=>{
    // //         cy.readExcelFile(fileName)
    // //         // returns an array of lines read from Excel file
    // //         .then((list) => {
    // //             cy.wrap(list.length).should('eq',3)
    // //             cy.wrap(list[1].length).should('eq',33766)
    // //         })
    // //     })
    // // })

    // it('Number of Columns in Vertical word file of a Large file',()=>{
    //     cy.removeDownloadsFiles()
    //     cy.removeFixturesXLSXFiles()
    //     cy.runSynopticAndDownloadFile({
    //         file1:'חגיגה.docx',
    //         file2:'חגיגה1.docx',
    //         vertical:true})
    //     .then(fileName=>{
    //         cy.readExcelFile(fileName)
    //         // returns an array of lines read from Excel file
    //         .then((list) => {
    //             cy.wrap(list.length).should('eq',19145)
    //             cy.wrap(list[1].length).should('eq',3)
    //         })
    //     })
    // })

    

    it('run snake',()=>{
        let columnsPerRow=1
        cy.removeDownloadsFiles()
        cy.removeFixturesXLSXFiles()
        cy.runSynopticAndSnake({
            file1:'tehilim1mechon-mamre.txt',
            file2:'tehilim1chabad.txt',
            numColumnsPerRow:columnsPerRow
        }).then(()=>{
            cy.getSnakeMatrix().then((matrix) => {
                cy.wrap(matrix).should('not.be.null')
            })
        })
    })


    it('1 columns per row test',()=>{
        let columnsPerRow=1
        cy.removeDownloadsFiles()
        cy.removeFixturesXLSXFiles()
        cy.runSynopticAndSnake({
            file1:'tehilim1mechon-mamre.txt',
            file2:'tehilim1chabad.txt',
            numColumnsPerRow:columnsPerRow
        }).then(()=>{
            cy.getSnakeMatrix().then((matrix) => {
                cy.testNumColumnsPerRow(matrix,columnsPerRow)
            })
        })
    })

    it('20 columns per row test',()=>{
        let columnsPerRow=20
        cy.removeDownloadsFiles()
        cy.removeFixturesXLSXFiles()
        cy.runSynopticAndSnake({
            file1:'tehilim1mechon-mamre.txt',
            file2:'tehilim1chabad.txt',
            numColumnsPerRow:columnsPerRow
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
        cy.removeFixturesXLSXFiles()
        cy.runSynopticAndSnake({
            file1:'tehilim1mechon-mamre.txt',
            file2:'tehilim1chabad.txt',
            blankRows:blankRows,
            includeSynopsisSnakeFile:includeSynopsisSnakeFile
        }).then(()=>{
            cy.getSnakeMatrix().then((matrix) => {
                expect(matrix.length).eq(27)
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
        cy.removeFixturesXLSXFiles()
        cy.runSynopticAndSnake({
            file1:'tehilim1mechon-mamre.txt',
            file2:'tehilim1chabad.txt',
            blankRows:blankRows,
            includeSynopsisSnakeFile:true
        }).then(()=>{
            cy.getSnakeMatrix().then((matrix) => {
                expect(matrix.length).eq(51)
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
        cy.removeFixturesXLSXFiles()
        cy.runSynopticAndSnake({
            file1:'tehilim1mechon-mamre.txt',
            file2:'tehilim1chabad.txt',
            blankRows:blankRows,
            includeSynopsisSnakeFile:false
        }).then(()=>{
            cy.getSnakeMatrix().then((matrix) => {
                expect(matrix.length).eq(20)
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
        cy.removeFixturesXLSXFiles()
        cy.runSynopticAndSnake({
            file1:'tehilim1mechon-mamre.txt',
            file2:'tehilim1chabad.txt',
            blankRows:blankRows,
            includeSynopsisSnakeFile:false
        }).then(()=>{
            cy.getSnakeMatrix().then((matrix) => {
                expect(matrix.length).eq(44)
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
        cy.removeFixturesXLSXFiles()
        cy.synopticRun({
            language:'Hebrew',
            files:['tehilim1mechon-mamre.txt','tehilim1chabad.txt']
        })
        cy.waitForRequest()
        cy.downloadFile('a','הורד את כל התוצאות').then(()=>{
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
                    cy.setLanguageMode('Hebrew')            
                    cy.goToSnake().then(()=>{
                        cy.snakeRowsRun('Hebrew',fileName)
                    })
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
        
        
        
        // cy.fixture('snaked_1e601d0b-c542-4092-846b-469263c33dd8-horiz.xlsx','utf8')
        // .then(f=>{
        //     cy.log(f)
        // })

        // let blankRows=5,numOfFiles=2
        // let includeSynopsisSnakeFile=false
        // cy.removeDownloadsFiles()
        // cy.removeFixturesXLSXFiles()
        // cy.runSynopticAndSnake({
        //     file1:'tehilim1mechon-mamre.txt',
        //     file2:'tehilim1chabad.txt',
        //     blankRows:blankRows,
        //     includeSynopsisSnakeFile:false
        // }).then(()=>{
        //     cy.getSnakeMatrix().then((matrix) => {
        //         expect(matrix.length).eq(44)
        //         cy.testBlankRows({
        //             matrix:matrix,
        //             blankRows:blankRows,
        //             numOfFiles:numOfFiles,
        //             includeSynopsis:includeSynopsisSnakeFile
        //         })
        //     })
        // })
    })


    





    

})