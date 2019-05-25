-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: dcvnps
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userId` varchar(36) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `roleCode` varchar(45) NOT NULL DEFAULT 'user_vnps',
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateUser` varchar(50) NOT NULL DEFAULT 'dcvnps',
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Dcvnps users with role';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('79f9a290-6f38-11e9-8849-848f69b86260','siteuser','$2b$10$tOb2m1TneD.uLkpeiPDrseDhKcYAZCT3JyQgmnDhXR7wWctPCPq1.','SITUSR','2019-05-05 09:19:10','testUpdate','2019-05-05 09:19:10'),('7cb5e812-6eb2-11e9-8849-848f69b86260','admin','$2b$10$ddf4MXDrycsDmxLVLgK48.nHzA3gTpAQrv5B6JAK3FmEjZMBIwA/a','SITADM','2019-05-04 17:20:02','dcvnps','2019-05-04 17:20:02'),('7cb5ecfe-6eb2-11e9-8849-848f69b86260','level3admin','$2b$10$XgvMToqqQsKKbCxaVM7f4.nNwAYN1yJ5EjVsMquzlalvvSeEf0fYe','LVL3ADM','2019-05-04 17:20:02','dcvnps','2019-05-04 17:20:02'),('7cb5ee94-6eb2-11e9-8849-848f69b86260','vnpsuser','$2b$10$uIDfdE05N97fgbfSYn6iAu6DU4x8LM7r.vII9H8xzUBDbz4OA362G','SITUSR','2019-05-04 17:20:02','dcvnps','2019-05-04 17:20:02'),('7cb5eff6-6eb2-11e9-8849-848f69b86260','memberadmin','$2b$10$yKXcPMmAZuZ2fv8h18n1PukvEkl9klmdsB8RQk.zYAE4WLzH0R32q','MBMADM','2019-05-04 17:20:02','dcvnps','2019-05-04 17:20:02');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`dcvnps`@`%`*/ /*!50003 TRIGGER `dcvnps`.`bir_users` BEFORE INSERT ON `users` FOR EACH ROW
BEGIN
if new.userid is null then
	set new.userid = uuid();
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

-- Dump completed on 2019-05-25 11:18:06
