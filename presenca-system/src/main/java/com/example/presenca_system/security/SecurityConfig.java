package com.example.presenca_system.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/admin/certificados/enviar-email").permitAll()
                        .requestMatchers("/auth/**", "/public/**", "/checkin/registrar").permitAll()
                        .requestMatchers("/admin/**", "/checkin/evento/**").authenticated()

                        .anyRequest().denyAll())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        configuration.setAllowedOrigins(List.of("*")); 
        
        // Necessário para permitir credenciais (cookies, tokens de autorização)
        // **IMPORTANTE:** Se 'setAllowCredentials(true)' for usado, 'setAllowedOrigins' NÃO pode ser `List.of("*")` em browsers modernos.
        // Uma solução comum em desenvolvimento/LAN é listar o 'localhost' e **remover** 'setAllowCredentials(true)' OU mantê-lo e USAR a lista de origens abaixo:
        
        /* * ALTERNATIVA MAIS SEGURA PARA LAN:
         * configuration.setAllowedOrigins(List.of("http://localhost:4200", "http://127.0.0.1:4200", "http://localhost:8080"));
         * configuration.setAllowCredentials(true); 
         * -> Para acessar de outras máquinas, use um NGINX/Proxy no host do backend e configure-o com o IP real do backend (e.g., 192.168.1.100).
         */
        
        // Vamos manter o '*' para a máxima flexibilidade de **instalação imediata** em qualquer LAN, mas desabilitando 'AllowCredentials' ou usando um OriginPatterns.
        // Spring 3.2+ suporta `setAllowedOriginPatterns(List.of("*"));` que lida melhor com `setAllowCredentials(true)`.
        
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));
        // Desabilitado para compatibilidade com AllowedOrigins(List.of("*"))
        // configuration.setAllowCredentials(true); 
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
