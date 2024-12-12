import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment/environment';
import e from 'express';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private   HttpClient_:HttpClient ) { };

 cartNamber:BehaviorSubject <number>= new BehaviorSubject(0) ;







  myHeaders:any= {token:localStorage.getItem('userToken')};




  

addProductToCart(id:string|null):Observable<any>{
  return this.HttpClient_.post(`${environment.baseUrl}/api/v1/cart`,  

    {
       "productId": id,
    }
    )
}


getProudctsCart():Observable<any>{
  return this.HttpClient_.get(`${environment.baseUrl}/api/v1/cart`,  

    
  )
}


deletSpecificCartItem(id:string):Observable<any>{
  return this.HttpClient_.delete(`   ${environment.baseUrl}/api/v1/cart/${id}  `,
    
  )
}
 


updateProductQuantity(id:string,newCount:number ):Observable<any>{
  return this.HttpClient_.put(`${environment.baseUrl}/api/v1/cart/${id}  `, 
{
  "count": newCount

}
  )
}

clearCart( ):Observable<any>{
  return this.HttpClient_.delete(`${environment.baseUrl}/api/v1/cart/  `, 


   
  )
}

  

}
