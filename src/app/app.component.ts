import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Line } from './classes/line';
import { Point } from 'paper';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('svgEl', { static: true })
  svgElRef!: ElementRef<SVGElement>;
  svgEl!: SVGElement;
  o: number = 60;
  A!: paper.Point;
  B!: paper.Point;
  C!: paper.Point;
  D!: paper.Point;
  AB!: Line;
  BC!: Line;
  CD!: Line;
  DA!: Line;
  ABLength = 500;
  BCLength = 500;
  CDLength = 500;
  DALength = 500;
  outerA!: paper.Point;
  outerB!: paper.Point;
  outerC!: paper.Point;
  outerD!: paper.Point;
  wallA!: any;
  wallB!: any;
  wallC!: any;
  wallD!: any;
  wallWidth = 10;
  ABparallel!: Line;
  BCparallel!: Line;
  CDparallel!: Line;
  DAparallel!: Line;
  rulerA!: string;
  rulerB!: string;
  rulerC!: string;
  rulerD!: string;
  draggingPoint: paper.Point | null = null;
  isDraggingPoint = false;
  title = 'kitchen-maker';
  svgElArr!: number[];

  @HostListener('document:pointerup', ['$event'])
  public upHandle(event: PointerEvent) {
    this.isDraggingPoint = false;
    this.draggingPoint = null;
  }

  @HostListener('document:pointermove', ['$event'])
  public moveHandle(pointerEvent: PointerEvent) {
    pointerEvent.preventDefault();
    pointerEvent.stopPropagation();

    if (this.isDraggingPoint) {
      this.svgEl = this.svgElRef.nativeElement;
      this.svgElArr = [this.svgEl.getBoundingClientRect().x, this.svgEl.getBoundingClientRect().y];
      this.draggingPoint!.x = pointerEvent.pageX-this.svgElArr[0];
      this.draggingPoint!.y = pointerEvent.pageY-this.svgElArr[1];
      this.drawAll();
    }
  }

  downHandlePoints(pointerEvent: PointerEvent, point: paper.Point) {
    this.isDraggingPoint = true;
    this.draggingPoint = point;
    pointerEvent.preventDefault();
  }

  ngOnInit(): void {
    console.log(this.svgElArr);
    this.A = new Point(100, 100);
    this.B = new Point(600, 100);
    this.C = new Point(600, 600);
    this.D = new Point(100, 600);
    this.drawAll();


    console.log(this.AB);
    console.log(this.BC);
    console.log(this.CD);
    console.log(this.DA);

  }

  drawAll() {
    this.AB = new Line(this.A, this.B, "AB");
    this.BC = new Line(this.B, this.C, "BC");
    this.CD = new Line(this.C, this.D, "CD");
    this.DA = new Line(this.D, this.A, "DA");
    this.getAllIntersection();
    this.drawWallA();
    this.drawWallB();
    this.drawWallC();
    this.drawWallD();
  }

  getIntersection(L1: Line, L2: Line) {
    let x = (L1.b * L2.c - L2.b * L1.c) / (L1.a * L2.b - L2.a * L1.b);
    let y = (L1.c * L2.a - L2.c * L1.a) / (L1.a * L2.b - L2.a * L1.b);
    let m = new Point(x, y);
    return m;
  }

  getAllIntersection() {
    this.outerA = this.getIntersection(this.DA.getParallelLine(10), this.AB.getParallelLine(10));
    this.outerB = this.getIntersection(this.AB.getParallelLine(10), this.BC.getParallelLine(10));
    this.outerC = this.getIntersection(this.BC.getParallelLine(10), this.CD.getParallelLine(10));
    this.outerD = this.getIntersection(this.CD.getParallelLine(10), this.DA.getParallelLine(10));
  }

  drawWallA() {
    this.wallA =
      this.A.x + ',' + this.A.y + ' ' +
      this.B.x + ',' + this.B.y + ' ' +
      this.outerB.x + ',' + this.outerB.y + ' ' +
      this.outerA.x + ',' + this.outerA.y
      ;
    this.rulerA = this.AB.drawRuler(20);
    let input = document.getElementById('inputAB');
    if (input) {
      input.style.transform = 'rotate('+this.AB.getInputVector(10).angle+'deg)';
      console.log(input);
    }
  }

  drawWallB() {
    this.wallB =
      this.B.x + ',' + this.B.y + ' ' +
      this.C.x + ',' + this.C.y + ' ' +
      this.outerC.x + ',' + this.outerC.y + ' ' +
      this.outerB.x + ',' + this.outerB.y
      ;
    this.rulerB = this.BC.drawRuler(20);
  }

  drawWallC() {
    this.wallC =
      this.C.x + ',' + this.C.y + ' ' +
      this.D.x + ',' + this.D.y + ' ' +
      this.outerD.x + ',' + this.outerD.y + ' ' +
      this.outerC.x + ',' + this.outerC.y
      ;
    this.rulerC = this.CD.drawRuler(20);

  }

  drawWallD() {
    this.wallD =
      this.D.x + ',' + this.D.y + ' ' +
      this.A.x + ',' + this.A.y + ' ' +
      this.outerA.x + ',' + this.outerA.y + ' ' +
      this.outerD.x + ',' + this.outerD.y
      ;
    this.rulerD = this.DA.drawRuler(20);

  }
}


