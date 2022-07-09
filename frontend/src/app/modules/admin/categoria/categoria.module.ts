import { CategoriaEditComponent } from './edit/categoria-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriasComponent } from './list/list-categorias.component';
import { CategoriaAddComponent } from './add/categoria-add.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
    SharedModule,
    RouterModule.forChild(categoriasRoutes)
  ],
  providers: []

})
export class CategoriaModule { }
