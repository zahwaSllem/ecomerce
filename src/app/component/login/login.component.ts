
import { routes } from './../../app.routes';
import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/serves/auth.service';
import { log } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnDestroy {

  loginSub!:Subscription;


  
private readonly _AuthService=inject(AuthService);
private readonly _FormBuilder=inject(FormBuilder);
private readonly  _Router= inject(Router);


msgsuccess:boolean=false
mesError:string="" ;
isLoading:boolean = false;

loginForm:FormGroup= this._FormBuilder.group(
  {
    email:[null, [Validators.required, Validators.email]],
    password:[null, [ Validators.required  ,Validators.pattern( /^\w{6,}$/   )]],
  
   



  },
)




 









 loginSubmit():void{


  if (this.loginForm.valid) {

    this.isLoading=true;

      this.loginSub= this._AuthService.setLoginForm(this.loginForm.value).subscribe({
      next:(res)=>{ 
      console.log(res);
    
      if (res.message=='success') {
        this.msgsuccess=true

    
       
        setTimeout( () => { 
          console.log(res)
        localStorage.setItem('userToken', res.token )
           this._AuthService.saveUserData()
          this._Router.navigate(['/home'])},1000)

    
      }
   
     // this.isLoading=false;
      },
      error:(err:HttpErrorResponse)=>{

        this.mesError =err.error.message
        console.log(err);
       // this.isLoading=false;
      },
    })
   
  }
else{
  this.loginForm.setErrors({mismatch:true})
  this.loginForm.markAllAsTouched()
}
 
}





ngOnDestroy(): void {
  this.loginSub?.unsubscribe();
}










}
