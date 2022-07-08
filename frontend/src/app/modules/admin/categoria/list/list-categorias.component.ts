import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { ICategoria } from 'src/app/core/types/categoria.types';

@Component({
  selector: 'app-categorias',
  templateUrl: './list-categorias.component.html'
})
export class ListCategoriasComponent implements OnInit {

  data!: ICategoria[];

  constructor(private _categoriaService: CategoriaService, private _toastService: NgToastService) { }

  ngOnInit(): void {
    this._categoriaService.getAllData().subscribe(
      (data) => {
        this.data = data
      },
      (_) => this._toastService.error({
        detail: 'Falha ao carregar categorias',
        summary: "Atualize a página para tentar novamente",
        position: 'tr'
      }
      ));

  }


  delCategoria(id: string) {
    this._categoriaService.deleteCategoriaById(id).subscribe(
      () => {
        this.data = this.data?.filter((data) => {
          if (data._id === id) return false;

          return true;
        })
      }
    );
  }

}
