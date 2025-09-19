// src/app/models/certificado.model.ts
export interface Certificado {
  id: number;
  nomeUsuario: string;
  cpfUsuario: string;
  nomeSuperusuario: string;
  codigoValidacao: string;
  dataEmissao: string;
  texto: string;
  eventoId: number;
  eventoTitulo: string;
  eventoCargaHoraria: number;
  selected: boolean;
}