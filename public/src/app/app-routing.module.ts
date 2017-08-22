import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PinDetailComponent } from './pin-detail/pin-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { PinFormComponent } from "./pin-form/pin-form.component";

const routes: Routes = [
    {path: '', pathMatch: 'full', component:HomeComponent}, 
    {path: 'pin/new', component: PinFormComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  