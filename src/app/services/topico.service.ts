import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topico } from '../models/topico.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TopicoService {
  private apiUrl = `${environment.apiUrl}/api/topicos`;

  constructor(private http: HttpClient) { }

  getTopicos(): Observable<Topico[]> {
    return this.http.get<Topico[]>(this.apiUrl);
  }

  getTopico(id: number): Observable<Topico> {
    return this.http.get<Topico>(`${this.apiUrl}/${id}`);
  }

  createTopico(topico: Topico): Observable<Topico> {
    return this.http.post<Topico>(this.apiUrl, topico);
  }

  updateTopico(id: number, topico: Topico): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, topico);
  }

  deleteTopico(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

