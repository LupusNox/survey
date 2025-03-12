-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versione server:              8.0.30 - MySQL Community Server - GPL
-- S.O. server:                  Win64
-- HeidiSQL Versione:            12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dump della struttura del database surveys
DROP DATABASE IF EXISTS `surveys`;
CREATE DATABASE IF NOT EXISTS `surveys` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `surveys`;

-- Dump della struttura di tabella surveys.answers
DROP TABLE IF EXISTS `answers`;
CREATE TABLE IF NOT EXISTS `answers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `answer_text` text NOT NULL,
  `question_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3erw1a3t0r78st8ty27x6v3g1` (`question_id`),
  CONSTRAINT `FK3erw1a3t0r78st8ty27x6v3g1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.answers: ~17 rows (circa)
DELETE FROM `answers`;
INSERT INTO `answers` (`id`, `created_at`, `updated_at`, `answer_text`, `question_id`) VALUES
	(1, '2025-03-07 08:53:46', '2025-03-07 08:53:46', 'Meno di 1 ora', 1),
	(2, '2025-03-07 08:53:46', '2025-03-07 08:53:46', '1-3 ore', 1),
	(3, '2025-03-07 08:53:46', '2025-03-07 08:53:46', 'Più di 3 ore', 1),
	(4, '2025-03-07 08:53:46', '2025-03-07 08:53:46', 'Facebook', 2),
	(5, '2025-03-07 08:53:46', '2025-03-07 08:53:46', 'Instagram', 2),
	(6, '2025-03-07 08:53:46', '2025-03-07 08:53:46', 'Twitter', 2),
	(7, '2025-03-07 08:53:46', '2025-03-07 08:53:46', 'Ottimo', 3),
	(8, '2025-03-07 08:53:46', '2025-03-07 08:53:46', 'Buono', 3),
	(9, '2025-03-07 08:53:46', '2025-03-07 08:53:46', 'Scarso', 3),
	(10, '2025-03-07 08:53:46', '2025-03-07 08:53:46', 'Sì', 4),
	(11, '2025-03-07 08:53:46', '2025-03-07 08:53:46', 'No', 4),
	(12, '2025-03-07 08:53:46', '2025-03-07 08:53:46', 'Mai', 5),
	(13, '2025-03-07 08:53:46', '2025-03-07 08:53:46', '1-2 volte', 5),
	(14, '2025-03-07 08:53:46', '2025-03-07 08:53:46', 'Più di 2 volte', 5),
	(15, '2025-03-07 08:53:46', '2025-03-07 08:53:46', 'Colazione', 6),
	(16, '2025-03-07 08:53:46', '2025-03-07 08:53:46', 'Pranzo', 6),
	(17, '2025-03-07 08:53:46', '2025-03-07 08:53:46', 'Cena', 6);

-- Dump della struttura di tabella surveys.questions
DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `question_text` text NOT NULL,
  `survey_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnf38uiy78c0g0tmo68btk3y0p` (`survey_id`),
  CONSTRAINT `FKnf38uiy78c0g0tmo68btk3y0p` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.questions: ~6 rows (circa)
DELETE FROM `questions`;
INSERT INTO `questions` (`id`, `created_at`, `updated_at`, `question_text`, `survey_id`) VALUES
	(1, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 'Quanto tempo trascorri sui social media al giorno?', 1),
	(2, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 'Qual è il tuo social preferito?', 1),
	(3, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 'Come valuti il servizio clienti della tua azienda?', 2),
	(4, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 'Il personale è stato disponibile?', 2),
	(5, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 'Quante volte mangi fuori a settimana?', 3),
	(6, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 'Qual è il tuo pasto preferito?', 3);

-- Dump della struttura di tabella surveys.surveys
DROP TABLE IF EXISTS `surveys`;
CREATE TABLE IF NOT EXISTS `surveys` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `description` text,
  `title` varchar(255) NOT NULL,
  `created_by` bigint NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `compenso` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK9smsu8m83blnmkyocfs2e272a` (`created_by`),
  CONSTRAINT `FK9smsu8m83blnmkyocfs2e272a` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.surveys: ~3 rows (circa)
DELETE FROM `surveys`;
INSERT INTO `surveys` (`id`, `created_at`, `updated_at`, `description`, `title`, `created_by`, `category`, `compenso`) VALUES
	(1, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 'Opinioni sui Social Media', 'Social Media Usage', 1, 'Tecnologia', 0),
	(2, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 'Soddisfazione del Servizio Clienti', 'Customer Service Satisfaction', 1, 'Servizi', 0),
	(3, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 'Abitudini Alimentari', 'Food Habits', 2, 'Cibo', 0);

-- Dump della struttura di tabella surveys.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.users: ~3 rows (circa)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `created_at`, `updated_at`, `email`, `password`, `role`) VALUES
	(1, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 'admin@mediafarm.com', 'admin123', 'ADMIN'),
	(2, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 'user1@mediafarm.com', 'password123', 'USER'),
	(3, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 'user2@mediafarm.com', 'password123', 'USER');

-- Dump della struttura di tabella surveys.user_answers
DROP TABLE IF EXISTS `user_answers`;
CREATE TABLE IF NOT EXISTS `user_answers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `answer_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `survey_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKq9ubv2ar56hkwxokdbp72b5by` (`answer_id`),
  KEY `FKk4u357ronsopa0vqf16deuxbt` (`user_id`),
  KEY `FKsqq09f3rv2hn2icxyaypa5whc` (`survey_id`),
  CONSTRAINT `FKk4u357ronsopa0vqf16deuxbt` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKq9ubv2ar56hkwxokdbp72b5by` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`id`),
  CONSTRAINT `FKsqq09f3rv2hn2icxyaypa5whc` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.user_answers: ~6 rows (circa)
DELETE FROM `user_answers`;
INSERT INTO `user_answers` (`id`, `created_at`, `updated_at`, `answer_id`, `user_id`, `survey_id`) VALUES
	(1, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 1, 2, 1),
	(2, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 4, 2, 1),
	(3, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 7, 2, 2),
	(4, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 2, 3, 1),
	(5, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 5, 3, 1),
	(6, '2025-03-07 09:53:46.000000', '2025-03-07 09:53:46.000000', 9, 3, 2);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
