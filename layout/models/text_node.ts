import BaseNode from './base_node'


class TextNode extends BaseNode {
  value: string | undefined
  constructor(text: string | undefined = undefined) {
    super()
    this.value = text;
  }
  setText(text: string) {
    this.value = text;
    this.stretchNode.markDirty()
  }
}



export default TextNode;