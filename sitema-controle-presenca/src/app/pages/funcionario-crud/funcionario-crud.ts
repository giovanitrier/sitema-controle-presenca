import { FuncionarioService } from './../../services/funcionario-service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Funcionario } from '../../models/funcionario.model';

@Component({
  selector: 'app-funcionario-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionario-crud.html',
  styleUrls: ['../estiloGlobal.css','./funcionario-crud.css']
})
export class FuncionarioCrud implements OnInit {

  funcionario: Funcionario = {
  cpf: '',
  matricula: '',
  nome: '',
  dataNascimento: '',
  setor: '',
  tipo: '',
  biometriaHash: ''
};

  funcionarios: Funcionario[] = [];
  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    this.listarFuncionarios();
  }

  listarFuncionarios() {
    this.funcionarioService.listarFuncionarios().subscribe({
      next: (funcionarios) => {
        console.log('Lista de funcionários:', funcionarios);
      },
      error: (error) => {
        console.error('Erro ao listar funcionários:', error);
      }
    });
  }

  cadastrar() {
    this.funcionarioService.cadastrar(this.funcionario).subscribe({
      next: (funcionario) => {
        console.log('Funcionário cadastrado com sucesso:', funcionario);
        this.listarFuncionarios();
  },    error: (error) => {
        console.error('Erro ao cadastrar funcionário:', error);
      }
    });
  }

  editar() {
    this.funcionarioService.editar(this.funcionario).subscribe({
      next: (funcionario) => {
        console.log('Funcionário editado com sucesso:', funcionario);
        this.listarFuncionarios();
      },
      error: (error) => {
        console.error('Erro ao editar funcionário:', error);
      }
    })
  }

  remover() {
    this.funcionarioService.remover(Number(this.funcionario.cpf)).subscribe(
      () => {
        console.log('Funcionário removido com sucesso');
        this.listarFuncionarios();
      },
      (error) => {
        console.error('Erro ao remover funcionário:', error);
      }
    );
  }

  obterBiometria() {
    console.log('Obtendo Biometria');

    this.funcionario.biometriaHash = Math.random().toString(36).substring(2, 15) +
                                    Math.random().toString(36).substring(2, 15);
  }
}
