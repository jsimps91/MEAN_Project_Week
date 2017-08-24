import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { LoginRegComponent } from "./login-reg/login-reg.component";
import { PinComponent } from "./pin/pin.component";
import { HomeComponent } from "./home/home.component";
import { PinDetailComponent } from './pin-detail/pin-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { PinFormComponent } from "./pin-form/pin-form.component";
import { BoardFormComponent } from "./board-form/board-form.component";
import { BoardDetailComponent } from "./board-detail/board-detail.component";



const routes: Routes = [
    {path: '', pathMatch: 'full', component: LoginRegComponent, children: []},
    {path: 'home', pathMatch: 'full', component: HomeComponent, children: []},
    {path: 'pin/new', component: PinFormComponent},
    {path: 'pin/:id', component: PinDetailComponent},
    {path: 'board/new', component: BoardFormComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'board/:id', component: BoardDetailComponent},
    
]
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  