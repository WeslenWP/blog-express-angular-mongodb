import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'postagens' },
      {
        path: 'categorias',
        loadChildren: () => import('./modules/admin/categoria/categoria.module').then(m => m.CategoriaModule),
      },
      {
        path: 'postagens',
        loadChildren: () => import('./modules/admin/postagem/postagem.module').then(m => m.PostagemModule)
      }
    ]
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
