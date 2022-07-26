import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { PostagemService } from 'src/app/core/services/postagem.service';
import { ICategoria } from 'src/app/core/types/categoria.types';
import { IPostagem } from 'src/app/core/types/postagem.types';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html'
})
export class PostagemEditComponent implements OnInit {
  private id: string;

  categorias!: ICategoria[];
  currentCategoria!: ICategoria;
  form: FormGroup;
  isChanging: boolean = false;

  constructor
    (private _formBuilder: FormBuilder,
      private _activatedRoute: ActivatedRoute,
      private _router: Router,
      private _postagemService: PostagemService,
      private _categoriaService: CategoriaService,
      private title: Title

    ) {
    this.id = this._activatedRoute.snapshot.params['id'];

    this.form = this._formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(4)]],
      descricao: ['', [Validators.required, Validators.minLength(4)]],
      conteudo: ['', [Validators.required, Validators.maxLength(2000)]],
      categoria: ['', [Validators.required]]
    });
    this.form.disable();
  }

  ngOnInit(): void {
    this._postagemService.getPostById(this.id).subscribe({
      next: (postagem: IPostagem) => {
        this.title.setTitle(postagem.titulo)
        
        this.form.setValue({
          titulo: postagem.titulo,
          descricao: postagem.descricao,
          conteudo: postagem.conteudo,
          categoria: postagem.categoria._id
        })

        this.currentCategoria = postagem.categoria
        this.form.enable()
        this.form.markAsUntouched();

        // Categorias
        this._categoriaService.getAllCategorias().subscribe(
          (categorias) => this.categorias = categorias.filter((categoria: ICategoria) => categoria._id !== this.currentCategoria._id)
        )
      },
      error: (err) => {
        switch (err.status) {
          case 422:
            Object.keys(err.error).forEach((key: any) => this.form.controls[key].setErrors(err.error[key]));
            break;
          case 500:
            this._router.navigateByUrl('/admin/postagens');
            break;
        }
      }
    })

  }

  onSubmit() {
    if (!this.isChanging) {
      this.isChanging = true
      this._postagemService.editPost(this.id, this.form.value)
        .subscribe(
          {
            next: () => {
              this._router.navigateByUrl('/admin/postagens');
            },
            error: (err) => {
              switch (err) {
                case 422:
                  Object.keys(err.error).forEach((key: any) => this.form.controls[key].setErrors(err.error[key]));
                  break;
                case 500:
                  this._router.navigateByUrl('/admin/postagens');
                  break;
              }
            },
            complete: () => this.isChanging = false
          });
    }
  }

}
