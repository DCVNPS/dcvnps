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
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL AUTO_INCREMENT,
  `roleCode` varchar(45) NOT NULL,
  `roleDescription` varchar(45) NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateUser` varchar(45) DEFAULT 'dcvnps',
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`roleId`),
  UNIQUE KEY `roleCode_UNIQUE` (`roleCode`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'MBMADM','Member Admin','2019-05-04 21:11:34','dcvnps','2019-05-04 21:11:34'),(2,'MBMUSR','Member User','2019-05-04 21:11:35','dcvnps','2019-05-04 21:11:35'),(3,'LVL3ADM','Level 3 Admin','2019-05-04 21:11:35','dcvnps','2019-05-04 21:11:35'),(4,'LVL3USR','Level 3 User','2019-05-04 21:11:35','dcvnps','2019-05-04 21:11:35'),(5,'LVL2ADM','Level 2 Admin','2019-05-04 21:11:35','dcvnps','2019-05-04 21:11:35'),(6,'LVL2USR','Level 2 User','2019-05-04 21:11:35','dcvnps','2019-05-04 21:11:35'),(7,'LVL1ADM','Level 1 Admin','2019-05-04 21:11:35','dcvnps','2019-05-04 21:11:35'),(8,'LVL1USR','Level 1 User','2019-05-04 21:11:35','dcvnps','2019-05-04 21:11:35'),(9,'SITUSR','Site User','2019-05-04 21:11:35','dcvnps','2019-05-04 21:11:35'),(10,'SITADM','Site Admin','2019-05-04 21:14:38','dcvnps','2019-05-04 21:14:38');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-25 11:18:06
