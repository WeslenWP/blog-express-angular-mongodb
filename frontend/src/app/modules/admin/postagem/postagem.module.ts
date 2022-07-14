import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostagemAddComponent } from './add/postagem-add.component';
import { PostagemListComponent } from './list/postagem-list.component';
import { PostagemEditComponent } from './edit/postagem-edit.component';


const PostagemRoute: Routes = [
  {
    path: '',
    component: PostagemListComponent
  },
  {
    path: 'add',
    component: PostagemAddComponent
  },
  {
    path: 'edit/:id',
    component: PostagemEditComponent
  }
]

@NgModule({
  declarations: [PostagemAddComponent, PostagemListComponent, PostagemEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(PostagemRoute)
  ]
})
export class PostagemModule { }
