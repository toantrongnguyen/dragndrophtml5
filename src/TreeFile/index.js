import React, { PureComponent } from 'react'
import findIndex from 'lodash/findIndex'
import produce from 'immer'
import FileItem from './FileItem'
import { fileData } from '../constants'
import findNode from './helper'

class TreeFile extends PureComponent {
  state = {
    files: fileData,
    draggedItem: {},
  }

  draggedNode = []

  renderTree = (list, node = []) => list.map((item) => {
    const { draggedItem } = this.state

    return (
      <FileItem
        item={item}
        node={node}
        key={item.id}
        dragStart={this.dragStart}
        dragOver={this.dragOver}
        dragEnd={this.dragEnd}
        className="file-item"
      >
        {item.children && draggedItem.id !== item.id ? this.renderTree(item.children, [...node, item.id]) : null}
      </FileItem>
    )
  })

  dragStart = ({ item, node }) => {
    this.setState({ draggedItem: item })
    this.draggedNode = node
  }

  dragEnd = () => {
    this.resetDraggedItem()
  }

  dragOver = ({ item, node }) => {
    const { draggedItem } = this.state
    if (item === draggedItem || item.parentId !== draggedItem.parentId) return
    this.moveItem({ item, node })
  }

  moveItem = ({ item, node }) => {
    this.setState(
      produce((draft) => {
        const { draggedItem, files } = draft
        const { list } = findNode(files, this.draggedNode)
        const index = findIndex(list, { id: draggedItem.id })
        const { list: newList } = findNode(files, node)
        const newIndex = findIndex(newList, { id: item.id })
        list.splice(index, 1)
        newList.splice(newIndex, 0, draggedItem)
      })
    )
  }

  resetDraggedItem() {
    this.draggedNode = []
    this.setState({ draggedItem: {} })
  }

  render() {
    const { files } = this.state

    return <div>{this.renderTree(files)}</div>
  }
}

export default TreeFile
