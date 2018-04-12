import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ClientService } from '../serive/client.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route:ActivatedRoute,
                private router:Router,
                private clientService:ClientService) { }


  ngOnInit() {
  }

  goBack(){
    this.clientService.localStorage.clear()
    .subscribe(() => { this.router.navigate(['/'])});
     }

}
