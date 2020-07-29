import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api/api.service';
import {Credentials} from '../../models/credentials'
import { AuthService } from 'src/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide:Boolean = true;
  isLoggingIn:boolean = false;
  username:string="";
  password:string="";

  hasError:boolean = false;

  constructor(private api:ApiService, private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }

  login(){
    const creds:Credentials = {
      username: this.username,
      password: this.password
    };
    this.isLoggingIn = true;
    this.api.login(creds).subscribe(data =>{
      this.isLoggingIn = false;
      this.authService.storeToken(data.token);
      this.router.navigate(['home']);
    }, error => {
      this.hasError = true;
      setTimeout(()=>this.hasError = false, 2000)
      this.isLoggingIn = false;
    });
  }

}
