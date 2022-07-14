import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { ICategoria } from 'src/app/core/types/categoria.types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './list-categoria.component.html'
})
export class ListCategoriaComponent implements OnInit {

  categorias!: ICategoria[];

  constructor(private _categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this._categoriaService.getAllData().subscribe((categorias) => this.categorias = categorias)
  }

  delCategoria(id: string, nome: string) {
    Swal.fire({
      customClass: {
        confirmButton: 'btn btn-success mx-1 fs-5',
        cancelButton: 'btn btn-danger mx-1 fs-5'
      },
      buttonsStyling: false,
      icon: 'warning',
      html: `<span class="fs-3">Deseja realmente deletar a categoria <b>${nome}</b></span>
      <br>
      <small>*As postagens associadas a essa categoria também serão removidas</small>`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Deletar',
      reverseButtons: true
    })
      .then((result) => {
        if (result.isConfirmed) {
          this._categoriaService.deleteCategoriaById(id)
            .subscribe(() => this.categorias = this.categorias?.filter((categoria) => categoria._id !== id));
        }
      })

  }

}
