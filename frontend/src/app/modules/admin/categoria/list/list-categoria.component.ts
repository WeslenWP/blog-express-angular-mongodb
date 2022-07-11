import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { ICategoria } from 'src/app/core/types/categoria.types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './list-categoria.component.html'
})
export class ListCategoriaComponent implements OnInit {

  categorias!: ICategoria[];

  constructor(private _categoriaService: CategoriaService, private _toastService: NgToastService) { }

  ngOnInit(): void {
    this._categoriaService.getAllData().subscribe(
      (data) => {
        this.categorias = data
      },
      (_) => this._toastService.error({
        detail: 'Falha ao carregar categorias',
        summary: "Atualize a página para tentar novamente",
        position: 'tr'
      }
      ));

  }

  delCategoria(id: string, nome: string) {

    Swal
      .mixin({
        customClass: {
          confirmButton: 'btn btn-success mx-1 fs-5',
          cancelButton: 'btn btn-danger mx-1 fs-5'
        },
        buttonsStyling: false
      })
      .fire({
        title: 'Essa ação é irreversível',
        icon: 'warning',
        html: `<span class="fs-5">Deseja realmente deletar a categoria <strong>${nome}</strong></span>`,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Deletar',
        reverseButtons: true
      })
      .then((result) => {
        if (result.isConfirmed) {

          this._categoriaService.deleteCategoriaById(id).subscribe(
            () => {
              Swal.fire('Deletado com sucesso!', '', 'success');

              this.categorias = this.categorias?.filter((categorias) => {
                if (categorias._id === id) {
                  return false
                } else {
                  return true;
                }
              })
            },
            (_) => {
              Swal.fire('Erro', `<span class='fs-5'>Não conseguimos deletar a categoria <strong>${nome}</strong>, tente novamente mais tarde</span>`, 'error');
            }
          );
        }
      })

  }

}
