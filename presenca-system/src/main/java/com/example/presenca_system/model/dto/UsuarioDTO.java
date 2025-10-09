package com.example.presenca_system.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.time.LocalDate;

@Data
public class UsuarioDTO {
    private String cpf;
    private String nome;
    private String matricula;
    private String setor;
    private String email;
    
    @JsonProperty("template")
    private String template;

    @JsonProperty("dataNascimento")
    private LocalDate dataNascimento;
}