package com.example.presenca_system.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class RelatorioMensal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int mes;
    private int ano;
    private int totalEventos;
    private Double horasTreinamento;
    public void setTotalPresentes(int i) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setTotalPresentes'");
    }
    public void setDataGeracao(LocalDateTime now) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setDataGeracao'");
    }
    public void setTotalRegistros(int i) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setTotalRegistros'");
    }
    public int getTotalRegistros() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getTotalRegistros'");
    }
    public double getTotalPresentes() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getTotalPresentes'");
    }
    public void setTaxaPresencaGlobal(double d) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setTaxaPresencaGlobal'");
    }
    public void setTotalAusentes(double d) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setTotalAusentes'");
    }

    //@ElementCollection
    //@CollectionTable(name = "relatorio_metricas", joinColumns = @JoinColumn(name = "relatorio_id"))
    //@MapKeyColumn(name = "metrica")
    //@Column(name = "valor")
    //private Map<String, Object> metricasDesempenho;
}
