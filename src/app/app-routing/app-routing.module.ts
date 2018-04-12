import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from '../login-form/login-form.component';
import { AuthguardGuard } from '../authguard.guard';
import { AdminPageComponent } from '../admin-page/admin-page.component';
import { ClientComponent } from '../client/client.component';
import { SingupComponent } from '../singup/singup.component';
import { CreditAccountComponent } from '../client/credit-account/credit-account.component';
import { SavingAccountComponent } from '../client/saving-account/saving-account.component';
import { MoneyTransferComponent } from '../client/money-transfer/money-transfer.component';
import { AdminCreditInformComponent } from '../admin-page/admin-credit-inform/admin-credit-inform.component';
import { AdminSavingInformComponent } from '../admin-page/admin-saving-inform/admin-saving-inform.component';
import { AdminCurrentAccountInformComponent } from '../admin-page/admin-current-account-inform/admin-current-account-inform.component';
import { OtherInformComponent } from '../admin-page/other-inform/other-inform.component';


const appRoutes:Routes = [
  {path:'',
  component:LoginFormComponent},

  {path:'admin',
 // canActivate:[AuthguardGuard], 
  component:AdminPageComponent,
  children:[
    {path: 'creditinform',
    component:AdminCreditInformComponent},
    {path: 'savinginform',
    component:AdminSavingInformComponent},
    {path: 'currentinform',
    component:AdminCurrentAccountInformComponent},
    {path: 'otherinform',
    component:OtherInformComponent}
  ]},

  {path:'client',
 // canActivate:[AuthguardGuard],
  children:[
    {path:':userId',
    component:ClientComponent,
    children:[
      {path:'credit',
      component: CreditAccountComponent},
      {path:"saving",
      component: SavingAccountComponent},
      {path:"transfer",
      component: MoneyTransferComponent,}
    ]
  }
  ]},

  {path:"registration",
  component:SingupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
