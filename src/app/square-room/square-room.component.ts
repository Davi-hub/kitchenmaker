import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Point } from 'paper/dist/paper-core';
import { Line } from '../classes/line';
import { HelpersService } from '../shared/helpers.service';
import { SquareRoomService } from './square-room.service';

@Component({
  selector: 'app-square-room',
  templateUrl: './square-room.component.html',
  styleUrls: ['./square-room.component.css']
})
export class SquareRoomComponent implements OnInit {
  title = 'kitchen-maker';



  constructor() { }

  ngOnInit(): void {

  }



}
