import { Component, OnInit } from '@angular/core';
import { PostagemService } from 'src/app/core/services/postagem.service';
import { IPostagem } from 'src/app/core/types/postagem.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts!: IPostagem[];

  constructor(private _postagemService: PostagemService) { }

  ngOnInit(): void {
    this._postagemService.getAllPosts().subscribe((posts) => this.posts = posts)
  }

}