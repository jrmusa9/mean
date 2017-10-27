import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component'
import {CreateComponent} from './create/create.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {ResultComponent} from './result/result.component'


const routes: Routes = [
  {path:'', pathMatch:'full', component:LoginComponent},
  {path:'dashboard', pathMatch:'full', component:DashboardComponent},
  {path:'result', pathMatch:'full', component:ResultComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
