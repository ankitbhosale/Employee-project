import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPassword: FormGroup;
  constructor(private fb: FormBuilder, private employeeService: EmployeeService
    ,private tostr:ToastrService,
    private _route:Router) { }

  ngOnInit() {  
    const fd = new FormData();


    this.resetPassword = this.fb.group({
      email: ['',[Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]]
    })
  }
  onSubmit(){
    console.log(this.resetPassword.value.email);
    const email={email:this.resetPassword.value.email}
    this.employeeService.resetPass(email).subscribe(res=>{
      console.log(res);
      this.tostr.success("Mail Sent")
    },error=>{
      console.log(error);
      this.tostr.error("User Not Found")

    });

  }

}
