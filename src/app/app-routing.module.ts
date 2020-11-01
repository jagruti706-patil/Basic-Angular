import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
import { AllEmployeeComponent } from './Employee/all-employee/all-employee.component';

const routes: Routes = [
  {path:"", component: AllEmployeeComponent},
  {path:"childemployee", component: AddEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
