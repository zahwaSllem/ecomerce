import { NgClass } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, inject, OnDestroy } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { subscribeOn, Subscription } from "rxjs";
import { AuthService } from "../../core/serves/auth.service";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})



export class RegisterComponent  implements OnDestroy {

 

  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);


  msgsuccess: boolean = false;
  mesError: string = "";
  isLoading: boolean = false;

  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null,Validators.required],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],



    },
{validators:[this.confirmPassword]}       
  );





  // registerForm:FormGroup = new FormGroup({
  //  name:  new FormControl(null,[Validators.required, Validators.minLength(4),Validators.maxLength(20) ]),
  //   email: new FormControl(null ,[ Validators.required ,Validators.email ,]),
  //   password: new FormControl(null ,[ Validators.required  ,Validators.pattern( /^\w{6,}$/   )]),
  //  rePassword: new FormControl(null ,  ),
  //  phone: new FormControl(null ,[   Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/ ) ])
  // }, this.confirmPassword );
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    }
    else {
      return { mismatch: true };
    }
  }

  registerSub!: Subscription;


  registerSubmit(): void {


    if (this.registerForm.valid) {

      this.isLoading = true;

      this.registerSub = this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);

          if (res.message == 'success') {
            this.msgsuccess = true;
            setTimeout(
              () => { this._Router.navigate(['/login',]); }, 1000
            );


          }

          this.isLoading = false;
        },
        error: (err) => {

          this.mesError = err.error.message;
          console.log(err);
          this.isLoading = false;
        },
      });

    }
    else {
      this.registerForm.setErrors({ mismatch: true });
      this.registerForm.markAllAsTouched();
    }

  }





  ngOnDestroy(): void {
    this.registerSub?.unsubscribe();

  }










}
