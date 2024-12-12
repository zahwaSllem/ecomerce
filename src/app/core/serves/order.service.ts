import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private readonly _HttpClient:HttpClient  ) { }
 myHeader:any={token : localStorage.getItem('userToken')}

checkOut(idCart:string|null  , shippingDetails:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${environment.urlServer}`,

    {
      "shippingAddress":shippingDetails
  }

  );
}


}
