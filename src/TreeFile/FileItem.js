import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class FileItem extends PureComponent {
  computeStyle = () => {
    const marginLeft = `${this.props.item.level * 32}px`
    return { marginLeft }
  }

  onDragStart = () => {
    const { item, dragStart, node } = this.props
    dragStart({ item, node })
  }

  onDragOver = () => {
    const { item, node, dragOver } = this.props
    dragOver({ node, item })
  }

  onDragEnd = () => {
    const { item, dragEnd } = this.props
    dragEnd({ item })
  }

  render() {
    const { item, children } = this.props

    return (
      <div>
        <div
          className="file-item"
          style={this.computeStyle()}
          draggable
          onDragStart={this.onDragStart}
          onDragOver={this.onDragOver}
          onDragEnd={this.onDragEnd}
        >
          {item.name}
        </div>
        <div>{children}</div>
      </div>
    )
  }
}

FileItem.propTypes = {
  item: PropTypes.object,
  node: PropTypes.array,
  dragStart: PropTypes.func,
  dragOver: PropTypes.func,
  dragEnd: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
}

FileItem.defaultProps = {
  item: {},
  node: [],
  dragStart: () => null,
  dragOver: () => null,
  dragEnd: () => null,
  children: null,
}

export default FileItem
