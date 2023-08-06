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


function addFocusStyleTh(){
  let thContents = document.querySelectorAll('.thContent')

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
}
addFocusStyleTh()


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
let currentDraggedDiv = null;

let thS = document.querySelectorAll('th')

for(let thElem of thS){
  thElem.addEventListener('mousedown', startDrag)
  thElem.classList.add('dragbleTh')
}

function startDrag(event){
  let thS = document.querySelectorAll('th')
  if(event.target === this && this.classList.contains('dragbleTh')){

    currentDraggedDiv = event.target.cloneNode(true)
    currentDraggedDiv.style.position = 'fixed'
    currentDraggedDiv.style.opacity = '0.5'
    currentDraggedDiv.style.pointerEvents = 'none'
    document.body.appendChild(currentDraggedDiv)

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
    currentDraggedDiv.style.left = event.clientX - currentDraggedDiv.offsetWidth / 2 + 'px';
    currentDraggedDiv.style.top = event.clientY - currentDraggedDiv.offsetHeight / 2 + 'px';
    xEndDrag = event.clientX
  }
}


function endDrag(){
  let columnsHead = tableHeadRow.querySelectorAll('th')
  if (isDragNow){
    let newColumnIndex = getColumnIndexAfterMouseUp(xEndDrag)
    let rowsBody = tableBodyContent.querySelectorAll('tr')
      if (columnIndex !== newColumnIndex){
        console.log(columnIndex)
        console.log(newColumnIndex)
        let newTh = document.createElement('th')
        newTh.addEventListener('mousedown', startDrag)
        newTh.classList.add('dragbleTh')
        newTh.innerHTML = columnsHead[columnIndex].innerHTML

        if(columnIndex < newColumnIndex){
          columnsHead[newColumnIndex].insertAdjacentElement('afterend', newTh)
          columnsHead[columnIndex].remove()
        }
        if(columnIndex > newColumnIndex){
          columnsHead[newColumnIndex].insertAdjacentElement('beforebegin', newTh)
          columnsHead[columnIndex].remove()
        }

          for(let row of rowsBody){
            let columnsBody = row.querySelectorAll('td')
            let newTd = document.createElement('td')
            newTd.innerHTML = columnsBody[columnIndex].innerHTML

            if(columnIndex < newColumnIndex){
              columnsBody[newColumnIndex].insertAdjacentElement('afterend', newTd)
              columnsBody[columnIndex].remove()
            }
            if(columnIndex > newColumnIndex){
              columnsBody[newColumnIndex].insertAdjacentElement('beforebegin', newTd)
              columnsBody[columnIndex].remove()
            }            
          }
          addFocusStyleTh()
      }
      currentDraggedDiv.remove();
      currentDraggedDiv = null;
      isDragNow = false
      tableBody.style.userSelect = 'auto'
      window.removeEventListener('mousemove', moveDrag)
      window.removeEventListener('mouseup', endDrag)
  }
}


function getColumnIndexAfterMouseUp(mouseX){
  let columnsHead = tableHeadRow.querySelectorAll('th')
  let newColumnIndex = columnIndex
  for (let i = 0; i < columnsHead.length; i++){
    if (mouseX < columnsHead[i].getBoundingClientRect().left + columnsHead[i].getBoundingClientRect().width){
      newColumnIndex = i
      break
    }
  }
  return newColumnIndex
}



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

