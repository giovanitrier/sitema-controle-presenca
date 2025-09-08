import { Routes } from '@angular/router';
import {LoginComponent } from './pages/login/login';
import { TabelaEventos } from './pages/tabela-eventos/tabela-eventos';
import { EventoCrud } from './pages/evento-crud/evento-crud';
import { TabelaFuncionarios } from './pages/tabela-funcionarios/tabela-funcionarios';
import { FuncionarioCrud } from './pages/funcionario-crud/funcionario-crud';
import { GerenciarRelatorios } from './pages/gerenciar-relatorios/gerenciar-relatorios';
import { GerenciarCertificados } from './pages/gerenciar-certificados/gerenciar-certificados';

//Definição das rotas da aplicação
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tabela-eventos', component: TabelaEventos},
  { path: 'evento-crud', component: EventoCrud},
  { path: 'tabela-funcionarios', component: TabelaFuncionarios},
  { path: 'funcionario-crud', component: FuncionarioCrud},
  { path: 'gerenciar-relatorios', component: GerenciarRelatorios},
  { path: 'gerenciar-certificados',component: GerenciarCertificados},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
