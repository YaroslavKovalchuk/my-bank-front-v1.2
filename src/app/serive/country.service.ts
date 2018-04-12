import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country } from '../models/country';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CountryService {

  private countryUrl = "http://localhost:8080/public/country";

  constructor( private http: HttpClient) { }

  saveCountry(country:Country):Observable<Country>{
    return this.http.post<Country>(this.countryUrl,country,httpOptions).pipe();
  }

  getCountries():Observable<Country[]>{
    return this.http.get<Country[]>(this.countryUrl).pipe();
  }

}
