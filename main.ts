import CanvasKitInit from 'canvaskit-wasm/bin/canvaskit';
import init, { Allocator, Node, JustifyContent, FlexDirection, AlignItems } from './stretch-layout';

enum RENDER_NODE_TYPE {
  NODE,
  TEXT,
}
const RENDER_QUEUE = [];
let surface = undefined

const WINDOW_SIZE = {
  offsetHeight: document.body.offsetHeight,
  offsetWidth: document.body.offsetWidth,
}

let layout = undefined;
let CanvasKit = undefined;
let body = undefined;
let fontMgr = undefined;

const createCanvas = (id, height, width) => {
  let canvasElement = document.querySelector(id);
  if (!canvasElement) {
    canvasElement = document.createElement("canvas");
    canvasElement.id = id
    canvasElement.height = height
    canvasElement.width = width
    document.body.appendChild(canvasElement)
  }
  canvasElement.height = height
  canvasElement.width = width

}

const measureWindowSize = () => {
  console.log("mersureWindowSize:")
  console.log(WINDOW_SIZE)
  WINDOW_SIZE.offsetHeight = document.body.offsetHeight;
  WINDOW_SIZE.offsetWidth = document.body.offsetWidth;
}

const updateCanvasSize = (id) => {
  console.log("update canvas size")
  createCanvas(id, WINDOW_SIZE.offsetHeight, WINDOW_SIZE.offsetWidth)
}

const update = () => {
  surface = CanvasKit.MakeCanvasSurface('canvas');

  RENDER_QUEUE.length = 0

  body.setStyle({
    ...body.getStyle(),
    height: WINDOW_SIZE.offsetHeight,
    width: WINDOW_SIZE.offsetWidth
  })

  layout = body.computeLayout({ height: WINDOW_SIZE.offsetHeight, width: WINDOW_SIZE.offsetWidth });

  console.log("layout:")
  console.log(layout)
  const layout_draw_task = {
    type: RENDER_NODE_TYPE.NODE,
    rect: CanvasKit.XYWHRect(layout.x, layout.y, layout.width, layout.height),
    paint: () => {
      const paint = new CanvasKit.Paint()
      paint.setColor(CanvasKit.Color4f(0.5, 0.5, 0, 1.0));
      // paint.setStyle(CanvasKit.PaintStyle.Stroke);
      paint.setAntiAlias(true);
      return paint
    },
  }
  RENDER_QUEUE.push(layout_draw_task)

  for (let i = 0; i < layout.childCount; i++) {
    let child_node = layout.child(i);
    console.log(`child_node: ${i}`)
    console.log(child_node)

    const node_draw_task = {
      type: RENDER_NODE_TYPE.NODE,
      rect: CanvasKit.XYWHRect(child_node.x, child_node.y, child_node.width, child_node.height),
      paint: () => {
        const paint = new CanvasKit.Paint()
        paint.setColor(CanvasKit.Color4f(0, 0.5, Math.random(), 1.0));
        // paint.setStyle(CanvasKit.PaintStyle.Stroke);
        paint.setAntiAlias(true);
        return paint
      },
    }

    RENDER_QUEUE.push(node_draw_task)

    if (i === 0) {
      const text_draw_task = {
        type: RENDER_NODE_TYPE.TEXT,
        fontSize: 48,
        fontHeight: 64,
        position: {
          x: child_node.x,
          y: child_node.y,
          height: child_node.height,
          width: child_node.width
        }
      }
      RENDER_QUEUE.push(text_draw_task)
    }
  }

  surface.drawOnce(draw);
}

const draw = (canvas) => {
  console.log("draw")
  canvas.clear(CanvasKit.WHITE);
  RENDER_QUEUE.forEach((draw_task) => {
    switch (draw_task.type) {
      case RENDER_NODE_TYPE.NODE: {
        canvas.drawRect(draw_task.rect, draw_task.paint())
        break;
      }
      case RENDER_NODE_TYPE.TEXT: {
        const paraStyle = new CanvasKit.ParagraphStyle({
          textStyle: {
            color: CanvasKit.RED,
            fontFamilies: ['Roboto'],
            fontSize: draw_task.fontSize,
            fontHeight: draw_task.fontHeight,
          },
          textAlign: CanvasKit.TextAlign.Center,
        });
        const text = 'Render with CanvasKit!';
        const builder = CanvasKit.ParagraphBuilder.Make(paraStyle, fontMgr);
        builder.addText(text);
        const paragraph = builder.build();
        paragraph.layout(draw_task.position.width);
        canvas.drawParagraph(paragraph, draw_task.position.x, draw_task.position.y);
        surface.flush();
        break;
      }
    }
  })
}

const run = async () => {
  await init();
  const response = await fetch('https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf')
  const robotoData = await response.arrayBuffer();
  createCanvas("canvas", WINDOW_SIZE.offsetHeight, WINDOW_SIZE.offsetWidth)
  CanvasKit = await CanvasKitInit({
    locateFile: (file) => 'node_modules/canvaskit-wasm/bin/' + file
  });

  fontMgr = CanvasKit.FontMgr.FromData([robotoData]);

  const allocator = new Allocator();
  body = new Node(allocator, {
    justifyContent: JustifyContent.Center,
    flexDirection: FlexDirection.Column,
    alignItems: AlignItems.Center
  });

  body.addChild(new Node(allocator, { width: 500, height: 64, marginBottom: 20, }));
  body.addChild(new Node(allocator, { width: 300, height: 300, marginBottom: 16 }));
  body.addChild(new Node(allocator, { width: 300, height: 100 }));

  surface = CanvasKit.MakeCanvasSurface('canvas');

  update()

  window.addEventListener("resize", () => {
    measureWindowSize()
    updateCanvasSize("canvas")
    update()
  })

}


measureWindowSize()
run()
