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
-- Table structure for table `galleries`
--

DROP TABLE IF EXISTS `galleries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `galleries` (
  `galleryId` varchar(36) NOT NULL,
  `gallery` varchar(100) NOT NULL,
  `profilePhoto` varchar(100) DEFAULT NULL,
  `activeInd` varchar(1) NOT NULL DEFAULT 'Y',
  `updatedUserId` varchar(45) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`galleryId`),
  UNIQUE KEY `gallery_UNIQUE` (`gallery`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galleries`
--
-- ORDER BY:  `galleryId`

LOCK TABLES `galleries` WRITE;
/*!40000 ALTER TABLE `galleries` DISABLE KEYS */;
INSERT INTO `galleries` (`galleryId`, `gallery`, `profilePhoto`, `activeInd`, `updatedUserId`, `createdDate`, `updatedDate`) VALUES ('cc9bc0f3-47a0-45e4-b220-2f6c777f99eb','green team','quynhmai.vu_level103.jpg','Y','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 19:33:59','2020-01-26 19:33:59'),('d63a6b38-6dfe-11e9-8849-848f69b86260','home',NULL,'Y','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 21:07:41','2019-06-26 21:07:41'),('e8104b61-6dfe-11e9-8849-848f69b86260','members','member-2018.jpg','Y','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 21:07:41','2019-06-26 21:07:41'),('eac81e4c-6dfe-11e9-8849-848f69b86260','level3','level3-2018.jpg','Y','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 21:07:41','2019-06-26 21:07:41'),('ecdee564-6dfe-11e9-8849-848f69b86260','level2','level2-2018.jpg','Y','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 21:07:41','2019-06-26 21:07:41'),('eedc7f28-6dfe-11e9-8849-848f69b86260','level1','level1-2018.jpg','Y','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 21:07:41','2019-06-26 21:07:41'),('f10448dd-6dfe-11e9-8849-848f69b86260','aboutus',NULL,'Y','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 21:07:41','2019-06-26 21:07:41');
/*!40000 ALTER TABLE `galleries` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`dcvnps`@`%`*/ /*!50003 TRIGGER `bir_galleries` BEFORE INSERT ON `galleries` FOR EACH ROW BEGIN
IF new.galleryId is null then
	set new.galleryId = uuid();
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
