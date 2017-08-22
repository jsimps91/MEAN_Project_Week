import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { LoginRegComponent } from "./login-reg/login-reg.component";
import { PinComponent } from "./pin/pin.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    {path: '', pathMatch: 'full', component: LoginRegComponent, children: []},
    {path: 'home', pathMatch: 'full', component: HomeComponent, children: []},
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  