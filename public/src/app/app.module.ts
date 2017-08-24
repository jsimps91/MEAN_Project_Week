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
import { LoginRegComponent } from './login-reg/login-reg.component';
import { PinFormComponent } from './pin-form/pin-form.component';
import { BoardFormComponent } from "./board-form/board-form.component";
import { BoardComponent } from './board/board.component';
import { BoardDetailComponent } from './board-detail/board-detail.component';
import { NavComponent } from './nav/nav.component';
import { SearchResultsComponent } from './home/search-results/search-results.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PinComponent,
    PinDetailComponent,
    ProfileComponent,
    LoginRegComponent,
    PinFormComponent,
    BoardFormComponent,
    BoardComponent,
    BoardDetailComponent,
    NavComponent,
    SearchResultsComponent,
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
