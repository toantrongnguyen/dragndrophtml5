import findIndex from 'lodash/findIndex'

export default function findNode(array, node) {
  let parentNode = null
  let list = array
  node.forEach((id) => {
    const index = findIndex(list, { id })
    parentNode = list[index]
    list = parentNode.children
  })
  return { parentNode, list }
}
