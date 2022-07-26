import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { ICategoria } from 'src/app/core/types/categoria.types';
import { PostagemService } from 'src/app/core/services/postagem.service';

@Component({
  selector: 'app-postagens-add',
  templateUrl: './postagem-add.component.html'
})
export class PostagemAddComponent implements OnInit {

  isAdding: boolean = false;
  form: FormGroup;
  categorias!: ICategoria[];

  constructor(
    private _formBuilder: FormBuilder,
    private _categoriaService: CategoriaService,
    private _postagemService: PostagemService,
    private _router: Router) {
    this.form = this._formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(4)]],
      descricao: ['', [Validators.required, Validators.minLength(4)]],
      conteudo: ['', [Validators.required, Validators.maxLength(2000)]],
      categoria: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('CategoriaForm')) this.form.setValue(JSON.parse(sessionStorage.getItem('CategoriaForm') ?? ''));
    this._categoriaService.getAllCategorias().subscribe((categorias) => this.categorias = categorias);
  }

  onSubmit(): void {
    this.isAdding = true;
    if (this.isAdding) {
      this._postagemService.addPost(this.form.value).subscribe({
        next: () => this._router.navigateByUrl('/admin/postagens'),
        error: (err) => Object.keys(err.error).forEach((key: any) => this.form.controls[key].setErrors(err.error[key])),
        complete: () => this.isAdding = false
      })
    }
  }

  toAddCategoria() {
    sessionStorage.setItem('CategoriaForm', JSON.stringify(this.form.value));
    this._router.navigateByUrl('/admin/categorias/add');
  }

}
