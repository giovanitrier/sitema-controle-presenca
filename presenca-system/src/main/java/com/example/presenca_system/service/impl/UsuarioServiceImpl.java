package com.example.presenca_system.service.impl;

import com.example.presenca_system.model.Usuario;
import com.example.presenca_system.model.dto.UsuarioListDTO;
import com.example.presenca_system.model.dto.UsuarioTemplateDTO;
import com.example.presenca_system.repository.UsuarioRepository;
import com.example.presenca_system.service.UsuarioService;

import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Usuario salvarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Override
    public Optional<Usuario> buscarPorMatricula(String matricula) {
        return usuarioRepository.findById(matricula);
    }

    @Override
    public List<Usuario> buscarTodos() {
        return usuarioRepository.findAll();
    }

    @Override
    public void deletarUsuario(String matricula) {
        usuarioRepository.deleteById(matricula);
    }

    @Override
    public List<UsuarioListDTO> listarUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(this::converterParaUsuarioListDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<UsuarioTemplateDTO> listarTemplatesParaValidacao() {
        return usuarioRepository.findAll().stream()
                .map(this::converterParaUsuarioTemplateDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Usuario> validarBiometria(byte[] hashParaValidar) {
        List<Usuario> todosUsuarios = usuarioRepository.findAll();

        for (Usuario usuario : todosUsuarios) {
            if (Arrays.equals(usuario.getTemplate(), hashParaValidar)) {
                return Optional.of(usuario);
            }
        }
        return Optional.empty();
    }

    private UsuarioListDTO converterParaUsuarioListDTO(Usuario usuario) {
        UsuarioListDTO dto = new UsuarioListDTO();
        dto.setMatricula(usuario.getMatricula());
        dto.setNome(usuario.getNome());
        dto.setSetor(usuario.getSetor());
        dto.setEmail(usuario.getEmail());
        return dto;
    }

    private UsuarioTemplateDTO converterParaUsuarioTemplateDTO(Usuario usuario) {
        UsuarioTemplateDTO dto = new UsuarioTemplateDTO();
        dto.setId(usuario.getMatricula());
        dto.setTemplate(usuario.getTemplate());
        return dto;
    }
}