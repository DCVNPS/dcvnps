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
-- Table structure for table `orderItems`
--

DROP TABLE IF EXISTS `orderItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `orderItems` (
  `orderItemId` varchar(36) NOT NULL,
  `orderId` varchar(36) NOT NULL,
  `amount` decimal(10,0) NOT NULL DEFAULT '0',
  `currencyCode` varchar(5) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `merchantId` varchar(36) NOT NULL,
  `merchantEmailAddress` varchar(300) NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedUserId` varchar(45) NOT NULL DEFAULT 'dcvnps',
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderItemId`),
  KEY `fk_oder_id_idx` (`orderId`),
  CONSTRAINT `fk_oder_id` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderItems`
--

LOCK TABLES `orderItems` WRITE;
/*!40000 ALTER TABLE `orderItems` DISABLE KEYS */;
INSERT INTO `orderItems` (`orderItemId`, `orderId`, `amount`, `currencyCode`, `description`, `merchantId`, `merchantEmailAddress`, `createdDate`, `updatedUserId`, `updatedDate`) VALUES ('07227aa6-1924-440a-bfcf-66099b1b3c49','1PN60140F69139730',53,'USD','DCVNPS support donation','AVBL6HQHZKEKY','hvn.business@example.com','2019-12-07 23:32:33','79f9a290-6f38-11e9-8849-848f69b86260','2019-12-07 23:32:47'),('142abd1b-366e-409b-b309-af06747952e8','9T5083183D496125S',53,'USD','Class Enrollment Fee','AVBL6HQHZKEKY','hvn.business@example.com','2019-12-08 00:02:57','79f9a290-6f38-11e9-8849-848f69b86260','2019-12-08 00:03:21'),('634c7b17-86df-443b-b870-af4b80a69611','2R843512XM0543423',53,'USD','DCVNPS support donation','AVBL6HQHZKEKY','hvn.business@example.com','2019-12-08 12:36:21','79f9a290-6f38-11e9-8849-848f69b86260','2019-12-08 12:37:02'),('d3814130-6b5d-4430-8c70-459608f2e8d5','5LF91873LV075533U',53,'USD','DCVNPS support donation','AVBL6HQHZKEKY','hvn.business@example.com','2019-12-04 07:59:43','79f9a290-6f38-11e9-8849-848f69b86260','2019-12-04 07:59:56');
/*!40000 ALTER TABLE `orderItems` ENABLE KEYS */;
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
