import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CategoriaService } from 'src/app/core/services/categoria.service';

@Component({
  selector: 'app-categoria-form-add',
  templateUrl: './categoria-add.component.html'
})
export class CategoriaAddComponent implements OnInit {
  form!: FormGroup;
  isAdding: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _categoriaService: CategoriaService,
    private _router: Router,
    private _toastService: NgToastService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(4)]],
      slug: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    this.isAdding = true;
    if (this.isAdding) this._categoriaService.addCategoria(this.form.value)
      .subscribe(
        (_) => {
          this._router.navigateByUrl('/categorias');
          this._toastService.success({
            detail: 'Categoria adicionada',
            summary: `${this.form.controls['nome'].value} foi adicionada com sucesso \n`,
            position: 'tr'
          });
        },
        (err) => {
          if (!!err.error.nome) {
            if (err.error.nome.invalid) this.form.controls['nome'].setErrors({ 'invalid': true });
          }

          if (!!err.error.slug) {
            if (err.error.slug.invalid) this.form.controls['slug'].setErrors({ 'invalid': true });
          }
        }
      )
      .add(() => this.isAdding = false);
  }
}