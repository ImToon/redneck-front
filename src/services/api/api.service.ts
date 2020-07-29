import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Credentials } from 'src/models/credentials';
import { Token } from 'src/models/token';
import { RegistrationForm } from 'src/models/registrationForm';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_PATH:String = environment.production ? 'https://redneck-api.glitch.me/api' : 'http://localhost:3000/api';

  constructor(private http:HttpClient) { }

  register(registrationForm:RegistrationForm):Observable<any>{
    return this.http.post<any>(`${this.BASE_PATH}/users/register`, registrationForm);
  }

  login(credentials:Credentials):Observable<Token>{
    return this.http.post<Token>(`${this.BASE_PATH}/users/login`, credentials);
  }
}