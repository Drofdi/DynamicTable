"use strict";

class SelectorsTable{
  constructor(){
    this.tableBodyHead = document.querySelector('.table__main__head')
    this.tableBody = document.querySelector('.table__main')
    this.tableBodyContent = document.querySelector('.table__main__body')
    this.tableHeadRow = document.querySelector('.table__main__head__row')
  }
}

class AddDatasOnTableService{
  constructor(selectorsTable){
    this.selectorsTable = selectorsTable
    this.resizbleDiv = '<div class="changerSize" contenteditable="false"></div>'

    this.addDatasOnTable(5,4)
  }

  addDatasOnTable(columnsInTable, rowsInBody){
    for (let i = 0; i < columnsInTable; i++){
      let thColumnsInRowHead = document.createElement('th')
      this.selectorsTable.tableHeadRow.appendChild(thColumnsInRowHead)
  
      let thContent = document.createElement('span')
      thColumnsInRowHead.appendChild(thContent)
      thContent.classList.add('thContent')
      thContent.setAttribute('contenteditable', 'true')
  
      thContent.innerHTML = i
      thColumnsInRowHead.insertAdjacentHTML('beforeend', this.resizbleDiv);
    }
    for (let i = 0; i < rowsInBody; i++){
      let trRowInBodyTable = document.createElement('tr')
      this.selectorsTable.tableBodyContent.appendChild(trRowInBodyTable)
        for(let j = 0; j < columnsInTable; j++){
          let tdColumnsInRowBody = document.createElement('td')
          trRowInBodyTable.appendChild(tdColumnsInRowBody)
          tdColumnsInRowBody.innerHTML = j
          tdColumnsInRowBody.setAttribute('contenteditable', 'true')
        }
    }
  }
}

class AddFocusStyleForThs{
  constructor(selectorsTable){
    this.selectorsTable = selectorsTable
    this.focusBackColor = 'rgb(214, 241, 173)'

    this.addFocusStyleTh = this.addFocusStyleTh.bind(this)
    this.changeBackColorFocus = this.changeBackColorFocus.bind(this)
    this.changeBackColorBlur = this.changeBackColorBlur.bind(this)

    this.addFocusStyleTh()
  }

  addFocusStyleTh(){
    let thContents = document.querySelectorAll('.thContent')

    for(let thElem of thContents){
      thElem.addEventListener('focus', this.changeBackColorFocus)
      thElem.addEventListener('blur', this.changeBackColorBlur)
    }
  }

  changeBackColorFocus(event){
/*     event.target.parentElement.style.backgroundColor = this.focusBackColor */
    }
    
  changeBackColorBlur(event){
/*     event.target.parentElement.style.backgroundColor = this.selectorsTable.tableBody.style.backgroundColor */
    }
}



class SetBasicsEvents{
  constructor(selectorsTable, mainResizeService){
    this.selectorsTable = selectorsTable
    this.mainResizeService = mainResizeService

    this.setEvents()
  }

  setEvents(){
    this.selectorsTable.tableBodyHead.addEventListener('mousedown', this.mainResizeService.startResize) 
    document.addEventListener('mousemove', this.mainResizeService.moveResize)
    document.addEventListener('mouseup', this.mainResizeService.stopResize)

    this.selectorsTable.tableBodyHead.addEventListener('mouseover', this.mainResizeService.changeStyleResizbleBorder)
    this.selectorsTable.tableBodyHead.addEventListener('mouseout', this.mainResizeService.removeStyleResizbleBorder)
  }
}



//dragble




class MainParamsDragColumns{
  constructor(){
    this.xStartDrag
    this.xEndDrag
    this.isDragNow = false
    this.columnIndex
    this.currentDraggedDiv = null
    this.dragbleHoverElemColor = 'grey'
    
    this.thSMain = document.querySelectorAll('th')
  }
}


class MainSetEventDragStart{
  constructor(mainParamsDragColumns, mainDragService){
    this.mainParamsDragColumns = mainParamsDragColumns
    this.mainDragService =  mainDragService

    this.mainSetEventDrag()
  }

  mainSetEventDrag(){
    for(let thElem of this.mainParamsDragColumns.thSMain){
      thElem.addEventListener('mousedown', this.mainDragService.startDrag)          
      thElem.classList.add('dragbleTh')
    }
  }
}




class AddOrRemoveStyleHoverDraggable{
  constructor(selectorsTable, mainParamsDragColumns){
    this.selectorsTable = selectorsTable
    this.mainParamsDragColumns = mainParamsDragColumns
    this.thSForDrag = document.querySelectorAll('th')

    this.addStyleHoverDragSetEvent = this.addStyleHoverDragSetEvent.bind(this)
    this.removeStyleHoverDragSetEvent = this.removeStyleHoverDragSetEvent.bind(this)
  }

  addStyleHoverDragSetEvent(){
    let thSForDrag = document.querySelectorAll('th')
    for (let column of thSForDrag){
      column.addEventListener('mouseover', this.addHoverDraggedColumn)
      column.addEventListener('mouseout', this.removeHoverDragColumn) 
    }
  }

  removeStyleHoverDragSetEvent(){
    let thSForDrag = document.querySelectorAll('th')
    for (let column of thSForDrag){
      column.style.backgroundColor = this.selectorsTable.tableBody.style.backgroundColor
      column.removeEventListener('mouseover', this.addHoverDraggedColumn)
      column.removeEventListener('mouseout', this.removeHoverDragColumn)
    }
  }


  addHoverDraggedColumn(){
/*     console.log(this.mainParamsDragColumns.dragbleHoverElemColor) */

/*     this.style.backgroundColor = this.mainParamsDragColumns.dragbleHoverElemColor */
    this.style.backgroundColor = 'grey'
  }
  
  removeHoverDragColumn(){
/*     console.log(this) */
/*     this.style.backgroundColor = this.selectorsTable.tableBody.style.backgroundColor */
    this.style.backgroundColor = 'white'
  }
}


class MainDragService{
  constructor(selectorsTable,addOrRemoveStyleHoverDraggable,mainParamsDragColumns,addFocusStyleForThs){
    this.addOrRemoveStyleHoverDraggable = addOrRemoveStyleHoverDraggable
    this.mainParamsDragColumns = mainParamsDragColumns
    this.selectorsTable = selectorsTable
    this.addFocusStyleForThs = addFocusStyleForThs

    this.startDrag = this.startDrag.bind(this)
    this.moveDrag = this.moveDrag.bind(this)
    this.endDrag = this.endDrag.bind(this)
    this.getColumnIndexAfterMouseUp = this.getColumnIndexAfterMouseUp.bind(this)
  }

  startDrag(event){
    let thS = document.querySelectorAll('th')
    if (event.currentTarget.classList.contains('dragbleTh')){ //ОШИБКА ВОЗМОЖНО ЗДЕСЬ
      
      this.addOrRemoveStyleHoverDraggable.addStyleHoverDragSetEvent()
      this.mainParamsDragColumns.currentDraggedDiv = event.target.cloneNode(true)
      this.mainParamsDragColumns.currentDraggedDiv.style.position = 'fixed'
      this.mainParamsDragColumns.currentDraggedDiv.style.opacity = '0.5'
      this.mainParamsDragColumns.currentDraggedDiv.style.pointerEvents = 'none'
      document.body.appendChild(this.mainParamsDragColumns.currentDraggedDiv)
  
      this.mainParamsDragColumns.columnIndex = Array.from(thS).indexOf(event.target)
      this.mainParamsDragColumns.isDragNow = true
      this.selectorsTable.tableBody.style.userSelect = 'none'
      this.mainParamsDragColumns.xStartDrag = event.clientX
      window.addEventListener('mousemove', this.moveDrag)
      window.addEventListener('mouseup', this.endDrag)
    }
  }

  moveDrag(event){
    if (this.mainParamsDragColumns.isDragNow){
      this.mainParamsDragColumns.currentDraggedDiv.style.left = event.clientX - this.mainParamsDragColumns.currentDraggedDiv.offsetWidth / 2 + 'px'
      this.mainParamsDragColumns.currentDraggedDiv.style.top = event.clientY - this.mainParamsDragColumns.currentDraggedDiv.offsetHeight / 2 + 'px'
      this.mainParamsDragColumns.xEndDrag = event.clientX
  }
  }


  endDrag(event){
    if(this.mainParamsDragColumns.xStartDrag !== this.mainParamsDragColumns.xEndDrag){
      let columnsHead = this.selectorsTable.tableHeadRow.querySelectorAll('th')
      
      
      if (this.mainParamsDragColumns.isDragNow){
        this.mainParamsDragColumns.xEndDrag = event.clientX
        let newColumnIndex = this.getColumnIndexAfterMouseUp(this.mainParamsDragColumns.xEndDrag)
        let rowsBody = this.selectorsTable.tableBodyContent.querySelectorAll('tr')

          if (this.mainParamsDragColumns.columnIndex !== newColumnIndex){
            let newTh = document.createElement('th')
            newTh.addEventListener('mousedown', this.startDrag)
            newTh.classList.add('dragbleTh')
            console.log(this.mainParamsDragColumns.columnIndex)
            newTh.style.width = columnsHead[this.mainParamsDragColumns.columnIndex].style.width
            newTh.innerHTML = columnsHead[this.mainParamsDragColumns.columnIndex].innerHTML
  
            if(this.mainParamsDragColumns.columnIndex < newColumnIndex){
              columnsHead[newColumnIndex].insertAdjacentElement('afterend', newTh)
              columnsHead[this.mainParamsDragColumns.columnIndex].remove()
            }
            if(this.mainParamsDragColumns.columnIndex > newColumnIndex){
              columnsHead[newColumnIndex].insertAdjacentElement('beforebegin', newTh)
              columnsHead[this.mainParamsDragColumns.columnIndex].remove()
            }
  
              for(let row of rowsBody){
                let columnsBody = row.querySelectorAll('td')
                let newTd = document.createElement('td')
                newTd.innerHTML = columnsBody[this.mainParamsDragColumns.columnIndex].innerHTML
                newTd.setAttribute('contenteditable', 'true')

                if(this.mainParamsDragColumns.columnIndex < newColumnIndex){
                  columnsBody[newColumnIndex].insertAdjacentElement('afterend', newTd)
                  columnsBody[this.mainParamsDragColumns.columnIndex].remove()
                }
                if(this.mainParamsDragColumns.columnIndex > newColumnIndex){
                  columnsBody[newColumnIndex].insertAdjacentElement('beforebegin', newTd)
                  columnsBody[this.mainParamsDragColumns.columnIndex].remove()
                }
              }
              this.addFocusStyleForThs.addFocusStyleTh()
          }
        }
      }
      this.mainParamsDragColumns.currentDraggedDiv.remove();
      this.mainParamsDragColumns.currentDraggedDiv = null;
      this.mainParamsDragColumns.isDragNow = false
      this.selectorsTable.tableBody.style.userSelect = 'auto'
      window.removeEventListener('mousemove', this.moveDrag)
      window.removeEventListener('mouseup', this.endDrag)

      this.addOrRemoveStyleHoverDraggable.removeStyleHoverDragSetEvent()
  }

    getColumnIndexAfterMouseUp(mouseX){
      let columnsHead = this.selectorsTable.tableHeadRow.querySelectorAll('th')
      let newColumnIndex = this.mainParamsDragColumns.columnIndex
      for (let i = 0; i < columnsHead.length; i++){
        if (mouseX < columnsHead[i].getBoundingClientRect().left + columnsHead[i].getBoundingClientRect().width){
          newColumnIndex = i
          break
        }
      }
      return newColumnIndex
    }

}


//resize







class MainParamsResizeColumns{
  constructor(){
    this.xStartResize
    this.isResizeNow = false
    this.widthNow
    this.currentTargetResize
  }
}







class MainResizeService{
  constructor(selectorsTable, mainParamsResizeColumns){
    this.selectorsTable = selectorsTable
    this.mainParamsResizeColumns = mainParamsResizeColumns

    this.startResize = this.startResize.bind(this)
    this.moveResize = this.moveResize.bind(this)
    this.stopResize = this.stopResize.bind(this)
    this.removeStyleResizbleBorder = this.removeStyleResizbleBorder.bind(this)
  }

  startResize(event){
    let targetElement = event.target
    if (targetElement.classList.contains('changerSize')){
      this.selectorsTable.tableBody.style.userSelect = 'none'
      this.mainParamsResizeColumns.isResizeNow = true
      this.mainParamsResizeColumns.xStartResize = event.clientX
      this.mainParamsResizeColumns.widthNow = parseInt(getComputedStyle(targetElement.parentElement).width, 10)
      this.mainParamsResizeColumns.currentTargetResize = targetElement.parentElement
    }
  }

  moveResize(event) {
    if (this.mainParamsResizeColumns.isResizeNow) {
      let width = this.mainParamsResizeColumns.widthNow + event.clientX - this.mainParamsResizeColumns.xStartResize
      this.mainParamsResizeColumns.currentTargetResize.style.width = width + 'px'
    }
  }

  stopResize() {
    this.mainParamsResizeColumns.isResizeNow = false
    this.selectorsTable.tableBody.style.userSelect = 'auto'
    window.removeEventListener('mousemove', this.moveResize)
    window.removeEventListener('mouseup', this.stopResize)
  }

  changeStyleResizbleBorder(event){
    let targetElement = event.target
    if (targetElement.classList.contains('changerSize')){
      targetElement.parentElement.style.borderRight = '1px solid blue'
    }
  }

  removeStyleResizbleBorder(event){
    let targetElement = event.target
    if (targetElement.classList.contains('changerSize')){
      targetElement.parentElement.style.borderRight = this.selectorsTable.tableBody.style.border
    }
  }

}





const selectorsTable = new SelectorsTable()
const addDatasOnTableService = new AddDatasOnTableService(selectorsTable)
const addFocusStyleForThs = new AddFocusStyleForThs(selectorsTable)
const mainParamsDragColumns = new MainParamsDragColumns()
const addOrRemoveStyleHoverDraggable = new AddOrRemoveStyleHoverDraggable(selectorsTable,mainParamsDragColumns)
const mainDragService = new MainDragService(selectorsTable,addOrRemoveStyleHoverDraggable,mainParamsDragColumns,addFocusStyleForThs)
const mainParamsResizeColumns = new MainParamsResizeColumns()
const mainResizeService = new MainResizeService(selectorsTable,mainParamsResizeColumns)
const setBasicsEvents = new SetBasicsEvents(selectorsTable,mainResizeService)
const mainSetEventDragStart = new MainSetEventDragStart(mainParamsDragColumns, mainDragService)