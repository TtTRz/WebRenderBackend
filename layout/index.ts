import * as Utils from './utils'
import Init, { Allocator } from './stretch-layout';


class LayoutCtx {
  // static
  static CTX: LayoutCtx;
  public allocator: Allocator;
  constructor() {
    if (LayoutCtx.CTX) {
      console.warn("LayoutRoot has already been initialized")
      return LayoutCtx.CTX;
    }
    LayoutCtx.CTX = this;
  }
  async init() {
    await Init();
    this.allocator = new Allocator();
  }
}





// Utils
export const measureWindowSize = Utils.measureWindowSize;

export default LayoutCtx;