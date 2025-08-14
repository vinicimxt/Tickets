create database tickets;
use tickets;



CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(255)
);

CREATE TABLE eventos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  local VARCHAR(255) NOT NULL,
  data DATETIME NOT NULL,
  imagem VARCHAR(255),
  organizador VARCHAR(255),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE eventos;



select * from eventos;

ALTER TABLE usuarios
ADD COLUMN tipo ENUM('user', 'admin') NOT NULL DEFAULT 'user';

ALTER TABLE usuarios ADD COLUMN tipo VARCHAR(20) DEFAULT 'comum';


select * from usuarios;  

drop database tickets;