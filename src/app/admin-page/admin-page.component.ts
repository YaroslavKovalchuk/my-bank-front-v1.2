import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    this.router.navigate(['admin/currentinform']);
  }

  creditActive(){
    this.router.navigate(['admin/creditinform']);
  }

  savingActive(){
    this.router.navigate(['admin/savinginform']);
  }

  accountActive(){
    this.router.navigate(['admin/currentinform']);
  }

  ohterActive(){
    this.router.navigate(['admin/otherinform']);
  }




}
