import BaseNode from './base_node'

interface ImageNodeOptions {
  src?: string,
  height?: number,
  width?: number
}

class ImageNode extends BaseNode {
  width: number;
  height: number;
  src: string | undefined;
  constructor(options: ImageNodeOptions = {}) {
    super()
    Object.keys(options).forEach((key: string) => {
      this[key] = options[key]
    })
  }

  setSrc(src: string) {
    this.src = src;
  }

  setOptions(options: ImageNodeOptions) {
    Object.keys(options).forEach((key: string) => {
      this[key] = options[key]
    })
    this.stretchNode.markDirty()
  }
}

export default ImageNode;