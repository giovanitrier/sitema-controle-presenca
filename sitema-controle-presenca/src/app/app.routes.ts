import { Routes } from '@angular/router';
import {LoginComponent } from './pages/login/login';
import { TabelaEventos } from './pages/tabela-eventos/tabela-eventos';
import { EventoCrud } from './pages/evento-crud/evento-crud';
import { TabelaUsuarios } from './pages/tabela-usuarios/tabela-usuarios';
import { UsuarioCrud } from './pages/usuario-crud/usuario-crud';
import { GerenciarRelatorios } from './pages/gerenciar-relatorios/gerenciar-relatorios';
import { GerenciarCertificados } from './pages/gerenciar-certificados/gerenciar-certificados';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tabela-eventos', component: TabelaEventos},
  { path: 'evento-crud', component: EventoCrud },
  { path: 'evento-crud/:id', component: EventoCrud},
  { path: 'tabela-usuarios', component: TabelaUsuarios},
  { path: 'usuario-crud', component: UsuarioCrud },
  { path: 'usuario-crud/:id', component: UsuarioCrud},
  { path: 'gerenciar-relatorios', component: GerenciarRelatorios},
  { path: 'gerenciar-certificados',component: GerenciarCertificados},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
