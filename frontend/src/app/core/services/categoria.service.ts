import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddCategoria } from '../types/categoria.types';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url: string = `${environment.urlServer}/categoria`;

  constructor(private _httpClient: HttpClient) { }

  addCategoria(data: IAddCategoria): Observable<any> {
    return this._httpClient.post(this.url, data);
  }

  getAllCategorias(): Observable<any> {
    return this._httpClient.get(this.url);
  }

  getCategoriaById(id: string): Observable<any> {
    return this._httpClient.get(`${this.url}/${id}`)
  }

  editCategoria(data: IAddCategoria, id: string): Observable<any> {
    return this._httpClient.put(`${this.url}/${id}`, data)
  }

  deleteCategoriaById(id: string): Observable<any> {
    return this._httpClient.delete(`${this.url}/${id}`)
  }
}