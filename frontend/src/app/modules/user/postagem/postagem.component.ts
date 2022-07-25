import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PostagemService } from 'src/app/core/services/postagem.service';
import { IPostagem } from 'src/app/core/types/postagem.types';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
})
export class PostagemComponent implements OnInit {
  postagem!: IPostagem;

  constructor(private _postagemService: PostagemService, private _router: Router, private _activatedRoute: ActivatedRoute, private title: Title) { }

  ngOnInit(): void {

    this._postagemService.getPostBySlug(this._activatedRoute.snapshot.params['slug']).subscribe(
      {
        next: (postagem) => {
          this.title.setTitle(postagem.titulo);
          this.postagem = postagem;
        },
        error: () => this._router.navigateByUrl('/'),
      }
    )
  }

}
