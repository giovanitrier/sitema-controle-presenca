package com.example.presenca_system.service;

import com.example.presenca_system.model.RelatorioMensal;
import com.example.presenca_system.model.RelatorioPorEvento;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class RelatorioServiceImpl implements RelatorioService {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private static final String DIRETORIO_EXPORTACAO = "relatorios_exportados/";
    private final Random random = new Random();

    @Override
    public RelatorioPorEvento gerarRelatorioEvento(Long eventoId) {
        // Dados fake para relatório por evento
        RelatorioPorEvento relatorio = new RelatorioPorEvento();
        relatorio.setEventoId(eventoId);
        relatorio.setNomeEvento("Evento de Teste " + eventoId);
        relatorio.setDataEvento(LocalDateTime.now().minusDays(random.nextInt(30)));
        relatorio.setDataGeracao(LocalDateTime.now());
        relatorio.setTotalParticipantes(50 + random.nextInt(50));
        relatorio.setTotalPresentes(40 + random.nextInt(30));
        relatorio.setTotalAusentes(relatorio.getTotalParticipantes() - relatorio.getTotalPresentes());
        relatorio.setTaxaPresenca((double) relatorio.getTotalPresentes() / relatorio.getTotalParticipantes() * 100);
        relatorio.setLocal("Auditório Principal");
        relatorio.setOrganizador("Departamento de Eventos");
        
        return relatorio;
    }

    @Override
    public RelatorioMensal gerarRelatorioMensal(int mes, int ano) {
        // Dados fake para relatório mensal
        RelatorioMensal relatorio = new RelatorioMensal();
        //relatorio.setId((long) (mes + ano));
        //relatorio.setMes(mes);
        //relatorio.setAno(ano);
        relatorio.setDataGeracao(LocalDateTime.now());
        relatorio.setTotalRegistros(200 + random.nextInt(300));
        //relatorio.setTotalEventos(5 + random.nextInt(10));
        relatorio.setTotalPresentes(150 + random.nextInt(100));
        relatorio.setTotalAusentes(relatorio.getTotalRegistros() - relatorio.getTotalPresentes());
        relatorio.setTaxaPresencaGlobal((double) relatorio.getTotalPresentes() / relatorio.getTotalRegistros() * 100);
        
        // Dados fake para taxa por evento
        Map<Long, Double> taxaPorEvento = new HashMap<>();
        taxaPorEvento.put(1L, 85.5);
        taxaPorEvento.put(2L, 92.0);
        taxaPorEvento.put(3L, 78.3);
        taxaPorEvento.put(4L, 95.7);
        //relatorio.setTaxaPresencaPorEvento(taxaPorEvento);
        
        // Dados fake para participantes por evento
        Map<Long, Long> participantesPorEvento = new HashMap<>();
        participantesPorEvento.put(1L, 45L);
        participantesPorEvento.put(2L, 67L);
        participantesPorEvento.put(3L, 32L);
        participantesPorEvento.put(4L, 89L);
        //relatorio.setParticipantesPorEvento(participantesPorEvento);
        
        return relatorio;
    }

    @Override
    public String exportarRelatorio(Long relatorioId) {
        try {
            // Gerar um relatório fake baseado no ID
            Object relatorio;
            if (relatorioId % 2 == 0) {
                relatorio = gerarRelatorioEvento(relatorioId);
            } else {
                relatorio = gerarRelatorioMensal(
                    LocalDateTime.now().getMonthValue(), 
                    LocalDateTime.now().getYear()
                );
            }
            
            // Configurar ObjectMapper para formato bonito
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            
            // Criar diretório se não existir
            File diretorio = new File(DIRETORIO_EXPORTACAO);
            if (!diretorio.exists()) {
                diretorio.mkdirs();
            }
            
            // Gerar nome do arquivo
            String nomeArquivo = String.format("relatorio_%d_%s.json", 
                relatorioId, 
                LocalDateTime.now().toString().replace(":", "-").replace(".", "-"));
            
            String caminhoCompleto = DIRETORIO_EXPORTACAO + nomeArquivo;
            
            // Exportar para JSON
            File arquivo = new File(caminhoCompleto);
            objectMapper.writeValue(arquivo, relatorio);
            
            return String.format("""
                {
                  "status": "success",
                  "message": "Relatório exportado com sucesso",
                  "arquivo": "%s",
                  "tamanho": "%d bytes",
                  "timestamp": "%s"
                }
                """, caminhoCompleto, arquivo.length(), LocalDateTime.now());
            
        } catch (IOException e) {
            return String.format("""
                {
                  "status": "error",
                  "message": "Erro ao exportar relatório: %s",
                  "relatorioId": %d,
                  "timestamp": "%s"
                }
                """, e.getMessage(), relatorioId, LocalDateTime.now());
        }
    }

    // Método adicional para teste rápido
    public String getRelatorioDemo() {
        try {
            RelatorioPorEvento relatorioEvento = gerarRelatorioEvento(1L);
            RelatorioMensal relatorioMensal = gerarRelatorioMensal(10, 2024);
            
            Map<String, Object> demo = new HashMap<>();
            demo.put("relatorioEvento", relatorioEvento);
            demo.put("relatorioMensal", relatorioMensal);
            demo.put("timestamp", LocalDateTime.now());
            demo.put("status", "demo_fake_data");
            
            objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
            return objectMapper.writeValueAsString(demo);
            
        } catch (IOException e) {
            return "{\"error\": \"Falha ao gerar demo: " + e.getMessage() + "\"}";
        }
    }
}