
import 'cypress-file-upload';

Cypress.Commands.add('synopticRun',(language)=>{
  cy.setLanguageMode(language)
    cy.get('input[type="file"]').attachFile('חולין.txt');
    cy.get('input[type="file"]').attachFile('תמיד.txt');
    cy.get(':nth-child(3) > .bt-close > img').click()
    cy.get('div[class="button-holder-box"]').within(()=>{
        cy.get('button').click()
    })

})

Cypress.Commands.add('snakeRowsRun',(language)=>{
  cy.setLanguageMode(language)
  cy.get('#btn-radios-1 > :nth-child(2)').click()
  cy.get('input[type="file"]').attachFile('res.xlsx')
  cy.get('.px-4 > .btn').click()
})

Cypress.Commands.add('synopticRequest',({language,status=200,message='',delaySeconds=0})=>{
  cy.intercept('POST', '/api', {
      delayMs:1000*delaySeconds,
      statusCode: status
  },)
  cy.synopticRun(language)
  if(delaySeconds>0){
    cy.get('p',{timeout:1000*delaySeconds}).contains(message).should('be.visible')
  }else{
    ccy.get('p').contains(message).should('be.visible')
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