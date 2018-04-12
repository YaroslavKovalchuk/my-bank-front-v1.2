import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { PersonalInfoService } from '../serive/personal-info.service';
import { ClientService } from '../serive/client.service';
import { AccountService } from '../serive/account.service';
import { PersonalInfo } from '../models/personal-info';
import { Client } from '../models/client';
import { Account } from '../models/account';
import { FileService } from '../serive/file.service';
import { File } from '../models/file';
import { SharedService } from '../serive/shared.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  myImage = "";

  personalInfo:PersonalInfo;
  client:Client;
  account:Account;
  loading: boolean = false;
  token:string;
  userId:number;
  personalInfoId:number;
  imgFile:string;
 
  constructor(private route: ActivatedRoute,
                private router:Router,
                  private personalInfoService:PersonalInfoService,
                    private clientService:ClientService,
                      private accountServie:AccountService,
                        private fileService:FileService,
                          private _sharedService: SharedService) 
                            {
                            _sharedService.changeEmitted$.subscribe(
                              () => {
                                this.init();
                              });
                            }

  ngOnInit() {
   this.userId = this.route.snapshot.params.userId;
   this.init();
   this.router.navigate(['client/'+this.userId+'/transfer']);
  }

  init(){
    this.clientService.localStorage.getItem<string>('tokenUser')
    .subscribe((token)=>{
          this.token = token;
          this.clientService.getCleint(this.userId,token)
            .subscribe(client => {
                this.client = client;
                this.personalInfoId = this.client.personalInfoResponse.id
                this.myImage = "http://localhost:8080/public/images/" + this.client.personalInfoResponse.imgFile;
                this.getAccountById(client.id);
            });
         })  
  }

getAccountById(client_id:number){
  this.accountServie.getAccountByClientId({client_id} as Account,this.token)
  .subscribe(account =>{
    this.account = account;
  });
}

  creditActive(){
    this.router.navigate(['client/'+this.userId+'/credit']);
  }

  savingActive(){
    this.router.navigate(['client/'+this.userId+'/saving']);
  }

  transferActive(){
    this.router.navigate(['client/'+this.userId+'/transfer']);
  }

handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);

}

_handleReaderLoaded(e) {
  var reader = e.target;
  let content = reader.result;
  console.log("success");
    this.fileService.saveFile({content} as File,this.token)
      .subscribe(fileName=> {
        console.log("success" + fileName);
        console.log(this.personalInfoId);
        this.updatePersonInfo(fileName);
      });
  }
  updatePersonInfo(imgFile:string){
    this.personalInfoService.updatePersonalInfo(this.personalInfoId ,{imgFile} as PersonalInfo,this.token)
      .subscribe(()=>{
        this.myImage = "http://localhost:8080/public/images/" + imgFile;
      });
  }

}
