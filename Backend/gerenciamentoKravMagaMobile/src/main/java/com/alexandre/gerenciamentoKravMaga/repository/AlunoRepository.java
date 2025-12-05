package com.alexandre.gerenciamentoKravMaga.repository;

import com.alexandre.gerenciamentoKravMaga.model.Aluno;
import com.alexandre.gerenciamentoKravMaga.model.Faixa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    //Método mágico do o Sp. Dt. JPA
    //List<Aluno> findByNomeContainingIgnoreCase(String nome);

    //Optional<Aluno> findByCpf(String cpf);

    //Optional<Aluno> findByEmailIgnoreCase(String email);

    Optional<Aluno> findByTelefone(String telefone);

    @Query("SELECT a FROM Aluno a WHERE " +
            "(:nome IS NULL OR LOWER(a.nome) LIKE LOWER(CONCAT('%', :nome, '%'))) AND " +
            "(:faixa IS NULL OR a.faixa = :faixa) AND " +
            "(:turma IS NULL OR LOWER(a.turma) LIKE LOWER(CONCAT('%', :turma, '%')))")
    List<Aluno> buscarComFiltros(
            @Param("nome") String nome,
            @Param("faixa") Faixa faixa,
            @Param("turma") String turma);

    Optional<Aluno> findByCpf(String cpf);
    Optional<Aluno> findByEmailIgnoreCase(String email);
    List<Aluno> findByNomeContainingIgnoreCase(String nome);
}
