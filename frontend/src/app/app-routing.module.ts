import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { IsAdminGuard } from './core/auth/guards/is-admin.guard';
import { NoAuthGuard } from './core/auth/guards/no-auth.guard';
import { AdminLayoutComponent } from './core/layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './core/layout/user-layout/user-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    canLoad: [NoAuthGuard],
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canLoad: [AuthGuard, IsAdminGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    component: UserLayoutComponent,
    // canLoad: [AuthGuard],
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
