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
-- Table structure for table `roleoperations`
--

DROP TABLE IF EXISTS `roleoperations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `roleoperations` (
  `roleOperationId` varchar(36) NOT NULL,
  `roleId` varchar(36) NOT NULL,
  `operationId` varchar(36) NOT NULL,
  `updateUserId` varchar(45) DEFAULT 'dcvnps',
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`roleOperationId`),
  UNIQUE KEY `uk_roleoperation` (`roleId`,`operationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roleoperations`
--
-- ORDER BY:  `roleOperationId`

LOCK TABLES `roleoperations` WRITE;
/*!40000 ALTER TABLE `roleoperations` DISABLE KEYS */;
INSERT INTO `roleoperations` (`roleOperationId`, `roleId`, `operationId`, `updateUserId`, `createdDate`, `updatedDate`) VALUES ('071a6775-40ad-11ea-8030-08002764505e','3c4d5ecf-40a7-11ea-8030-08002764505e','1cfed262-40a8-11ea-8030-08002764505e','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 21:30:48','2020-01-26 21:30:48'),('50f9f27c-40aa-11ea-8030-08002764505e','22278a31-40a7-11ea-8030-08002764505e','70830490-40a8-11ea-8030-08002764505e','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 21:11:23','2020-01-26 21:11:23'),('647fd140-40ab-11ea-8030-08002764505e','33122c2b-40a7-11ea-8030-08002764505e','718339f9-40a8-11ea-8030-08002764505e','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 21:19:05','2020-01-26 21:19:05'),('c7b92a64-40ac-11ea-8030-08002764505e','3c4d5ecf-40a7-11ea-8030-08002764505e','725208a7-40a8-11ea-8030-08002764505e','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 21:29:01','2020-01-26 21:29:01'),('c8933eb2-40ab-11ea-8030-08002764505e','2d9526eb-40a7-11ea-8030-08002764505e','725208a7-40a8-11ea-8030-08002764505e','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 21:21:53','2020-01-26 21:21:53'),('d3895ad0-40ac-11ea-8030-08002764505e','3c4d5ecf-40a7-11ea-8030-08002764505e','718339f9-40a8-11ea-8030-08002764505e','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 21:29:21','2020-01-26 21:29:21'),('f1a0a9a3-40ac-11ea-8030-08002764505e','3c4d5ecf-40a7-11ea-8030-08002764505e','70830490-40a8-11ea-8030-08002764505e','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 21:30:12','2020-01-26 21:30:12'),('fbffd44c-40aa-11ea-8030-08002764505e','2a237c8e-40a7-11ea-8030-08002764505e','1cfed262-40a8-11ea-8030-08002764505e','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 21:16:10','2020-01-26 21:16:10');
/*!40000 ALTER TABLE `roleoperations` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `bir_roleoperations` BEFORE INSERT ON `roleoperations` FOR EACH ROW BEGIN
	IF new.roleOperationId is null then
		set new.roleOperationId = uuid();
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

-- Dump completed on 2020-02-02  7:29:29
