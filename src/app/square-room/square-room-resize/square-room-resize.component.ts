import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SquareRoomService } from '../square-room.service';

@Component({
  selector: '[app-square-room-resize]',
  templateUrl: './square-room-resize.component.html',
  styleUrls: ['./square-room-resize.component.css']
})
export class SquareRoomResizeComponent implements OnInit {
  @ViewChild('svgEl', { static: true })
  svgElRef!: ElementRef<SVGElement>;
  svgEl!: SVGElement;
  svgElArr!: number[];
  draggingPoint: paper.Point | null = null;
  isDraggingPoint = false;

  constructor(public squareRoomService: SquareRoomService) { }

  ngOnInit(): void {
  }

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
      this.svgElArr = [
        this.svgEl.parentElement!.parentElement!.getBoundingClientRect().x,
        this.svgEl.parentElement!.parentElement!.getBoundingClientRect().y
      ];
      this.draggingPoint!.x = pointerEvent.pageX-this.svgElArr[0];
      this.draggingPoint!.y = pointerEvent.pageY-this.svgElArr[1];
      this.squareRoomService.drawAll();
    }
  }

  downHandlePoints(pointerEvent: PointerEvent, point: paper.Point) {
    this.isDraggingPoint = true;
    this.draggingPoint = point;
    pointerEvent.preventDefault();
  }

}
