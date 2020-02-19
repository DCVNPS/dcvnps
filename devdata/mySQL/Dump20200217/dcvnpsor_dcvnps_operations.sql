CREATE DATABASE  IF NOT EXISTS `dcvnpsor_dcvnps` /*!40100 DEFAULT CHARACTER SET utf8mb4 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dcvnpsor_dcvnps`;
-- MySQL dump 10.13  Distrib 8.0.16, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: dcvnpsor_dcvnps
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
-- Table structure for table `operations`
--

DROP TABLE IF EXISTS `operations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `operations` (
  `operationId` varchar(36) NOT NULL,
  `operationType` varchar(45) NOT NULL,
  `operationCode` varchar(30) NOT NULL,
  `operationDesc` varchar(200) NOT NULL,
  `updatedUserId` varchar(36) NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`operationId`),
  UNIQUE KEY `uk_operation_type_code` (`operationType`,`operationCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operations`
--

LOCK TABLES `operations` WRITE;
/*!40000 ALTER TABLE `operations` DISABLE KEYS */;
REPLACE INTO `operations` VALUES ('1cfed262-40a8-11ea-8030-08002764505e','upload','UPLDLVL3','Upload Photo to Level3 Gallery','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 20:55:37','2020-01-26 20:55:37'),('70830490-40a8-11ea-8030-08002764505e','upload','UPLDMBMR','Upload Photo to Member Gallery','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 20:57:57','2020-01-26 20:57:57'),('718339f9-40a8-11ea-8030-08002764505e','upload','UPLDLVL1','Upload Photo to Level3 Gallery','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 20:57:59','2020-01-26 20:57:59'),('725208a7-40a8-11ea-8030-08002764505e','upload','UPLDLVL2','Upload Photo to Level2 Gallery','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 20:58:00','2020-01-26 20:58:00'),('c69c3fce-40a9-11ea-8030-08002764505e','upload','UPLDALL','Upload Photo to All Gallery','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 21:07:31','2020-01-26 21:07:31');
/*!40000 ALTER TABLE `operations` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`dcvnpsor_dcvnps`@`localhost`*/ /*!50003 TRIGGER `bir_operations` BEFORE INSERT ON `operations` FOR EACH ROW BEGIN
	IF new.operationId is null then
		set new.operationId = uuid();
    END IF;
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

-- Dump completed on 2020-02-17 22:17:44
