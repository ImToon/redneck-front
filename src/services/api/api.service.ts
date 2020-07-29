import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Credentials } from 'src/models/credentials';
import { Token } from 'src/models/token';
import { RegistrationForm } from 'src/models/registrationForm';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_PATH:String = environment.production ? 'https://redneck-api.glitch.me/api' : 'http://localhost:5000/api';

  constructor(private http:HttpClient, private authService:AuthService) { }



  register(registrationForm:RegistrationForm):Observable<any>{
    return this.http.post<any>(`${this.BASE_PATH}/users/register`, registrationForm);
  }

  login(credentials:Credentials):Observable<Token>{
    return this.http.post<Token>(`${this.BASE_PATH}/users/login`, credentials);
  }

  getQuote(page:number){
    
  }
}