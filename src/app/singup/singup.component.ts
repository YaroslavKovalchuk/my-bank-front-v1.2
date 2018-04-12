import { Component, OnInit } from '@angular/core';
import { Country } from '../models/country';
import { City } from '../models/citi';
import { PersonalInfo } from '../models/personal-info';
import { CountryService } from '../serive/country.service';
import { CityService } from '../serive/city.service';
import { PersonalInfoService } from '../serive/personal-info.service';
import { ClientService } from '../serive/client.service';
import { Client } from '../models/client';
import { Router } from '@angular/router';
import { AccountService } from '../serive/account.service';
import { CurrentAccountService } from '../serive/current-account.service';
import { Account } from '../models/account';
import { CurrentAccount } from '../models/current-account';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  countries:Country[];
  cities:City[];
  personalInfoes:PersonalInfo[];

  personalInfo:PersonalInfo
  client:Client;
  account:Account;
  currentAccount:CurrentAccount;
  

  constructor(private countryService:CountryService,
              private cityService:CityService,
              private personalInfoService:PersonalInfoService,
              private clientService:ClientService,
              private router:Router,
              private accountService:AccountService,
              private currentAccountService:CurrentAccountService) { }

  ngOnInit() {
    this.countryService.getCountries()
    .subscribe(countries => this.countries = countries);
  }

  singupUser(e){
    e.preventDefault();
    var firstName =   e.target.elements[0].value; 
    var lastName =    e.target.elements[1].value;
    var age =         e.target.elements[2].value;
    var phoneNumber = e.target.elements[3].value;
    var idCity = e.target.elements[5].value;

    var password1 = e.target.elements[7].value;
    var password2 = e.target.elements[8].value;

    if(password1 === password2){
     this.personalInfoService.savePersonalInfo({firstName,lastName,age,phoneNumber,idCity} as PersonalInfo)
      .subscribe(personalInfo => { this.personalInfo = personalInfo;
        this.saveClient(personalInfo,e);
      });
    }else{
      alert("Incorect Password")
    }

  }

  saveClient(personalInfo:PersonalInfo,e){
    this.personalInfo = personalInfo;
    var email = e.target.elements[6].value;
    var password = e.target.elements[7].value;
    var personalInfo_id = this.personalInfo.id;

    this.clientService.addClient({email,password,personalInfo_id} as Client)
    .subscribe(client =>{this.client = client;
      var login = email
      this.clientService.getToken({login,password} as Client)
      .subscribe(token => {
        this.clientService.localStorage.setItem('tokenUser','Bearer ' +token)
        .subscribe(() => {
          this.clientService.localStorage.getItem<string>('tokenUser').subscribe((token)=>{
            this.saveAccount(client,token);
           })
        })
      })
    });
  }

  saveAccount(client:Client,token:string){
    var balance = 1000;
    var client_id = client.id;
    this.accountService.saveAccount({balance,client_id} as Account,token)
    .subscribe(account =>{this.account = account;
      this.clientService.localStorage.getItem<string>('tokenUser').subscribe((token)=>{
        this.saveCurrentAccount(account,token);
       })
    })
  }
  saveCurrentAccount(account:Account,token:string){
    var account_id = account.id;
    this.currentAccountService.saveCurrentAccount({account_id} as CurrentAccount,token)
    .subscribe(currentAccount =>{this.currentAccount = currentAccount;
      this.router.navigate(['client/'+this.client.id]);
    })
  }
  selectCountry(nameCountry:string){
   var idCountry = nameCountry;
   var name = "";
    this.cityService.getCities({name,idCountry} as City)
    .subscribe(cities => this.cities = cities);
  }
}
