import { AuthService } from './../../core/serves/auth.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  step:number = 1;
  private readonly _FormBuilder =inject(FormBuilder);
  private readonly _AuthService=inject(AuthService);
  private readonly _Router=inject(Router);


  // verifyEmail:FormGroup=this._FormBuilder.group({
  //   email : [null ,[Validators.required , Validators.pattern(/^[0-9]{6}$/)]]
  // })



  verifyEmail:FormGroup = new FormGroup({
    email : new FormControl(null ,[Validators.required , Validators.email])
  });

  verifyCode:FormGroup = new FormGroup({
    resetCode : new FormControl(null ,[Validators.required , Validators.pattern(/^[0-9]{6}$/)])
  });

  resetPassword:FormGroup = new FormGroup({
  email : new FormControl(null ,[Validators.required , Validators.email]),
   newPassword: new FormControl(null,[ Validators.required, Validators.pattern( /^\w{6,}$/   )]),
  
  })


  verifyEmailSubmit():void{



    let emailValue= this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue);



   this._AuthService.setEmailverify(this.verifyEmail.value).subscribe({
    next: (res) =>{
      console.log(res.statusMsg);
      
      if(res.statusMsg ==='success'){
        this.step=2;
      }


    } ,error:(err)=>{
      console.log(err)
    }
   })
  }


  
  verifyCodeSubmit():void{
    this._AuthService.setCodeverify(this.verifyCode.value).subscribe({
     next: (res) =>{
       console.log(res.statusMsg);
       
       if(res.status==='Success'){
         this.step =3;
       }
 
 
     } ,error:(err)=>{
       console.log(err)
     }
    })
   }
 


   restPasswoerSubmit():void{
    this._AuthService.restPassword(this.resetPassword.value).subscribe({
     next: (res) =>{
       console.log(res.statusMsg);
       
     localStorage.setItem('userToken',res.token)
        

     this._AuthService.saveUserData()
      this._Router.navigate(['/home'])
 
     } ,error:(err)=>{
       console.log(err)
     }
    })
   }
 

}
