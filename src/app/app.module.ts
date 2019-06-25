import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { ListComponent } from './employees/list/list.component';
import { UpdateEmployeeComponent } from './employees/update-employee/update-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from './employee.service';
import {HttpClientModule} from '@angular/common/http';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {AvatarModule} from 'ngx-avatar';
import { TagInputModule } from 'ngx-chips';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import { CurrencyMaskModule } from "ng2-currency-mask";
import {NgxMaskModule} from 'ngx-mask'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuickAddComponent } from './quick-add/quick-add.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { AuthGuard } from './auth.guard'
const appRoutes:Routes=[
  {path:'add-employee', component: AddEmployeeComponent,canActivate:[AuthGuard]},
  {path:'list',component:ListComponent,canActivate:[AuthGuard]},
  {path:'update-employee/:id',component:UpdateEmployeeComponent},
  {path:'quick-add',component:QuickAddComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent,canActivate:[AuthGuard]},
  {path:'reset',component:ResetPasswordComponent,canActivate:[AuthGuard]},
  {path:'confirm/:id',component:ConfirmPasswordComponent}

  //{path:'',redirectTo:'/list',pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    ListComponent,
    UpdateEmployeeComponent,
    QuickAddComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ConfirmPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    TagInputModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    AvatarModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    
    
   
  ],
  providers: [EmployeeService,AuthGuard
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
