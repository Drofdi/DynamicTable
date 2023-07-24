"use strict";

const tableBodyHead = document.querySelector('.table__body__head')
const tableBody = document.querySelector('.table__body')

const tableBodyContent = document.querySelector('.table__body__body')
const tableHeadRow = document.querySelector('.table__body__head__row')

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
thS[1].classList.add('dragbleTh')

/* for(let thElem of thS){
  thElem.classList.add('dragbleTh')
} */


const dragbleTh = document.querySelector('.dragbleTh')
dragbleTh.addEventListener('mousedown', startDrag)

function startDrag(event){
  if(event.target === this){
    console.log('th')
    isDragNow = true
    tableBody.style.userSelect = 'none'
    xStartDrag = event.clientX
    dragbleTh.addEventListener('mousemove', moveDrag)
    dragbleTh.addEventListener('mouseup', endDrag)
  }
}

function moveDrag(event){
  if (isDragNow){
    xEndDrag = event.clientX

  }
}

function endDrag(){
  tableBody.style.userSelect = 'auto'
  if (xStartDrag < xEndDrag){
    columnIndex = thS.indexOf(dragbleTh)
    console.log(columnIndex)
  }
}




/* console.log(Array.from(tableBodyHead.getElementsByTagName('th')).indexOf(dragbleTh))

function endDrag() {
  if (xStartDrag < xEndDrag) {
    const columnIndex = Array.from(tableBodyHead.getElementsByTagName('th')).indexOf(dragbleTh) // здесь можно использовать вместо indexOf(dragbleTh) например indexOf(CeurrentTarget через event таргер и отдельную переменную)
    const rows = Array.from(tableBodyContent.getElementsByTagName('tr'))
    dragbleTh.remove()
    rows.forEach((row) => {
      const cells = Array.from(row.getElementsByTagName('td'))
      cells[columnIndex].remove()
    });
  }
  isDragNow = false
} */
















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











