import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';


@Injectable()
export class ToastInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      map((res) => {
        if (res.type == 4 && (res.status === 201 || res.status === 200) && res.body.message) {
          this.toastService.show(res.body.message, 'success')
        }
        return res;
      }),
      catchError((err) => {
        if (err instanceof HttpErrorResponse && !(err.error instanceof ErrorEvent) && err.status === 404 || 500)
          this.toastService.show(err.error.message, 'error');
        return of(err)
      })
    )
  }
}
