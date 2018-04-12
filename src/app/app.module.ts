import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{RouterModule,Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthguardGuard } from './authguard.guard';
import { ClientComponent } from './client/client.component';
import { SingupComponent } from './singup/singup.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MoneyTransferComponent } from './client/money-transfer/money-transfer.component';
import { CreditAccountComponent } from './client/credit-account/credit-account.component';
import { SavingAccountComponent } from './client/saving-account/saving-account.component';
import { HttpClient } from '@angular/common/http';
import { AdminCreditInformComponent } from './admin-page/admin-credit-inform/admin-credit-inform.component';
import { AdminSavingInformComponent } from './admin-page/admin-saving-inform/admin-saving-inform.component';
import { AdminCurrentAccountInformComponent } from './admin-page/admin-current-account-inform/admin-current-account-inform.component';
import { OtherInformComponent } from './admin-page/other-inform/other-inform.component';
import { PersonalInfoService } from './serive/personal-info.service';
import { AccountService } from './serive/account.service';
import { CityService } from './serive/city.service';
import { CountryService } from './serive/country.service';
import { MoneyTransferService } from './serive/money-transfer.service';
import { SavingAccountService } from './serive/saving-account.service';
import { CreditAccountService } from './serive/credit-account.service';
import { CurrentAccountService } from './serive/current-account.service';
import { BankAccountService } from './serive/bank-account.service';
import { SupportService } from './serive/support.service';
import { ClientService } from './serive/client.service';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { FileService } from './serive/file.service';
import { PagerService } from './serive/pager.service';
import { SharedService } from './serive/shared.service';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    FooterComponent,
    AdminPageComponent,
    ClientComponent,
    SingupComponent,
    MoneyTransferComponent,
    CreditAccountComponent,
    SavingAccountComponent,
    AdminCreditInformComponent,
    AdminSavingInformComponent,
    AdminCurrentAccountInformComponent,
    OtherInformComponent
  ],
  imports: [
    BrowserModule,
    AsyncLocalStorageModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ClientService,AuthguardGuard,
             PersonalInfoService,
             AccountService,
             CityService,
             CountryService,
             MoneyTransferService,
             SavingAccountService,
             CreditAccountService,
             CurrentAccountService,
             BankAccountService,
             SupportService,
             FileService,
             PagerService,
             SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
