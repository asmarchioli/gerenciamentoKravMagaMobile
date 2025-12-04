CREATE DATABASE gerenciamento_kravmaga_mobile;

USE gerenciamento_kravmaga_mobile;

CREATE TABLE alunos (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    faixa ENUM('BRANCA', 'AMARELA', 'LARANJA', 'BORDÔ', 'VERDE', 'AZUL', 'ROXA', 'MARROM', 'PRETA') NOT NULL,
    telefone VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    turma VARCHAR(20) NOT NULL,
    endereco TEXT,
	data_nascimento Date,
    data_prox_graduacao Date
);

SELECT * FROM alunos;

INSERT INTO alunos (nome, cpf, faixa, telefone, email, turma, endereco, data_nascimento, data_prox_graduacao) VALUES
('Ana Clara Souza', '111.222.333-44', 'AMARELA', '(43) 99999-1111', 'ana.souza@email.com', 'Iniciante Noite', 'Rua das Flores, 123, Londrina', '1995-05-15', '2026-03-20'),
('Bruno Costa Lima', '222.333.444-55', 'BRANCA', '(43) 98888-2222', 'bruno.lima@email.com', 'Iniciante Manhã', 'Avenida Brasil, 456, Cambé', '2001-11-20', '2026-06-10'),
('Carla Dias Ferreira', '333.444.555-66', 'VERDE', '(43) 99988-3333', 'carla.ferreira@email.com', 'Avançado Noite', 'Praça da Matriz, 789, Ibiporã', '1990-01-30', '2025-12-15'),
('Daniel Martins Alves', '444.555.666-77', 'LARANJA', '(43) 98877-4444', 'daniel.alves@email.com', 'Intermediário Tarde', 'Rua dos Pinheiros, 101, Londrina', '1998-07-22', '2026-04-05'),
('Eduarda Rocha Barros', '555.666.777-88', 'BRANCA', '(43) 99966-5555', 'eduarda.barros@email.com', 'Iniciante Manhã', NULL, '2003-02-12', '2026-06-10'),
('Fábio Pereira Gomes', '666.777.888-99', 'AZUL', '(43) 98855-6666', 'fabio.gomes@email.com', 'Avançado Noite', 'Avenida Higienópolis, 212, Londrina', '1985-09-03', '2026-01-25'),
('Gabriela Nunes Ribeiro', '777.888.999-00', 'AMARELA', '(43) 99944-7777', 'gabriela.ribeiro@email.com', 'Iniciante Noite', NULL, '1999-12-08', '2026-03-20'),
('Heitor Correia Santos', '888.999.000-11', 'MARROM', '(43) 98833-8888', 'heitor.santos@email.com', 'Avançado Noite', 'Rua Sergipe, 303, Londrina', '1992-04-18', '2026-02-18'),
('Isabela Azevedo Pinto', '999.000.111-22', 'VERDE', '(43) 99922-9999', 'isabela.pinto@email.com', 'Intermediário Tarde', 'Rua Pernambuco, 404, Londrina', '1997-08-25', '2025-12-15'),
('João Vitor Mendes Castro', '000.111.222-33', 'BRANCA', '(43) 98811-0000', 'joao.castro@email.com', 'Iniciante Manhã', NULL, '2004-06-01', '2026-06-10'),
('Larissa Barbosa Moreira', '123.456.789-01', 'LARANJA', '(43) 99911-1234', 'larissa.moreira@email.com', 'Iniciante Noite', 'Avenida Maringá, 505, Londrina', '1996-10-14', '2026-04-05'),
('Marcos Vinícius Cunha', '234.567.890-12', 'PRETA', '(43) 98822-2345', 'marcos.cunha@email.com', 'Instrutores', 'Rua Pio XII, 606, Londrina', '1980-03-28', NULL),
('Natália Jesus Soares', '345.678.901-23', 'BORDÔ', '(43) 99933-3456', 'natalia.soares@email.com', 'Avançado Noite', NULL, '1993-11-05', '2026-01-25'),
('Otávio Carvalho Rezende', '456.789.012-34', 'AMARELA', '(43) 98844-4567', 'otavio.rezende@email.com', 'Iniciante Noite', 'Rua Quintino Bocaiúva, 707, Londrina', '2000-01-09', '2026-03-20'),
('Patrícia Teixeira Lopes', '567.890.123-45', 'BRANCA', '(43) 99955-5678', 'patricia.lopes@email.com', 'Iniciante Manhã', 'Avenida Santos Dumont, 808, Londrina', '2002-09-17', '2026-06-10');


administradoresUSE gerenciamento_kravmaga_mobile;

CREATE TABLE administradores (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(50) NOT NULL,
    senha VARCHAR(100) NOT NULL
);

INSERT INTO administradores (login, senha) VALUE ('admin', '123456')