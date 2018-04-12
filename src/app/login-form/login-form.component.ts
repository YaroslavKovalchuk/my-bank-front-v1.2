import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { ClientService } from '../serive/client.service';
import { Client } from '../models/client';
import { Token } from '../models/token';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  token:Token;

  client:Client;

  constructor(private router:Router,private clientService:ClientService) { }

  ngOnInit() {
  }

  loginUser(e){
    e.preventDefault();
    var login = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    this.clientService.getToken({login,password} as Client)
    .subscribe(token => {
      this.clientService.localStorage.setItem('tokenUser','Bearer ' +token)
        .subscribe(() => {
          this.clientService.getClientByEmail(login,"Bearer " +token)
          .subscribe(client =>{ 
            console.log(client);
            this.router.navigate(['client/'+client]);   
          });
        });
    });

/*
    if(userName == 'admin@a.com' && password == 'admin'){
      this.clientService.setUserLoggedIn();
      this.router.navigate(['admin']);
    }
    if(userName == 'c@a.com' && password == '1'){
      this.clientService.setUserLoggedIn();
      this.router.navigate(['client/'+userName]);
    }*/

  }

}
