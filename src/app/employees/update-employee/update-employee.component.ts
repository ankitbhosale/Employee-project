import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
//import {IdComponent} from '../list/list.component'
import { from } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'api/model/Employee';
import { StateService } from 'src/app/state.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employee: Employee;
  selectedFile: File = null;
  fileToUpload: File = null;
  City: {};
  States: {};
  Skills = [];
  Hobies: Array<Boolean> = [];
  hobiesError: Boolean = false;
  skillError: Boolean = false;
  fd = new FormData;
  imageUrl: String = "assets/img/users3_add.png";
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router,
    private route: ActivatedRoute, private states: StateService) { }

  ngOnInit() {
    this.States = this.states.state1;
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      date: [''],
      address: [''],
      gender: [''],
      hobies:this.Hobies,
      salary: [''],
      state: [''],
      city: [''],
      zip: [''],
      image: [''],
      skill: this.Skills


    })

    this.route.params.subscribe(parameterMap => {
      const id = parameterMap['id'];
      //this.updateEmp(id);
      console.log("update id:", id);
      if (id) {
        this.getEmployee(id);
        // this.postId(id);
        //this.updateEmp(id);
      }
    });
  }

  getEmployee(id) {

    this.employeeService.getEmp(id).subscribe((employeeData) => {
      this.editEmployee(employeeData), (error) => {
        console.log(error)
      }
    })
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('image', this.selectedFile);
    console.log(event.target.files);
    console.log(this.selectedFile.name);
  }

  onSelect(value, i) {
    console.log(value);
    this.Hobies[i] = value;
    console.log(this.Hobies);
  }

  editEmployee(employeeData) {
    console.log(employeeData);
    var str = employeeData.hobies[0];
    var arr = str.split(',');
    console.log(arr);

    var arr2 = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === "true") {
        arr2[i] = true;
      }
      else {
        arr2[i] = false;
      }
    }

    console.log(employeeData.hobies);
    console.log(this.employeeForm);
    console.log(employeeData);
    employeeData.hobies = arr2;
    this.Hobies=arr2;

    var str1 = employeeData.skill[0];
    console.log(employeeData.skill[0]);
    var arr1 = str1.split(',');
    console.log(arr1);
    employeeData.skill=arr1;
    this.Skills=arr1;
    this.employeeForm.patchValue(employeeData);
    this.imageUrl = "http://localhost:3001/" + employeeData.image;
    console.log(employeeData.image)
  }

  updateEmp() {
    var formData = this.employeeForm.value;
    var EMP = {
      'firstName': formData.firstName,
      'lastName': formData.lastName,
      'email': formData.email,
      'mobile': formData.mobile,
      'date': formData.date,
      'address': formData.address,
      'gender': formData.gender,
      'hobies': this.Hobies,
      'salary': formData.salary,
      'state': formData.state,
      'city': formData.city,
      'zip': formData.zip,
      'skill':this.Skills
    };

    Object.entries(EMP).forEach(
      ([key, value]: any[]) => {
        this.fd.append(key, value);
        console.log('key:' + key, 'value' + value);
      });

    this.route.params.subscribe(parameterMap => {
      const id = parameterMap['id'];
      console.log(id);
      console.log(id);
      this.employeeService.updateEmployee(this.fd, id)
        .subscribe(
          response => console.log('Success!', response),
          error => console.error('Error!', error)



        )
    }
    )
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }


  add(value) {
    this.Skills.push(value);
    console.log(value);
    console.log(this.Skills);
    if (this.Skills.length > 1 || this.Skills.length === 0)
      this.skillError = false;
    else
      this.skillError = true;
  }

  remove(value) {
    console.log(value);
    
    for (var i = 0; i < this.Skills.length; i++) {
      if (this.Skills[i] === value) {
        this.Skills.splice(i, 1);
        console.log(this.Skills);
      }
      else
      console.log("Not Found");
    }
    if (this.Skills.length > 1 || this.Skills.length === 0)
      this.skillError = false;
    else
      this.skillError = true;
    console.log(this.Skills);
  }



  onChangeState(value: String) {
    console.log(value);
    for (var i = 0; i < 3; i++) {
      if (this.states.state1[i] == value) {
        this.City = this.states.city[i];

      }
    }



  }

}
