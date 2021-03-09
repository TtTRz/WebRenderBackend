
export const measureWindowSize = () => {
  let WINDOW_SIZE = {
    offsetHeight: undefined,
    offsetWidth: undefined,
  }
  WINDOW_SIZE.offsetHeight = document.body.offsetHeight;
  WINDOW_SIZE.offsetWidth = document.body.offsetWidth;
  console.log("measureWindowSize:", WINDOW_SIZE);
  return WINDOW_SIZE;
}

