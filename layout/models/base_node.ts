import { Layout, Node } from '../stretch-layout/stretch_layout';
import LayoutCtx from '../index';
import { Style, style2StretchStyle } from '../style';


class BaseNode {
  stretchNode: Node;
  style: Style;
  children: Array<BaseNode>
  constructor() {
    if (!LayoutCtx.CTX) {
      console.error("LayoutCtx need initialize")
    }
    this.stretchNode = new Node(LayoutCtx.CTX.allocator, {})
  }
  // add style
  addStyle(style: Style) {
    let _style: Style = {
      ...this.style,
      ...style,
    };
    this.style = _style;
    this.stretchNode.setStyle(style2StretchStyle(_style))
  }
  // set style
  setStyle(style: Style) {
    this.style = style;
    this.stretchNode.setStyle(style2StretchStyle(style))
  }
  // remove style
  removeStyle(styleKey: string[]) {
    styleKey.forEach((key) => {
      delete this.style[key];
    })
    this.stretchNode.setStyle(style2StretchStyle(this.style))

  }
}

export default BaseNode;