import BaseNode from './models/base_node';
import Init, { Allocator, Layout } from '../stretch-layout';

class LayoutCtx {
  static CTX: LayoutCtx;
  
  static WINDOW_SIZE?: {};

  public allocator?: Allocator;

  private computed_layout?: Layout;

  private root_node?: BaseNode;

  constructor() {
    if (LayoutCtx.CTX) {
      console.warn("LayoutCtx has already been initialized")
      return LayoutCtx.CTX;
    }
    LayoutCtx.CTX = this;
  }

  async init() {
    await Init();
    this.allocator = new Allocator();
  }

  getRootNode() {
    return this.root_node;
  }

  setRootNode(root_node: BaseNode) {
    this.root_node = root_node
    return this.root_node
  }

  computeLayout(layoutOpts) {
    if (!this.root_node) return undefined;
    this.computed_layout = this.root_node.stretchNode.computeLayout({ layoutOpts })
    return this.computed_layout;
  }
}

export default LayoutCtx
