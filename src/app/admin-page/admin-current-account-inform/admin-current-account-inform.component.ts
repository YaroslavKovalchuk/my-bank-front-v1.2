import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../serive/client.service';
import { PagerService } from '../../serive/pager.service';
import { SortProp } from '../../models/sort-prop';
import { PageRequest } from '../../models/page-request';
import { Client } from '../../models/client';
import { AccountService } from '../../serive/account.service';
import { Account } from '../../models/account';
import { CurrentAccountService } from '../../serive/current-account.service';

@Component({
  selector: 'app-admin-current-account-inform',
  templateUrl: './admin-current-account-inform.component.html',
  styleUrls: ['./admin-current-account-inform.component.css']
})
export class AdminCurrentAccountInformComponent implements OnInit {

  client;
  content:Client[];
  accountSpecRequest: Account;
  balance:number;
  balanceLess:number;
  filter: boolean;
  pages = [];
  pageSize:number;
  numberPage:number;
  sizePage = 5;
  account:Account;
  token:string;

  constructor(private clientService:ClientService,
              private pagerService: PagerService,
              private accountServie:AccountService,
              private cuurentAccountService: CurrentAccountService) { }

  ngOnInit() {
    this.filter = false;
    var numberPage = this.numberPage;
    var sizePage = this.sizePage;
    var sortRequest = {sortProp:"id",direction:"ASC"} as SortProp;
    var pageRequest = {numberPage,sizePage,sortRequest} as PageRequest
    this.clientService.localStorage.getItem<string>('tokenUser')
    .subscribe((token)=>{
          this.token = token;
          this.cuurentAccountService.getCurrentAccounts(pageRequest,token)
          .subscribe(account => {
            this.client = account;
            this.pageSize = this.client.totalPages;
            this.initPages(this.pageSize);
            this.setPage(1);
            console.log(this.client.content);
            })
        });

  }

  setPage(page: number) {
    this.numberPage = page - 1;
    var numberPage = this.numberPage;
    var sizePage = this.sizePage;
    var sortRequest = { sortProp: "id", direction: "ASC" } as SortProp;
    var pageRequest = { numberPage, sizePage, sortRequest } as PageRequest
    
    if (!this.filter) {
      this.cuurentAccountService.getCurrentAccounts(pageRequest, this.token)
        .subscribe(account => {
          this.client = account;
        });
    } else {
      var myPageRequest = { numberPage, sizePage, sortRequest } as PageRequest
      var balance = this.balance;
      var balanceLess = this.balanceLess;
      this.accountSpecRequest = {balanceLess,balance,myPageRequest } as Account;
      this.cuurentAccountService.getAccountFilter(this.accountSpecRequest, this.token)
        .subscribe(account => {
          this.client = account;
          this.pageSize = this.client.totalPages;
          this.initPages(this.pageSize);
        })
    }
  }

    initPages(lenght:number){
      this.pages=[];
      for (let index = 1; index < lenght+1; index++) {
         this.pages.push(index);
      }
    }

    prev(page:number){
      if(this.numberPage > 0){
      this.setPage(this.numberPage);
      }
    }
    next(page:number){
      if(this.numberPage < this.pageSize-1){
      this.numberPage = this.numberPage + 2;
      this.setPage(this.numberPage);
    }
    }

    setFilter(balanceLess:number,balance:number,card:string,state:string){
      this.filter = true;
      this.balance = balance;
      this.balanceLess = balanceLess;
      var numberPage = this.numberPage;     
      var sizePage = this.sizePage;
      var sortRequest = {sortProp:"id",direction:"ASC"} as SortProp;
      var myPageRequest = {numberPage,sizePage,sortRequest} as PageRequest
      var accountRequest = {balance,balanceLess,myPageRequest} as Account;
      this.cuurentAccountService.getAccountFilter(accountRequest,this.token)
      .subscribe(account => {
        this.client = account;
        this.pageSize = this.client.totalPages;
        this.initPages(this.pageSize);
      })     
    }

}
