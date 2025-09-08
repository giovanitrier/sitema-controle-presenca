import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerenciar-relatorios',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './gerenciar-relatorios.html',
  styleUrls: ['./gerenciar-relatorios.css','../estiloGlobal.css']
})
export class GerenciarRelatorios {

  eventos = [
    { id: '00007', data: '21/02/2025', descricao: 'Treinamento Primeiros Socorros', status: 'em andamento' },
    { id: '00006', data: '20/02/2025', descricao: 'Reunião de CIPA', status: 'finalizada' },
    { id: '00005', data: '10/02/2025', descricao: 'Treinamento de Combate a Incêndio e Uso de Extintores', status: 'finalizada' },
    { id: '00004', data: '08/02/2025', descricao: 'Reunião de Diálogo Diário de Segurança', status: 'cancelada' }
  ];

 dataInicioFiltro: string | null = null;
 dataFimFiltro: string | null = null;
 eventosFiltrados = [...this.eventos];

filtrarEventos() {
  if (!this.dataInicioFiltro && !this.dataFimFiltro) {
    this.eventosFiltrados = [...this.eventos];
    return;
  }

  const inicio = this.dataInicioFiltro ? new Date(this.dataInicioFiltro) : new Date('1970-01-01');
  const fim = this.dataFimFiltro ? new Date(this.dataFimFiltro) : new Date('9999-12-31');

  fim.setHours(23, 59, 59, 999);

  const diffMs = fim.getTime() - inicio.getTime();
  const diffDias = diffMs / (1000 * 60 * 60 * 24);

  if (diffDias > 30) {
    alert('O intervalo máximo permitido para o filtro é de 30 dias.');
    return;
  }

  this.eventosFiltrados = this.eventos.filter(evento => {
    const dataEvento = new Date(evento.data);
    return dataEvento >= inicio && dataEvento <= fim;
  });
}

}
