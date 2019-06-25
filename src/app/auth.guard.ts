import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable, from } from 'rxjs';
import { EmployeeService } from '../app/employee.service'
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route:Router,private employeeService:EmployeeService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     var value=this.employeeService.logedIn();
     if(value)
     {
       console.log(value);
      return true;
     }
     this.route.navigate['/login'];

   return false;
  }

  
}
