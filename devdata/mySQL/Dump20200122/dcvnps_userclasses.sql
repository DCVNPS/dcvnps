CREATE DATABASE  IF NOT EXISTS `dcvnps` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dcvnps`;
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
-- Table structure for table `userclasses`
--

DROP TABLE IF EXISTS `userclasses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `userclasses` (
  `userClassId` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `classId` varchar(36) NOT NULL,
  `year` int(11) NOT NULL,
  `createdUserId` varchar(36) NOT NULL DEFAULT 'bebc3980-c987-11e9-b193-08002764505e',
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedUserId` varchar(36) NOT NULL DEFAULT 'bebc3980-c987-11e9-b193-08002764505e',
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userClassId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userclasses`
--

LOCK TABLES `userclasses` WRITE;
/*!40000 ALTER TABLE `userclasses` DISABLE KEYS */;
INSERT INTO `userclasses` (`userClassId`, `userId`, `classId`, `year`, `createdUserId`, `createdDate`, `updatedUserId`, `updatedDate`) VALUES ('ba9f53f6-30ff-11ea-a2a4-08002764505e','79f9a290-6f38-11e9-8849-848f69b86260','dc5b5cc4-2ef8-4fe6-82b0-aa760fe0d989',2020,'7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-06 22:42:29','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-06 22:42:29');
/*!40000 ALTER TABLE `userclasses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-22 22:14:45
