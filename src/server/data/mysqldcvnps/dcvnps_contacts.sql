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
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contacts` (
  `contactId` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(300) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `photoUrl` varchar(500) NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedUser` varchar(45) NOT NULL DEFAULT 'dcvnps',
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`contactId`),
  UNIQUE KEY `unix_name_address` (`name`,`address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES ('e7342ce5-6fa2-11e9-8849-848f69b86260','Jennifer Mendoza','91955 Mosinee Parkway, Indianapolis, IN 46278','(314) 291-6958','/profiles/jennifer-mendoza.jpg','2019-05-05 22:01:00','dcvnps','2019-05-05 22:01:00'),('e7352d3d-6fa2-11e9-8849-848f69b86260','Eric Ortiz','62 Warner Place, Washington, DC 20525','(902) 758-7304','/profiles/eric-ortiz.jpg','2019-05-05 22:01:00','dcvnps','2019-05-05 22:01:00'),('e7353031-6fa2-11e9-8849-848f69b86260','Phyllis Wu','88 Burning Wood Junction, Anaheim, CA 92812','(255) 146-6886','/profiles/phyllis-wu.jpg','2019-05-05 22:01:00','dcvnps','2019-05-05 22:01:00'),('e7353173-6fa2-11e9-8849-848f69b86260','Andrea Shaw','229 Golden Leaf Road, Gadsden, AL 35905','(417) 210-7652','/profiles/andrea-shaw.jpg','2019-05-05 22:01:00','dcvnps','2019-05-05 22:01:00'),('e7353253-6fa2-11e9-8849-848f69b86260','George Carter','6502 Montana Junction, New Orleans, LA 70174','(995) 113-1620','/profiles/george-carter.jpg','2019-05-05 22:01:00','dcvnps','2019-05-05 22:01:00'),('e7353320-6fa2-11e9-8849-848f69b86260','Anna Williams','58034 Nelson Street, Washington, DC 20036','(527) 653-2676','/profiles/anna-williams.jpg','2019-05-05 22:01:00','dcvnps','2019-05-05 22:01:00'),('e73533e9-6fa2-11e9-8849-848f69b86260','Alice Chavez','6 Granby Drive, Topeka, KS 66606','(432) 421-3267','/profiles/alice-chavez.jpg','2019-05-05 22:01:00','dcvnps','2019-05-05 22:01:00'),('e73534ad-6fa2-11e9-8849-848f69b86260','Willie Stiles','3409 Oriole Point, Peoria, IL 61629','(218) 696-2526','/profiles/willie-stiles.jpg','2019-05-05 22:01:00','dcvnps','2019-05-05 22:01:00'),('e735357f-6fa2-11e9-8849-848f69b86260','Sandra Kim','609 Everett Avenue, Des Moines, IA 50330','(650) 549-3249','/profiles/sandra-kim.jpg','2019-05-05 22:01:00','dcvnps','2019-05-05 22:01:00'),('e735363e-6fa2-11e9-8849-848f69b86260','Vihaan Patel','3061 Sachs Lane, Scottsdale, AZ 85255','(726) 698-7401','/profiles/vihaan-patel.jpg','2019-05-05 22:01:00','dcvnps','2019-05-05 22:01:00'),('e7353702-6fa2-11e9-8849-848f69b86260','Michelle Caster','710 Old Gate Circle, Chicago, IL 60641','(145) 449-3473','/profiles/michelle-caster.jpg','2019-05-05 22:01:00','dcvnps','2019-05-05 22:01:00'),('e73537bc-6fa2-11e9-8849-848f69b86260','Carl Murray','0864 Bluestem Center, Sacramento, CA 95823','(462) 542-2378','/profiles/carl-murray.jpg','2019-05-05 22:01:00','dcvnps','2019-05-05 22:01:00');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`dcvnps`@`%`*/ /*!50003 TRIGGER `dcvnps`.`bir_contacts` BEFORE INSERT ON `contacts` FOR EACH ROW
BEGIN
	IF NEW.contactId IS NULL THEN
		set NEW.contactId = UUID();
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

-- Dump completed on 2019-05-25 11:18:06
