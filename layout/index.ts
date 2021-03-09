import * as Utils from './utils'
import { Allocator, Node, JustifyContent, FlexDirection, AlignItems } from './stretch-layout';


class LayoutRoot {
  // static
  static INSTANCE: LayoutRoot;
  static ALLOCATOR: Allocator;

  // private
  private allocator: Allocator;

  constructor() {
    if (LayoutRoot.INSTANCE) {
      console.warn("LayoutRoot has already been initialized")
      return LayoutRoot.INSTANCE;
    }
    this.allocator = new Allocator();
    LayoutRoot.ALLOCATOR = this.allocator;
    LayoutRoot.INSTANCE = this;
  }

  static getInstance() {
    return LayoutRoot.INSTANCE
  }
}





// Utils
export const measureWindowSize = Utils.measureWindowSize;

export default LayoutRoot;