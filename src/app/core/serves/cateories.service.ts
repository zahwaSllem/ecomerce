import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CateoriesService {

  constructor( private _HttpClient:HttpClient) { }

 getAllCategories():Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories  ` )
 }



 getSpecificCategory(id:string|null):Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id} ` )
 }



}
