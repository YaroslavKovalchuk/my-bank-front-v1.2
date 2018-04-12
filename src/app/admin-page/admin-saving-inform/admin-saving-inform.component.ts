import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../serive/client.service';
import { PagerService } from '../../serive/pager.service';
import { AccountService } from '../../serive/account.service';
import { SavingAccountService } from '../../serive/saving-account.service';
import { SortProp } from '../../models/sort-prop';
import { PageRequest } from '../../models/page-request';
import { Client } from '../../models/client';
import { Account } from '../../models/account';

@Component({
  selector: 'app-admin-saving-inform',
  templateUrl: './admin-saving-inform.component.html',
  styleUrls: ['./admin-saving-inform.component.css']
})
export class AdminSavingInformComponent implements OnInit {
  client;
  content: Client[];
  accountSpecRequest: Account;
  balance:number;

  filter: boolean;
  pages = [];
  pageSize: number;
  numberPage: number;
  sizePage = 5;
  account: Account;
  token: string;

  constructor(private clientService: ClientService,
    private pagerService: PagerService,
    private accountServie: AccountService,
    private savingAccountService: SavingAccountService) { }

  ngOnInit() {
    this.filter = false;
    var numberPage = this.numberPage;
    var sizePage = this.sizePage;
    var sortRequest = { sortProp: "id", direction: "ASC" } as SortProp;
    var pageRequest = { numberPage, sizePage, sortRequest } as PageRequest
    this.clientService.localStorage.getItem<string>('tokenUser')
      .subscribe((token) => {
        this.token = token;
        this.savingAccountService.getSavingAccounts(pageRequest, token)
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
      this.savingAccountService.getSavingAccounts(pageRequest, this.token)
        .subscribe(account => {
          this.client = account;
        });
    } else {
      var myPageRequest = { numberPage, sizePage, sortRequest } as PageRequest
      var balance = this.balance;
      this.accountSpecRequest = {balance,myPageRequest } as Account;
      this.savingAccountService.getAccountFilter(this.accountSpecRequest, this.token)
        .subscribe(account => {
          this.client = account;
          this.pageSize = this.client.totalPages;
          this.initPages(this.pageSize);
        })
    }
  }

  initPages(lenght: number) {
    this.pages = [];
    for (let index = 1; index < lenght + 1; index++) {
      this.pages.push(index);
    }
  }

  prev(page: number) {
    if (this.numberPage > 0) {
      this.setPage(this.numberPage);
    }
  }
  next(page: number) {
    if (this.numberPage < this.pageSize - 1) {
      this.numberPage = this.numberPage + 2;
      this.setPage(this.numberPage);
    }
  }

  setFilter(balance: number, card: string, state: string) {
    this.filter = true;
    this.balance = balance;
    var numberPage = this.numberPage;
    var sizePage = this.sizePage;
    var sortRequest = { sortProp: "id", direction: "ASC" } as SortProp;
    var myPageRequest = { numberPage, sizePage, sortRequest } as PageRequest
    this.accountSpecRequest = {balance, myPageRequest } as Account;
    this.savingAccountService.getAccountFilter(this.accountSpecRequest, this.token)
      .subscribe(account => {
        this.client = account;
        this.pageSize = this.client.totalPages;
        this.initPages(this.pageSize);
      })
  }
}
