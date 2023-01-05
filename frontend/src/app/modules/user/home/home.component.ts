import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { PostagemService } from 'src/app/core/services/postagem.service';
import { UserService } from 'src/app/core/services/user.service';
import { ICategoria } from 'src/app/core/types/categoria.types';
import { IPostagem } from 'src/app/core/types/postagem.types';
interface tab {
  id: string,
  name: string,
  active: boolean
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  posts!: IPostagem[];
  isPhone: boolean = false;

  tabs: tab[] = [
    {
      id: '',
      name: 'Recentes',
      active: true
    },
  ];

  constructor(private _postagemService: PostagemService, private _categoriaService: CategoriaService, public user: UserService) { }

  ngOnInit(): void {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isPhone = true;
    }

    this._postagemService.getAllPosts().subscribe((posts: IPostagem[]) => this.posts = posts)

    this._categoriaService.getAllCategorias().subscribe((categorias: ICategoria[]) => {
      categorias.forEach((categoria) =>
        this.tabs.push({
          id: categoria._id,
          name: categoria.nome,
          active: false
        })
      )
    })
  }

  changeCategory(index: number) {
    if (this.tabs[index].id != '') {
      this._postagemService.getPostsByCategoriaID(this.tabs[index].id).subscribe((posts) => {
        this.allActivetoFalse();
        this.tabs[index].active = true;
        this.posts = posts;
      })
    } else {
      this._postagemService.getAllPosts().subscribe((posts) => {
        this.allActivetoFalse();
        this.tabs[index].active = true;
        this.posts = posts;
      })
    }
  }

  allActivetoFalse() {
    this.tabs.forEach((tab) => {
      tab.active = false
    })
  }

}