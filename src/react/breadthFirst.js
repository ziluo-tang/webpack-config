const dom = require('./vDom')
const breadth = (dom) => {
  const stack = []
  const nodeList = []
  if (dom) {
    stack.push(dom)
    while (stack.length) {
      const item = stack.shift()
      nodeList.push(item.key)
      item.children.forEach((child) => {
        stack.push(child)
      })
    }
  }
  return nodeList.join('=>')
}
const { result, depth } = breadth(dom)
console.log(result, depth)
