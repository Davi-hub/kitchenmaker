import { Component, OnInit } from '@angular/core';
import { Point } from 'paper/dist/paper-core';
import { SquareRoomService } from '../square-room.service';

@Component({
  selector: '[app-square-room-walls]',
  templateUrl: './square-room-walls.component.html',
  styleUrls: ['./square-room-walls.component.css']
})
export class SquareRoomWallsComponent implements OnInit {

  constructor(public squareRoomService: SquareRoomService) { }

  ngOnInit(): void {
    this.squareRoomService.A = new Point(100, 100);
    this.squareRoomService.B = new Point(600, 100);
    this.squareRoomService.C = new Point(600, 600);
    this.squareRoomService.D = new Point(100, 600);
    this.squareRoomService.drawWalls();
  }

}
