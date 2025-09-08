import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = ''

@Injectable({
  providedIn: 'root'
})

export class FuncionarioService {

  constructor (private http: HttpClient){}

  listarFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(API_URL);
  }

  cadastrar(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(API_URL, funcionario);
  }

  editar(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${API_URL}/${funcionario.cpf}`, funcionario);
  }

  remover(cpf: number): Observable<any> {
    return this.http.delete(`${API_URL}/${cpf}`);
  }

}
