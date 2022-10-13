import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {
  db_url ='http://localhost:3000/productList'

  constructor(private http:HttpClient) { }

  //this has a permeter of data  to be inserted into the db
  saveProduct(userInput:any):Observable<any>{
    return this.http.post<any>(this.db_url, userInput);
  }

  displayProduct():Observable<any>{
    return this.http.get<any>(this.db_url);
  }

  //has the parameter of data to be insert and id of the data
  updateproduct(dataFetch:any, id:number):Observable<any>{

    const url =`${this.db_url}/${id}`;
    return this.http.put<any>(url, dataFetch);
  }

  deleteProduct(id:number):Observable<any>{
    const url =`${this.db_url}/${id}`;
    return this.http.delete<any>(url);

  }

}
