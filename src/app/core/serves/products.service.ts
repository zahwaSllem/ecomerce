import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {



   private readonly _HttpClient=inject (HttpClient)

   getAllProduct():Observable<any>{
return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)
   }


getSpeificProducts(id:string | null):Observable<any>{
return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id} `  )


}

getSpeificPrands(id:string | null):Observable<any>{
   return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands/${id} `  )
   
   
   }
   







}
 