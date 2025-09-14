package com.example.presenca_system.controller;

import com.example.presenca_system.model.Evento;
import com.example.presenca_system.repository.EventoRepository;
import com.example.presenca_system.service.CertificadoService;
import com.example.presenca_system.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private CertificadoService certificadoService;

    @GetMapping
    public List<Evento> getAllEventos() {
        return eventoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> getEventoById(@PathVariable Long id) {
        return eventoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Evento createEvento(@RequestBody Evento evento) {
        return eventoService.save(evento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Evento> updateEvento(@PathVariable Long id, @RequestBody Evento evento) {
        return eventoService.update(id, evento)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvento(@PathVariable Long id) {
        eventoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{eventoId}/encerrar")
    public ResponseEntity<String> encerrarEventoEGerarCertificados(@PathVariable Long eventoId) {
        // 1. Encontra o evento pelo ID
        return eventoRepository.findById(eventoId)
            .map(evento -> {
                // 2. Chama o serviço para gerar os certificados
                certificadoService.gerarCertificadosParaEvento(evento);
                return ResponseEntity.ok("Certificados gerados com sucesso para o evento " + evento.getTitulo() + "!");
            })
            .orElse(ResponseEntity.notFound().build());
    }
} 