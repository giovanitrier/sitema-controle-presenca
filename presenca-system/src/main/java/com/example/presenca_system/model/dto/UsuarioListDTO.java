package com.example.presenca_system.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioListDTO {
    private String matricula;
    private String nome;
    private String setor;
    private String email;
}