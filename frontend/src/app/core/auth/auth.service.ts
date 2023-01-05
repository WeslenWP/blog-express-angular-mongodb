import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './auth.interceptor';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static authenticated: boolean;

  private url: string = `${environment.urlServer}/auth`

  constructor(private _httpClient: HttpClient, private user: UserService) { }

  set authenticated(value: boolean) {
    AuthService.authenticated = value
  }

  get authenticated() {
    return AuthService.authenticated
  }

  set accessToken(value: string) {
    AuthInterceptor.accessToken = value
  }

  set hasLogged(value: boolean) {
    if (value) {
      localStorage.setItem('remember', '1')
    } else {
      localStorage.removeItem('remember')
    }
  }

  get hasLogged() {
    return !!localStorage.getItem('remember') ?? false
  }

  signIn(credentials: { email: string, senha: string }): Observable<any> {
    return this._httpClient.post(`${this.url}`, credentials, { withCredentials: true }).pipe(
      switchMap((response: any) => {
        this.user.user = response.user;
        this.accessToken = response.accessToken;
        this.authenticated = true;
        this.hasLogged = true;

        return of(true);
      })
    );
  }

  refreshToken(): Observable<any> {
    return this._httpClient.post(`${this.url}/refresh`, null, { withCredentials: true });
  }

  check(): Observable<boolean> {
    if (this.authenticated) return of(false);
    return this.signWithToken().pipe(switchMap((loggedIn: boolean) => of(loggedIn)))
  }

  signWithToken(): Observable<boolean> {
    if (this.hasLogged) {
      return this.refreshToken().pipe(
        switchMap((response: any) => {
          this.accessToken = response.accessToken;
          this.authenticated = true;
          return this.user.get().pipe(
            switchMap((response) => response ? of(true) : of(false))
          );
        }),
        catchError(() => {
          this.accessToken = '';
          localStorage.removeItem('remember');
          return throwError(() => false);
        })
      )
    }

    return of(false)
  }

}
