import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';   
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registration: FormGroup;
  constructor(private fb: FormBuilder, private employeeService: EmployeeService
    ,private tostr:ToastrService,
    private _route:Router) { }

  ngOnInit() {
    const fd = new FormData();


    this.registration = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]],
      password:['',Validators.required],
    })
  }
  onSubmit()
  {
    console.log(this.registration.value);
    this.employeeService.registerUser(this.registration.value)
      .subscribe(
        response => {console.log('Success!', response)
        this.tostr.success('User Created','Toastr fun!');   
      },
        error => {console.error('Error!', error)
        this.tostr.error('Email already Exits','Toastr fun!');   

      }
      );
  }
}
