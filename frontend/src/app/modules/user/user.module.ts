import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { PostagemComponent } from './postagem/postagem.component';

const userRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'postagem/:slug',
    component: PostagemComponent,
  }
]

@NgModule({
  declarations: [HomeComponent, PostagemComponent],
  imports: [CommonModule, RouterModule.forChild(userRoutes)]
})
export class UserModule { }
