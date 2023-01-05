import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanLoad {

  constructor(private _router: Router) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

  private check(): Observable<boolean> {
    if (AuthService.authenticated) {
      this._router.navigateByUrl('/home');
      return of(false);
    }

    return of(true)

  }
}
