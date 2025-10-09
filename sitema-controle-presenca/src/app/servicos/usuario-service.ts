import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, UsuarioListDTO } from '../models/usuario.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private backendApiUrl = `${environment.backendApiUrl}/admin/usuarios`;

  constructor(private http: HttpClient) { }

  public stringToBase64(str: string): string {
    return btoa(unescape(encodeURIComponent(str)));
  }

  public base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  // CREATE: Cadastrar um novo usuário
  cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.backendApiUrl, usuario);
  }

  // READ: Buscar todos os usuários
  buscarTodosUsuarios(): Observable<UsuarioListDTO[]> {
    return this.http.get<UsuarioListDTO[]>(this.backendApiUrl);
  }

  // READ: Buscar um usuário por Matrícula
  buscarPorMatricula(matricula: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.backendApiUrl}/${matricula}`);
  }

  // UPDATE: Atualizar um usuário existente
  atualizarUsuario(matricula: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.backendApiUrl}/${matricula}`, usuario);
  }

  // DELETE: Deletar um usuário por Matrícula
  deletarUsuario(matricula: string): Observable<void> {
    return this.http.delete<void>(`${this.backendApiUrl}/${matricula}`);
  }

  // Validação de biometria
  validarBiometria(template: Uint8Array): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.backendApiUrl}/validar-biometria`, template);
  }
}