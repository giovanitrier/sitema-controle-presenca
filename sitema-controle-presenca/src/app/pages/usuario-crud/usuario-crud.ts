import { UsuarioService } from './../../services/usuario-service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-crud.html',
  styleUrls: ['../estiloGlobal.css','./usuario-crud.css']
})
export class UsuarioCrud implements OnInit {

  usuario: Usuario = {
  cpf: '',
  matricula: '',
  nome: '',
  dataNascimento: '',
  setor: '',
  tipo: '',
  biometriaHash: ''
};

  usuarios: Usuario[] = [];
  constructor(private usuarioService: UsuarioService) {}

 ngOnInit(): void {
    this.listarUsuarios();
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

  cadastrar() {
    this.usuarioService.cadastrar(this.usuario).subscribe({
      next: (usuario) => {
        console.log('Usuário cadastrado com sucesso:', usuario);
        this.listarUsuarios();
  },    error: (error) => {
        console.error('Erro ao cadastrar usuário:', error);
      }
    });
  }

  editar() {
    this.usuarioService.editar(this.usuario).subscribe({
      next: (usuario) => {
        console.log('Usuário editado com sucesso:', usuario);
        this.listarUsuarios();
      },
      error: (error) => {
        console.error('Erro ao editar usuário:', error);
      }
    })
  }

  remover() {
    this.usuarioService.remover(this.usuario.cpf).subscribe(
      () => {
        console.log('Usuário removido com sucesso');
        this.listarUsuarios();
      },
      (error) => {
        console.error('Erro ao remover usuário:', error);
      }
    );
  }

  obterBiometria() {
    console.log('Obtendo Biometria');

    this.usuario.biometriaHash = Math.random().toString(36).substring(2, 15) +
                                    Math.random().toString(36).substring(2, 15);
  }
}
