import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, retry, debounceTime } from 'rxjs/operators';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Client } from '../models/client';
import { Token } from '../models/token';
import { Router } from '@angular/router';
import { PageRequest } from '../models/page-request';


const httpOptions = {
  
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable()
export class ClientService {

  

  private clientUrl = "http://localhost:8080/client";

  private publicUrl = "http://localhost:8080/public/"

  private isUserLoggedIn: boolean;
  private userName;

  private tokUser:string;

  constructor( private http: HttpClient,
                public localStorage: AsyncLocalStorage,
                  private router:Router,) {
                      this.isUserLoggedIn = false;
   }
  
   setUserLoggedIn(){this.isUserLoggedIn = true;}
   getUserLoggedIn():boolean{ return this.isUserLoggedIn;}

   addClient(client:Client):Observable<Client>{
     return this.http.post<Client>(this.publicUrl+"createclient",client,httpOptions).pipe();
   }

   getCleint(id:number,token:string):Observable<Client>{
     httpOptions.headers = httpOptions.headers.set('Authorize',token);
     return this.http.get<Client>(this.clientUrl + "/" + id,httpOptions).pipe();
   }

   getClientByEmail(email:string,token:string):Observable<number>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
     return this.http.get<number>(this.clientUrl + "/email?email=" + email,httpOptions).pipe();
   }

   getClients(pageRequest:PageRequest,token:string):Observable<Client[]>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
     return this.http.post<Client[]>(this.clientUrl+ "/page",pageRequest,httpOptions).pipe();
   }

   getToken(client:Client):Observable<String>{
     return this.http.post(this.publicUrl +"login",client,{responseType: 'text'}).pipe();
   }



} 
