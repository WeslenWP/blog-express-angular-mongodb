import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, ReplaySubject, Subject, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../types/user.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: ReplaySubject<IUser > = new ReplaySubject<IUser >(1);

  set user(value: IUser) {
    this._user.next(value);
  }

  get user$() {
    return this._user.asObservable();
  }

  constructor(private _httpClient: HttpClient) { }

  get() {
    return this._httpClient.get(`${environment.urlServer}/auth/me`, { withCredentials: true })
      .pipe(switchMap((user: any) => {
        this.user = user;
        return of(true);
      }),
        catchError(() => throwError(() => false))
      );
  }
}
