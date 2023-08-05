"use strict";

const tableBodyHead = document.querySelector('.table__main__head')
const tableBody = document.querySelector('.table__main')

const tableBodyContent = document.querySelector('.table__main__body')
const tableHeadRow = document.querySelector('.table__main__head__row')

const focusBackColor = 'rgb(214, 241, 173)'
const resizbleDiv = '<div class="changerSize" contenteditable="false"></div>'

function addDatasOnTable(columnsInTable, rowsInBody){
  for (let i = 0; i < columnsInTable; i++){
    let thColumnsInRowHead = document.createElement('th')
    tableHeadRow.appendChild(thColumnsInRowHead)

    let thContent = document.createElement('span')
    thColumnsInRowHead.appendChild(thContent)
    thContent.classList.add('thContent')
    thContent.setAttribute('contenteditable', 'true')

    thContent.innerHTML = i
    thColumnsInRowHead.insertAdjacentHTML('beforeend', resizbleDiv);
  }



  for (let i = 0; i < rowsInBody; i++){
    let trRowInBodyTable = document.createElement('tr')
    tableBodyContent.appendChild(trRowInBodyTable)
      for(let j = 0; j < columnsInTable; j++){
        let tdColumnsInRowBody = document.createElement('td')
        trRowInBodyTable.appendChild(tdColumnsInRowBody)
        tdColumnsInRowBody.innerHTML = j
        tdColumnsInRowBody.setAttribute('contenteditable', 'true')
      }
  }
}

addDatasOnTable(5,4)

const thContents = document.querySelectorAll('.thContent')

for(let thElem of thContents){
  thElem.addEventListener('focus',changeBackColorFocus)
  thElem.addEventListener('blur',changeBackColorBlur)
}

function changeBackColorFocus(){
  this.parentElement.style.backgroundColor = focusBackColor
}

function changeBackColorBlur(){
  this.parentElement.style.backgroundColor = tableBody.style.backgroundColor
}


tableBodyHead.addEventListener('mousedown', startResize)
document.addEventListener('mousemove', moveResize)
document.addEventListener('mouseup', stopResize)

tableBodyHead.addEventListener('mouseover', changeStyleResizbleBorder)
tableBodyHead.addEventListener('mouseout', removeStyleResizbleBorder)

//dragble








let xStartDrag
let xEndDrag
let isDragNow = false
let columnIndex

let thS = document.querySelectorAll('th')
/* thS[1].classList.add('dragbleTh') */

for(let thElem of thS){
  thElem.addEventListener('mousedown', startDrag)
  thElem.classList.add('dragbleTh')
}

function startDrag(event){
  if(event.target === this && this.classList.contains('dragbleTh')){
    columnIndex = Array.from(thS).indexOf(this)
    isDragNow = true
    tableBody.style.userSelect = 'none'
    xStartDrag = event.clientX
    window.addEventListener('mousemove', moveDrag)
    window.addEventListener('mouseup', endDrag)
  }
}

function moveDrag(event){
  if (isDragNow){
    xEndDrag = event.clientX
  }
}


let columnsHead = tableHeadRow.querySelectorAll('th')
function endDrag(){
  if (isDragNow){
    let newColumnIndex = getColumnIndexAfterMouseUp(xEndDrag)
    let rowsBody = tableBodyContent.querySelectorAll('tr')
      if (columnIndex !== newColumnIndex){
        let tempHeadColumnInner = columnsHead[columnIndex].innerHTML
        columnsHead[columnIndex].innerHTML = columnsHead[newColumnIndex].innerHTML
        columnsHead[newColumnIndex].innerHTML = tempHeadColumnInner

          for(let row of rowsBody){
            let columnsBody = row.querySelectorAll('td')

            let tempBodyColumnInner = columnsBody[columnIndex].innerHTML
            columnsBody[columnIndex].innerHTML = columnsBody[newColumnIndex].innerHTML
            columnsBody[newColumnIndex].innerHTML = tempBodyColumnInner
          }


      }

      isDragNow = false
      tableBody.style.userSelect = 'auto'
      window.removeEventListener('mousemove', moveDrag)
      window.removeEventListener('mouseup', endDrag)
  }
}


//       // Получаем все строки таблицы
//       const rows = document.querySelectorAll('.table__main__body tr');

//       // Перебираем каждую строку и обмениваем столбцы
//       for (const row of rows) {
//         const columns = row.querySelectorAll('td');

//         // Обмен столбцов
//         const temp = columns[columnIndex].innerHTML;
//         columns[columnIndex].innerHTML = columns[newColumnIndex].innerHTML;
//         columns[newColumnIndex].innerHTML = temp;
//       }

//       // Теперь перемещаем столбцы в заголовке таблицы
//       const headers = document.querySelectorAll('.table__main__head__row th');
//       const tempHeader = headers[columnIndex].innerHTML;
//       headers[columnIndex].innerHTML = headers[newColumnIndex].innerHTML;
//       headers[newColumnIndex].innerHTML = tempHeader;
//     }

//     isDragNow = false;
//     tableBody.style.userSelect = 'auto';
//     window.removeEventListener('mousemove', moveDrag);
//     window.removeEventListener('mouseup', endDrag);
//   }
// } */

function getColumnIndexAfterMouseUp(mouseX){
  let newColumnIndex = columnIndex
  for (let i = 0; i < columnsHead.length; i++){
    if (mouseX < columnsHead[i].getBoundingClientRect().left + columnsHead[i].getBoundingClientRect().width){
      newColumnIndex = i
      break
    }
  }
  return newColumnIndex
}


// function endDrag(event) {
//   if (isDragNow) {
//     let trsBody = Array.from(tableBodyContent.querySelectorAll('tr'))
//     let newColumnIndex = getColumnIndexAfterDrop(event.clientX)

//     if (columnIndex !== newColumnIndex) {
//       let columns = Array.from(tableHeadRow.querySelectorAll('th'))
//       let columnToMove = columns.splice(columnIndex, 1)[0]
//       columns.splice(newColumnIndex, 0, columnToMove)

//       for (let tr of trsBody) {
//         let cells = Array.from(tr.querySelectorAll('td'))
//         let cellToMove = cells.splice(columnIndex, 1)[0]
//         cells.splice(newColumnIndex, 0, cellToMove)

//         for (let i = 0; i < cells.length; i++) {
//           tr.appendChild(cells[i])
//         }
//       }

//       for (let i = 0; i < columns.length; i++) {
//         tableHeadRow.appendChild(columns[i])
//       }
//     }
//   }

//   isDragNow = false
//   window.removeEventListener('mousemove', moveDrag)
//   window.removeEventListener('mouseup', endDrag)
// }

// function getColumnIndexAfterDrop(mouseX) {
//   let columns = Array.from(tableHeadRow.querySelectorAll('th'));
//   let newColumnIndex = columnIndex;

//   for (let i = 0; i < columns.length; i++) {
//     if (mouseX < columns[i].getBoundingClientRect().left + columns[i].getBoundingClientRect().width) {
//       newColumnIndex = i;
//       break;
//     }
//   }

//   return newColumnIndex;
// }




// let xStartDrag
// let xEndDrag
// let isDragNow = false
// let columnIndex

// let thS = document.querySelectorAll('th')
// /* thS[1].classList.add('dragbleTh') */

// for(let thElem of thS){
//   thElem.addEventListener('mousedown', startDrag)
//   thElem.classList.add('dragbleTh')
// }

// function startDrag(event){
//   if(event.target === this && this.classList.contains('dragbleTh')){
//     columnIndex = Array.from(thS).indexOf(this)
//     isDragNow = true
//     tableBody.style.userSelect = 'none'
//     xStartDrag = event.clientX
//     window.addEventListener('mousemove', moveDrag)
//     window.addEventListener('mouseup', endDrag)
//   }
// }

// function moveDrag(event){
//   if (isDragNow){
//     xEndDrag = event.clientX

//     tableBody.style.userSelect = 'auto'
//   }
// }

// function endDrag(event) {
//   if (isDragNow) {
//     let trsBody = Array.from(tableBodyContent.querySelectorAll('tr'))
//     let newColumnIndex = getColumnIndexAfterDrop(event.clientX)

//     if (columnIndex !== newColumnIndex) {
//       let columns = Array.from(tableHeadRow.querySelectorAll('th'))
//       let columnToMove = columns.splice(columnIndex, 1)[0]
//       columns.splice(newColumnIndex, 0, columnToMove)

//       for (let tr of trsBody) {
//         let cells = Array.from(tr.querySelectorAll('td'))
//         let cellToMove = cells.splice(columnIndex, 1)[0]
//         cells.splice(newColumnIndex, 0, cellToMove)

//         for (let i = 0; i < cells.length; i++) {
//           tr.appendChild(cells[i])
//         }
//       }

//       for (let i = 0; i < columns.length; i++) {
//         tableHeadRow.appendChild(columns[i])
//       }
//     }
//   }

//   isDragNow = false
//   this.removeEventListener('mousemove', moveDrag)
//   this.removeEventListener('mouseup', endDrag)
// }

// function getColumnIndexAfterDrop(mouseX) {
//   let columns = Array.from(tableHeadRow.querySelectorAll('th'))
//   let newColumnIndex = columnIndex

//   for (let i = 0; i < columns.length; i++) {
//     if (mouseX > columns[i].getBoundingClientRect().left + columns[i].getBoundingClientRect().width / 2) {
//       newColumnIndex = i + 1
//     }
//   }

//   return newColumnIndex
// }












//resize

let xStartResize
let isResizeNow = false
let widthNow
let currentTargetResize

function startResize(event){
  let targetElement = event.target
  if (targetElement.classList.contains('changerSize')){
    tableBody.style.userSelect = 'none'
    isResizeNow = true
    xStartResize = event.clientX
    widthNow = parseInt(getComputedStyle(targetElement.parentElement).width, 10)
    currentTargetResize = targetElement.parentElement
  }
}

function moveResize(event) {
  if (isResizeNow) {
    let width = widthNow + event.clientX - xStartResize
    currentTargetResize.style.width = width + 'px'
  }
}

function stopResize() {
  isResizeNow = false
  tableBody.style.userSelect = 'auto'
  window.removeEventListener('mousemove', moveResize)
  window.removeEventListener('mouseup', stopResize)
}

function changeStyleResizbleBorder(event){
  let targetElement = event.target
  if (targetElement.classList.contains('changerSize')){
    targetElement.parentElement.style.borderRight = '1px solid blue'
  }
}

function removeStyleResizbleBorder(event){
  let targetElement = event.target
  if (targetElement.classList.contains('changerSize')){
    targetElement.parentElement.style.borderRight = tableBody.style.border
  }
}











