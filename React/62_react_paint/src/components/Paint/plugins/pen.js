import { Plugin } from "./plugin";

export class PenPlugin extends Plugin {
  oldX = -1;
  oldY = -1;
  constructor(initialValues) {
    super({
      ...initialValues,
      name: "pen",
    });
  }

  draw(data) {
    super.draw(data); // 초기화 (???)

    //state는 draw-started, drawing, draw-finished 이런식으로 지금 그리고 있는것에 대한 상태
    const { x, y, state } = data;
    const context = this.canvas.getContext("2d");

    if (this.oldX === -1) this.oldX = x;
    if (this.oldY === -1) this.oldY = y;

    if (state === "draw-statrted" || state === "drawing") {
      //그리기 시작했거나 그리는 중일 때. 마우스 따라가면서 라인을 그리는로직
      context.beginPath();
      context.moveTo(this.oldX, this.oldY);
      context.lineTo(x, y);
      context.stroke();
      context.closePath();

      // this.oldX,Y 좌표는 그리기 직전 좌표가 됨
      this.oldX = x;
      this.oldY = y;
    } else {
      this.oldX = -1;
      this.oldY = -1;
    }
  }
}
