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

    @PostMapping
    public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody UsuarioDTO usuarioDto, Authentication authentication) {
        authentication.getName();
        
        Usuario novoUsuario = new Usuario();
        novoUsuario.setMatricula(usuarioDto.getMatricula());
        novoUsuario.setNome(usuarioDto.getNome());
        novoUsuario.setSetor(usuarioDto.getSetor());
        novoUsuario.setEmail(usuarioDto.getEmail());

        try {
            byte[] biometriaBytes = Base64.getDecoder().decode(usuarioDto.getTemplate());
            novoUsuario.setTemplate(biometriaBytes);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

        Usuario usuarioSalvo = usuarioService.salvarUsuario(novoUsuario);
        return new ResponseEntity<>(usuarioSalvo, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioListDTO>> listarTodosOsUsuarios(Authentication authentication) {
        authentication.getName();
        List<UsuarioListDTO> usuarios = usuarioService.listarUsuarios();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    @GetMapping("/{matricula}")
    public ResponseEntity<Usuario> buscarUsuarioPorMatricula(@PathVariable String matricula, Authentication authentication) {
        authentication.getName();
        
        Optional<Usuario> usuarioOpt = usuarioService.buscarPorMatricula(matricula);
        if (usuarioOpt.isPresent()) {
            return new ResponseEntity<>(usuarioOpt.get(), HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{matricula}")
    public ResponseEntity<Usuario> atualizarUsuario(
            @PathVariable String matricula, 
            @RequestBody UsuarioDTO usuarioDto, 
            Authentication authentication) {
        
        authentication.getName();
        
        Optional<Usuario> usuarioExistenteOpt = usuarioService.buscarPorMatricula(matricula);
        if (usuarioExistenteOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Usuario usuarioExistente = usuarioExistenteOpt.get();
        
        usuarioExistente.setNome(usuarioDto.getNome());
        usuarioExistente.setSetor(usuarioDto.getSetor());
        usuarioExistente.setEmail(usuarioDto.getEmail());

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

    @DeleteMapping("/{matricula}")
    public ResponseEntity<Void> removerUsuario(@PathVariable String matricula, Authentication authentication) {
        authentication.getName();
        
        Optional<Usuario> usuarioOpt = usuarioService.buscarPorMatricula(matricula);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        usuarioService.deletarUsuario(matricula);
        return ResponseEntity.noContent().build();
    }
}