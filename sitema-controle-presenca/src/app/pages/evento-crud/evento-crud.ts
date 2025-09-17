import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Evento } from '../../models/evento.model';
import { EventoService } from '../../services/evento-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evento-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './evento-crud.html',
  styleUrls: ['../estiloGlobal.css', './evento-crud.css']
})
export class EventoCrud implements OnInit {
  evento: Evento = {
    id: 0,
    data: '',
    descricao: '',
    status: '',
    nome: '',
    categoria: ''
  };

  constructor(
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarEvento();
  }

  carregarEvento() {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('Parâmetro ID da rota:', idParam);

    // Converte o ID para número, independentemente de ser string ou número
    const id = idParam ? Number(idParam) : NaN;
    console.log('ID do evento carregado:', id);

    if (!isNaN(id) && id > 0) {
      this.eventoService.listarEventoporId(id).subscribe({
        next: (evento) => {
          // Garante que o ID do evento seja um número
          this.evento = {
            ...evento,
            id: Number(evento.id) // Converte para número caso seja string
          };
          // Garante que o status seja 'Pendente' ao carregar um evento existente
          this.evento.status = 'Pendente';
        },
        error: (err) => {
          console.error('Erro ao carregar evento:', err);

        }
      });
    }
  }

  cadastrar() {
    // Gera ID aleatório apenas se id for 0
    if (this.evento.id === 0) {
      this.evento.id = Math.floor(Math.random() * 1000) + 1;
    }

    // Garante que o status seja sempre 'Pendente'
    this.evento.status = 'Pendente';

    this.eventoService.cadastrar(this.evento).subscribe({
      next: (evento) => {
        console.log('Evento cadastrado com sucesso:', evento);
        this.router.navigate(['/tabela-eventos']);
      },
      error: (error) => {
        console.error('Erro ao cadastrar evento:', error);
      }
    });
  }

  editar() {
    // Garante que o status seja sempre 'Pendente' ao editar
    this.evento.status = 'Pendente';

    this.eventoService.editar(this.evento).subscribe({
      next: (evento) => {
        console.log('Evento editado com sucesso:', evento);
        this.router.navigate(['/tabela-eventos']);
      },
      error: (error) => {
        console.error('Erro ao editar evento:', error);
      }
    });
  }

  remover() {
    if (!confirm('Deseja realmente remover este evento?')) return;

    this.eventoService.remover(Number(this.evento.id)).subscribe({
      next: () => {
        console.log('Evento removido com sucesso');
        this.router.navigate(['/tabela-eventos']);
      },
      error: (error) => {
        console.error('Erro ao remover evento:', error);
      }
    });
  }

  finalizar() {
    this.evento.status = 'Finalizado';
    console.log('Finalizando evento:', this.evento.id);
  }

  iniciar() {
    this.evento.status = 'Em curso';
    console.log('Iniciando evento:', this.evento.id);
  }

  gerarRelatorio() {
    console.log('Gerando relatório...');
  }

  gerarCertificados() {
    console.log('Gerando certificados...');
  }
}
