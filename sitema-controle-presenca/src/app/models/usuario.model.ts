export class Usuario {
    constructor(
        public cpf: string = "",
        public nome: string = "",
        public matricula: string = "",
        public setor: string = "",
        public template: string | Uint8Array = "",
        public dataNascimento: string = "",
        public email: string = ""
    ) {}
}

export interface UsuarioRequest {
    cpf: string;
    nome: string;
    matricula: string;
    setor: string;
    template: string; // Backend espera Base64 string
    dataNascimento: string; // Será convertida para LocalDate
    email: string; // Obrigatório no backend
}

export interface UsuarioListDTO {
    cpf: string;
    nome: string;
    matricula: string;
    setor: string;
    dataNascimento: string;
    email: string;
}