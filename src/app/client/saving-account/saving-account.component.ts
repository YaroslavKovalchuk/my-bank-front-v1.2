import { Component, OnInit } from '@angular/core';
import { SavingAccount } from '../../models/savingAcoount';
import { Account } from '../../models/account';
import { SavingAccountService } from '../../serive/saving-account.service';
import { AccountService } from '../../serive/account.service';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../serive/client.service';
import { SharedService } from '../../serive/shared.service';
import { MoneyTransferService } from '../../serive/money-transfer.service';
import { OperationMoney } from '../../models/operatio-money';

@Component({
  selector: 'app-saving-account',
  templateUrl: './saving-account.component.html',
  styleUrls: ['./saving-account.component.css']
})
export class SavingAccountComponent implements OnInit {

  account: Account;
  savig: SavingAccount;
  savings:SavingAccount[] = [];
  trasfers:OperationMoney[] = [];
  userId: number;
  token:string;
  interesRate:number;

  constructor(private savingAccountService: SavingAccountService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private _sharedService: SharedService,
    private moneyTransferService:MoneyTransferService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.parent.params.userId;
    this.clientService.localStorage.getItem<string>('tokenUser')
    .subscribe((token) => {
        this.token = token;
        this.getSavingAccountByClient(token);
    });
  }

  add(e) {
    var client_id = this.userId;
    e.preventDefault();
    var balance = e.target.elements[0].value;
    this.interesRate = e.target.elements[1].value;
    if(balance > 0){
      if( this.interesRate > 0){
        this.accountService.saveAccount({ balance, client_id } as Account, this.token)
          .subscribe(account => {
          this.account = account;
            this.saveSavingAccount(this.account);
          });
        }else{
          alert("Wrong intersted rate");
        }
        }else{
          alert("Wrong amount");
        }
      
  }

  saveSavingAccount(account: Account) {
    var account_id = account.id;
    var interestedRate = this.interesRate;
    this.savingAccountService.saveSavingAccount({ interestedRate, account_id } as SavingAccount, this.token)
      .subscribe(()=>{
        this.getSavingAccountByClient(this.token);
        this.onClick();
      });
  }

  getSavingAccountByClient(token:string){
    this.savingAccountService.getSavingAccountsByClient(this.userId,this.token)
    .subscribe(saved => {
      this.savings = saved;
      for (let index = 0; index < saved.length; index++) {
        this.savings[index].cardNumber = saved[index].accountResponse.cardNumber;
        this.savings[index].amount = saved[index].accountResponse.balance;
        this.savings[index].interestedRate = saved[index].interestedRate; 
        this.savings[index].dateTransfer = new Date(saved[index].accountResponse.date).toLocaleString();                
      }
    })
  }

  played(e){
    e.preventDefault();
    var amount = e.target.elements[0].value;
    var resiverCardNumber = e.target.elements[1].value;
    if(amount > 0 ){
      if(resiverCardNumber.length === 19){
    var client_id = this.userId;
      this.accountService.getAccountByClientId({client_id} as Account,this.token)
        .subscribe(account =>{this.account = account;
          var sender_id = this.account.id;
          this.moneyTransferService.moneyTransfer({sender_id,amount,resiverCardNumber} as OperationMoney,this.token)
            .subscribe(moneyTranfer =>{
              this.moneyTransferService.getMoneyTransfers(this.userId,this.token)
                .subscribe(trasfers => {
                  this.trasfers = trasfers;
                  for (let index = 0; index < trasfers.length; index++) {
                    this.trasfers[index].cardNumber = trasfers[index].resiver.cardNumber;
                    this.trasfers[index].amount = trasfers[index].amount;
                    this.trasfers[index].dateTransfer = new Date(trasfers[index].dateTransfer).toLocaleString();                
                  }
                  this.getSavingAccountByClient(this.token);
                  this.onClick();
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

  onClick(){
    this._sharedService.emitChange('Data from child');
   }

   closed(id:string){
    this.trasfers.slice(this.trasfers.length,1);
     this.savingAccountService.deleteSavingAccout(id,this.token)
      .subscribe(()=>{
        this.onClick();
        this.getSavingAccountByClient(this.token);
      });
   }
}
