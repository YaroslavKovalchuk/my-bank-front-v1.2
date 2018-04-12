import { PageRequest } from "./page-request";


export class Account{
    id:number;
    balance:number;
    balanceLess:number;
    client_id:number;
    myPageRequest:PageRequest;
    cardNumber:string;
    state:string;
    accountType:string; 
}