
import 'cypress-file-upload';


Cypress.Commands.add('synopticRequest',({language,status=200,message='',delaySeconds=0})=>{
    cy.intercept('POST', '/api', {
        delayMs:1000*delaySeconds,
        statusCode: status
    },).as('api')
    cy.setLanguageMode(language)
    cy.get('input[type="file"]').attachFile('חולין.txt');
    cy.get('input[type="file"]').attachFile('תמיד.txt');
    cy.get('div[class="button-holder-box"]').within(()=>{
        cy.get('button').click()
    })
    cy.get('p',{timeout:1000*delaySeconds+30000}).contains(message).should('be.visible')
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