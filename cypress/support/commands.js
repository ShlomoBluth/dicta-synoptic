
import 'cypress-file-upload';

const path = require('path')

let downloadsFolder = Cypress.config('downloadsFolder')



Cypress.Commands.add('synopticRun',({language,files})=>{
  cy.setLanguageMode({language:language})
  // cy.get('input[type="file"]').attachFile(files, { subjectType: 'drag-n-drop' })
  // cy.log(files[files.length-1]).pause()
  for(let i=0;i<files.length;i++){
    cy.get('input[type="file"]').attachFile(files[i], { subjectType: 'drag-n-drop' })
  }
  cy.get('div[class="button-holder-box"]').within(()=>{
      cy.get('button').click({force: true})
  })
})

Cypress.Commands.add('waitForRequest',()=>{
  cy.get('div[class="requesting-wrapper container"]',{timeout:180000}).should('not.exist')
})

Cypress.Commands.add('snakeRowsRun',(language,file)=>{
  cy.setLanguageMode({language:language})
  cy.get('input[type="file"]').attachFile(file)
  cy.get('[class*="spinner"]',{timeout:180000}).should('not.be.visible')
  cy.downloadFile('button','התחל')
  cy.get('[class*="spinner"]',{timeout:180000}).should('not.be.visible')
})

Cypress.Commands.add('synopticRequest',({language,status=200,message='',delaySeconds=0})=>{
  cy.intercept('POST', '**/api/**', {
      delayMs:1000*delaySeconds,
      statusCode: status
  },)
  cy.synopticRun({
    language:language,
    files:['tehilim1mechon-mamre.txt','tehilim1chabad.txt']
})
  if(delaySeconds>0){
    cy.get('p',{timeout:1000*delaySeconds}).contains(message).should('be.visible')
  }else{
    cy.get('p').contains(message).should('be.visible')
  }
})

Cypress.Commands.add('snakeRowsRequest',({url,language,status=200,message='',delaySeconds=0})=>{
  cy.removeDownloadsFiles()
  cy.removeFixturesXLSXFiles()
  let fileName
  cy.synopticRun({
    language:language,
    files:['tehilim1mechon-mamre.txt','tehilim1chabad.txt']
  })
  cy.waitForRequest()
  cy.downloadFile('a',/הורד את כל התוצאות|Download full results/).then(()=>{
    cy.fileName().then(name=>{
      fileName=name
    })
  }).then(()=>{
    cy.moveFileDownloadsTofixtures(fileName).then(()=>{
      cy.setLanguageMode({language:language})
      cy.intercept( url+'**', {
        delayMs:1000*delaySeconds,
        statusCode: status
      },)            
      cy.goToSnake().then(()=>{
        cy.get('input[type="file"]').attachFile(fileName)
        cy.get('button').contains(/התחל|Start/).click({force:true})
        //cy.snakeRowsRun(language,fileName)
      }).then(()=>{
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
  })        
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
})

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
      cy.testChangesOnlyRow(rows[0]).then(rew=>{
        testAllRows(rows.slice(1),changesOnly)
      })
    } else{
      cy.testRow(rows[0]).then(rew=>{
        testAllRows(rows.slice(1),changesOnly)
      })
    }
  }

  
  testAllRows(rows,changesOnly)
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

Cypress.Commands.add('downloadFile',(elem,text)=>{
  cy.url().then(url=>{
    cy.window().then(function (win) {
      win.addEventListener('mouseover', () => {
        setTimeout(function () {
          win.location.replace(url)
        }, 15000)
      })
      cy.get(elem).contains(text).click({force: true})
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
  //   cy.get(elem).contains(text).click()
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
  //cy.log(fileName).pause()
  let filename = path.join(downloadsFolder,fileName)
  cy.readFile(filename,'binary',{timeout:120000}).should('not.be.null')
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
          }else{
            cy.checkIncludeSynopsisSnakeFile()

          }
      }).then(()=>{
        cy.wait(10000)
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
    cy.get('.vue-slider-dot')
    .trigger('mousedown')
    .trigger('mousemove',4+-(10-num)*11.6,0,{force: true}).trigger('mouseup')
    .trigger('change',{force:true})
    cy.get('[class="vue-slider-dot-tooltip-text"]').contains(new RegExp("^" + num + "$")).should('exist')
    cy.get('div[aria-valuetext="'+num+'"]').should('exist')
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
  cy.get('div').contains(/^שורות ריקות$|^Blank rows$/g).parent().within(()=>{
    cy.get('[class="vue-slider-dot-tooltip-text"]').contains(/^2$/).should('exist')
    cy.get('.vue-slider-rail').click(50*(num-1), 0, { force: true })
    //.trigger('mousedown',{force: true})
    //.trigger('click',0,0,{force: true}).invoke('change')
    // .trigger('mouseup',{force: true})
    //.trigger('mouseleave',{force: true})
    //.end()
    
    
    cy.get('[class="vue-slider-dot-tooltip-text"]').contains(new RegExp("^" + num + "$")).should('exist')
  })
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