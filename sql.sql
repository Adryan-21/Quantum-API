-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               10.6.5-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Zrzut struktury bazy danych applications
CREATE DATABASE IF NOT EXISTS `applications` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;
USE `applications`;

-- Zrzut struktury tabela applications.applications
CREATE TABLE IF NOT EXISTS `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_discord` char(18) COLLATE utf8mb4_bin DEFAULT NULL,
  `discord` varchar(75) COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(75) COLLATE utf8mb4_bin DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `ans_one` varchar(5000) COLLATE utf8mb4_bin DEFAULT NULL,
  `ans_two` varchar(5000) COLLATE utf8mb4_bin DEFAULT NULL,
  `ans_three` varchar(5000) COLLATE utf8mb4_bin DEFAULT NULL,
  `reason` varchar(250) COLLATE utf8mb4_bin DEFAULT NULL,
  `checker` varchar(75) COLLATE utf8mb4_bin DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Eksport danych został odznaczony.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
