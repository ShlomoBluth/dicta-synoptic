///<reference types="cypress"/>

//run basic tests on synoptic
describe('basicTests',()=>{

    beforeEach(() => {
        cy.visit('https://synoptic.dicta.org.il/')
    })

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
})