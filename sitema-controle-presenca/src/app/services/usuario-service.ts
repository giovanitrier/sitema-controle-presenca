import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/usuarios';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor (private http: HttpClient){}

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(API_URL);
  }

  listarUsuarioporCpf(cpf: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${API_URL}/${cpf}`);
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(API_URL, usuario);
  }

  editar(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${API_URL}/${usuario.cpf}`, usuario);
  }

  remover(cpf: string): Observable<any> {
    return this.http.delete(`${API_URL}/${cpf}`);
  }

}
