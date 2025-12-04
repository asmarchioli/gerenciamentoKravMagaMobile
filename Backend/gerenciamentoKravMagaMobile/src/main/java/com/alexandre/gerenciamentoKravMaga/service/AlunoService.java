package com.alexandre.gerenciamentoKravMaga.service;

import com.alexandre.gerenciamentoKravMaga.exception.RegraNegocioException;
import com.alexandre.gerenciamentoKravMaga.model.Aluno;
import com.alexandre.gerenciamentoKravMaga.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class AlunoService {
    @Autowired
    private AlunoRepository alunoRepository;

    public List<Aluno> listarTodos() {
        return alunoRepository.findAll(Sort.by("nome").ascending());
    }

    public Optional<Aluno> pesquisarPorId(Long id){
        return alunoRepository.findById(id);
    }

    public Optional<Aluno> buscarPorCPF(String cpf){
        return alunoRepository.findByCpf(cpf);
    }

    public Optional<Aluno> buscarPorEmail(String email){
        return alunoRepository.findByEmailIgnoreCase(email);
    }

    public Optional<Aluno> buscarPorTelefone(String telefone){
        return alunoRepository.findByTelefone(telefone);
    }

    public List<Aluno> pesquisarPorCPF(String cpf) {
        return alunoRepository.findByCpf(cpf)
                .map(Collections::singletonList)
                .orElse(Collections.emptyList());
    }

    public List<Aluno> pesquisarPorEmail(String email) {
        return alunoRepository.findByEmailIgnoreCase(email)
                .map(Collections::singletonList)
                .orElse(Collections.emptyList());
    }

    public List<Aluno> pesquisarPorTelefone(String telefone) {
        return alunoRepository.findByTelefone(telefone)
                .map(Collections::singletonList)
                .orElse(Collections.emptyList());
    }

    public List<Aluno> pesquisarPorNome(String nome){
        return alunoRepository.findByNomeContainingIgnoreCase(nome);
    }

    public Aluno salvar(Aluno aluno){
        //VALIDAÇÃO DE UNICIDADE PARA CPF
        Optional<Aluno> alunoExistenteCpf = alunoRepository.findByCpf(aluno.getCpf());
        if (alunoExistenteCpf.isPresent() && !alunoExistenteCpf.get().getId().equals(aluno.getId())) {
            throw new RegraNegocioException("CPF já cadastrado no sistema!");
        }

        //VALIDAÇÃO DE UNICIDADE PARA TELEFONE
        Optional<Aluno> alunoExistenteTelefone = alunoRepository.findByTelefone(aluno.getTelefone());
        if (alunoExistenteTelefone.isPresent() && !alunoExistenteTelefone.get().getId().equals(aluno.getId())) {
            throw new RegraNegocioException("Telefone já cadastrado no sistema!");
        }

        //VALIDAÇÃO DE UNICIDADE PARA E-MAIL
        Optional<Aluno> alunoExistenteEmail = alunoRepository.findByEmailIgnoreCase(aluno.getEmail());
        if (alunoExistenteEmail.isPresent() && !alunoExistenteEmail.get().getId().equals(aluno.getId())) {
            throw new RegraNegocioException("E-mail já cadastrado no sistema!");
        }

        return alunoRepository.save(aluno);
    }

    public void deletarPorId(Long id){
        if (!existsById(id)) {
            throw new RegraNegocioException("Aluno não encontrado!");
        }
        alunoRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return alunoRepository.existsById(id);
    }
}
