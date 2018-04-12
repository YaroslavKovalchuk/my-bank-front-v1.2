import { Component, OnInit, Input, HostListener, ElementRef, Directive } from '@angular/core';
import { CreditAccountService } from '../../serive/credit-account.service';
import { AccountService } from '../../serive/account.service';
import { ActivatedRoute } from '@angular/router';
import { CreditAccount } from '../../models/credit-account';
import { Account } from '../../models/account';
import { ClientService } from '../../serive/client.service';
import { SharedService } from '../../serive/shared.service';
import { MoneyTransferService } from '../../serive/money-transfer.service';
import { OperationMoney } from '../../models/operatio-money';

@Component({
  selector: 'app-credit-account',
  templateUrl: './credit-account.component.html',
  styleUrls: ['./credit-account.component.css']
})
export class CreditAccountComponent implements OnInit {

  account: Account;
  token: string;
  creditAccount: CreditAccount;
  userId: number;
  credits: CreditAccount[] = [];
  trasfers: OperationMoney[] = [];
  interesRate: number;

  constructor(private creditAccountService: CreditAccountService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private _sharedService: SharedService,
    private moneyTransferService: MoneyTransferService,
    private el: ElementRef) { }

  ngOnInit() {
    this.userId = this.route.snapshot.parent.params.userId;
    this.clientService.localStorage.getItem<string>('tokenUser')
      .subscribe((token) => {
        this.token = token;
        this.getCreditAccount(token);
      });
  }

  add(e) {
    var client_id = this.userId;
    e.preventDefault();
    var balance = e.target.elements[0].value;
    this.interesRate = e.target.elements[1].value;
    if (balance > 0) {
      if (this.interesRate > 0) {
        this.accountService.saveAccount({ balance, client_id } as Account, this.token)
          .subscribe(account => {
          this.account = account;
            this.saveCreditAccount(this.account, e, this.token);
          });
      } else {
        alert("Wrong interested rate");
      }
    } else {
      alert("Wrong amount");
    }
  }

  saveCreditAccount(account: Account, e, token: string) {
    var account_id = account.id;
    var interestedRate = this.interesRate;
    this.creditAccountService.saveCreditAccount({ interestedRate, account_id } as CreditAccount, token)
      .subscribe((saveCreditAccount) => {
        this.creditAccount = saveCreditAccount;
        this.creditAccount.id = saveCreditAccount.id;
        this.getCreditAccount(this.token);
        this.onClick();
      });
  }


  getCreditAccount(token: string) {
    this.creditAccountService.getCreditAccountByClient(this.userId, token)
      .subscribe(credited => {
        this.credits = credited;
        for (let index = 0; index < credited.length; index++) {
          this.credits[index].cardNumber = credited[index].accountResponse.cardNumber;
          this.credits[index].amount = credited[index].accountResponse.balance;
          this.credits[index].interestedRate = credited[index].interestedRate;
          this.credits[index].dateTransfer = new Date(credited[index].accountResponse.date).toLocaleString();
        }
      })
  }

  played(e) {
    e.preventDefault();
    var amount = e.target.elements[0].value;
    var resiverCardNumber = e.target.elements[1].value;
    if(amount > 0){
      if(resiverCardNumber === 19){
    var client_id = this.userId;
    this.accountService.getAccountByClientId({ client_id } as Account, this.token)
      .subscribe(account => {
      this.account = account;
        var sender_id = this.account.id;
        this.moneyTransferService.moneyTransfer({ sender_id, amount, resiverCardNumber } as OperationMoney, this.token)
          .subscribe(moneyTranfer => {
            var balance = moneyTranfer.resiver.balance + (-2 * moneyTranfer.amount);
            console.log(balance);
            var account = { balance } as Account;
            this.accountService.updateAccount(moneyTranfer.resiver.id, account, this.token)
              .subscribe(() => {
                this.moneyTransferService.getMoneyTransfers(this.userId, this.token)
                  .subscribe(trasfers => {
                    this.trasfers = trasfers;
                    for (let index = 0; index < trasfers.length; index++) {
                      this.trasfers[index].cardNumber = trasfers[index].resiver.cardNumber;
                      this.trasfers[index].amount = trasfers[index].amount;
                      this.trasfers[index].dateTransfer = new Date(trasfers[index].dateTransfer).toLocaleString();
                    }
                    this.getCreditAccount(this.token);
                    this.onClick();
                  });
              });
          });
      });
    }else{
      alert("Wrong card number");
    }
    }else{
      alert("Wrong amount");
    }
  }

  onClick() {
    this._sharedService.emitChange('Data from child');
  }

}
