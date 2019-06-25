import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/state.service'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';   

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {
  imageUrl: String = "assets/img/users3_add.png";
  fileToUpload: File = null;
  employeeForm: FormGroup;
  States: {};
  City: {};
  cnt=0;
  skillError:Boolean=false;
  selectedFile: File = null;
  fd = new FormData();
  Hobies: Array<Boolean> = [false,false,false,false];
  Skills=[];
  hobiesError:Boolean=false;





  constructor(private fb: FormBuilder, private employeeService: EmployeeService,
    private route: ActivatedRoute, private states: StateService, private http: HttpClientModule,private tostr:ToastrService) { }
    
  ngOnInit() {
    const fd = new FormData();
    this.States = this.states.state1;
    console.log(this.Hobies);

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
      skill:this.Skills
      

    });




  }

  addHobiesControl() {
    const arr = this.Hobies.map(element => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }

  onChangeState(value: String) {
    console.log(value);
    for (var i = 0; i < 3; i++) {
      if (this.states.state1[i] == value) {
        this.City = this.states.city[i];

      }
    }


  }
  onSelect(value,i){
    if(value==true)
    {
      this.cnt++;
    }
    else
    this.cnt--;
    console.log(value);
    if(this.cnt>1)
      this.hobiesError=false;
    else if(this.cnt==0)
    this.hobiesError=false;
    else
    this.hobiesError=true;
    console.log(this.cnt);
    this.Hobies[i]=value;
    console.log(this.Hobies);

  }




  onLoad(): void {
    this.employeeForm.patchValue({
      firstName: 'Ankit',
      lastName: 'Bhosale',
      email: 'ankit123@kfjs',
      mobile: '78473878',
      address: 'pune',
      date: '13/06/2016',
      gender: 'male',
      salary: '784783',

    });


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
      ([key, value]:any[]) => {
        this.fd.append(key, value);
        console.log('key:' + key, 'value' + value);
      });

      this.employeeService.postEmp(this.fd)
      .subscribe(
        response => console.log('Success!', response),
        error => console.error('Error!', error)
      );
    this.employeeService.getEmployees()
      .subscribe(
        response => console.log('GET!!', response),
        error => console.error('Error!!', error))
        this.tostr.success('Record Saved','Toastr fun!');   
  }
  

  add(value)
  {
    this.Skills.push(value);
    console.log(value);
    console.log(this.Skills);
    if(this.Skills.length>1 || this.Skills.length===0)
    this.skillError=false;
    else
    this.skillError=true;
    
  }

  remove(value)
  { console.log(value);
    for(var i=0;i<this.Skills.length;i++)
    {
      if(this.Skills[i]===value)
      {
       this.Skills.splice(i,1);
       console.log(this.Skills);
      }
    }
    if(this.Skills.length>1 || this.Skills.length===0)
    this.skillError=false;
    else
    this.skillError=true;
    console.log(this.Skills);
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

