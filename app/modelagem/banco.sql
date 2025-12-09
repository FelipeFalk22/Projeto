-- -----------------------------------------------------
-- Banco de Dados: chamados_de_suporte
-- -----------------------------------------------------

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP DATABASE IF EXISTS `chamados_de_suporte`;
CREATE DATABASE `chamados_de_suporte` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `chamados_de_suporte`;

-- -----------------------------------------------------
-- Tabela: usuario
-- -----------------------------------------------------

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `email` VARCHAR(80) NOT NULL UNIQUE,
  `senha` VARCHAR(64) NOT NULL,
  `tipo` VARCHAR(20) NOT NULL DEFAULT 'user',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: categoria
-- -----------------------------------------------------

DROP TABLE IF EXISTS `categoria`;

CREATE TABLE `categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: chamado
-- -----------------------------------------------------

DROP TABLE IF EXISTS `chamado`;

CREATE TABLE `chamado` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_categoria` INT NOT NULL,
  `protocolo` VARCHAR(100) NOT NULL UNIQUE,
  `descricao` TEXT NULL,
  `status` VARCHAR(50) DEFAULT 'aberto',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_chamado_categoria_idx` (`id_categoria`),
  CONSTRAINT `fk_chamado_categoria`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `categoria` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Dados iniciais
-- -----------------------------------------------------

START TRANSACTION;

-- senha: "teste123" -> hash bcrypt simples para testes
INSERT INTO `usuario` (`nome`, `email`, `senha`, `tipo`)
VALUES ('Felipe', 'felipe123@gmail.com', '$2b$10$CjE5z1I0dxYx7xM/0xWcUuT6FpiY09DjxRQy/6iWj1k4G4HhPzqvG', 'admin');

INSERT INTO `categoria` (`nome`, `descricao`)
VALUES ('Hardware', 'Problemas relacionados a equipamentos físicos');

INSERT INTO `chamado` (`id_categoria`, `protocolo`, `descricao`, `status`)
VALUES
  (1, 'CHAM-001', 'Computador não liga', 'aberto'),
  (1, 'CHAM-002', 'Teclado com defeito', 'em andamento');

COMMIT;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
