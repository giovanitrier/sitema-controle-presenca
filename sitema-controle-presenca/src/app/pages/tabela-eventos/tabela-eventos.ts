import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Evento } from '../../models/evento.model';
import { EventoService } from '../../services/evento-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabela-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tabela-eventos.html',
  styleUrls: ['./tabela-eventos.css', '../estiloGlobal.css']
})
export class TabelaEventos implements OnInit {

  eventosFiltrados$!: Observable<Evento[]>;

  dataInicio: string = '';
  dataFim: string = '';

  constructor(private eventoService: EventoService, private router: Router) {}

  ngOnInit(): void {
    const hoje = new Date();
    const trintaDiasFrente = new Date();
    trintaDiasFrente.setDate(hoje.getDate() + 30);
    this.dataInicio = hoje.toISOString().split('T')[0];
    this.dataFim = trintaDiasFrente.toISOString().split('T')[0];
    this.atualizarEventosFiltrados(hoje, trintaDiasFrente);
  }

  atualizarEventosFiltrados(inicioParam?: Date, fimParam?: Date) {
    const inicio = inicioParam ?? new Date(this.dataInicio);
    const fim = fimParam ?? new Date(this.dataFim);
    this.eventosFiltrados$ = this.eventoService.listarEventos().pipe(
      map(eventos =>
        eventos
          .filter(e => {
            const eventoData = new Date(e.data);
            return eventoData >= inicio && eventoData <= fim;
          })
      )
    );
  }

  filtrarEventos() {
    const diffMs = new Date(this.dataFim).getTime() - new Date(this.dataInicio).getTime();
    const diffDias = diffMs / (1000 * 60 * 60 * 24);
    if (diffDias > 30) {
      alert('O período não pode ser maior que 30 dias!');
      return;
    }
    this.atualizarEventosFiltrados();
  }

  cadastrar() { this.router.navigate(['/evento-crud']); }

  editar(evento: Evento) { this.router.navigate([`/evento-crud/${evento.id}`]); }

  remover(evento: Evento) {
    if (confirm(`Confirma a remoção do evento "${evento.descricao}"?`)) {
      this.eventoService.remover(Number(evento.id)).subscribe({
        next: () => {
      console.log('Evento removido com sucesso');
      this.atualizarEventosFiltrados();
    },
      error: (error) => {
          console.error('Erro ao remover evento:', error);
          console.log('Evento:', evento);
        }
      });
    }
  }

  baixarRelatorio(evento: Evento) { console.log('Download:', evento); }

}
