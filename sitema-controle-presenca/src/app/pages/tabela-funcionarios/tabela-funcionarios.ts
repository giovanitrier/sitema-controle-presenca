import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabela-funcionarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela-funcionarios.html',
  styleUrls: ['../estiloGlobal.css']
})
export class TabelaFuncionarios {

    funcionarios = [
    { matricula: '00007', cpf:'12345678910', setor: 'Almoxarifado', nome: 'João Souza dos Santos', tipo: 'padrão' },
    { matricula: '00006', cpf:'12345678910', setor: 'EHS', nome: 'Giovani Trierweiler Alves', tipo: 'EHS' },
    { matricula: '00005', cpf:'12345678910', setor: 'Financeiro', nome: 'Pedro Albuquerque de Oliveira', tipo: 'padrão' },

  ];

 editarFuncionario(funcionario: any) {
    console.log('Editar:', funcionario);
  }

  removerFuncionario(funcionario: any) {
    console.log('Remover:', funcionario);
  }

  cadastrarFuncionario() {
    console.log('Cadastrar novo funcionário');
  }

}
