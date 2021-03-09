
type CreateCanvasOption = {
  height: number,
  width: number,
}

export const createCanvas = (id: string, options: CreateCanvasOption) => {
  const { height = 0, width = 0 } = options;
  let canvasElement = document.querySelector(id as string);
  if (!canvasElement) {
    canvasElement = document.createElement("canvas");
    canvasElement.id = id;
    canvasElement.setAttribute("height", `${height}`);
    canvasElement.setAttribute("width", `${width}`);
    document.body.appendChild(canvasElement);
  }
  canvasElement.setAttribute("height", `${height}`);
  canvasElement.setAttribute("width", `${width}`);
}
