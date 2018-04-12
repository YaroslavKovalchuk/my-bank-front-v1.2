import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OperationMoney } from '../models/operatio-money';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MoneyTransferService {

  private moneyTransferUrl = "http://localhost:8080/moneyTranfer";

  constructor( private http: HttpClient) { }

  moneyTransfer(operatinMoney:OperationMoney,token:string):Observable<OperationMoney>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.post<OperationMoney>(this.moneyTransferUrl,operatinMoney,httpOptions).pipe();
   }

   getMoneyTransfers(id:number,token:string):Observable<OperationMoney[]>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.get<OperationMoney[]>(this.moneyTransferUrl + "/sender/" + id,httpOptions).pipe();
   }


}
