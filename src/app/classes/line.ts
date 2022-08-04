import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Point } from "paper";

export class Line {
  v = new Point(this.P2.x - this.P1.x, this.P2.y - this.P1.y);
  n = new Point(this.P2.y - this.P1.y, this.P2.x - this.P1.x);
  length = this.v.length;
  angleV = this.v.angle;
  angleN = this.n.angle;
  a = this.n.x;
  b = -this.n.y;
  c = -((this.a * this.P1.x) + (this.b * this.P1.y));

  constructor(public P1: paper.Point, public P2: paper.Point, public name?: string) { }

  getParallelLine(width: number) {
    let vector = new Point(this.n.x, this.n.y);
    vector.length = width;
    let P1p: paper.Point = new Point(this.P1.x + vector.x, this.P1.y - vector.y);
    let P2p: paper.Point = new Point(this.P2.x + vector.x, this.P2.y - vector.y);
    let parallelLine = new Line(P2p, P1p);
    return parallelLine;
  }

  drawRuler(width: number){
    return this.drawHalfRuler(this.P1, width)+' '+this.drawHalfRuler(this.P2, width)+' Z';
  }

  drawHalfRuler(p: paper.Point, width: number) {
    let d: number = 1;
    if (p === this.P2) {
      d = -1
    }
    let vector1 = new Point(this.n.x, this.n.y);
    let vector2 = new Point(this.n.x, this.n.y);
    let vector3 = new Point(this.n.x, this.n.y);
    let vector4 = new Point(this.v.x, this.v.y);
    vector1.length = width;
    vector2.length = width + 5;
    vector3.length = width + 10;
    vector4.length = d * (this.length/2 - 25);
    let p1: paper.Point = new Point(p.x + vector1.x, p.y - vector1.y);
    let p2: paper.Point = new Point(p.x + vector2.x, p.y - vector2.y);
    let p3: paper.Point = new Point(p.x + vector3.x, p.y - vector3.y);
    let p4: paper.Point = new Point(p2.x + vector4.x, p2.y + vector4.y);
    let ruler = 'M' + p2.x + ' ' + p2.y + ' L' + p1.x + ' ' + p1.y + ' L' + p3.x + ' ' + p3.y +
    'M' + p2.x + ' ' + p2.y + ' L' + p4.x + ' ' + p4.y;
    return ruler;
  }

  getInputVector(width:10) {
    let vector = new Point(this.n.x, this.n.y);
    vector.length = width + 27;
    let p: paper.Point = new Point(this.P1.x + vector.x, this.P1.y - vector.y);

    let vector2 = new Point(this.v.x, this.v.y);
    vector2.length = (this.length/2 - 25);
    let inputPoint: paper.Point = new Point(p.x + vector2.x, p.y + vector2.y);
    return {point: inputPoint, angle: vector2.angle};
  }
}
