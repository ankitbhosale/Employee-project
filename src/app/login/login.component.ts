import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';   
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  employeeForm: FormGroup;
  constructor(private fb: FormBuilder, private employeeService: EmployeeService
    ,private tostr:ToastrService,
    private _route:Router,config: NgbModalConfig, private modalService: NgbModal) { 
       config.backdrop = 'static';
      config.keyboard = false;
    }
  ngOnInit() {
    const fd = new FormData();


    this.employeeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',Validators.required],
    })
  }
  onSubmit(): void {
    console.log(this.employeeForm.value);
    var formData = this.employeeForm.value;

      this.employeeService.postUser(this.employeeForm.value)
       .subscribe(
        response =>{ console.log('Success!', response),
        console.log(response.token);
        localStorage.setItem("token",response.token)
        this.tostr.success('Login Successfully','Toastr fun!');

        console.log("Success");
        if(response){
          this._route.navigate(['/list']);
          this.employeeService.logedIn();
        }
       },
         error => {console.error('Error!', error);
         this.tostr.error('Incorrect Password or Email','Toastr fun!');}
      );
      

}
open(content) {
  this.modalService.open(content);
}
}
