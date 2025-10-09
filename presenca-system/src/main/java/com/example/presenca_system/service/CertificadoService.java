package com.example.presenca_system.service;

import com.example.presenca_system.model.Certificado;
import com.example.presenca_system.model.Evento;
import com.example.presenca_system.model.dto.CertificadoDTO;
import com.lowagie.text.DocumentException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface CertificadoService {
    
    // Métodos de consulta com DTO
    List<CertificadoDTO> findAllDTO();
    List<CertificadoDTO> findByUsuarioMatriculaDTO(String matricula);
    List<CertificadoDTO> findByEventoEventoIdDTO(Long eventoId);
    List<CertificadoDTO> findBySuperusuarioEmailDTO(String emailSuperusuario);
    List<CertificadoDTO> findByEventoAndSuperusuarioEmailDTO(Long eventoId, String emailSuperusuario);
    
    // Métodos de consulta com entidade
    Optional<Certificado> findById(Long id);
    List<Certificado> findAll();
    List<Certificado> findByEventoEventoId(Long eventoId);
    List<Certificado> buscarCertificadosPorMatricula(String matricula);
    Optional<Certificado> findByUsuarioMatriculaAndEventoEventoId(String matricula, Long eventoId);
    Optional<Certificado> findByIdAndSuperusuarioEmail(Long id, String emailSuperusuario);
    
    // Métodos de validação
    boolean existsByUsuarioMatriculaAndEventoEventoId(String matricula, Long eventoId);
    boolean verificarPermissoesCertificados(List<Long> certificadoIds, String emailSuperusuario);
    
    // Métodos de geração
    void gerarCertificadosParaEvento(Evento evento);
    byte[] gerarCertificadoPDF(Certificado certificado) throws IOException, DocumentException;
    byte[] gerarPDFConsolidadoPorEvento(Long eventoId) throws IOException, DocumentException;
    List<byte[]> gerarPDFsPorIds(List<Long> certificadoIds) throws IOException, DocumentException;
    
    // Métodos utilitários
    String buscarEmailPorMatricula(String matricula);
    Certificado save(Certificado certificado);
    void deleteById(Long id);
}