import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/Services/data-service.service';
import { DataTransferService } from 'src/app/Services/data-transfer.service';
import { URL } from 'src/app/URL';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private router :Router,
    private DataTransfer : DataTransferService,
    private DataService : DataServiceService) 
    { 
      this.URl = URL;
    }

  public EmployeeId : any = 0;
  public Employee : any;
  public URl : any;
  
  public SelectedEmployeeName : any;
  public SelectedEmployeeSalary : any;
  public SelectedEmployeeAge : any;

  ngOnInit(): void {
    try
    {
      this.DataTransfer.SelectedEmployeeId.subscribe((x) => (this.EmployeeId = x));
      if (this.EmployeeId != 0)
      {
        let UpdateURL = this.URl.GetOneEmployee+this.EmployeeId;
        this.DataService.get(UpdateURL).subscribe(
          response => {
            this.Employee = response;            
            this.SelectedEmployeeName = this.Employee.data['employee_name'];
            this.SelectedEmployeeSalary = this.Employee.data['employee_salary']
            this.SelectedEmployeeAge = this.Employee.data['employee_age'];
            console.log("Response : ",response);
          },
          error=>{
            console.log("Catch AddEmployeeComponent ngOnInit : ",error);
          }
        )
      }
    }
    catch(error){
      console.log("Catch AddEmployeeComponent ngOnInit : ",error);
    }
  }

  SaveEmployee(){
    try
    {
      console.log("SaveEmployee");
      if(this.EmployeeId != 0)
      {

        let InputJSON : {
          id : string,
          employee_name : string;
          employee_salary : string;
          employee_age : string;
          profile_image : string;
        } = {
          id : this.EmployeeId,
          employee_name: this.SelectedEmployeeName,
          employee_salary : this.SelectedEmployeeSalary,
          employee_age : this.SelectedEmployeeAge,
          profile_image : "",
        };

        this.DataService.put(this.URl.UpdateURL+this.EmployeeId, InputJSON).subscribe(
          response => {
            window.alert("Message : "+response);
            console.log("Catch SaveEmployee SaveEmployee : ",response);
          },
          error =>{
            console.log("Catch SaveEmployee SaveEmployee : ",error);
          }
        )
      }
      else if(this.EmployeeId == 0)
      {
        let InputJSON : {
          employee_name : string;
          employee_salary : string;
          employee_age : string;
          profile_image : string;
        } = {
          employee_name : this.SelectedEmployeeName,
          employee_salary : this.SelectedEmployeeSalary,
          employee_age : this.SelectedEmployeeAge,
          profile_image : "",
        }

        this.DataService.post(this.URl.AddEmployee, InputJSON).subscribe(
          response => {
            console.log("Catch SaveEmployee SaveEmployee : ",response);
          },
          error => {
            console.log("Catch SaveEmployee SaveEmployee : ",error);
          },
        )

      }
      this.DataTransfer.SelectedEmployeeId.next(0);
      this.router.navigate(['']);
    }
    catch(error){
      console.log("Catch AddEmployeeComponent SaveEmployee : ",error);
    }
  }

  

}
