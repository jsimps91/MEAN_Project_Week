import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http'; 
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PinComponent } from './pin/pin.component';
import { PinDetailComponent } from './pin-detail/pin-detail.component';
import { ProfileComponent } from './profile/profile.component';

import { UserService } from "./user.service";
import { PinService } from "./pin.service";
import { BoardService } from "./board.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PinComponent,
    PinDetailComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [
    UserService,
    PinService,
    BoardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
