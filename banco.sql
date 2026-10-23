CREATE DATABASE IF NOT EXISTS cadastro_clientes;

USE cadastro_clientes;

CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    data_nascimento DATE,
    data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo'
);
