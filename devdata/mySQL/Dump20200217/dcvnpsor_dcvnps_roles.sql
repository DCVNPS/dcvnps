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
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `roles` (
  `roleId` varchar(36) NOT NULL,
  `roleCode` varchar(45) NOT NULL,
  `roleDescription` varchar(45) NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateUserId` varchar(45) DEFAULT 'dcvnps',
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`roleId`),
  UNIQUE KEY `roleCode_UNIQUE` (`roleCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
REPLACE INTO `roles` VALUES ('22278a31-40a7-11ea-8030-08002764505e','MBMRADM','Member Admin','2019-06-26 21:07:41','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 21:07:41'),('2a237c8e-40a7-11ea-8030-08002764505e','LVL3ADM','Level 3 Admin','2019-06-26 21:07:41','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 21:07:41'),('2d9526eb-40a7-11ea-8030-08002764505e','LVL2ADM','Level 2 Admin','2019-06-26 21:07:41','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 21:07:41'),('33122c2b-40a7-11ea-8030-08002764505e','LVL1ADM','Level 1 Admin','2019-06-26 21:07:41','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 21:07:41'),('3c4d5ca2-40a7-11ea-8030-08002764505e','SITEUSR','Site User','2019-06-26 21:07:41','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 21:07:41'),('3c4d5ecf-40a7-11ea-8030-08002764505e','SITEADM','Site Admin','2019-06-26 21:07:41','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 21:07:41');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`dcvnpsor_dcvnps`@`%`*/ /*!50003 TRIGGER `bir_roles` BEFORE INSERT ON `roles` FOR EACH ROW BEGIN
IF new.RoleId is null then
	set new.RoleId = uuid();
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

-- Dump completed on 2020-02-17 22:17:44
