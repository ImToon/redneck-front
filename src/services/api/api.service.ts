import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Credentials } from 'src/models/credentials';
import { Token } from 'src/models/token';
import { RegistrationForm } from 'src/models/registrationForm';
import { AuthService } from '../auth/auth.service';
import { Quote } from 'src/models/quote';
import { newQuote } from 'src/models/newQuote';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_PATH:String = environment.production ? 'https://redneck-api.glitch.me/api' : 'https://redneck-api.glitch.me/api';

  constructor(private http:HttpClient, private authService:AuthService) { }

  protected getHeader(){
    return {
      headers : new HttpHeaders({
        "Content-Type" : "application/json",
        "Access-Control-Allow-Origin":"*"
      })
    };
  }

  protected getHeaderWithAuthorization() {
    const token = this.authService.getToken();
    if(token == null)
      return this.getHeader();
    else
      return {
        headers : new HttpHeaders({
          "Content-Type" : "application/json",
          "Access-Control-Allow-Origin":"*",
          "Authorization":token,
        })
      };
  }

  register(registrationForm:RegistrationForm):Observable<any>{
    return this.http.post<any>(`${this.BASE_PATH}/users/register`, registrationForm, this.getHeader());
  }

  login(credentials:Credentials):Observable<Token>{
    return this.http.post<Token>(`${this.BASE_PATH}/users/login`, credentials, this.getHeader());
  }

  getQuoteById(id:string):Observable<Quote>{
    return this.http.get<Quote>(`${this.BASE_PATH}/quotes/${id}?withComments=false`, this.getHeaderWithAuthorization());
  }

  getQuoteByIdWithComments(id:string):Observable<Quote>{
    return this.http.get<Quote>(`${this.BASE_PATH}/quotes/${id}?withComments=true`, this.getHeaderWithAuthorization());
  }

  getQuotes(page:number):Observable<Array<Quote>>{
    return this.http.get<Array<Quote>>(`${this.BASE_PATH}/quotes?page=${page}&withComments=false`, this.getHeaderWithAuthorization());
  }

  getQuotesWithComments(page:number):Observable<Array<Quote>>{
    return this.http.get<Array<Quote>>(`${this.BASE_PATH}/quotes?page=${page}&withComments=true`, this.getHeaderWithAuthorization());
  }

  postQuote(quote:newQuote):Observable<any>{
    return this.http.post<any>(`${this.BASE_PATH}/quotes`, quote, this.getHeaderWithAuthorization());
  }

  commentQuote(quoteId:string, comment:string):Observable<any>{
    return this.http.post<any>(`${this.BASE_PATH}/quotes/${quoteId}/comment`, {content:comment}, this.getHeaderWithAuthorization());
  }

  rateQuote(quoteId:string, mark:boolean):Observable<any>{
    return this.http.post<any>(`${this.BASE_PATH}/quotes/${quoteId}/rate`, {mark:mark}, this.getHeaderWithAuthorization());
  }
}