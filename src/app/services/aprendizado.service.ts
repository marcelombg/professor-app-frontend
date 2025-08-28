import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aprendizado, AprendizadoDto } from '../models/aprendizado.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AprendizadoService {
  private apiUrl = `${environment.apiUrl}/api/aprendizados`;
  
  constructor(private http: HttpClient) { }

  getAprendizados(alunoId?: number, topicoId?: number): Observable<Aprendizado[]> {
    let params = new HttpParams();
    if (alunoId) {
      params = params.set('alunoId', alunoId.toString());
    }
    if (topicoId) {
      params = params.set('topicoId', topicoId.toString());
    }
    return this.http.get<Aprendizado[]>(this.apiUrl, { params });
  }

  getAprendizado(id: number): Observable<Aprendizado> {
    return this.http.get<Aprendizado>(`${this.apiUrl}/${id}`);
  }

  createAprendizado(aprendizado: AprendizadoDto): Observable<Aprendizado> {
    return this.http.post<Aprendizado>(this.apiUrl, aprendizado);
  }

  updateAprendizado(id: number, aprendizado: AprendizadoDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, aprendizado);
  }

  deleteAprendizado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  exportarExcel(alunoId?: number, topicoId?: number): Observable<Blob> {
    let params = new HttpParams();
    if (alunoId) {
      params = params.set('alunoId', alunoId.toString());
    }
    if (topicoId) {
      params = params.set('topicoId', topicoId.toString());
    }
    return this.http.get(`${this.apiUrl}/exportar`, { 
      params, 
      responseType: 'blob' 
    });
  }
}

