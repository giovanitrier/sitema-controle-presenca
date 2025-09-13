package com.example.presenca_system.controller;

import com.example.presenca_system.model.RelatorioMensal;
import com.example.presenca_system.model.RelatorioPorEvento;
import com.example.presenca_system.service.RelatorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/relatorios")
public class RelatorioController {

    @Autowired
    private RelatorioService relatorioService;

    @GetMapping("/evento/{eventoId}")
    public RelatorioPorEvento gerarRelatorioEvento(@PathVariable Long eventoId) {
        return relatorioService.gerarRelatorioEvento(eventoId);
    }

    @GetMapping("/mensal")
    public RelatorioMensal gerarRelatorioMensal(@RequestParam int mes, @RequestParam int ano) {
        return relatorioService.gerarRelatorioMensal(mes, ano);
    }

    @GetMapping("/exportar/{relatorioId}")
    public String exportarRelatorio(@PathVariable Long relatorioId) {
        return relatorioService.exportarRelatorio(relatorioId);
    }
}