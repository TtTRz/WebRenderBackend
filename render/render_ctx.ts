class RenderCtx {
  static CTX: RenderCtx;
  constructor() {
    if (RenderCtx.CTX) {
      console.warn("RenderCtx has already been initialized")
      return RenderCtx.CTX;
    }
    RenderCtx.CTX = this;
  }
}

export default RenderCtx;