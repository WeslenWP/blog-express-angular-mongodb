import { IAddPostagem } from 'src/app/core/types/postagem.types';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {
  private url: string = `${environment.urlServer}/postagem`;

  constructor(private _httpClient: HttpClient) { }

  addPost(data: IAddPostagem): Observable<any> {
    return this._httpClient.post(this.url, data);
  }

  editPost(id: string, data: IAddPostagem): Observable<any> {
    return this._httpClient.put(`${this.url}/${id}`, data)
  }

  getAllPosts(): Observable<any> {
    return this._httpClient.get(this.url);
  }

  getPostById(id: string): Observable<any> {
    return this._httpClient.get(`${this.url}/${id}`);
  }

  getPostBySlug(slug: string): Observable<any> {
    return this._httpClient.get(`${this.url}/bySlug/${slug}`)
  }

  delPostById(id: string): Observable<any> {
    return this._httpClient.delete(`${this.url}/${id}`);
  }
}
