import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { File } from '../models/file';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class FileService {

  private fileUrl = "http://localhost:8080/file";

  constructor(private http: HttpClient) { }

  saveFile(file:File,token:string):Observable<string>{
    httpOptions.headers = httpOptions.headers.set('Authorize',token);
    return this.http.post(this.fileUrl,file,{headers:httpOptions.headers,responseType: 'text'}).pipe();
   }

}
