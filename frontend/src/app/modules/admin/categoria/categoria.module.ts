import { CategoriaEditComponent } from './edit/categoria-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriasComponent } from './list/list-categorias.component';
import { CategoriaAddComponent } from './add/categoria-add.component';

const categoriasRoutes: Routes = [
  {
    path: '',
    component: ListCategoriasComponent
  },
  {
    path: 'add',
    component: CategoriaAddComponent
  },
  {
    path: 'edit/:id',
    component: CategoriaEditComponent
  }
]


@NgModule({
  declarations: [
    ListCategoriasComponent,
    CategoriaAddComponent, 
    CategoriaEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(categoriasRoutes)
  ],
  providers: []

})
export class CategoriaModule { }
