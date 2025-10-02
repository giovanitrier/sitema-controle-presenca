import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SuperusuarioService, Superusuario } from '../../servicos/superusuario.service';

@Component({
  selector: 'app-novo-superusuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './novo-superusuario.component.html', // CORRIGIDO
  styleUrls: ['./novo-superusuario.component.css'] // CORRIGIDO
})
export class NovoSuperusuarioComponent {
  superusuario: any = {
    cpf: '',
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  };
  
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private superusuarioService: SuperusuarioService,
    private router: Router
  ) {}

  onSubmit(): void {
    console.log('🎯 Enviando formulário de novo superusuário');
    
    // Validações
    if (!this.superusuario.cpf || !this.superusuario.nome || 
        !this.superusuario.email || !this.superusuario.senha || !this.superusuario.confirmarSenha) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    // Valida CPF
    const cpfLimpo = this.superusuarioService.removerFormatacaoCPF(this.superusuario.cpf);
    if (!this.superusuarioService.validarCPF(cpfLimpo)) {
      this.errorMessage = 'CPF inválido.';
      return;
    }

    // Valida email
    if (!this.superusuarioService.validarEmail(this.superusuario.email)) {
      this.errorMessage = 'E-mail inválido.';
      return;
    }

    // Valida senha
    const validacaoSenha = this.superusuarioService.validarSenha(this.superusuario.senha);
    if (!validacaoSenha.valido) {
      this.errorMessage = validacaoSenha.mensagem;
      return;
    }

    // Valida confirmação de senha
    if (this.superusuario.senha !== this.superusuario.confirmarSenha) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    console.log('📤 Enviando dados para criação do superusuário...');

    // Prepara dados para envio
    const dadosEnvio: Superusuario = {
      cpf: cpfLimpo,
      nome: this.superusuario.nome.trim(),
      email: this.superusuario.email.trim(),
      senha: this.superusuario.senha
    };

    this.superusuarioService.criarSuperusuario(dadosEnvio).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        console.log('✅ Superusuário criado com sucesso:', response);
        this.successMessage = 'Superusuário criado com sucesso!';
        
        // Limpa o formulário
        this.superusuario = {
          cpf: '',
          nome: '',
          email: '',
          senha: '',
          confirmarSenha: ''
        };
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('❌ Erro ao criar superusuário:', error);
        
        if (error.status === 400) {
          this.errorMessage = 'Dados inválidos. Verifique as informações.';
        } else if (error.status === 409) {
          this.errorMessage = 'Já existe um superusuário com este CPF ou e-mail.';
        } else if (error.status === 401 || error.status === 403) {
          this.errorMessage = 'Você não tem permissão para criar superusuários.';
        } else {
          this.errorMessage = 'Erro ao criar superusuário. Tente novamente.';
        }
      }
    });
  }

  voltar(): void {
    console.log('🔙 Voltando para a página anterior...');
    this.router.navigate(['/tabela-usuarios'])
      .then(success => {
        if (!success) {
          this.router.navigate(['/eventos']);
        }
      });
  }

  // Formata o CPF enquanto o usuário digita
  onCpfInput(): void {
    this.superusuario.cpf = this.formatarCPF(this.superusuario.cpf);
  }

  // Formata CPF (000.000.000-00)
  private formatarCPF(cpf: string): string {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length <= 3) {
      return cpf;
    } else if (cpf.length <= 6) {
      return cpf.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    } else if (cpf.length <= 9) {
      return cpf.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    }
  }

  // Limpa mensagens quando o usuário começa a digitar
  onInputChange(): void {
    if (this.errorMessage) {
      this.errorMessage = '';
    }
    if (this.successMessage) {
      this.successMessage = '';
    }
  }
}