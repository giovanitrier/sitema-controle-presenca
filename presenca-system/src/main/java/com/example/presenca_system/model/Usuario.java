package com.example.presenca_system.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
@Table(name = "usuarios")
public class Usuario {
    
    @Id
    private String matricula;
    
    @Column(nullable = false)
    private String nome;

    @Column(unique = true)
    private String email;
    
    @Column(nullable = false)
    private String setor;
    
    @Column(nullable = false)
    private byte[] template;
    
    @OneToMany(mappedBy = "usuario")
    private List<CheckIn> checkIns;
}