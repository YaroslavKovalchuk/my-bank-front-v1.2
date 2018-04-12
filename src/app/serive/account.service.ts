import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from '../models/account';
import { Client } from '../models/client';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AccountService {

  private accountUrl = "http://localhost:8080/account";

  constructor( private http: HttpClient) { }

  saveAccount(account:Account,token:string):Observable<Account>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.post<Account>(this.accountUrl,account,httpOptions).pipe();
  }

  getAccount(id:number):Observable<Account>{
     return this.http.get<Account>(this.accountUrl+"/" + id).pipe();
  }

  getAccountByClientId(account:Account,token:string):Observable<Account>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.post<Account>(this.accountUrl + "/selectOne",account,httpOptions).pipe();
  }

  getAccounts():Observable<Account[]>{
    return this.http.get<Account[]>(this.accountUrl).pipe();
  }

  getAccountFilter(account:Account,token:string):Observable<Account[]>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.post<Account[]>(this.accountUrl + "/filter",account,httpOptions).pipe();
  }

  updateAccount(id:number,account:Account,token:string):Observable<Account>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.put<Account>(this.accountUrl + "/" + id,account,httpOptions).pipe();    
  }

}
