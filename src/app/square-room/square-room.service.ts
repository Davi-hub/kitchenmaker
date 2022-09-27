import { Injectable } from '@angular/core';
import { Line } from '../classes/line';
import { HelpersService } from '../shared/helpers.service';

@Injectable({
  providedIn: 'root'
})
export class SquareRoomService {
  A!: paper.Point; B!: paper.Point; C!: paper.Point; D!: paper.Point;
  AB!: Line; BC!: Line; CD!: Line; DA!: Line;
  outerA!: paper.Point; outerB!: paper.Point; outerC!: paper.Point; outerD!: paper.Point;
  wallA!: any; wallB!: any; wallC!: any; wallD!: any;
  rulerA!: any; rulerB!: any; rulerC!: any; rulerD!: any;
  ABLength = 500;
  BCLength = 500;
  CDLength = 500;
  DALength = 500;
  wallWidth = 10;

  constructor(private helpersService: HelpersService) { }

  getAllIntersection() {
    this.outerA = this.helpersService.getIntersection(this.DA.getParallelLine(10), this.AB.getParallelLine(10));
    this.outerB = this.helpersService.getIntersection(this.AB.getParallelLine(10), this.BC.getParallelLine(10));
    this.outerC = this.helpersService.getIntersection(this.BC.getParallelLine(10), this.CD.getParallelLine(10));
    this.outerD = this.helpersService.getIntersection(this.CD.getParallelLine(10), this.DA.getParallelLine(10));
  }


  drawAll() {
    this.drawWalls();
    this.drawRulers();
  }
  drawWalls() {
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

  drawWallA() {
    this.wallA =
      this.A.x + ',' + this.A.y + ' ' +
      this.B.x + ',' + this.B.y + ' ' +
      this.outerB.x + ',' + this.outerB.y + ' ' +
      this.outerA.x + ',' + this.outerA.y
      ;
  }

  drawWallB() {
    this.wallB =
      this.B.x + ',' + this.B.y + ' ' +
      this.C.x + ',' + this.C.y + ' ' +
      this.outerC.x + ',' + this.outerC.y + ' ' +
      this.outerB.x + ',' + this.outerB.y
      ;
    // this.rulerB = this.BC.drawRuler(20);
  }

  drawWallC() {
    this.wallC =
      this.C.x + ',' + this.C.y + ' ' +
      this.D.x + ',' + this.D.y + ' ' +
      this.outerD.x + ',' + this.outerD.y + ' ' +
      this.outerC.x + ',' + this.outerC.y
      ;
  }

  drawWallD() {
    this.wallD =
      this.D.x + ',' + this.D.y + ' ' +
      this.A.x + ',' + this.A.y + ' ' +
      this.outerA.x + ',' + this.outerA.y + ' ' +
      this.outerD.x + ',' + this.outerD.y
      ;
  }

  drawRulers(){
    this.drawRulerA();
    this.drawRulerB();
    this.drawRulerC();
    this.drawRulerD();
  }

  drawRulerA() {
    this.rulerA = this.AB.drawRuler(20);
    let input = document.getElementById('inputAB');
    if (input) {
      input.style.transform = 'rotate(' + this.AB.getInputVector(10).angle + 'deg)';
    }
  }

  drawRulerB() {
    this.rulerB = this.BC.drawRuler(20);
    let input = document.getElementById('inputBC');
    if (input) {
      input.style.transform = 'rotate(' + this.BC.getInputVector(10).angle + 'deg)';
    }
  }

  drawRulerC() {
    this.rulerC = this.CD.drawRuler(20);
    let input = document.getElementById('inputCD');
    if (input) {
      input.style.transform = 'rotate(' + this.CD.getInputVector(10).angle + 'deg)';
    }
  }

  drawRulerD() {
    this.rulerD = this.DA.drawRuler(20);
    let input = document.getElementById('inputDA');
    if (input) {
      input.style.transform = 'rotate(' + this.DA.getInputVector(10).angle + 'deg)';
    }
  }
}
