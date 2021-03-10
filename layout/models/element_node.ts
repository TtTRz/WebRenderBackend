import BaseNode from './base_node'

class ElementNode extends BaseNode {
  children: Array<BaseNode>

  constructor() {
    super()
    this.children = []
  }

  appendChild(node: BaseNode) {
    this.children.push(node)
    this.stretchNode.addChild(node.stretchNode)
  }

  removeChild(node: BaseNode) {
    this.children = this.children.filter((_node: BaseNode) => _node !== node)
    this.stretchNode.removeChild(node.stretchNode)
  }

  removeChildByIndex(idx: number) {
    this.children.splice(idx, 1)
    this.stretchNode.removeChildAtIndex(idx);
  }

  replaceChildByIndex(idx: number, node: BaseNode) {
    this.children[idx] = node;
    this.stretchNode.replaceChildAtIndex(idx, node.stretchNode)
  }

}



export default ElementNode;