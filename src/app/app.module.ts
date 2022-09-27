import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquareRoomComponent } from './square-room/square-room.component';
import { SquareRoomWallsComponent } from './square-room/square-room-walls/square-room-walls.component';
import { SquareRoomRulersComponent } from './square-room/square-room-rulers/square-room-rulers.component';
import { SquareRoomResizeComponent } from './square-room/square-room-resize/square-room-resize.component';

@NgModule({
  declarations: [
    AppComponent,
    SquareRoomComponent,
    SquareRoomWallsComponent,
    SquareRoomRulersComponent,
    SquareRoomResizeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
