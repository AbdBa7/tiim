import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from '../models/tokens';
import { config } from 'src/app/config/config';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonService } from '../../service/service-common';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private common_service: CommonService

  ) {}

  login(user: { username: string, password: string }): Observable<boolean> {
    // return this.http.post<any>(`${config.apiUrl}/login`, user)
    // var email = this.form.getRawValue().email;
    // var password = this.form.getRawValue().password;
    console.log(user)
    // return this.common_service.post(`${environment.API_URL}login`, {user, withCredentials: true})
    
    return this.common_service.get_all(`${environment.API_URL}login?email=${user['username']}&password=${user['password']}`)
      .pipe(
        tap(tokens => {          
          let token_inp = new Tokens();
          // token_inp.jwt=JSON.stringify(tokens['access_token']);
          token_inp.jwt=tokens['access_token'];
          token_inp.refreshToken=tokens['refresh_token'];
          if (token_inp.jwt !== undefined) {  
            console.log(token_inp.jwt)
            this.doLoginUser(user.username, token_inp)
          }
        }),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logout() {
    return this.common_service.post(`${config.API_URL}logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${config.API_URL}refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
