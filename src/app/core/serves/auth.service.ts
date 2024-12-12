import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // constructor(private readonly   _HttpClient2:HttpClient){}
   private readonly   _HttpClient=  inject(HttpClient);
   private readonly _Router= inject( Router)

   userData:any=null;
 
   private url = `${environment.baseUrl}/api/v1/auth`

setRegisterForm(data:object):Observable<any> {
  return this._HttpClient.post (`${this.url}/signup`, data  )
}

setLoginForm(data:object):Observable<any> {
  return this._HttpClient.post ( `${this.url}/signin   `, data  )
}



saveUserData():void{
  if( localStorage.getItem('userToken')!==null ){
  
  
   this.userData = jwtDecode(  localStorage.getItem('userToken')!)

   console.log( this.userData, 'userdata');
   
  }
  console.log( this.userData, 'userdata');
}

logOut():void{
  localStorage.removeItem('userToken');
  this.userData= null;
  this._Router.navigate(['/login'])
 
}


setEmailverify(data:object):Observable<any>{
    

  // return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` ,data)
  return this._HttpClient.post('      https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords               '         ,data    )

}


setCodeverify(data:object):Observable<any>{
    

  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` ,data)
}


restPassword(data:object):Observable<any>{
    

  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword` ,data)
}



}
  