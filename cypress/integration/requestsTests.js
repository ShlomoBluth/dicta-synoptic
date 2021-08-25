/// <reference types="cypress"/>



////run tests on requests from synoptic run some in hebrew mode and english mode

describe('RequestsTests',()=>{
    
    beforeEach(() => {
        //cy.screenSize({size:size})
        cy.visitpage({url:'https://synoptic.dicta.org.il/'})
    })
  

    it('Error message for response with status code 500 when clicking the run button of synoptic page'+
    ' in hebrew mode',()=>{
       cy.synopticRequest({
           language:'Hebrew',
           status:500,
           message:'ארעה תקלה. אנא נסה שוב. במקרה שהבעיה חוזרת נסה שוב מאוחר יותר',
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
            message:'ארעה תקלה. אנא נסה שוב. במקרה שהבעיה חוזרת נסה שוב מאוחר יותר',
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

    it('Error message for /snakeApi/upload response with status code 500 when clicking the run button of synoptic page'+
    ' in hebrew mode',()=>{
       cy.snakeRowsRequest({
           url:'/snakeApi/upload',
           language:'Hebrew',
           status:500,
           message:'אופס יש לנו בעיה/נסו שנית, או בקרו באתר מאוחר יותר',
       })
    })

    it('Error message for /snakeApi/upload response with status code 500 when clicking the run button of synoptic page'+
    ' in english mode',()=>{
        cy.snakeRowsRequest({
            url:'/snakeApi/upload',
            language:'English',
            status:500,
            message:'Oops. Something went wrong Please try again later',
        })
    })

    it('Error message for /snakeApi/upload response with a delay of 2 minutes when clicking the run button'+
    ' of synoptic page in hebrew mode',()=>{
        cy.snakeRowsRequest({
            url:'/snakeApi/upload',
            language:'Hebrew',
            message:'אופס יש לנו בעיה/נסו שנית, או בקרו באתר מאוחר יותר',
            delaySeconds: 60*2
        })
    })

    it('Error message for /snakeApi/upload response with a delay of 2 minutes when clicking the run button'+
    ' of synoptic page in english mode',()=>{
        cy.snakeRowsRequest({
            url:'/snakeApi/upload',
            language:'English',
            message:'Oops. Something went wrong Please try again later',
            delaySeconds: 60*2
        })
    })

    it('Error message for /snakeApi/poll response with status code 500 when clicking the run button of synoptic page'+
    ' in hebrew mode',()=>{
       cy.snakeRowsRequest({
           url:'/snakeApi/poll/',
           language:'Hebrew',
           status:500,
           message:'אופס יש לנו בעיה/נסו שנית, או בקרו באתר מאוחר יותר',
       })
    })

    it('Error message for /snakeApi/poll response with status code 500 when clicking the run button of synoptic page'+
    ' in english mode',()=>{
        cy.snakeRowsRequest({
            url:'/snakeApi/poll/',
            language:'English',
            status:500,
            message:'Oops. Something went wrong Please try again later',
        })
    })

    it('Error message for /snakeApi/poll response with a delay of 10 minutes when clicking the run button'+
    ' of synoptic page in hebrew mode',()=>{
        cy.snakeRowsRequest({
            url:'/snakeApi/poll/',
            language:'Hebrew',
            message:'אופס יש לנו בעיה/נסו שנית, או בקרו באתר מאוחר יותר',
            delaySeconds: 60*10
        })
    })

    it('Error message for /snakeApi/poll response with a delay of 10 minutes when clicking the run button'+
    ' of synoptic page in english mode',()=>{
        cy.snakeRowsRequest({
            url:'/snakeApi/poll/',
            language:'English',
            message:'Oops. Something went wrong Please try again later',
            delaySeconds: 60*10
        })
    })
    
})