/// <reference types="cypress"/>



////run tests on requests from synoptic run some in hebrew mode and english mode

describe('RequestsTests',()=>{
    
    beforeEach(() => {
        cy.visit('https://synoptic.dicta.org.il/')
    })
  

    it('Error message for response with status code 500 when clicking the run button of synoptic page'+
    ' in hebrew mode',()=>{
       cy.synopticRequest({
           language:'Hebrew',
           status:500,
           message:'Server failure. Please try again, if the problem persists please come back '+
           'later and try again.',
       })
    })

    it('Error message for response with status code 500 when clicking the run button of synoptic page'+
    ' in english mode',()=>{
        cy.synopticRequest({
            language:'English',
            status:500,
            message:'Server failure. Please try again, if the problem persists please come back '+
            'later and try again.',
        })
    })

    it('Error message for response with a delay of 15 seconds when clicking the run button'+
    ' of synoptic page in hebrew mode',()=>{
        cy.synopticRequest({
            language:'Hebrew',
            message:'Server failure. Please try again, if the problem persists please come back '+
            'later and try again.',
            delaySeconds: 15
        })
    })

    it('Error message for response with a delay of 15 seconds when clicking the run button'+
    ' of synoptic page in english mode',()=>{
        cy.synopticRequest({
            language:'English',
            message:'Server failure. Please try again, if the problem persists please come back '+
            'later and try again.',
            delaySeconds: 15
        })
    })

    
})