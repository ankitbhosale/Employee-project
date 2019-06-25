import { Injectable } from '@angular/core';
declare var toastr:any
@Injectable({
  providedIn: 'root'
})
export class ToastrService {
    

  constructor() { }

  success(title:string,message?:string){
    toastr.success(title,message);
  }
  Error(title:string,message?:string){
    toastr.Error(title,message);
  }


}
