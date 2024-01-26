/// <reference types="cypress"/>


const urls = new Map();
// urls.set('live',Cypress.env('LIVE_URL'))
urls.set('dev',Cypress.env('DEV_URL')) 

const sizes= new Map();
sizes.set('desktop',[1000, 660])
//sizes.set('mobile','iphone-x')


urls.forEach((urlValue,urlKey)=>{

    sizes.forEach((sizeValue,sizeKey) => {

    
        describe('requestsTests '+urlKey+' '+sizeKey,()=>{
            var inboxId
            let emailAddress

            
            // before(()=>{
            //     cy.createInbox().then(inbox => {
            //         cy.removeDownloadsFiles()
            //         // verify a new inbox was created
            //         cy.wrap(inbox).should('not.be.undefined');
                
            //         // save the inboxId for later checking the emails
            //         inboxId = inbox.id
            //         Cypress.env('inboxId', inboxId)

                    
            //         emailAddress = inbox.emailAddress;
            //         Cypress.env('emailAddress', emailAddress)
            //     })
            // })
    
            beforeEach(() => {
                cy.screenSize({size:sizeValue})
                cy.visitpage({url:urlValue})
            })

            it('Error message for response with status code 500 when uploading files in hebrew mode',()=>{
               cy.uploadRequest({
                   language:'Hebrew',
                   status:500,
                   message:'העלאת הקובץ tehilim1mechon-mamre.txt נכשלה ',
               })
            })


            it('Error message for response with status code 500 when uploading files in english mode',()=>{
               cy.uploadRequest({
                   language:'English',
                   status:500,
                   message:'Failed to upload tehilim1mechon-mamre.txt ',
               })
            })


            it('Error message for response with sa delay of 15 seconds when uploading files in hebrew mode',()=>{
               cy.uploadRequest({
                   language:'Hebrew',
                   message:'העלאת הקובץ tehilim1mechon-mamre.txt נכשלה ',
                   delaySeconds: 10
               })
            })

            it('Error message for response with sa delay of 15 seconds when uploading files in english mode',()=>{
               cy.uploadRequest({
                   language:'English',
                   message:'Failed to upload tehilim1mechon-mamre.txt ',
                   delaySeconds: 10
               })
            })


            // it('Error message for response with status code 500 when clicking the run button of synoptic page'+
            // ' in hebrew mode',()=>{
            //    cy.synopticRequest({
            //        language:'Hebrew',
            //        status:500,
            //        message:'ארעה תקלה. אנא נסה שוב. במקרה שהבעיה חוזרת נסה שוב מאוחר יותר',
            //    })
            // })
        
            // it('Error message for response with status code 500 when clicking the run button of synoptic page'+
            // ' in english mode',()=>{
            //     cy.synopticRequest({
            //         language:'English',
            //         status:500,
            //         message:'Server failure. Please try again, if the problem persists please come back '+
            //         'later and try again.',
            //     })
            // })
        
            // it('Error message for response with a delay of 15 seconds when clicking the run button'+
            // ' of synoptic page in hebrew mode',()=>{
            //     cy.synopticRequest({
            //         language:'Hebrew',
            //         message:'ארעה תקלה. אנא נסה שוב. במקרה שהבעיה חוזרת נסה שוב מאוחר יותר',
            //         delaySeconds: 15
            //     })
            // })
        
            // it('Error message for response with a delay of 15 seconds when clicking the run button'+
            // ' of synoptic page in english mode',()=>{
            //     cy.synopticRequest({
            //         language:'English',
            //         message:'Server failure. Please try again, if the problem persists please come back '+
            //         'later and try again.',
            //         delaySeconds: 15
            //     })
            // })
        
            // it('Error message for /snakeApi/upload response with status code 500 when clicking the run button of synoptic page'+
            // ' in hebrew mode',()=>{
            //    cy.snakeRowsRequest({
            //        url:'/snakeApi/upload',
            //        language:'Hebrew',
            //        status:500,
            //        message:'אופס יש לנו בעיה/נסו שנית, או בקרו באתר מאוחר יותר',
            //    })
            // })
        
            // it('Error message for /snakeApi/upload response with status code 500 when clicking the run button of synoptic page'+
            // ' in english mode',()=>{
            //     cy.snakeRowsRequest({
            //         url:'/snakeApi/upload',
            //         language:'English',
            //         status:500,
            //         message:'Oops. Something went wrong Please try again later',
            //     })
            // })
        
            // it('Error message for /snakeApi/upload response with a delay of 2 minutes when clicking the run button'+
            // ' of synoptic page in hebrew mode',()=>{
            //     cy.snakeRowsRequest({
            //         url:'/snakeApi/upload',
            //         language:'Hebrew',
            //         message:'אופס יש לנו בעיה/נסו שנית, או בקרו באתר מאוחר יותר',
            //         delaySeconds: 60*2
            //     })
            // })
        
            // it('Error message for /snakeApi/upload response with a delay of 2 minutes when clicking the run button'+
            // ' of synoptic page in english mode',()=>{
            //     cy.snakeRowsRequest({
            //         url:'/snakeApi/upload',
            //         language:'English',
            //         message:'Oops. Something went wrong Please try again later',
            //         delaySeconds: 60*2
            //     })
            // })
        
      
    
        
        })
    })
})
