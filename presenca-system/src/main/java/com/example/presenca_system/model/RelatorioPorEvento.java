package com.example.presenca_system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Map;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RelatorioPorEvento extends RelatorioMensal {
    private int totalParticipantes;
    private Double taxaPresenca;

    @ElementCollection
    @CollectionTable(name = "relatorio_detalhes_participacao", joinColumns = @JoinColumn(name = "relatorio_id"))
    @MapKeyColumn(name = "detalhe")
    @Column(name = "valor")
    private Map<String, Object> detalhesParticipacao;
}