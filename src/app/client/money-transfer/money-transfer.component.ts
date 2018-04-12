import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OperationMoney } from '../../models/operatio-money';
import { Account } from '../../models/account';
import { MoneyTransferService } from '../../serive/money-transfer.service';
import { AccountService } from '../../serive/account.service';
import { ActivatedRoute } from '@angular/router';
import { HistoryMoneyTransfer } from '../../models/historyMoneyTransfer';
import { ClientService } from '../../serive/client.service';
import { SharedService } from '../../serive/shared.service';


@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class MoneyTransferComponent implements OnInit {

  trasfers:OperationMoney[] = [];
  operat : OperationMoney;
  account:Account;
  token:string;
  userId:number;
 

  constructor(private moneyTransferService:MoneyTransferService,
                private accountService:AccountService,
                  private route: ActivatedRoute,
                    private clientService:ClientService,
                      private accountServie:AccountService,
                        private _sharedService: SharedService) { }


  ngOnInit() {
    this.userId = this.route.snapshot.parent.params.userId;
    this.clientService.localStorage.getItem<string>('tokenUser')
    .subscribe((token)=>{
              this.token = token;
              var client_id = this.userId
              this.accountServie.getAccountByClientId({client_id} as Account,this.token)
              .subscribe(account =>{
              this.moneyTransferService.getMoneyTransfers(this.userId,this.token)
                .subscribe(trasfers => {
                  this.trasfers = trasfers;
                  for (let index = 0; index < trasfers.length; index++) {
                    if(account.cardNumber === trasfers[index].resiver.cardNumber){
                      this.trasfers[index].cardNumber = trasfers[index].sender.cardNumber;
                    }else{
                      this.trasfers[index].cardNumber = trasfers[index].resiver.cardNumber;
                    }
                    this.trasfers[index].amount = trasfers[index].amount;
                    this.trasfers[index].dateTransfer = new Date(trasfers[index].dateTransfer).toLocaleString();                
                  } 
                });
            });
          })
  }

  add(e){
    e.preventDefault();
    var amount = e.target.elements[0].value;
    var resiverCardNumber = e.target.elements[1].value;
    if(amount > 0){
      if(resiverCardNumber.length === 19){
    var client_id = this.userId;
      this.accountServie.getAccountByClientId({client_id} as Account,this.token)
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

}
