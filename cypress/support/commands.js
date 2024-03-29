require('cypress-downloadfile/lib/downloadFileCommand')


import 'cypress-file-upload';

const path = require('path')

let downloadsFolder = Cypress.config('downloadsFolder')

const { MailSlurp } = require('mailslurp-client');
// set your api key with an environment variable `CYPRESS_API_KEY` or configure using `env` property in config file
// (cypress prefixes environment variables with CYPRESS)
const apiKey = Cypress.env('API_KEY')
const mailslurp = new MailSlurp({ apiKey });

Cypress.Commands.add("createInbox", () => {
  return mailslurp.createInbox();
});

Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
  // how long we should hold connection waiting for an email to arrive
  const timeoutMillis = 30_000;
  return mailslurp.waitForLatestEmail(inboxId, timeoutMillis)
});

const password = "test-password";
let inboxId
let emailAddress;
let code;


Cypress.Commands.add('synopticRun',({language,files})=>{
  cy.setLanguageMode({language:language})
  for(let i=0;i<files.length;i++){
    if(i>0){
      cy.get('.uppy-DashboardContent-addMoreCaption').click({force: true})
    }
    cy.get('input[type="file"]').attachFile(files[i],)
  }
  cy.get('.h-100 > .v-spinner > .v-clip').should('not.exist')
  cy.get('.file-upload > .col-sm-3 > .settings > #apply-synopsis').click({force: true})
  const  success_message= ['The files were successfully uploaded', 'הקבצים הועלו בהצלחה']
  const regex = new RegExp(`${success_message.join('|')}`, 'g')
  cy.get('.env-wrapper > .mt-1',{timeout:60000}).contains(regex,{timeout:60000}).should('exist')
  // cy.createInbox().then(inbox => {
  //   // verify a new inbox was created
  //   cy.wrap(inbox).should('not.be.undefined');
  //   // cy.log('inbox :'+inbox)

  //   // save the inboxId for later checking the emails
  //   inboxId = inbox.id
    
  //   emailAddress = inbox.emailAddress;

  //   cy.get('#input-email-upload').clear().type(emailAddress, { force: true });
  //   cy.get('#email-form > .btn').click({force: true})
  //   cy.wrap(inboxId).should('have.length.gte', 1);
  //   // cy.waitForLatestEmail(inboxId).then(email => {
  //   //   cy.wrap(email).should('not.be.undefined');
  //   //   const link = email.body.match(/<a href="(.*?)"/g)[0];
  //   //   cy.log(link)
  //   //   cy.get('#input-email-upload').type(email)
  //   //   cy.get('#email-form > .btn').click({force: true})
  //   // });
  // });
  // cy.createInbox().then(email=>{
  //   cy.get('#input-email-upload').type(email)
  //   cy.get('#email-form > .btn').click({force: true})
  // })
})

Cypress.Commands.add('enterEmail',()=>{
  cy.get('#input-email-upload').clear().type(Cypress.env('emailAddress'), { force: true });
  cy.get('#email-form > .btn').click({force: true})
  cy.wrap(Cypress.env('inboxId')).should('have.length.gte', 1);
})
  


  // cy.waitForLatestEmail(inboxId).then(email => {
  //   // verify we received an email
  //   cy.wrap(email).should('not.be.undefined');
    
    

  //   // verify that email contains the code
  //   // cy.wrap(email.body.match(/<a href="(.*?)"/g)[0]).click({ force: true })
  //   // Extract the link from the email body
  //   const link = email.body.match(/<a href="(.*?)"/g)[0];
  //   cy.log(link.substring(9,link.length - 1))
  //   cy.log(link.substring(77,link.length - 1))
  //   cy.downloadFile(link.substring(9,link.length - 1))
  //   // cy.download(link.substring(9,link.length - 1), link.substring(77,link.length - 1), 'GET', 'text/plain').then(() => {
  //   //   // Assert that the file was downloaded successfully
  //   //   cy.readFile(`cypress/downloads/${link.slice(77)}`).should('exist');
  //   // });
  //   // Download the file
  //   // cy.request('https://synopsis-2-4.loadbalancer.dicta.org.il/synopsis/ExcelOutput/e3f8a2f5-aa21-446e-a8c9-462c684d7a8a-vert.xlsx').then((response) => {
  //   //   // Assert that the download was successful
  //   //   expect(response.status).to.equal(200);
  //   //   // expect(response.headers['content-type']).to.equal('application/pdf');

  //   //   // Optionally, save the downloaded file or perform further assertions
  //   //   // ...
  //   // });
  // });

  // cy.createInbox().then(inbox => {
  //   // verify a new inbox was created
  //   cy.wrap(inbox).should('not.be.undefined');
  //   // cy.log('inbox :'+inbox)

  //   // save the inboxId for later checking the emails
  //   inboxId = inbox.id
    
  //   emailAddress = inbox.emailAddress;

  //   cy.get('#input-email-upload').clear().type(emailAddress, { force: true });
  //   cy.get('#email-form > .btn').click({force: true})
  //   cy.wrap(inboxId).should('have.length.gte', 1);
  //   cy.waitForLatestEmail(inboxId).then(email => {
  //     // verify we received an email
  //     cy.wrap(email).should('not.be.undefined');
      
      
  
  //     // verify that email contains the code
  //     // cy.wrap(email.body.match(/<a href="(.*?)"/g)[0]).click({ force: true })
  //     // Extract the link from the email body
  //     const link = email.body.match(/<a href="(.*?)"/g)[0];
  //     cy.log(link)
  //     // cy.log(link.slice(77))
  //     // cy.download(link, link.slice(77), 'GET', 'text/plain').then(() => {
  //     //   // Assert that the file was downloaded successfully
  //     //   cy.readFile(`cypress/downloads/${link.slice(77)}`).should('exist');
  //     // });
  //     // Download the file
  //     // cy.request('https://synopsis-2-4.loadbalancer.dicta.org.il/synopsis/ExcelOutput/e3f8a2f5-aa21-446e-a8c9-462c684d7a8a-vert.xlsx').then((response) => {
  //     //   // Assert that the download was successful
  //     //   expect(response.status).to.equal(200);
  //     //   // expect(response.headers['content-type']).to.equal('application/pdf');

  //     //   // Optionally, save the downloaded file or perform further assertions
  //     //   // ...
  //     // });
  //   });
  // });
  
  

  
  // cy.get('#input-email-upload').type('cf72a11c-bad1-409e-983a-2d90eeed757d@mailslurp.com')
  // cy.get('#email-form > .btn').click({force: true})
  // cy.get('.file-upload > .col-sm-3 > .settings > #apply-synopsis').within(()=>{
  //     cy.get('button').click({force: true})
  // })
Cypress.Commands.add('downloadEmailResultsFile',({vertical})=>{
  cy.wait(30000)
  cy.waitForLatestEmail(Cypress.env('inboxId')).then(email => {
    // verify we received an email
    cy.wrap(email).should('not.be.undefined');
    // Extract the link from the email body
    var link
    if(vertical=='var'){
      link = email.body.match(/<a href="(.*?)"/g)[0];
      cy.downloadFile(link.substring(9,link.length - 1),'cypress/downloads/',link.substring(77,link.length - 1))
      .then(()=>{
        return link.substring(77,link.length - 1)
      })
    }else if(vertical=='horiz'){
      link = email.body.match(/<a href="(.*?)"/g)[1];
      cy.downloadFile(link.substring(9,link.length - 1),'cypress/downloads/',link.substring(77,link.length - 1))
      .then(()=>{
        return link.substring(77,link.length - 1)
      })
    }
    
    
    
  });
})

Cypress.Commands.add('waitForRequest',()=>{
  cy.get('div[class="requesting-wrapper container"]',{timeout:180000}).should('not.exist')
})

Cypress.Commands.add('snakeRowsRun',(language,file)=>{
  cy.setLanguageMode({language:language})
  cy.get('input[type="file"]').attachFile(file)
  // cy.contains('..\\'+file).should('exist')
  cy.get('[class*="spinner"]',{timeout:180000}).should('not.be.visible')
  cy.downloadFile('button','התחל')
  cy.get('[class*="spinner"]',{timeout:180000}).should('not.be.visible')
})

Cypress.Commands.add('uploadRequest',({language,status=200,message='',delaySeconds=0})=>{
  cy.setLanguageMode({language:language})
  cy.intercept('**files**', {
      delayMs:1000*delaySeconds,
      statusCode: status
  },).as("url")
  cy.get('input[type="file"]').attachFile('tehilim1mechon-mamre.txt')
  // cy.synopticRun({
  //   language:language,
  //   files:['tehilim1mechon-mamre.txt','tehilim1chabad.txt']
  // })
  
  if(delaySeconds>0){
    Cypress.config('defaultCommandTimeout', 1000*delaySeconds*10)
    cy.get('p').contains(message).should('be.visible')
  }else{
    cy.get('p').contains(message).should('be.visible')
  }
})

Cypress.Commands.add('synopticRequest',({url,language,status=200,message='',delaySeconds=0})=>{
  cy.log('**/api**').pause()
  cy.intercept('**'+url+'**', {
      delayMs:1000*delaySeconds,
      statusCode: status
  },).as("url")
  cy.synopticRun({
    language:language,
    files:['tehilim1mechon-mamre.txt','tehilim1chabad.txt']
  })
  cy.enterEmail()
  
  if(delaySeconds>0){
    cy.get('p',{timeout:1000*delaySeconds}).contains(message).should('be.visible')
  }else{
    cy.get('p').contains(message).should('be.visible')
  }
})

Cypress.Commands.add('snakeRowsRequest',({url,language,status=200,message='',delaySeconds=0})=>{
  cy.removeDownloadsFiles()
  // cy.removeFixturesXLSXFiles()
  let fileName
  cy.intercept( url+'**', {
    delayMs:1000*delaySeconds,
    statusCode: status
  },)
  cy.setLanguageMode({language:language})
  cy.get('#mode-group > :nth-child(2) > span').click({force:true})
  cy.get('input[id="fileInput"]').attachFile('64c7cb70-7ec9-4ac9-ba3a-d784e92db10b-horiz.xlsx')
  cy.get('.snake-rows > #apply-synopsis').click({force: true}).then(()=>{
      if(delaySeconds>0){
        cy.get('[class*="spinner"]',{timeout:1000*delaySeconds}).should('not.be.visible')
      }else{
        cy.get('[class*="spinner"]').should('not.be.visible')
      }
      if(message.length>0){
        cy.contains(message).should('exist')
      }
    })   
  })          
  // cy.downloadFile('a',/הורד את כל התוצאות|Download full results/).then(()=>{
  //   cy.fileName().then(name=>{
  //     fileName=name
  //   })
  // }).then(()=>{
  //   cy.moveFileDownloadsTofixtures(fileName).then(()=>{
  //     cy.setLanguageMode({language:language})
  //     cy.intercept( url+'**', {
  //       delayMs:1000*delaySeconds,
  //       statusCode: status
  //     },)
  //     cy.runSnake({file:'64c7cb70-7ec9-4ac9-ba3a-d784e92db10b-horiz.xlsx',
  //                   numColumnsPerRow:undefined,blankRows:undefined,
  //                   includeSynopsisSnakeFile:undefined
  //               }).then(()=>{
  //                 if(delaySeconds>0){
  //                   cy.get('[class*="spinner"]',{timeout:1000*delaySeconds}).should('not.be.visible')
  //                 }else{
  //                   cy.get('[class*="spinner"]').should('not.be.visible')
  //                 }
  //                 if(message.length>0){
  //                   cy.contains(message).should('exist')
  //                 }
  //               })            
      // cy.goToSnake().then(()=>{
      //   cy.get('input[type="file"]').attachFile(fileName)
      //   cy.get('button').contains(/התחל|Start/).click({force:true})
      //   //cy.snakeRowsRun(language,fileName)
      // }).then(()=>{
      //   if(delaySeconds>0){
      //     cy.get('[class*="spinner"]',{timeout:1000*delaySeconds}).should('not.be.visible')
      //   }else{
      //     cy.get('[class*="spinner"]').should('not.be.visible')
      //   }
      //   if(message.length>0){
      //     cy.contains(message).should('exist')
      //   }
      // })
    // })
  // })        
    // cy.intercept( url+'**', {
    //     delayMs:1000*delaySeconds,
    //     statusCode: status
    // },)
    // cy.goToSnake()
    // cy.setLanguageMode({language:language})
    // cy.get('input[type="file"]').attachFile('res.xlsx')
    //cy.downloadFile('button','התחל')
    //cy.get('button').contains(/התחל|Start/g).click()
    // if(delaySeconds>0){
    //   cy.get('[class*="spinner"]',{timeout:1000*delaySeconds}).should('not.be.visible')
    // }else{
    //   cy.get('[class*="spinner"]').should('not.be.visible')
    // }
    // if(message.length>0){
    //   cy.contains(message).should('exist')
    // }
// })

// Cypress.Commands.add('setLanguageMode',(language)=>{
//     cy.get('body').then(elem => {
//       let languageMode
//       if(language=='Hebrew'){
//         languageMode='he'
//       }else if(language=='English'){
//         languageMode=''
//       }
//       let classAttr
//       if(elem.attr("class").substring(elem.attr("class").length-2,
//       elem.attr("class").length)=='he'){
//         classAttr='he'
//       }else{
//         classAttr=''  
//       }
//       if(classAttr!=languageMode)
//       {
//         cy.log(classAttr+' classAttr '+languageMode+' languageMode')
//         cy.get('a').contains(/^עברית$|^English$/g).click();
//       }
//       if(languageMode=='he'){
//         cy.get('a').contains(/^English$/).should('exist')
//       } else{
//         cy.get('a').contains(/^עברית$/).should('exist')
//       }
//     })
// })

Cypress.Commands.add('testAllRows',(rows,changesOnly)=>{

  function testAllRows(rows,changesOnly){
    if(rows.length==0){
      return true 
    }
    if(changesOnly==true){
      cy.testChangesOnlyRow(rows[0]).then(()=>{
        testAllRows(rows.slice(1),changesOnly)
      })
    } else{
      cy.testRow(rows[0]).then(()=>{
        testAllRows(rows.slice(1),changesOnly)
      })
    }
  }

  
  testAllRows(rows,changesOnly)
})

Cypress.Commands.add('testRow',(row)=>{
  const result=row.pop()
  if (areAllElementsEqual(row)==true){
    cy.wrap(result).should('be.null')
  }else{
    cy.wrap(result).should('not.be.null')
  }
  // let word
  // cy.get(row).children('[class="second-col"]').first().then(col=>{
  //   word=col.text()
  // }).then(()=>{
  //   cy.get(row).children('[class="second-col"]').then(cols=>{
  //     cy.filterLength(cols,word).then(length=>{
  //       if(row.className!='not-all-same'){
  //         cy.wrap(length).should('eq',cols.length)
  //       }else{
  //         cy.wrap(length).should('not.eq',cols.length)
  //       }
  //     })
  //   })
  // })
})

function areAllElementsEqual(array) {
  array = array.map(str => {
    if (str !== null) {
      str=str.replace(new RegExp('['+',:;.'+']', 'g'), '')
      let currentIndex = 0;
      while (currentIndex !== -1) {
        currentIndex = str.indexOf('--', currentIndex);
        if (currentIndex !== -1 && str.charAt(currentIndex+2) ===' ') {
          str = str.replace(new RegExp('--', 'g'), '')
        }else if (currentIndex !== -1 && str.charAt(currentIndex+2) !== ' '){
          str = str.replace(new RegExp('--', 'g'), ' ')
        }
      }
      return str.replace(new RegExp('-', 'g'), ' ')
    }
    return str;
  });
  cy.log(array[0])
  cy.log(array[1])
  return array.every(function(element) {
    return element === array[0];
  });
}


Cypress.Commands.add('testChangesOnlyRow',(row)=>{
  let word
  if(row.className!='page-col-holder'){
    cy.get(row).children('[class="second-col"]').first().then(col=>{
      word=col.text()
    }).then(()=>{
      cy.get(row).children('[class="second-col"]').then(cols=>{
        cy.filterLength(cols,word).then(length=>{
          cy.wrap(length).should('not.eq',cols.length)
        })
      })
    })
  }
  
})

Cypress.Commands.add('filterLength',(array,wordFilter)=>{
  let filteredArray=[]
  for(let i=0;i<array.length;i++){
    if(array[i].textContent==wordFilter){
      filteredArray.push(array[i].textContent)
    }
  }
  return filteredArray.length
})

Cypress.Commands.add('removeDownloadsFiles',()=>{
  cy.exec('npx rimraf cypress/downloads/*')
})

Cypress.Commands.add('removeFixturesXLSXFiles',()=>{
  cy.exec('npx rimraf cypress/fixtures/*.xlsx')
})

Cypress.Commands.add('verticalTable',()=>{
  cy.get('div[class="btn-left"]').click({force:true})
})

Cypress.Commands.add('snakedownloadFile',(file,elem,text)=>{
  let numColumnsPerRow=1
  cy.url().then(url=>{
    cy.window().then(function (win) {
      cy.wait(1000)
      win.addEventListener('mouseover', () => {
        setTimeout(function () {
          win.location.replace(url)
        }, 30000)
      })
      cy.get('.snake-rows > #apply-synopsis').click({force: true})
      const file_name='snaked_'+file
      const file_path = path.join(downloadsFolder,file_name)
      cy.readFile(file_path,'binary').should("exist")
      //cy.get(elem).contains(text).click({force:true})
    })
  })

  
  // //cy.get(elem).contains(text).click({force:true})
  // cy.document().then(function (doc) {
  //   doc.addEventListener('mouseover', () => {
  //     setTimeout(function () {
  //       doc.location.replace("https://synoptic.dicta.org.il/")
  //     }, 15000)
  //   })
  //   cy.get(elem).contains(text).click({force:true})
  //   //cy.get(elem).contains(text).click({force:true})
  // })
  // //cy.wait(10000)
})

Cypress.Commands.add('testVerticalMatrix',(matrix)=>{
  testAllLines(matrix,1)
})

function testAllLines(matrix,line){
  if(line!=matrix.length){
    cy.arrComparison(matrix[line].map(element=>{
      if(element!==null){
        return element.replaceAll(/\(|:|,|-|;|\.|־/g,'')
      }else{
        return element
      }
    }))
    testAllLines(matrix,line+1)
  }
}

function testAllColumn(matrix,col){
  if(matrix[1].length!=col){
    let allLines=[]
    cy.arrComparison(getAllLinesInColumn(matrix,col,0,allLines))
    testAllColumn(matrix,col+1)
  }
}

function getAllLinesInColumn(matrix,col,line,allLines){
  if(line==matrix.length){
    return allLines
  }
  if(matrix[line][col]!=null){
    allLines.push(matrix[line][col].replaceAll(/\(|:|,|-|;|\.|־/g,''))
  }else{
    allLines.push(matrix[line][col])
  }
  return getAllLinesInColumn(matrix,col,line+1,allLines)
}

Cypress.Commands.add('testHorizontalMatrix',(matrix)=>{  
  testAllColumn(matrix,1)
})

Cypress.Commands.add('arrComparison',(arr)=>{
  if(arr[arr.length-1]=='** Major **'||arr[arr.length-1]=='**Minor' 
    || arr[arr.length-1]=='** Nikud'){
      arr.pop()
      expect(arr[0].length).be.gt(0)
      expect(arr.filter(element => element !== arr[0]).length).be.gt(0)
    }else if(arr[arr.length-1]=='** Gap **'){
      arr.pop()
      expect(arr.every(element => element!==null)).be.false
    }else{
      arr.pop()
      expect(arr.every(element=> element=== arr[0])).be.true
      // var regex = new RegExp("[0-9]+");
      // if(!regex.test(temp[1])&&!regex.test(temp[0])){
      //   expect(temp.find(element=> element!== temp[0])).eq('null')
      // }
    }
})

// Cypress.Commands.add('testDownloadFile',(display)=>{
//   let filename
//   let fileName
//   cy.downloadFile('a','הורד את כל התוצאות').then(()=>{
//     if(Cypress.platform.includes('win')){
//       cy.exec('dir cypress\\downloads /s /b').its('stdout').then(stdout=>{
//         fileName=stdout.substring(stdout.lastIndexOf('\\')+1)
//       })
//     }else{
//       cy.exec('ls -R cypress/downloads').its('stdout').then(stdout=>{
//         fileName=stdout.substring(stdout.indexOf(':')+2)
//       })
//     }
//   }).then(()=>{
//     filename = path.join(downloadsFolder,fileName)
//     cy.readFile(filename,'binary',{timeout:15000}).should('not.be.null')
//     const downloadedFilename = path.join(downloadsFolder,fileName)
//     cy.task('readExcelFile', downloadedFilename,{timeout:1800000})
//     // returns an array of lines read from Excel file
//     .then((list) => {
//       if(display=='Horizontal'){
//         cy.testHorizontalMatrix(list)
//       }else if(display=='Vertical'){
//         cy.testVerticalMatrix(list)
//       }
//     })
//   })
// })

Cypress.Commands.add('fileName',()=>{
  if(Cypress.platform.includes('win')){
    cy.exec('dir cypress\\downloads /s /b').its('stdout').then(stdout=>{
      return stdout.substring(stdout.lastIndexOf('\\')+1)
    })
  }else{
    cy.exec('ls -R cypress/downloads').its('stdout').then(stdout=>{
      return stdout.substring(stdout.indexOf(':')+2)
    })
  }
})

Cypress.Commands.add('readExcelFile',(fileName)=>{
  const file_name = path.join(downloadsFolder,fileName)
  cy.readFile(file_name,'binary',{timeout:120000}).should('not.be.null')
  const downloadedFilename = path.join(downloadsFolder,fileName)
  return cy.task('readExcelFile', downloadedFilename,{timeout:1800000})
})

Cypress.Commands.add('getNumColumnsPerRow',()=>{
  let num
  cy.get('div').contains(/^עמודות$|^Columns per row$/g).parent().within(()=>{
    cy.get('span').then(numCul=>{
        num=parseInt(numCul.text())
    })
  }).then(()=>{
    return num
  })
})

Cypress.Commands.add('getBlankRows',()=>{
  let num
  cy.get('div').contains(/^שורות ריקות$|^Blank rows$/g).parent().within(()=>{
    cy.get('span').then(numCul=>{
        num=parseInt(numCul.text())
    })
  }).then(()=>{
    return num
  })
})

Cypress.Commands.add('includeSynopsisSnakeFile',()=>{
  let checked
  cy.get('div').contains(/כלול את הסינופסיס בקובץ|Include the synopsis in the snake file/g)
  .parent().within(()=>{
    cy.get('[type="checkbox"]').then(checkbox=>{
      checked=checkbox.prop('checked')
    })
  }).then(()=>{
    return checked
  })
})

Cypress.Commands.add('moveFileDownloadsTofixtures',(fileName)=>{
  if(Cypress.platform.includes('win')){
    cy.exec('move cypress\\downloads\\'+fileName+' cypress\\fixtures')
  }else{
    cy.exec('mv cypress/downloads/'+fileName+' cypress/fixtures')
  }
})

Cypress.Commands.add('runSnake',({file,numColumnsPerRow,blankRows,includeSynopsisSnakeFile,Language})=>{
  cy.setLanguageMode({language:Language})
  cy.get('#mode-group > :nth-child(2) > span').click({force:true})
  cy.get('input[id="fileInput"]').attachFile(file).then(()=>{
    if(numColumnsPerRow!=undefined){
      cy.moveSliederNumColumnsPerRow(numColumnsPerRow)
    }
    if(blankRows!=undefined){
      cy.moveSliderBlankRows(blankRows)
    }
    if(includeSynopsisSnakeFile==false){
      cy.uncheckIncludeSynopsisSnakeFile()
    }else if(includeSynopsisSnakeFile==true){
      cy.checkIncludeSynopsisSnakeFile()
  
    }
  })
  cy.snakedownloadFile(file,'.snake-rows > #apply-synopsis','החל')
})


Cypress.Commands.add('runSynopticAndSnake',({file1,file2,numColumnsPerRow,
  blankRows,includeSynopsisSnakeFile})=>{
  let fileName
  cy.synopticRun({
    language:'Hebrew',
    files:[file1,file2]
  })
  cy.waitForRequest()
  cy.downloadFile('a','הורד את כל התוצאות').then(()=>{
    cy.fileName().then(name=>{
      fileName=name
    })
  }).then(()=>{
    cy.moveFileDownloadsTofixtures(fileName).then(()=>{
      cy.get('body').then($body=>{
        if($body.find('#home').length==0){
          cy.location().reload()
        }
      }).then(()=>{
        cy.setLanguageMode({language:'Hebrew'})            
        cy.goToSnake().then(()=>{
          if(numColumnsPerRow!=undefined){
            cy.moveSliederNumColumnsPerRow(numColumnsPerRow)
          }
          if(blankRows!=undefined){
            cy.moveSliderBlankRows(blankRows)
          }
          if(includeSynopsisSnakeFile==false){
            cy.uncheckIncludeSynopsisSnakeFile()
          }else {
            cy.checkIncludeSynopsisSnakeFile()

          }
      }).then(()=>{
        cy.snakeRowsRun('Hebrew',fileName)
      })
      })
    })
  })                
})

Cypress.Commands.add('goToSnake',()=>{
  cy.get('div[class="btn-left"]').click({force:true})
  cy.get('span').contains(/^תצוגת קובץ$|^Snake Rows$/g).click({force:true})
  cy.get('div').contains(/כלול את הסינופסיס בקובץ|Include the synopsis in the snake file/g)
  .should('exist')
})

Cypress.Commands.add('moveSliederNumColumnsPerRow',(num)=>{
  cy.get('div').contains(/^עמודות$|^Columns per row$/g).parent().within(()=>{
    cy.get('[class="vue-slider-dot-tooltip-text"]').contains(/^10$/).should('exist')
    // cy.get(':nth-child(2) > .rail-wrap > .px-2')
    cy.url().then(url=>{
      if(url==Cypress.env('DEV_URL')){
        cy.get('#sizzle1689898876520 > .rail-wrap > .px-2 > .vue-slider-rail > .vue-slider-process')
        .trigger('mousedown')
        .trigger('mousemove',4+-(10-num)*20,0,{force: true}).trigger('mouseup')
        .trigger('change',{force:true})
      }else{
        cy.get('[class="vue-slider-process"]')
        .trigger('mousedown')
        .trigger('mousemove',4+-(10-num)*20,0,{force: true})
        .trigger('mouseup',{force:true}).trigger('change',{force:true});

        // .trigger('mousemove',{ clientX: 1 })
        // .trigger('mouseup')
        // .trigger('change',{force:true}).pause()
      }
    })
    .then(()=>{
      cy.get('[class="vue-slider-dot-tooltip-text"]').contains(new RegExp("^" + num + "$")).should('exist')
      cy.get('div[aria-valuetext="'+num+'"]').should('exist')
      
    })
  })
})

Cypress.Commands.add('getSnakeMatrix',()=>{
  let matrix
  let snakeFileName
  cy.fileName().then(snakeFile=>{
    snakeFileName=snakeFile
  }).then(()=>{
    cy.readExcelFile(snakeFileName).then(list=>{
      matrix=list
    })
  }).then(()=>{
    return matrix
  })
})

Cypress.Commands.add('testNumColumnsPerRow',(matrix,columnsPerRow)=>{
  for(let i=0;i<matrix.length-1;i++){
    expect(matrix[i].length).eq(columnsPerRow+1)                     
  }
  expect(matrix[matrix.length-1].length).lt(columnsPerRow+2)
})

Cypress.Commands.add('moveSliderBlankRows',(num)=>{
  cy.get(':nth-child(3) > .rail-wrap > .px-2 > .vue-slider-rail').contains(/^2$/).should('exist')
  cy.get(':nth-child(3) > .rail-wrap > .px-2 > .vue-slider-rail').click(65*(num-1), 0, { force: true })
    //.trigger('mousedown',{force: true})
    //.trigger('click',0,0,{force: true}).invoke('change')
    // .trigger('mouseup',{force: true})
    //.trigger('mouseleave',{force: true})
    //.end()
    
    
  cy.get('[class="vue-slider-dot-tooltip-text"]').contains(new RegExp("^" + num + "$")).should('exist')
})

Cypress.Commands.add('testBlankRows',({matrix,blankRows,numOfFiles,includeSynopsis})=>{
  let modulo
  for(let i=0;i<matrix.length;i++){
    if(includeSynopsis==false){
      modulo=(i+1)%(numOfFiles+blankRows)
      if(modulo>(numOfFiles+1)||modulo==0){
        expect(matrix[i].every(element => element==null)).be.true 
      } 
    }else{
      modulo=(i+1)%(numOfFiles+1+blankRows)
      if(modulo>(numOfFiles+1)||modulo==0){
        expect(matrix[i].every(element => element==null)).be.true 
      } 
    }
                       
  }
})

Cypress.Commands.add('checkIncludeSynopsisSnakeFile',()=>{
  cy.get('div').contains(/כלול את הסינופסיס בקובץ|Include the synopsis in the snake file/g)
  .parent().within(()=>{
    cy.get('[type="checkbox"]').check({force:true})
  })
})

Cypress.Commands.add('uncheckIncludeSynopsisSnakeFile',()=>{
  cy.get('div').contains(/כלול את הסינופסיס בקובץ|Include the synopsis in the snake file/g)
  .parent().within(()=>{
    cy.get('[type="checkbox"]').uncheck({force:true})
  })
})

Cypress.Commands.add('runSynopticAndDownloadFile',({file1, file2,vertical})=>{
  let fileName
  cy.synopticRun({
    language:'Hebrew',
    files:[file1, file2]
  })        
  cy.waitForRequest().then(()=>{
    if(vertical===true){
      cy.verticalTable()
    }
  }).then(()=>{
    cy.downloadFile('a','הורד את כל התוצאות').then(()=>{
      cy.fileName().then(name=>{
        fileName=name
      })
    })
  })
  //cy.get('[class*="spinner"]',{timeout:60000}).should('not.exist')
  //cy.get('[class*="spinner"]',{timeout:60000}).should('not.exist')
 .then(()=>{
    return fileName
  })
})

Cypress.Commands.add('messageForFileWithDifferentText',({title,outlier,description,options})=>{
  cy.get('div[class*="failed-with-message"]').should('be.visible').within(()=>{
    cy.get('p').contains(title).should('be.visible')
    cy.get('[class*=error-messages]').within(()=>{
        cy.get('li').contains(outlier).should('be.visible')
        cy.get('li').contains(description).should('be.visible')
        cy.get('li').contains(options).should('be.visible')
    })
  })
})

Cypress.Commands.add('messageForFileWithOnlyEnglishText',({title,file,removeMessage})=>{
  cy.get('div[class*="uploads-failed-box"]').should('be.visible').within(()=>{
    cy.get('p').contains(title).should('be.visible')
    cy.get('li').contains(file).should('be.visible')
    cy.get('p').contains(removeMessage).should('be.visible')
  })
})

Cypress.Commands.add('serverFailureMessage',(text)=>{
  cy.get('p').contains(text,{timeout:1000*180}).should('be.visible')
})

Cypress.Commands.add('snakeHasSameData',({synopticArr,snakeArr,blankRows,columnsPerRow,numBooks
  ,Synopsis})=>{
    let numRowBoosAndBank
    if(Synopsis==false){
      numRowBoosAndBank=numBooks+blankRows
    }else{
      numRowBoosAndBank=numBooks+blankRows+1
    }
    for(let i=0;i<snakeArr.length;i++){
      if((i%numRowBoosAndBank)<(numRowBoosAndBank-blankRows)){
        for(let j=1;j<columnsPerRow+1;j++){
          if(snakeArr[i][j]!=undefined){
            expect(synopticArr[i-(numRowBoosAndBank*(parseInt(i/numRowBoosAndBank)))]
            [(parseInt(i/numRowBoosAndBank))*columnsPerRow+j]).eq(snakeArr[i][j])
          }
        }
      }
    }
})