import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/core/services/categoria.service';

@Component({
  selector: 'app-categoria-form-add',
  templateUrl: './categoria-add.component.html'
})
export class CategoriaAddComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isAdding: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _categoriaService: CategoriaService,
    private _router: Router
  ) {
    this.form = this._formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(4)]],
      slug: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    setTimeout(() => sessionStorage.removeItem('CategoriaForm'), 1200)
  }

  onSubmit(): void {
    this.isAdding = true;
    if (this.isAdding) this._categoriaService.addCategoria(this.form.value)
      .subscribe(
        {
          next: (_) => this._router.navigateByUrl(!!sessionStorage.getItem('CategoriaForm') ? '/postagens/add' : '/categorias'),
          error: (err) => Object.keys(err.error).forEach((key: any) => this.form.controls[key].setErrors(err.error[key])),
          complete: () => this.isAdding = false
        }
      )

  }
}