import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Evento } from '../../models/evento.model';
import { EventoService } from '../../services/evento-service';

@Component({
  selector: 'app-evento-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evento-crud.html',
  styleUrls: ['../estiloGlobal.css','./evento-crud.css']
})
export class EventoCrud implements OnInit {
  evento = {
    id: 0,
    nome: '',
    data: '',
    descricao: '',
    categoria: '',
    status: '',
  };

  eventos: Evento[] = [];
  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.listarEventos();
  }

  listarEventos() {
    this.eventoService.listarEventos().subscribe({
      next: (eventos) => {
        console.log('Lista de Eventos:', eventos);
      },
      error: (error) => {
        console.error('Erro ao listar eventos:', error);
      }
    });
  }

  cadastrar(){
      this.eventoService.cadastrar(this.evento).subscribe({
        next: (evento) => {
          console.log('Evento cadastrado com sucesso:', evento);
          this.listarEventos();
        }, error: (error) => {
          console.error('Erro ao cadastrar evento:', error);

        }
    } );
  }

  editar(){
    this.eventoService.editar(this.evento).subscribe({
      next: (evento) => {
        console.log('Evento editado com sucesso:', evento);
        this.listarEventos();
      }, error: (error) => {
        console.error('Erro ao editar evento:', error);
      }
    });
  }

  remover() {
    this.eventoService.remover(this.evento.id).subscribe({
      next: () => {
        console.log('Evento removido com sucesso');
        this.listarEventos();
      }, error: (error) => {
        console.error('Erro ao remover evento:', error);
      }
  } );
  }

  finalizar() {
    console.log('Finalizando evento:', this.evento.id);
  }

  iniciar() {
    console.log('Iniciando evento:', this.evento.id);
  }

  gerarRelatorio() {
    console.log('Gerando relatório...');
  }

  gerarCertificados() {
    console.log('Gerando certificados...');
  }
}


