import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {
  submitForm: FormGroup;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService
    ,private tostr:ToastrService,
    private _route:Router, private route: ActivatedRoute) { 
     
    }

  ngOnInit() {
    const fd = new FormData();


    this.submitForm = this.fb.group({
      password: ['',Validators.required],
      confirmPassword:['',Validators.required]
    })
  }
  submit()
  {
    if(this.submitForm.value.password===this.submitForm.value.confirmPassword){
      console.log(this.submitForm.value);
      this.route.params.subscribe(parameterMap => {
        const id = parameterMap['id'];
        console.log(id);
        this.employeeService.updatePassword(this.submitForm.value, id)
        .subscribe(
          response =>{ console.log('Success!', response)
          this.tostr.success("Password reset successfully");
        
        },
          error => console.error('Error!', error)


      )})
    }
    else
    {
      this.tostr.error("Password not match");
    }
  }
  

}
