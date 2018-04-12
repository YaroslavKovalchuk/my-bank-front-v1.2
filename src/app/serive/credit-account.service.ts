import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreditAccount } from '../models/credit-account';
import { Observable } from 'rxjs/Observable';
import { PageRequest } from '../models/page-request';
import { Account } from '../models/account';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CreditAccountService {

  private creditAccoutUrl = "http://localhost:8080/creditaccount";

  constructor( private http: HttpClient) { }

  saveCreditAccount(creditAccout:CreditAccount,token:string):Observable<CreditAccount>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.post<CreditAccount>(this.creditAccoutUrl,creditAccout,httpOptions).pipe();
  }

  getCreditAccount(id:number,token:string):Observable<CreditAccount>{
      httpOptions.headers = httpOptions.headers.set('Authorize',token);
      return this.http.get<CreditAccount>(this.creditAccoutUrl + "/" + id,httpOptions).pipe();
  }

  getCreditAccountByClient(id:number,token:string):Observable<CreditAccount[]>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.get<CreditAccount[]>(this.creditAccoutUrl + "/byclient/" + id,httpOptions).pipe();
}

  getCreditAccounts(pageRequest:PageRequest,token:string):Observable<CreditAccount[]>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
     return this.http.post<CreditAccount[]>(this.creditAccoutUrl+ "/page",pageRequest,httpOptions).pipe();
   }

   getAccountFilter(account:Account,token:string):Observable<CreditAccount[]>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.post<CreditAccount[]>(this.creditAccoutUrl + "/filter",account,httpOptions).pipe();
  }

  updateCreditAccount(id:number,creditAccout:CreditAccount,token:string):Observable<CreditAccount>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.put<CreditAccount>(this.creditAccoutUrl + "/" + id,creditAccout,httpOptions).pipe();    
  }

}
