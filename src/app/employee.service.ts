import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { Employee } from 'api/model/Employee'
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  _url = 'http://localhost:3000/'
  constructor(private _http: HttpClient, private router: Router) { }



  postEmp(empdata) {
    console.log(empdata);
    return this._http.post<any>('http://localhost:3001/emp', empdata);
  }
  postUser(empdata) {
    console.log(empdata);
    return this._http.post<any>('http://localhost:3001/user/login', empdata);
  }
  registerUser(empdata) {
    console.log(empdata);
    return this._http.post<any>('http://localhost:3001/user/signup', empdata);
  }

  getEmp(id) {
    console.log(id);
    return this._http.get<[]>('http://localhost:3001/emp/' + id);
  }

  getEmployees() {
    return this._http.get<Employee[]>('http://localhost:3001/emp');
  }

  updateEmployee(empdata, id) {
    console.log('IDD', id);
    console.log(empdata);
    return this._http.put<any>('http://localhost:3001/emp/' + id, empdata)

  }

  updatePassword(password, id) {
    console.log('IDD', id);
    console.log(password);
    return this._http.put<any>('http://localhost:3001/user/' + id, password)

  }


  resetPass(email) {
    console.log("CALL IN SERVICE:",email);
    return this._http.post("http://localhost:3001/user/reset",email)
  }





  deleteEmp(id) {

    console.log("element deleted!", id)
    return this._http.delete<any>('http://localhost:3001/emp/' + id);
  }


  logedIn(){
    return !! localStorage.getItem("token");
  }


}
