import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Import components you will route to here

const routes: Routes = [
    // All routes here
    // {path: '', pathMatch: 'full', component:''}, 
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  