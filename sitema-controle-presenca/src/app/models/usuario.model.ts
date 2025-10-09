export class Usuario {
    constructor(
        public matricula: string = "",
        public nome: string = "",
        public setor: string = "",
        public template: string | Uint8Array = "",
        public email: string = ""
    ) {}
}

export interface UsuarioRequest {
    matricula: string;
    nome: string;
    setor: string;
    template: string; // Backend espera Base64 string
    email: string; // Opcional no backend
}

export interface UsuarioListDTO {
    matricula: string;
    nome: string;
    setor: string;
    email: string;
}