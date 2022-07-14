import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IAddCategoria } from 'src/app/core/types/categoria.types';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-form-edit',
  templateUrl: './categoria-edit.component.html'
})
export class CategoriaEditComponent implements OnInit {
  private id: string;

  form!: FormGroup;
  isChanging: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _categoriaService: CategoriaService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.form = this._formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(4)]],
      slug: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.form.disable();
  }

  ngOnInit(): void {
    this._categoriaService.getDataById(this.id).subscribe(
      {
        next: (categoria: IAddCategoria) => {
          this.form.controls['nome'].setValue(categoria.nome);
          this.form.controls['slug'].setValue(categoria.slug);
          this.form.enable();
          this.form.markAsPristine();
        },
        error: (err) => {
          if (err.status === 500) this._router.navigateByUrl('/');
        }
      });
  }

  onSubmit(): void {
    this.isChanging = true;
    if (this.isChanging) this._categoriaService.editCategoria(this.form.value, this.id)
      .subscribe(
        {
          next: (_) => this._router.navigateByUrl('/admin/categorias'),
          error: (err) => {
            switch (err.status) {
              case 422:
                Object.keys(err.error).forEach((key: any) => this.form.controls[key].setErrors(err.error[key]));
                break;
              case 500:
                this._router.navigateByUrl('/admin/categorias');
                break;
            }
          },
          complete: () => this.isChanging = false
        },
      )
  }

}
