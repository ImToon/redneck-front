import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  TOKEN_KEY:string = "TOKEN"

  constructor(private router:Router) { }

  public storeToken(token:string):void{
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public disconnect():void{
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['login']);
  }

  public isAuthenticated():boolean{
    return localStorage.getItem(this.TOKEN_KEY) !== null;
  }
}
