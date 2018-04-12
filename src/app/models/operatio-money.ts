export class OperationMoney{
  sender: any;
    cardNumber: any;
    dateTransfer: any;
    resiver: any;
    sender_id:number;
    amount:number;
    resiverCardNumber:string;

    setDate(date:Date){
        this.dateTransfer = new Date(date);
    }

}