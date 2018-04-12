import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { PersonalInfo } from '../models/personal-info';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PersonalInfoService {

  private personalInfoUrl = "http://localhost:8080/personalInfo";

  private publicUrl = "http://localhost:8080/public/"

  constructor( private http: HttpClient) { }

  savePersonalInfo(personalInfo:PersonalInfo):Observable<PersonalInfo> {
    return this.http.post<PersonalInfo>(this.publicUrl + "createperson",personalInfo,httpOptions).pipe();
  }
  getPersonalInfo(id:number):Observable<PersonalInfo>{
    return this.http.get<PersonalInfo>(this.personalInfoUrl + "/" + id).pipe();
  }

  updatePersonalInfo(id:number,personalInfo:PersonalInfo,token:string):Observable<PersonalInfo>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.put<PersonalInfo>(this.personalInfoUrl + "/" + id,personalInfo,httpOptions).pipe()
  }

}
