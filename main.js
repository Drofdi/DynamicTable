"use strict";

const tableBodyHead = document.querySelector('.table__body__head')
const tableBody = document.querySelector('.table__body')
const dragbleTh = document.querySelector('.dragbleTh')
const tableBodyContent = document.querySelector('.table__body__body')

tableBodyHead.addEventListener('mousedown', startResize)
document.addEventListener('mousemove', moveResize)
document.addEventListener('mouseup', stopResize)

tableBodyHead.addEventListener('mouseover', changeStyleResizbleBorder)
tableBodyHead.addEventListener('mouseout', removeStyleResizbleBorder)


dragbleTh.addEventListener('mousedown', startDrag)

let xStartDrag
let xEndDrag
let isDragNow = false
let columdIndex

function startDrag(event){
  if(event.target === this){
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
    tableBody.style.userSelect = 'auto'
  }
}

console.log(Array.from(tableBodyHead.getElementsByTagName('th')).indexOf(dragbleTh))

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
}




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








/* const tableBodyHead = document.querySelector('.table__body__head')
const tableBody = document.querySelector('.table__body')

tableBodyHead.addEventListener('mousedown', startResize)
document.addEventListener('mousemove', moveResize)
document.addEventListener('mouseup', stopResize)


tableBodyHead.addEventListener('mouseover', changeStyleResizbleBorder)
tableBodyHead.addEventListener('mouseout', removeStyleResizbleBorder)


let xStart
let isResizeNow = false
let widthNow
let currentTarget

function startResize(event){
  let targetElement = event.target
  if (targetElement.classList.contains('changerSize')){
    tableBody.style.userSelect = 'none'
    isResizeNow = true
    xStart = event.clientX
    widthNow = parseInt(getComputedStyle(targetElement.parentElement).width, 10)
    currentTarget = targetElement.parentElement
  }
}

function moveResize(event) {
  if (isResizeNow) {
    let width = widthNow + event.clientX - xStart
    currentTarget.style.width = width + 'px'
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
} */








