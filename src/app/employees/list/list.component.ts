import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { ActivatedRoute } from '@angular/router';


import Swal from 'sweetalert2'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public employees=[];
  public values;

  constructor(private _employeeService:EmployeeService,private route:ActivatedRoute) { }

  


  ngOnInit() {
    
    this.getEmployee();
   
  }
  del(value){
    Swal.fire({
      title: "Deleted!",
      
      imageUrl: 'assets/img/icon-deleted-22.jpg'
    });
    console.log(value);
    this._employeeService.deleteEmp(value)
    .subscribe(data=>{
      this.employees=data;
      this.getEmployee();
    });


  } 
  getEmployee(){
    this._employeeService.getEmployees()
    .subscribe(data=>this.employees=data);
   
  }
  logedOut(){
    localStorage.removeItem("token");
  }
 
  
  
    
  
}

