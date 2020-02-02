-- MySQL dump 10.13  Distrib 8.0.16, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: dcvnps
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `userId` varchar(36) NOT NULL,
  `email` varchar(50) NOT NULL,
  `userSurname` varchar(50) NOT NULL,
  `userGivenName` varchar(50) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `roleCode` varchar(45) NOT NULL DEFAULT 'SITEUSR',
  `activeInd` varchar(1) NOT NULL DEFAULT 'N',
  `createdUserId` varchar(36) NOT NULL DEFAULT 'bebc3980-c987-11e9-b193-08002764505e',
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedUserId` varchar(36) NOT NULL DEFAULT 'bebc3980-c987-11e9-b193-08002764505e',
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userName_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Dcvnps users with role';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--
-- ORDER BY:  `userId`

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`userId`, `email`, `userSurname`, `userGivenName`, `password`, `roleCode`, `activeInd`, `createdUserId`, `createdDate`, `updatedUserId`, `updatedDate`) VALUES ('30f16bf0-c98e-11e9-aa81-08002764505e','nguyen.valery@gmail.com','nguyen','valery','$2b$10$ynxLLDE.ludnLcGLICCdNe7voeIuoAZeBIBG8M/r5ozDpO9.tN/22','LVL3ADM','Y','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-28 08:20:16','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-01 19:05:35'),('79f9a290-6f38-11e9-8849-848f69b86260','siteuser@dcvnps.org','vnps','user','$2b$10$rstPaW5n1yVD..JLBc0XQOLpfdlXpQZtbBwKF4mQJidsOcKTmGP2K','SITEUSR','Y','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-13 00:37:38','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-13 00:37:38'),('7cb5e812-6eb2-11e9-8849-848f69b86260','siteadmin@dcvnps.org','vnps','admin','$2b$10$j8LlvaXYcZECXpoarKZmi.JnAfEVOokmJqMguYPzJnra18cfZEnn.','SITEADM','Y','bebc3980-c987-11e9-b193-08002764505e','2019-08-13 00:37:38','bebc3980-c987-11e9-b193-08002764505e','2019-08-13 00:37:38'),('7cb5ecfe-6eb2-11e9-8849-848f69b86260','level3admin@dcvnps.org','vnps','level3','$2b$10$jUpZkByUuODJxR4bqA3XzuFiTnvKB7hOUyt8ztOfBpRs/fofVzEM2','LVL3ADM','Y','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-13 00:37:38','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-14 06:32:34'),('7cb5ee94-6eb2-11e9-8849-848f69b86260','level2admin@dcvnps.org','vnps','level2','$2b$10$r8p7qIu006E6Kgg7j24e1OHEFY49wSxMa8R3dJko/TZjy5mh/5Ws6','LVL2ADM','Y','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-13 00:37:38','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-14 06:34:46'),('7cb5eff6-6eb2-11e9-8849-848f69b86260','memberadmin@dcvnps.org','vnps','members','$2b$10$YbPZ5SFYT.UVgNJCi4ntDe2CNC7Vf3vlS1Iq8f5JTMc2J.0PX6ldy','MBMRADM','Y','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-13 00:37:38','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-13 00:37:38'),('f223b401-bb25-11e9-8110-08002764505e','level1admin@dcvnps.org','vnps1','level1','$2b$10$YGWLooayOSW0n3Gg8Fae2uRBy2Onp.JRjhmx2FKN.ayeId6j8/jZC','LVL1ADM','Y','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-13 00:37:38','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-09 07:54:52');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`dcvnps`@`%`*/ /*!50003 TRIGGER `bir_users` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
IF new.userId is null then
	set new.userId = uuid();
end if;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-02  7:29:29
