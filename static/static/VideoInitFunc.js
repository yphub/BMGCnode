window.VideoInitFunc = async function (obj) {
  obj.GaussSize = new cv.Size(11, 11)
  return function (frame) {
    // cv.cvtColor(frame, frame, cv.COLOR_RGB2GRAY, 0);
    cv.GaussianBlur(frame, frame, this.GaussSize, 0, 0, cv.BORDER_DEFAULT);
    return frame;
  };
}
