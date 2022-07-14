import { Component, OnInit } from '@angular/core';
import { PostagemService } from 'src/app/core/services/postagem.service';
import { IPostagem } from 'src/app/core/types/postagem.types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postagens-list',
  templateUrl: './postagem-list.component.html'
})
export class PostagemListComponent implements OnInit {

  postagens?: IPostagem[];

  constructor(private _postagemService: PostagemService) { }

  ngOnInit(): void {
    this._postagemService.getAllPostagens().subscribe((data) => this.postagens = data);
  }

  delPostagem(id: string, titulo: string) {
    Swal.fire({
      customClass: {
        confirmButton: 'btn btn-success mx-1 fs-5',
        cancelButton: 'btn btn-danger mx-1 fs-5'
      },
      buttonsStyling: false,
      icon: 'warning',
      html: `<span class="fs-3">Deseja realmente exluir o post <b>${titulo}</b></span>`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Deletar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._postagemService.delPostById(id)
          .subscribe(() => this.postagens = this.postagens?.filter((postagem) => postagem._id !== id));
      }
    })
  }
}
