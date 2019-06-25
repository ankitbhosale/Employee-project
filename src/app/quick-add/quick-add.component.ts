import { Component, OnInit, TemplateRef } from '@angular/core';
//import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.component.html',
  styleUrls: ['./quick-add.component.css']
})
export class QuickAddComponent implements OnInit {
  
  employeeForm: FormGroup;
  fd = new FormData();
  imageUrl: String = "assets/img/users3_add.png";
  selectedFile: File = null;
  fileToUpload: File = null;
  constructor( private fb: FormBuilder, private employeeService: EmployeeService, private http: HttpClientModule) { }


  ngOnInit() {


    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      image: ['']
    })
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('image', this.selectedFile);
    console.log(event.target.files);
    console.log(this.selectedFile.name);
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
    var formData = this.employeeForm.value;

    var EMP = {
      'firstName': formData.firstName,
      'lastName': formData.lastName,
      'email': formData.email,
      'mobile': formData.mobile,
      'date': [''],
      'address': [''],
      'gender': [''],
      'hobies': [''],
      'salary': [''],
      'state': [''],
      'city': [''],
      'zip': [''],
      'skill': ['']
    };


    Object.entries(EMP).forEach(
      ([key, value]: any[]) => {
        this.fd.append(key, value);
        console.log('key:' + key, 'value' + value);
      });

    this.employeeService.postEmp(this.fd)
      .subscribe(
        response => console.log('Success!', response),
        error => console.error('Error!', error)
      );

  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
}