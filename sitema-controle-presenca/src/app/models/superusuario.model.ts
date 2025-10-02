export class Superusuario {
  cpf: string = '';
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha?: string = '';

  constructor(init?: Partial<Superusuario>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}

export interface SuperusuarioResponse {
  cpf: string;
  nome: string;
  email: string;
}

export interface CriarSuperusuarioRequest {
  cpf: string;
  nome: string;
  email: string;
  senha: string;
}

export interface AtualizarSuperusuarioRequest {
  nome?: string;
  email?: string;
  senha?: string;
}