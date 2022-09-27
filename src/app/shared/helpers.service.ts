import { Injectable } from '@angular/core';
import { Point } from 'paper/dist/paper-core';
import { Line } from '../classes/line';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  getIntersection(L1: Line, L2: Line) {
    let x = (L1.b * L2.c - L2.b * L1.c) / (L1.a * L2.b - L2.a * L1.b);
    let y = (L1.c * L2.a - L2.c * L1.a) / (L1.a * L2.b - L2.a * L1.b);
    let m = new Point(x, y);
    return m;
  }
}
