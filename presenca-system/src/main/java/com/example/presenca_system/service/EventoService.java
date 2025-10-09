package com.example.presenca_system.service;

import com.example.presenca_system.model.dto.EventoDTO;
import com.example.presenca_system.model.enums.StatusEvento;
import com.example.presenca_system.model.Evento;

import java.util.List;
import java.util.Optional;

public interface EventoService {
    List<EventoDTO> findAllDTO();
    Optional<EventoDTO> findByIdDTO(Long id);
    Evento save(Evento evento);
    void deleteById(Long id);
    Optional<Evento> update(Long id, Evento evento);
    
    List<Evento> findAll();
    Optional<Evento> findById(Long id);
    
    void atualizarStatus(Long eventoId, StatusEvento novoStatus);
    void encerrarEvento(Long eventoId);
    void cancelarEvento(Long eventoId);
    
    List<EventoDTO> findBySuperusuarioEmail(String emailSuperusuario);
    Optional<EventoDTO> findByIdAndSuperusuarioEmail(Long id, String emailSuperusuario);
    Optional<Evento> findByIdAndSuperusuarioEmailEntity(Long id, String emailSuperusuario);
}