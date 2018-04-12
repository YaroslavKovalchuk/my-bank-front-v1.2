import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrentAccount } from '../models/current-account';
import { Observable } from 'rxjs/Observable';
import { PageRequest } from '../models/page-request';
import { Account } from '../models/account';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CurrentAccountService {

  private currentAccountUrl = "http://localhost:8080/currentaccount";

  constructor( private http: HttpClient) { }

  saveCurrentAccount(currentAccount:CurrentAccount,token:string):Observable<CurrentAccount>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.post<CurrentAccount>(this.currentAccountUrl,currentAccount,httpOptions).pipe();
  }

  getCurrentAccount(id:number):Observable<CurrentAccount>{
    return this.http.get<CurrentAccount>(this.currentAccountUrl + "/" + id).pipe();
  }

  getCurrentAccounts(pageRequest:PageRequest,token:string):Observable<CurrentAccount[]>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
     return this.http.post<CurrentAccount[]>(this.currentAccountUrl+ "/page",pageRequest,httpOptions).pipe();
   }

   getAccountFilter(account:Account,token:string):Observable<CurrentAccount[]>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.post<CurrentAccount[]>(this.currentAccountUrl + "/filter",account,httpOptions).pipe();
  }


}
