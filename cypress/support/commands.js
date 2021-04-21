
import 'cypress-file-upload';



Cypress.Commands.add('synopticRun',({language,files})=>{
  cy.setLanguageMode(language)
  // cy.get('input[type="file"]').attachFile(files, { subjectType: 'drag-n-drop' })
  // cy.log(files[files.length-1]).pause()
  for(let i=0;i<files.length;i++){
    cy.get('input[type="file"]').attachFile(files[i], { subjectType: 'drag-n-drop' })
  }
  cy.get('div[class="button-holder-box"]').within(()=>{
      cy.get('button').click()
  })
})

Cypress.Commands.add('waitForRequest',()=>{
  cy.get('div[class="requesting-wrapper container"]',{timeout:180000}).should('not.exist')
})

Cypress.Commands.add('snakeRowsRun',(language)=>{
  cy.setLanguageMode(language)
  cy.get('#btn-radios-1 > :nth-child(2)').click()
  cy.get('input[type="file"]').attachFile('res.xlsx')
  cy.get('.px-4 > .btn').click()
})

Cypress.Commands.add('synopticRequest',({language,status=200,message='',delaySeconds=0})=>{
  cy.intercept('POST', '**/api/**', {
      delayMs:1000*delaySeconds,
      statusCode: status
  },)
  cy.synopticRun(language)
  if(delaySeconds>0){
    cy.get('p',{timeout:1000*delaySeconds}).contains(message).should('be.visible')
  }else{
    cy.get('p').contains(message).should('be.visible')
  }
})

Cypress.Commands.add('snakeRowsRequest',({url,language,status=200,message='',delaySeconds=0})=>{
    cy.intercept( url+'**', {
        delayMs:1000*delaySeconds,
        statusCode: status
    },)
    cy.snakeRowsRun(language)
    if(delaySeconds>0){
      cy.get('[class*="spinner"]',{timeout:1000*delaySeconds}).should('not.be.visible')
    }else{
      cy.get('[class*="spinner"]').should('not.be.visible')
    }
    if(message.length>0){
      cy.contains(message).should('exist')
    }
})

Cypress.Commands.add('setLanguageMode',(language)=>{
    cy.get('body').then(elem => {
      let languageMode
      if(language=='Hebrew'){
        languageMode='he'
      }else if(language=='English'){
        languageMode=''
      }
      let classAttr
      if(elem.attr("class").substring(elem.attr("class").length-2,
      elem.attr("class").length)=='he'){
        classAttr='he'
      }else{
        classAttr=''  
      }
      if(classAttr!=languageMode)
      {
        cy.get('a').contains(/^עברית$|^English$/g).click();
      }
      if(languageMode=='he'){
        cy.get('a').contains(/^English$/).should('exist')
      } else{
        cy.get('a').contains(/^עברית$/).should('exist')
      }
    })
})

Cypress.Commands.add('testAllRows',(rows)=>{
  function testAllRows(rows){
    if(rows.length==0){
      return true 
    }
    cy.testRow(rows[0]).then(rew=>{
      //cy.wrap(rew).should(true)
      cy.testAllRows(rows.slice(1))
    })
  }
  testAllRows(rows)
})

Cypress.Commands.add('testRow',(row)=>{
  let word
  cy.get(row).children('[class="second-col"]').first().then(col=>{
    word=col.text()
  }).then(()=>{
    cy.get(row).children('[class="second-col"]').then(cols=>{
      cy.filterLength(cols,word).then(length=>{
        if(row.className!='not-all-same'){
          cy.wrap(length).should('eq',cols.length)
        }else{
          cy.wrap(length).should('not.eq',cols.length)
        }
      })
    })
  })
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