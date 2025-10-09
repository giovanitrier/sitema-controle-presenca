package com.example.presenca_system.controller;

import com.example.presenca_system.model.Usuario;
import com.example.presenca_system.model.dto.UsuarioDTO;
import com.example.presenca_system.model.dto.UsuarioListDTO;
import com.example.presenca_system.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // 🔐 CREATE - Cadastrar novo usuário
    @PostMapping
    public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody UsuarioDTO usuarioDto, Authentication authentication) {
        String emailSuperusuario = authentication.getName();
        
        Usuario novoUsuario = new Usuario();
        novoUsuario.setCpf(usuarioDto.getCpf());
        novoUsuario.setNome(usuarioDto.getNome());
        novoUsuario.setMatricula(usuarioDto.getMatricula());
        novoUsuario.setSetor(usuarioDto.getSetor());
        novoUsuario.setEmail(usuarioDto.getEmail());
        novoUsuario.setDataNascimento(usuarioDto.getDataNascimento());

        try {
            byte[] biometriaBytes = Base64.getDecoder().decode(usuarioDto.getTemplate());
            novoUsuario.setTemplate(biometriaBytes);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

        Usuario usuarioSalvo = usuarioService.salvarUsuario(novoUsuario);
        return new ResponseEntity<>(usuarioSalvo, HttpStatus.CREATED);
    }

    // 🔐 READ - Listar todos os usuários
    @GetMapping
    public ResponseEntity<List<UsuarioListDTO>> listarTodosOsUsuarios(Authentication authentication) {
        String emailSuperusuario = authentication.getName();
        List<UsuarioListDTO> usuarios = usuarioService.listarUsuarios();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    // 🔐 READ - Buscar usuário específico por CPF
    @GetMapping("/{cpf}")
    public ResponseEntity<Usuario> buscarUsuarioPorCpf(@PathVariable String cpf, Authentication authentication) {
        String emailSuperusuario = authentication.getName();
        
        Optional<Usuario> usuarioOpt = usuarioService.buscarPorCpf(cpf);
        if (usuarioOpt.isPresent()) {
            return new ResponseEntity<>(usuarioOpt.get(), HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 🔐 UPDATE - Atualizar usuário existente
    @PutMapping("/{cpf}")
    public ResponseEntity<Usuario> atualizarUsuario(
            @PathVariable String cpf, 
            @RequestBody UsuarioDTO usuarioDto, 
            Authentication authentication) {
        
        String emailSuperusuario = authentication.getName();
        
        Optional<Usuario> usuarioExistenteOpt = usuarioService.buscarPorCpf(cpf);
        if (usuarioExistenteOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Usuario usuarioExistente = usuarioExistenteOpt.get();
        
        // Atualiza os campos
        usuarioExistente.setNome(usuarioDto.getNome());
        usuarioExistente.setMatricula(usuarioDto.getMatricula());
        usuarioExistente.setSetor(usuarioDto.getSetor());
        usuarioExistente.setEmail(usuarioDto.getEmail());
        usuarioExistente.setDataNascimento(usuarioDto.getDataNascimento());

        // Atualiza a biometria se fornecida
        if (usuarioDto.getTemplate() != null && !usuarioDto.getTemplate().isEmpty()) {
            try {
                byte[] biometriaBytes = Base64.getDecoder().decode(usuarioDto.getTemplate());
                usuarioExistente.setTemplate(biometriaBytes);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().build();
            }
        }

        Usuario usuarioAtualizado = usuarioService.salvarUsuario(usuarioExistente);
        return new ResponseEntity<>(usuarioAtualizado, HttpStatus.OK);
    }

    // 🔐 DELETE - Remover usuário
    @DeleteMapping("/{cpf}")
    public ResponseEntity<Void> removerUsuario(@PathVariable String cpf, Authentication authentication) {
        String emailSuperusuario = authentication.getName();
        
        Optional<Usuario> usuarioOpt = usuarioService.buscarPorCpf(cpf);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        usuarioService.deletarUsuario(cpf);
        return ResponseEntity.noContent().build();
    }
}