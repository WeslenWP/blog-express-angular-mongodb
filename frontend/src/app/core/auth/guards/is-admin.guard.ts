import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { IUser } from '../../types/user.types';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanLoad {
  private user!: IUser;

  constructor(private userService: UserService, private _router: Router) {
    this.userService.user$.subscribe((user) => this.user = user)
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

  check(): Observable<boolean> | boolean {
    if (this.user.tipo === 'Admin') return of(true);

    this._router.navigateByUrl('/');
    return of(false)
  }
}
