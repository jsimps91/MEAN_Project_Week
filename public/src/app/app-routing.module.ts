import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { LoginRegComponent } from "./login-reg/login-reg.component";
import { PinComponent } from "./pin/pin.component";
import { HomeComponent } from "./home/home.component";
import { PinDetailComponent } from './pin-detail/pin-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { PinFormComponent } from "./pin-form/pin-form.component";


const routes: Routes = [
    {path: '', pathMatch: 'full', component: LoginRegComponent, children: []},
    {path: 'home', pathMatch: 'full', component: HomeComponent, children: []},
    {path: 'pin/new', component: PinFormComponent}
]
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  