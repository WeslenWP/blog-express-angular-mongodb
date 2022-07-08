import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddCategoria } from '../types/categoria.types';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url: string = `${environment.urlServer}/api/categoria`;

  constructor(private _http: HttpClient) { }

  addCategoria(data: IAddCategoria): Observable<any> {
    return this._http.post(this.url, data);
  }

  getAllData(): Observable<any> {
    return this._http.get(this.url);
  }

  getDataById(id: string): Observable<any> {
    return this._http.get(`${this.url}/${id}`)
  }

  editCategoria(data: IAddCategoria, id: string): Observable<any> {
    return this._http.put(`${this.url}/${id}`, data)
  }

  deleteCategoriaById(id: string): Observable<any> { 
    return this._http.delete(`${this.url}/${id}`)
  }

}