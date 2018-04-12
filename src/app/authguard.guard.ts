import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ClientService } from './serive/client.service';

@Injectable()
export class AuthguardGuard implements CanActivate {

  constructor(private clientService:ClientService,private router:Router ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
  if(!this.clientService.getUserLoggedIn()) {
    this.router.navigate(['/']);   
  }
    return this.clientService.getUserLoggedIn();
  }
}
