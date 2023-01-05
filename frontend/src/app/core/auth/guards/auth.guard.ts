import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private _router: Router) {

  }

  canLoad(
    route: Route,
    segments: UrlSegment[],): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

  private check(): Observable<boolean> {
    if (!AuthService.authenticated) {
      this._router.navigateByUrl('/auth');
      return of(false);
    }

    return of(true)
  }
}
