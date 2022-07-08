import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IAddCategoria } from 'src/app/core/types/categoria.types';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-categoria-form-edit',
  templateUrl: './categoria-edit.component.html'
})
export class CategoriaEditComponent implements OnInit {
  form!: FormGroup;
  isChanging: boolean = false;
  id: string;
  tempNome!: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _categoriaService: CategoriaService,
    private _router: Router,
    private _toastService: NgToastService,
    private _activatedRoute: ActivatedRoute) {
    this.id = this._activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(4)]],
      slug: ['', [Validators.required, Validators.minLength(4)]]
    });
    this._categoriaService.getDataById(this.id).subscribe(
      (data: IAddCategoria) => {
        this.tempNome = data.nome;
        this.form.controls['nome'].setValue(data.nome);
        this.form.controls['slug'].setValue(data.slug);
        this.form.markAsPristine();
      },
      (err) => {
        switch (err.status) {
          case 500:
            this._toastService.warning({
              detail: 'Categoria não encontrada',
              summary: "ID não consta em nosso sistema",
              duration: 5000
            });
            this._router.navigateByUrl('/');
            break;
        }
      }
    );
  }

  onSubmit(): void {
    this.isChanging = true;
    if (this.isChanging) this._categoriaService.editCategoria(this.form.value, this.id)
      .subscribe(
        (_) => {
          this._router.navigateByUrl('/categorias');
          this._toastService.success({
            detail: 'Categoria editada com sucesso',
            summary: `${this.tempNome} foi editado com sucesso \n`,
            position: 'tr'
          });
        },
        (err) => {
          // console.log(err)
          switch (err.status) {
            case 422:
              if (err.error.hasOwnProperty('nome')) {
                if (err.error.nome.invalid)
                  this.form.controls['nome'].setErrors({ 'invalid': true });
              };

              if (err.error.hasOwnProperty('slug')) {
                if (err.error.slug.invalid)
                  this.form.controls['slug'].setErrors({ 'invalid': true });
              };
              break;
            case 500:
              this._toastService.warning({
                detail: 'Categoria não pode ser editada',
                summary: "Tente novamente mais tarde",
              });
              this._router.navigateByUrl('/categoria');
              break;
            default:
              this._router.navigateByUrl('/');
              break;
          }
        }
      )
      .add(() => this.isChanging = false);
  }

}
