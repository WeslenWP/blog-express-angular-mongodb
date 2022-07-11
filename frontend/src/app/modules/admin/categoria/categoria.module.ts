import { CategoriaEditComponent } from './edit/categoria-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriaComponent } from './list/list-categoria.component';
import { CategoriaAddComponent } from './add/categoria-add.component';
import { SharedModule } from 'src/app/shared/shared.module';

const categoriaRoutes: Routes = [
  {
    path: '',
    component: ListCategoriaComponent
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
    ListCategoriaComponent,
    CategoriaAddComponent, 
    CategoriaEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(categoriaRoutes)
  ],
  providers: []

})
export class CategoriaModule { }
