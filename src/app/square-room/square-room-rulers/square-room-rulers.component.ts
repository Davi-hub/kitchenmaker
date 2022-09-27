import { Component, OnInit } from '@angular/core';
import { SquareRoomService } from '../square-room.service';

@Component({
  selector: '[app-square-room-rulers]',
  templateUrl: './square-room-rulers.component.html',
  styleUrls: ['./square-room-rulers.component.css']
})
export class SquareRoomRulersComponent implements OnInit {

  constructor(public squareRoomService: SquareRoomService) { }

  ngOnInit(): void {
    this.squareRoomService.drawRulers();
  }

}
