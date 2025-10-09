import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioService } from '../../servicos/usuario-service';
import { BiometricService } from '../../servicos/biometric-service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario-crud',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskDirective
  ],
  templateUrl: './usuario-crud.html',
  styleUrls: ['./usuario-crud.css']
})
export class UsuarioCrud implements OnInit {
  usuario: Usuario = {
    matricula: '',
    nome: '',
    setor: '',
    template: '',
    email: ''
  };

  isEditMode: boolean = false;
  isLoading: boolean = false;
  isCapturingBiometry: boolean = false;
  mensagem: string = '';
  erro: string = '';
  biometryError: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private biometricService: BiometricService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  // == LIFECYCLE HOOKS ==
  ngOnInit(): void {
    const matricula = this.route.snapshot.paramMap.get('matricula');
    if (matricula) {
      this.isEditMode = true;
      this.carregarUsuario(matricula);
    }
  }

  // == CARREGAMENTO DE DADOS ==
  carregarUsuario(matricula: string): void {
    this.isLoading = true;
    this.usuarioService.buscarPorMatricula(matricula).subscribe({
      next: (data) => {
        this.usuario = {
          matricula: data.matricula,
          nome: data.nome,
          setor: data.setor || '',
          template: data.template || '',
          email: data.email || ''
        };
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao buscar usuário:', err);
        this.erro = 'Erro ao carregar usuário.';
        this.isLoading = false;
        this.cd.detectChanges();
        setTimeout(() => this.navegarParaLista(), 2000);
      }
    });
  }

  // == OPERAÇÕES PRINCIPAIS ==
  salvarUsuario(): void {
    if (!this.validarFormulario()) return;

    this.isLoading = true;
    this.mensagem = '';
    this.erro = '';

    const operacao = this.isEditMode 
      ? this.usuarioService.atualizarUsuario(this.usuario.matricula, this.usuario)
      : this.usuarioService.cadastrarUsuario(this.usuario);

    operacao.subscribe({
      next: () => {
        this.mensagem = `Usuário ${this.isEditMode ? 'atualizado' : 'cadastrado'} com sucesso!`;
        this.isLoading = false;
        this.cd.detectChanges();
        setTimeout(() => this.navegarParaLista(), 2000);
      },
      error: (err) => {
        this.tratarErroSalvamento(err);
      }
    });
  }

  remover(): void {
    if (this.usuario.matricula && confirm('Tem certeza que deseja remover este usuário?')) {
      this.isLoading = true;
      this.usuarioService.deletarUsuario(this.usuario.matricula).subscribe({
        next: () => {
          this.mensagem = 'Usuário removido com sucesso!';
          this.isLoading = false;
          this.cd.detectChanges();
          setTimeout(() => this.navegarParaLista(), 2000);
        },
        error: (err) => {
          console.error('Erro ao remover usuário:', err);
          this.erro = 'Erro ao remover usuário.';
          this.isLoading = false;
          this.cd.detectChanges();
        }
      });
    }
  }

  // == CAPTURA DA BIOMETRIA ==
  obterBiometria(): void {
    this.isCapturingBiometry = true;
    this.biometryError = '';
    this.cd.detectChanges();

    // TODO: Substituir por chamada real da API quando disponível
    this.capturaBiometriaSimulada();
  }

  private capturaBiometriaReal(): void {
    this.biometricService.captureHash(false).subscribe({
      next: (response) => {
        this.isCapturingBiometry = false;
        if (response.success) {
          this.usuario.template = response.template;
          this.mensagem = 'Biometria capturada com sucesso!';
        } else {
          this.biometryError = response.message || 'Falha na captura da biometria';
        }
        this.cd.detectChanges();
      },
      error: (error) => {
        this.isCapturingBiometry = false;
        this.biometryError = this.getErrorMessage(error);
        this.cd.detectChanges();
        console.error('Erro ao capturar biometria:', error);
      }
    });
  }

  private capturaBiometriaSimulada(): void {
    // Simula o tempo de captura da biometria
    setTimeout(() => {
      this.isCapturingBiometry = false;
      // Simula um template em Base64 (comprimento típico de um hash Base64)
      const simulatedHash = btoa('SIMULATED_BIOMETRY_HASH_' + Date.now());
      this.usuario.template = simulatedHash;
      this.mensagem = 'Biometria simulada capturada com sucesso!';
      this.cd.detectChanges();
    }, 2000);
  }

  cancelarCapturaBiometria(): void {
    this.isCapturingBiometry = false;
    this.biometryError = '';
    this.cd.detectChanges();
  }

  // == VALIDAÇÕES ==
  private validarFormulario(): boolean {
    if (!this.usuario.matricula) {
      this.erro = 'Matrícula é obrigatória!';
      this.cd.detectChanges();
      return false;
    }

    if (!this.usuario.setor) {
      this.erro = 'Setor é obrigatório!';
      this.cd.detectChanges();
      return false;
    }

    if (!this.isEditMode && !this.usuario.template) {
      this.erro = 'É necessário capturar a biometria antes de salvar!';
      this.cd.detectChanges();
      return false;
    }

    return true;
  }

  private tratarErroSalvamento(err: any): void {
    console.error('Erro ao salvar usuário:', err);
    
    if (err.status === 409) {
      this.erro = 'Matrícula já cadastrada no sistema.';
    } else {
      this.erro = `Erro ao ${this.isEditMode ? 'atualizar' : 'cadastrar'} usuário.`;
    }
    
    this.isLoading = false;
    this.cd.detectChanges();
  }

  // == MÉTODOS AUXILIARES ==
  private getErrorMessage(error: any): string {
    if (error.error?.message) return error.error.message;
    if (error.message) return error.message;
    if (error.status === 0) return 'Erro de conexão: Serviço de biometria não está respondendo';
    return 'Erro desconhecido ao capturar biometria';
  }

  // == NAVEGAÇÃO ==
  navegarParaLista(): void {
    this.router.navigate(['/tabela-usuarios']);
  }

  cancelar(): void {
    this.navegarParaLista();
  }
}