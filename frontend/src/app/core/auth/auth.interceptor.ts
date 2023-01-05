import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static accessToken: string;

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newReq = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + AuthInterceptor.accessToken)
    })

    return next.handle(newReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && AuthService.authenticated) {
        return this.authService.refreshToken().pipe(
          switchMap((response: any) => {
            AuthInterceptor.accessToken = response.accessToken;
            newReq = request.clone({
              headers: request.headers.set('Authorization', 'Bearer ' + AuthInterceptor.accessToken)
            })
            return next.handle(newReq);
          })
        )
      }

      return throwError(() => err)
    }));
  }
}
