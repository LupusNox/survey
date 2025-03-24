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
  `answer_text` varchar(255) NOT NULL,
  `question_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.answers: ~17 rows (circa)
DELETE FROM `answers`;
INSERT INTO `answers` (`id`, `answer_text`, `question_id`, `created_at`, `updated_at`) VALUES
	(1, 'Meno di 1 ora', 1, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(2, '1-3 ore', 1, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(3, 'Più di 3 ore', 1, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(4, 'Facebook', 2, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(5, 'Instagram', 2, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(6, 'Twitter', 2, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(7, 'Ottimo', 3, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(8, 'Buono', 3, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(9, 'Scarso', 3, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(10, 'Sì', 4, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(11, 'No', 4, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(12, 'Mai', 5, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(13, '1-2 volte', 5, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(14, 'Più di 2 volte', 5, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(15, 'Colazione', 6, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(16, 'Pranzo', 6, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(17, 'Cena', 6, '2025-03-24 08:57:44', '2025-03-24 08:57:44');

-- Dump della struttura di tabella surveys.chatbot_responses
DROP TABLE IF EXISTS `chatbot_responses`;
CREATE TABLE IF NOT EXISTS `chatbot_responses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_message` varchar(255) NOT NULL,
  `chatbot_response` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.chatbot_responses: ~3 rows (circa)
DELETE FROM `chatbot_responses`;
INSERT INTO `chatbot_responses` (`id`, `user_message`, `chatbot_response`, `created_at`) VALUES
	(1, 'ciao', 'Ciao! Come posso aiutarti?', '2025-03-24 08:57:44'),
	(2, 'come stai', 'Sto bene, grazie! E tu?', '2025-03-24 08:57:44'),
	(3, 'a cosa serve questo sito', 'Questo sito ti permette di partecipare a sondaggi e guadagnare premi.', '2025-03-24 08:57:44'),
	(4, 'chi sei', 'Sono un assistente virtuale che può aiutarti con i sondaggi.', '2025-03-24 08:57:44'),
	(5, 'come partecipare ai sondaggi', 'Puoi registrarti nel nostro sito e iniziare a partecipare ai sondaggi.', '2025-03-24 08:57:44'),
	(6, 'come posso guadagnare', 'Puoi guadagnare rispondendo ai sondaggi e accumulando punti.', '2025-03-24 08:57:44'),
	(7, 'come funziona questo sito', 'Questo sito ti consente di rispondere a sondaggi personalizzati e guadagnare premi.', '2025-03-24 08:57:44'),
	(8, 'come posso iscrivermi', 'Puoi registrarti direttamente sulla nostra pagina di registrazione.', '2025-03-24 08:57:44'),
	(9, 'quanto tempo ci vuole per completare un sondaggio', 'Ogni sondaggio richiede circa 5-10 minuti per essere completato.', '2025-03-24 08:57:44'),
	(10, 'quanto guadagno per ogni sondaggio', 'Il guadagno dipende dal sondaggio, ma di solito ricevi tra 1 e 5 euro per sondaggio.', '2025-03-24 08:57:44'),
	(11, 'come posso ritirare i miei premi', 'Puoi ritirare i tuoi premi una volta accumulati abbastanza punti. Visita il tuo profilo per maggiori dettagli.', '2025-03-24 08:57:44'),
	(12, 'quando arrivano i premi', 'I premi vengono inviati dopo aver completato un certo numero di sondaggi.', '2025-03-24 08:57:44'),
	(13, 'quali sono i premi disponibili', 'I premi includono buoni regalo, denaro, carte prepagate e altri regali.', '2025-03-24 08:57:44'),
	(14, 'quanto tempo posso impiegare per rispondere ai sondaggi', 'Ogni sondaggio ha un limite di tempo specifico, generalmente tra 5 e 15 minuti.', '2025-03-24 08:57:44'),
	(15, 'quanti sondaggi posso fare al giorno', 'Puoi partecipare a tutti i sondaggi disponibili ogni giorno, a seconda delle tue preferenze.', '2025-03-24 08:57:44'),
	(16, 'quali categorie di sondaggi ci sono', 'Le categorie includono tecnologia, salute, alimentazione, moda, e altro ancora.', '2025-03-24 08:57:44'),
	(17, 'ho dimenticato la password', 'Clicca su \'Password dimenticata\' nella pagina di login per ripristinarla.', '2025-03-24 08:57:44'),
	(18, 'come posso contattare il supporto', 'Puoi contattarci via email all\'indirizzo support@mediafarm.com o usare il modulo di contatto nel sito.', '2025-03-24 08:57:44'),
	(19, 'dove posso vedere i miei guadagni', 'I tuoi guadagni sono visibili nel tuo dashboard personale.', '2025-03-24 08:57:44'),
	(20, 'come posso modificare il mio profilo', 'Accedi alla tua area personale e clicca su \'Modifica Profilo\' per aggiornare le tue informazioni.', '2025-03-24 08:57:44'),
	(21, 'come faccio a loggarmi', 'Puoi fare login cliccando su \'Login\' nel menu principale e inserendo la tua email e password.', '2025-03-24 08:57:44'),
	(22, 'come faccio a registrarmi', 'Puoi registrarti cliccando su \'Registrati\' nel menu principale e seguendo le istruzioni.', '2025-03-24 08:57:44'),
	(23, 'come posso ottenere punti', 'Puoi ottenere punti completando i sondaggi disponibili.', '2025-03-24 08:57:44'),
	(24, 'quanti punti servono per un premio', 'Dipende dal tipo di premio. Di solito sono necessari almeno 1000 punti.', '2025-03-24 08:57:44'),
	(25, 'come funzionano i punti', 'Ogni sondaggio ti assegna un certo numero di punti che possono essere convertiti in premi.', '2025-03-24 08:57:44'),
	(26, 'quando vengono pubblicati nuovi sondaggi', 'Nuovi sondaggi vengono aggiunti quotidianamente, quindi torna a trovarci ogni giorno.', '2025-03-24 08:57:44'),
	(27, 'che tipo di domande vengono fatte nei sondaggi', 'I sondaggi possono riguardare opinioni su prodotti, servizi, abitudini quotidiane e molto altro.', '2025-03-24 08:57:44'),
	(28, 'posso fare più di un sondaggio al giorno', 'Sì, puoi fare tutti i sondaggi disponibili nel giorno.', '2025-03-24 08:57:44'),
	(29, 'cosa succede se non completo un sondaggio', 'Se non completi un sondaggio, non ricevi i punti per quel sondaggio.', '2025-03-24 08:57:44');

-- Dump della struttura di tabella surveys.questions
DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `question_text` text NOT NULL,
  `survey_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `survey_id` (`survey_id`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.questions: ~6 rows (circa)
DELETE FROM `questions`;
INSERT INTO `questions` (`id`, `question_text`, `survey_id`, `created_at`, `updated_at`) VALUES
	(1, 'Quanto tempo trascorri sui social media al giorno?', 1, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(2, 'Qual è il tuo social preferito?', 1, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(3, 'Come valuti il servizio clienti della tua azienda?', 2, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(4, 'Il personale è stato disponibile?', 2, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(5, 'Quante volte mangi fuori a settimana?', 3, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(6, 'Qual è il tuo pasto preferito?', 3, '2025-03-24 08:57:44', '2025-03-24 08:57:44');

-- Dump della struttura di tabella surveys.surveys
DROP TABLE IF EXISTS `surveys`;
CREATE TABLE IF NOT EXISTS `surveys` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_by` bigint NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `compenso` double NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `surveys_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.surveys: ~3 rows (circa)
DELETE FROM `surveys`;
INSERT INTO `surveys` (`id`, `title`, `description`, `created_by`, `category`, `compenso`, `created_at`, `updated_at`) VALUES
	(1, 'Social Media Usage', 'Opinioni sui Social Media', 1, 'Tecnologia', 5, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(2, 'Customer Service Satisfaction', 'Soddisfazione del Servizio Clienti', 1, 'Servizi', 10, '2025-03-24 08:57:44', '2025-03-24 08:57:44'),
	(3, 'Food Habits', 'Abitudini Alimentari', 2, 'Cibo', 8, '2025-03-24 08:57:44', '2025-03-24 08:57:44');

-- Dump della struttura di tabella surveys.survey_voted_users
DROP TABLE IF EXISTS `survey_voted_users`;
CREATE TABLE IF NOT EXISTS `survey_voted_users` (
  `survey_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`survey_id`,`user_id`),
  KEY `FKd0r6nck3fhuk5w90qs6lrupym` (`user_id`),
  CONSTRAINT `FKaxsj9r3rf7bnela7ti7emlcp9` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`),
  CONSTRAINT `FKd0r6nck3fhuk5w90qs6lrupym` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.survey_voted_users: ~0 rows (circa)
DELETE FROM `survey_voted_users`;

-- Dump della struttura di tabella surveys.survey_votes
DROP TABLE IF EXISTS `survey_votes`;
CREATE TABLE IF NOT EXISTS `survey_votes` (
  `survey_id` bigint NOT NULL,
  `vote_count` int DEFAULT NULL,
  `option_name` varchar(255) NOT NULL,
  PRIMARY KEY (`survey_id`,`option_name`),
  CONSTRAINT `FK86pvedhdi47va20uytn9bbvsl` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.survey_votes: ~0 rows (circa)
DELETE FROM `survey_votes`;

-- Dump della struttura di tabella surveys.unique_visitors
DROP TABLE IF EXISTS `unique_visitors`;
CREATE TABLE IF NOT EXISTS `unique_visitors` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `survey_id` bigint NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `visit_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `survey_id` (`survey_id`),
  CONSTRAINT `unique_visitors_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.unique_visitors: ~4 rows (circa)
DELETE FROM `unique_visitors`;
INSERT INTO `unique_visitors` (`id`, `survey_id`, `user_email`, `visit_date`) VALUES
	(1, 1, 'guest1@example.com', '2025-03-24 08:57:44'),
	(2, 1, 'user1@mediafarm.com', '2025-03-24 08:57:44'),
	(3, 2, 'guest2@example.com', '2025-03-24 08:57:44'),
	(4, 3, 'user2@mediafarm.com', '2025-03-24 08:57:44');

-- Dump della struttura di tabella surveys.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `earnings` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.users: ~3 rows (circa)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `email`, `password`, `role`, `created_at`, `updated_at`, `earnings`) VALUES
	(1, 'admin@mediafarm.com', 'admin123', 'ADMIN', '2025-03-24 08:57:44', '2025-03-24 08:57:44', 0),
	(2, 'user1@mediafarm.com', 'password123', 'USER', '2025-03-24 08:57:44', '2025-03-24 08:57:44', 0),
	(3, 'user2@mediafarm.com', 'password123', 'USER', '2025-03-24 08:57:44', '2025-03-24 08:57:44', 0);

-- Dump della struttura di tabella surveys.user_answers
DROP TABLE IF EXISTS `user_answers`;
CREATE TABLE IF NOT EXISTS `user_answers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `answer_id` bigint NOT NULL,
  `survey_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `answer_id` (`answer_id`),
  KEY `survey_id` (`survey_id`),
  CONSTRAINT `user_answers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_answers_ibfk_2` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_answers_ibfk_3` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.user_answers: ~6 rows (circa)
DELETE FROM `user_answers`;
INSERT INTO `user_answers` (`id`, `user_id`, `answer_id`, `survey_id`, `created_at`, `updated_at`) VALUES
	(1, 2, 1, 1, '2025-03-24 08:57:44', NULL),
	(2, 2, 4, 1, '2025-03-24 08:57:44', NULL),
	(3, 2, 7, 2, '2025-03-24 08:57:44', NULL),
	(4, 3, 2, 1, '2025-03-24 08:57:44', NULL),
	(5, 3, 5, 1, '2025-03-24 08:57:44', NULL),
	(6, 3, 9, 2, '2025-03-24 08:57:44', NULL);

-- Dump della struttura di tabella surveys.user_voted_surveys
DROP TABLE IF EXISTS `user_voted_surveys`;
CREATE TABLE IF NOT EXISTS `user_voted_surveys` (
  `user_id` bigint NOT NULL,
  `survey_id` bigint DEFAULT NULL,
  KEY `FK4ldph4uxl38kw9wmktgj9b9r9` (`user_id`),
  CONSTRAINT `FK4ldph4uxl38kw9wmktgj9b9r9` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.user_voted_surveys: ~0 rows (circa)
DELETE FROM `user_voted_surveys`;

-- Dump della struttura di tabella surveys.visitors
DROP TABLE IF EXISTS `visitors`;
CREATE TABLE IF NOT EXISTS `visitors` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(255) NOT NULL,
  `visit_date` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKak56j2nb58evw5vd4rql8veut` (`ip_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.visitors: ~0 rows (circa)
DELETE FROM `visitors`;

-- Dump della struttura di tabella surveys.votes
DROP TABLE IF EXISTS `votes`;
CREATE TABLE IF NOT EXISTS `votes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `survey_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `selected_option` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_id` (`survey_id`),
  CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump dei dati della tabella surveys.votes: ~6 rows (circa)
DELETE FROM `votes`;
INSERT INTO `votes` (`id`, `survey_id`, `created_at`, `selected_option`, `user_email`) VALUES
	(1, 1, '2025-03-24 08:57:44', '', ''),
	(2, 1, '2025-03-24 08:57:44', '', ''),
	(3, 2, '2025-03-24 08:57:44', '', ''),
	(4, 3, '2025-03-24 08:57:44', '', ''),
	(5, 3, '2025-03-24 08:57:44', '', ''),
	(6, 3, '2025-03-24 08:57:44', '', '');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
