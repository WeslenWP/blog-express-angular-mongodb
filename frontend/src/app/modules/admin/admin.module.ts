import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { PostagemListComponent } from './postagem/list/postagem-list.component';
import { PostagemAddComponent } from './postagem/add/postagem-add.component';
import { PostagemEditComponent } from './postagem/edit/postagem-edit.component';
import { ListCategoriaComponent } from './categoria/list/list-categoria.component';
import { CategoriaAddComponent } from './categoria/add/categoria-add.component';
import { CategoriaEditComponent } from './categoria/edit/categoria-edit.component';

const adminRoute: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'postagens' },
  {
    path: 'postagens',
    children: [{
      path: '',
      data: { title: 'Postagens' },
      component: PostagemListComponent
    },
    {
      path: 'add',
      data: { title: 'Adicionar postagem' },
      component: PostagemAddComponent
    },
    {
      path: 'edit/:id',
      data: { title: 'Editar postagem' },
      component: PostagemEditComponent
    }]
  },
  {
    path: 'categorias',
    children: [
      {
        path: '',
        component: ListCategoriaComponent,
        data: { title: 'Categorias' }
      },
      {
        path: 'add',
        component: CategoriaAddComponent,
        data: { title: 'Nova categoria' }

      },
      {
        path: 'edit/:id',
        component: CategoriaEditComponent,
        data: { title: 'Editar categoria' }
      }]
  }
]

@NgModule({
  declarations: [PostagemListComponent, PostagemAddComponent, PostagemEditComponent, ListCategoriaComponent, CategoriaAddComponent, CategoriaEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(adminRoute)
  ],
})
export class AdminModule { }
