import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SavingAccount } from '../models/savingAcoount';
import { Observable } from 'rxjs/Observable';
import { PageRequest } from '../models/page-request';
import { Account } from '../models/account';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SavingAccountService {

  private savingUrl = "http://localhost:8080/saving"; 

  constructor( private http: HttpClient) { }

  saveSavingAccount(savigAccount:SavingAccount,token:string):Observable<SavingAccount>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.post<SavingAccount>(this.savingUrl,savigAccount,httpOptions).pipe();
  }

  getSavingAccountsByClient(id:number,token:string):Observable<SavingAccount[]>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.get<SavingAccount[]>(this.savingUrl + "/byclient/" + id,httpOptions).pipe();
}

  getSavingAccounts(pageRequest:PageRequest,token:string):Observable<SavingAccount[]>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
     return this.http.post<SavingAccount[]>(this.savingUrl+ "/page",pageRequest,httpOptions).pipe();
   }

   getAccountFilter(account:Account,token:string):Observable<SavingAccount[]>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.post<SavingAccount[]>(this.savingUrl + "/filter",account,httpOptions).pipe();
  }

  deleteSavingAccout(id:string,token:string):Observable<SavingAccount>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.delete<SavingAccount>(this.savingUrl + "/" + id,httpOptions).pipe();
  }

}
