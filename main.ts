import CanvasKitInit from 'canvaskit-wasm/bin/canvaskit';
import StretchLayoutInit from './stretch-layout';
import LayoutCtx, { measureWindowSize } from './layout';
import { createCanvas } from './dom';
import ElementNode from './layout/models/element_node';

// Window Size
let WINDOW_SIZE = {
  offsetHeight: document.body.offsetHeight,
  offsetWidth: document.body.offsetWidth,
}


enum RENDER_NODE_TYPE {
  NODE,
  TEXT,
}

const RENDER_QUEUE = [];
let surface = undefined

let layout = undefined;
let CanvasKit = undefined;
let fontMgr = undefined;



const updateCanvasSize = (id: string) => {
  console.log("update canvas size")
  createCanvas(id, { height: WINDOW_SIZE.offsetHeight, width: WINDOW_SIZE.offsetWidth })
}

const update = () => {
  if (!LayoutCtx.CTX) return false;

  surface = CanvasKit.MakeCanvasSurface('canvas');

  const layoutCtx = LayoutCtx.CTX;
  const root_node = layoutCtx.getRootNode()

  RENDER_QUEUE.length = 0

  root_node.addStyle({
    height: WINDOW_SIZE.offsetHeight,
    width: WINDOW_SIZE.offsetWidth
  })

  layoutCtx.computeLayout({ height: WINDOW_SIZE.offsetHeight, width: WINDOW_SIZE.offsetWidth })


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
        },
        paint: () => {
          const paint = new CanvasKit.Paint()
          paint.setColor(CanvasKit.Color4f(Math.random(), Math.random(), Math.random(), 1.0));
          // paint.setStyle(CanvasKit.PaintStyle.Stroke);
          paint.setAntiAlias(true);
          return paint
        },
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

        const text = 'Render with CanvasKit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!';
        const builder = CanvasKit.ParagraphBuilder.Make(paraStyle, fontMgr);
        builder.addText(text);
        const paragraph = builder.build();
        paragraph.layout(draw_task.position.width);
        canvas.drawParagraph(paragraph, draw_task.position.x, draw_task.position.y);
        surface.flush();

        // canvas.drawText(text, draw_task.position.x, draw_task.position.y, draw_task.paint(), new CanvasKit.Font(null, 36))
        break;
      }
    }
  })
}

const init = async () => {
  // init stretch-layout
  await StretchLayoutInit();

  // init Canvas Element
  createCanvas("canvas", { width: WINDOW_SIZE.offsetWidth, height: WINDOW_SIZE.offsetHeight })

  // init CvanvasKit
  CanvasKit = await CanvasKitInit({
    locateFile: (file) => 'node_modules/canvaskit-wasm/bin/' + file
  });

  // init CanvasKit Font
  const response = await fetch('https://storage.googleapis.com/skia-cdn/misc/Roboto-Regular.ttf')
  const robotoData = await response.arrayBuffer();
  fontMgr = CanvasKit.FontMgr.FromData([robotoData]);
}


const run = async () => {
  await init();

  const layoutCtx = new LayoutCtx();
  await layoutCtx.init();
  
  test()

  let root_node = new ElementNode();
  root_node.setStyle({
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  })

  let child_node_1 = new ElementNode();
  child_node_1.setStyle({ width: 500, height: 64, marginBottom: 20 })

  let child_node_2 = new ElementNode();
  child_node_2.setStyle({ width: 300, height: 300, marginBottom: 16 })

  let child_node_3 = new ElementNode();
  child_node_3.setStyle({ width: 300, height: 100 })

  root_node.appendChild(child_node_1)
  root_node.appendChild(child_node_2)
  root_node.appendChild(child_node_3)

  layoutCtx.setRootNode(root_node)

  surface = CanvasKit.MakeCanvasSurface('canvas');

  update()

  window.addEventListener("resize", () => {
    WINDOW_SIZE = measureWindowSize()
    updateCanvasSize("canvas")
    update()
  })

}


WINDOW_SIZE = measureWindowSize()

run()


const test = async () => {
  const layoutCtx = new LayoutCtx();
  await layoutCtx.init()
  const root = new ElementNode();
  root.setStyle({
    display: "flex",
    flexDirection: "row-reverse",
  })
  console.log(root)
  const child = new ElementNode();
  root.appendChild(child)
  console.log(root)
}
