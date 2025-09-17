export interface Evento {
  eventoId?: number;
  titulo: string;
  descricao: string;
  dataHora: Date | string;
  categoria: string;
  cargaHoraria: number;
  status?: string; // Agora virá do backend
}