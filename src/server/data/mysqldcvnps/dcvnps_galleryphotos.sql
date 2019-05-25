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
-- Table structure for table `galleryphotos`
--

DROP TABLE IF EXISTS `galleryphotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `galleryphotos` (
  `galleryPhotoId` varchar(36) NOT NULL,
  `galleryId` varchar(36) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `portrait` int(11) NOT NULL DEFAULT '0',
  `author` varchar(100) DEFAULT 'dcvnps',
  `year` varchar(4) NOT NULL,
  `updateUser` varchar(45) NOT NULL DEFAULT 'dcvnps',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`galleryPhotoId`),
  KEY `idx_gallery_id` (`galleryId`),
  KEY `idx_author` (`author`),
  CONSTRAINT `fk_gallery_id` FOREIGN KEY (`galleryId`) REFERENCES `galleries` (`galleryId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galleryphotos`
--

LOCK TABLES `galleryphotos` WRITE;
/*!40000 ALTER TABLE `galleryphotos` DISABLE KEYS */;
INSERT INTO `galleryphotos` VALUES ('7cb637ab-6eb2-11e9-8849-848f69b86260','d63a6b38-6dfe-11e9-8849-848f69b86260','binh.le_members_002.jpg',0,'dcvnps','2017','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6aeaf-6eb2-11e9-8849-848f69b86260','d63a6b38-6dfe-11e9-8849-848f69b86260','binh.le_members_002.jpg',0,'dcvnps','2017','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6b19a-6eb2-11e9-8849-848f69b86260','d63a6b38-6dfe-11e9-8849-848f69b86260','camquyen.thai_members_01.jpg',0,'dcvnps','2017','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6b39b-6eb2-11e9-8849-848f69b86260','d63a6b38-6dfe-11e9-8849-848f69b86260','img02.jpg',0,'dcvnps','2017','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6b63b-6eb2-11e9-8849-848f69b86260','d63a6b38-6dfe-11e9-8849-848f69b86260','binh.le_members_003.jpg',0,'dcvnps','2017','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6b88b-6eb2-11e9-8849-848f69b86260','d63a6b38-6dfe-11e9-8849-848f69b86260','A7-00065_HDR.jpg',1,'dcvnps','2018','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6bb3e-6eb2-11e9-8849-848f69b86260','d63a6b38-6dfe-11e9-8849-848f69b86260','A7-01501_HDR.jpg',0,'dcvnps','2018','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6bd7b-6eb2-11e9-8849-848f69b86260','d63a6b38-6dfe-11e9-8849-848f69b86260','image001.jpg',0,'dcvnps','2019','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6c099-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image001.jpg',0,'dcvnps','2019','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6c334-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image001.jpg',0,'dcvnps','2019','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6c5aa-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image002.jpg',0,'dcvnps','2019','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6c7c2-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image003.jpg',0,'dcvnps','2019','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6c912-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image004.jpg',0,'dcvnps','2019','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6ca67-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image005.jpg',0,'dcvnps','2019','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6cd27-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image006.jpg',1,'dcvnps','2019','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6ceb4-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image007.jpg',0,'dcvnps','2019','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6d0c8-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image008.jpg',0,'dcvnps','2019','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6d21c-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image009.jpg',0,'dcvnps','2019','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6d363-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image010.jpg',1,'dcvnps','2019','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6d49b-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image011.jpg',0,'dcvnps','2019','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6d5d4-6eb2-11e9-8849-848f69b86260','e8104b61-6dfe-11e9-8849-848f69b86260','A7-03678.jpg',0,'dcvnps','2018','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6d711-6eb2-11e9-8849-848f69b86260','e8104b61-6dfe-11e9-8849-848f69b86260','camquyen.thai_members_01.jpg',0,'dcvnps','2018','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6d853-6eb2-11e9-8849-848f69b86260','e8104b61-6dfe-11e9-8849-848f69b86260','camquyen.thai_members_02.jpg',0,'dcvnps','2018','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6d990-6eb2-11e9-8849-848f69b86260','e8104b61-6dfe-11e9-8849-848f69b86260','camquyen.thai_members_03.jpg',0,'dcvnps','2018','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6dad7-6eb2-11e9-8849-848f69b86260','e8104b61-6dfe-11e9-8849-848f69b86260','christine.tran_memebers_01.jpg',0,'dcvnps','2018','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6dc1d-6eb2-11e9-8849-848f69b86260','e8104b61-6dfe-11e9-8849-848f69b86260','christine.tran_memebers_02.jpg',0,'dcvnps','2018','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6ddfe-6eb2-11e9-8849-848f69b86260','e8104b61-6dfe-11e9-8849-848f69b86260','christine.tran_memebers_03.jpg',0,'dcvnps','2018','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6e13c-6eb2-11e9-8849-848f69b86260','e8104b61-6dfe-11e9-8849-848f69b86260','A7-01501_HDR.jpg',0,'dcvnps','2017','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02'),('7cb6e37a-6eb2-11e9-8849-848f69b86260','e8104b61-6dfe-11e9-8849-848f69b86260','diep.phan_members_03.jpg',0,'dcvnps','2017','dcvnps','2019-05-04 17:20:02','2019-05-04 17:20:02');
/*!40000 ALTER TABLE `galleryphotos` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`dcvnps`@`%`*/ /*!50003 TRIGGER `dcvnps`.`bir_galleryPhotos` BEFORE INSERT ON `galleryphotos` FOR EACH ROW
BEGIN
IF new.galleryPhotoId is null then
	set new.galleryPhotoId = uuid();
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
