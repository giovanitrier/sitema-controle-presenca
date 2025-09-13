package com.example.presenca_system.service;

import com.example.presenca_system.model.RelatorioMensal;
import com.example.presenca_system.model.RelatorioPorEvento;

public interface RelatorioService {
    RelatorioPorEvento gerarRelatorioEvento(Long eventoId);
    RelatorioMensal gerarRelatorioMensal(int mes, int ano);
    String exportarRelatorio(Long relatorioId);
}