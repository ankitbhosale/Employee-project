import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  city = [];
  
  state1=['Maharastra', 'Goa', 'MadyaPradesh'];
  
  constructor(){
  
  this.city[0] = ['Mumbai', 'Pune', 'Nashik', 'Dapoli'];
  this.city[1] = ['Panaji', 'abc', 'ggg', 'ooo'];
  this.city[2] = ['abcs', 'cde', 'pppp', 'Dppp'];
  
  }
  }
