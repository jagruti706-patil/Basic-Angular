import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/Services/data-service.service';
import { DataTransferService } from 'src/app/Services/data-transfer.service';
import {URL} from 'src/app/URL';

@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.css']
})
export class AllEmployeeComponent implements OnInit {

  constructor(
    private Dataservice : DataServiceService,   
    private DataTransfer : DataTransferService,     
    private Router : Router,
  ) 
  {
    this.URl = URL;
  }
  private URl : any;
  private Employee : any;
  public Emp : any;

  ngOnInit(): void {
    try
    {
      this.DataTransfer.SelectedEmployeeId.next(0);
      this.Dataservice.get(this.URl.GetAllEmployee).
      subscribe(
        (response)=>{
          console.log("Response : ",response);
          this.Employee = response;
          this.Emp = this.Employee.data;
        },
        (error)=>{
          console.log("Error : ",error);
        }
      );
    }
    catch(error)
    {
      console.log("Catch AllEmployeeComponent ngOnInit : ",error);
    }
  }

  getAllEmployee(){
    try{
      this.Dataservice.get(this.URl.GetAllEmployee).
      subscribe(
        (response)=>{
          console.log("Response : ",response);
          this.Employee = response;
          this.Emp = this.Employee.data;
        },
        (error)=>{
          console.log("Error : ",error);
        }
      );
    } 
    catch(error){
      console.log("Catch AllEmployeeComponent getAllEmployee : ",error);
    }    
  }

  OnEdit(e:any){
    try
    {
      console.log("OnEdit : ",e)
      this.DataTransfer.SelectedEmployeeId.next(e.id);
      this.Router.navigate(['childemployee']);
    }
    catch(error){
      console.log("Catch AllEmployeeComponent OnEdit : ",error);
    }
  }

  OnDelete(e:any){
    try
    {
      this.Dataservice.delete(this.URl.DeleteEmployee+e.id).subscribe(
        response => {
          this.getAllEmployee();
        },
        error => {
          console.log("Catch AllEmployeeComponent OnDelete : ",error);
        }
      )
    }
    catch(error){
      console.log("Catch AllEmployeeComponent OnDelete : ",error);
    }
  }

}
