import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private httpClient:HttpClient) { }
  httpOptions : any ={
    headers: new HttpHeaders({
      'Content-Type':'application/json',
    }),
  };

  get(endpoints:string){
    return this.httpClient.get<any[]>(endpoints,this.httpOptions).pipe(catchError(this.handleError));
  }
  
  post(endpoints:string, body:any){
    return this.httpClient.post<any[]>(endpoints,body,this.httpOptions).pipe(catchError(this.handleError));
  }

  put(endpoints:string, body:any){
    return this.httpClient.put<any[]>(endpoints, body, this.httpOptions).pipe(catchError(this.handleError));
  }

  delete(endpoints:string){
    return this.httpClient.delete<any[]>(endpoints,this.httpOptions).pipe(catchError(this.handleError));
  }

  handleError(error){
    window.alert("Error"+JSON.stringify(error));
    return throwError(error);
  }
}
