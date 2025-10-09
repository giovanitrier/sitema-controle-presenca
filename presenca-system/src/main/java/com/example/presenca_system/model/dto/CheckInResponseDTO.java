package com.example.presenca_system.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckInResponseDTO {
    private Long id;
    private Long eventoId;
    private String eventoTitulo;
    private String usuarioMatricula;
    private String usuarioNome;
    private Date dataHoraCheckin;
}