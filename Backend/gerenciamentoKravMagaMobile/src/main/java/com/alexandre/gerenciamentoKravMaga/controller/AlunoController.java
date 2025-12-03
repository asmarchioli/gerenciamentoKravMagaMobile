package com.alexandre.gerenciamentoKravMaga.controller;

import com.alexandre.gerenciamentoKravMaga.model.Aluno;
import com.alexandre.gerenciamentoKravMaga.service.AlunoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/alunos")
@CrossOrigin(origins = "*")
public class AlunoController {
    private final AlunoService alunoService;

    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    //Listas todos os alunos cadastrados
    @GetMapping
    public List<Aluno> listar() {
        return alunoService.listarTodos();
    }

    //Buscar por nome
    @GetMapping("/busca")
    public List<Aluno> pesquisar(@RequestParam String termo) {
        return alunoService.pesquisarPorNome(termo);
    }

    //Cadastrar aluno
    @PostMapping
    public ResponseEntity<Aluno> salvar(@RequestBody @Valid Aluno aluno) {
        Aluno alunoSalvo = alunoService.salvar(aluno);
        return ResponseEntity.status(HttpStatus.CREATED).body(alunoSalvo);
    }

    //Atualizar aluno
    @PutMapping("/{id}")
    public ResponseEntity<Aluno> atualizar(@PathVariable Long id,
                                           @RequestBody @Valid Aluno aluno) {
        if (!alunoService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        aluno.setId(id);
        Aluno alunoSalvo = alunoService.salvar(aluno);
        return ResponseEntity.ok(alunoSalvo);
    }

    //Deletar aluno
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        if (!alunoService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        alunoService.deletarPorId(id);
        return ResponseEntity.noContent().build();
    }
}
