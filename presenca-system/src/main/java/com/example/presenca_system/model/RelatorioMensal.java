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
@Inheritance(strategy = InheritanceType.JOINED)
public class RelatorioMensal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int mes;
    private int ano;
    private int totalEventos;
    private Double horasTreinamento;

    @ElementCollection
    @CollectionTable(name = "relatorio_metricas", joinColumns = @JoinColumn(name = "relatorio_id"))
    @MapKeyColumn(name = "metrica")
    @Column(name = "valor")
    private Map<String, Object> metricasDesempenho;
}
