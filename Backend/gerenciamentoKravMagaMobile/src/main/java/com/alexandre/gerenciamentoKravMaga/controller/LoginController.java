package com.alexandre.gerenciamentoKravMaga.controller;

import com.alexandre.gerenciamentoKravMaga.model.Administrador;
import com.alexandre.gerenciamentoKravMaga.service.AdministradorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "*")
public class LoginController {
    private final AdministradorService administradorService;

    public LoginController(AdministradorService administradorService) {
        this.administradorService = administradorService;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciais){
        String login = credenciais.get("login");
        String senha = credenciais.get("senha");

        Optional<Administrador> admin = administradorService.autenticar(login, senha);

        if (admin.isPresent()) {
            return ResponseEntity.ok().body(Map.of("mensagem",
                    "Login realizado com sucesso. Bem vindo!",
                    "usuario", admin.get().getLogin()));
        } else  {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("mensagem",
                    "Usuário ou senha inválidos!"));
        }
    }
}
