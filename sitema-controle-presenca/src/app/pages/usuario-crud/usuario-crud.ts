import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { ActivatedRoute, Router } from '@angular/router';

import { CpfValidatorService } from '../../servicos/cpf-validator';
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
    cpf: '',
    nome: '',
    matricula: '',
    setor: '',
    template: '',
    dataNascimento: '',
    email: ''
  };

  isEditMode: boolean = false;
  isLoading: boolean = false;
  isCapturingBiometry: boolean = false;
  mensagem: string = '';
  erro: string = '';
  biometryError: string = '';
  cpfInvalido: boolean = false;

  constructor(
    private cpfValidator: CpfValidatorService,
    private usuarioService: UsuarioService,
    private biometricService: BiometricService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  // == LIFECYCLE HOOKS ==
  ngOnInit(): void {
    const cpf = this.route.snapshot.paramMap.get('cpf');
    if (cpf) {
      this.isEditMode = true;
      this.carregarUsuario(cpf);
    }
  }

  // == CARREGAMENTO DE DADOS ==
  carregarUsuario(cpf: string): void {
    this.isLoading = true;
    this.usuarioService.buscarPorCpf(cpf).subscribe({
      next: (data) => {
        this.usuario = {
          cpf: data.cpf,
          nome: data.nome,
          matricula: data.matricula,
          setor: data.setor || '',
          template: data.template || '',
          dataNascimento: data.dataNascimento,
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
      ? this.usuarioService.atualizarUsuario(this.usuario.cpf, this.usuario)
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
    if (this.usuario.cpf && confirm('Tem certeza que deseja remover este usuário?')) {
      this.isLoading = true;
      this.usuarioService.deletarUsuario(this.usuario.cpf).subscribe({
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
    if (!this.cpfValidator.validarCPF(this.usuario.cpf)) {
      this.erro = 'CPF inválido!';
      this.cpfInvalido = true;
      this.cd.detectChanges();
      return false;
    }

    if (!this.usuario.email) {
      this.erro = 'Email é obrigatório!';
      this.cd.detectChanges();
      return false;
    }

    if (!this.isEditMode && !this.usuario.template) {
      this.erro = 'É necessário capturar a biometria antes de salvar!';
      this.cd.detectChanges();
      return false;
    }

    this.cpfInvalido = false;
    return true;
  }

  private tratarErroSalvamento(err: any): void {
    console.error('Erro ao salvar usuário:', err);
    
    if (err.status === 409) {
      this.erro = 'CPF já cadastrado no sistema.';
      this.cpfInvalido = true;
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