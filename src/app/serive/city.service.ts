import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { City } from '../models/citi';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CityService {

  private cityAllUrl = "http://localhost:8080/public/city/all";
  private cityUrl = "http://localhost:8080/public/city";

  constructor( private http: HttpClient) { }

  saveCity(city:City):Observable<City>{
    return this.http.post<City>(this.cityAllUrl,city,httpOptions).pipe();
  }

  getCities(city:City):Observable<City[]>{
    return this.http.post<City[]>(this.cityUrl,city,httpOptions).pipe();
  }

}
