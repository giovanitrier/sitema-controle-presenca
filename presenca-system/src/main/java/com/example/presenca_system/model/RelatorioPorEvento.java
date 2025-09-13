package com.example.presenca_system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true) // Use true if extending another class
public class RelatorioPorEvento extends RelatorioMensal {
    private int totalParticipantes;
    private Double taxaPresenca;
    public void setEventoId(Long eventoId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setEventoId'");
    }
    public void setDataEvento(LocalDateTime minusDays) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setDataEvento'");
    }
    public void setNomeEvento(String string) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setNomeEvento'");
    }
    public void setDataGeracao(LocalDateTime now) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setDataGeracao'");
    }
    public void setTotalPresentes(int i) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setTotalPresentes'");
    }
    public double getTotalPresentes() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getTotalPresentes'");
    }
    public void setTotalAusentes(double d) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setTotalAusentes'");
    }
    public void setLocal(String string) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setLocal'");
    }
    public void setOrganizador(String string) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setOrganizador'");
    }

    /* @ElementCollection
    @CollectionTable(name = "relatorio_detalhes_participacao", joinColumns = @JoinColumn(name = "relatorio_id"))
    @MapKeyColumn(name = "detalhe")
    @Column(name = "valor")
    private Map<String, Object> detalhesParticipacao; */
}