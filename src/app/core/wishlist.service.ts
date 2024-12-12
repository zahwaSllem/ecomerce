import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
    private readonly  _HttpClient=inject(HttpClient)

    myHeaders:any= {token:localStorage.getItem('userToken')};

addProductTowishlist(id:string):Observable<any>{
return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,

  {  "productId":id},
  { headers:this.myHeaders }
)
}

}
