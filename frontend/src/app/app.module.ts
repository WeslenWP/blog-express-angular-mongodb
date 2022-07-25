import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastInterceptor } from './core/interceptors/toast.interceptor';
import { AdminLayoutComponent } from './core/layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './core/layout/user-layout/user-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ToastInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
