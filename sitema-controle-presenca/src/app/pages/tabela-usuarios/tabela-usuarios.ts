import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabela-usuarios',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './tabela-usuarios.html',
  styleUrls: ['../estiloGlobal.css']
})
export class TabelaUsuarios {

  usuarios: Usuario[] = [];

  usuarioSelecionado: Usuario = {
    matricula: '',
    cpf: '',
    setor: '',
    nome: '',
    tipo: '',
    dataNascimento: '',
    biometriaHash: ''
  };

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  editar() {
    this.router.navigate(['/usuario-crud', this.usuarioSelecionado.cpf]);
  }

  cadastrar() {
    this.router.navigate(['/usuario-crud', this.usuarioSelecionado]);
  }

  remover() {
    this.usuarioService.remover(this.usuarioSelecionado.cpf).subscribe(
      () => {
        console.log('Usuário removido com sucesso');
        this.listarUsuarios();
      },
      (error) => {
        console.error('Erro ao remover usuário:', error);
      }
    );
  }

    listarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe({
      next: (usuarios) => {
       this.usuarios = usuarios;
      },
      error: (error) => {
        console.error('Erro ao listar usuários:', error);
      }
    });
  }

}
