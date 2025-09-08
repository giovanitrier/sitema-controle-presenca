import { Evento } from './../models/evento.model';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


const API_URL = '';

@Injectable({
  providedIn: 'root'
})

export class EventoService {

  constructor(private http: HttpClient) {}

  listarEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(API_URL);
  }

  cadastrar(Evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(API_URL, Evento);
  }

  editar( Evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${API_URL}/${Evento.id}`, Evento);
  }

  remover(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }

}
