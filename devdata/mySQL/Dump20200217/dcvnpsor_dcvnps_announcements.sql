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
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `announcements` (
  `announcementId` varchar(36) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` mediumtext NOT NULL,
  `postedUserId` varchar(36) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedUserId` varchar(36) NOT NULL,
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`announcementId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
REPLACE INTO `announcements` VALUES ('197e31c9-0c4e-11ea-b30f-08002764505e','Level 3 2017 Gradudation','<p><span style=\"font-size: 12pt; font-family: georgia, palatino, serif;\">Introduction to Digital Single Lens Reflex (DSLR ) cameras</span></p>\n<p><span style=\"font-size: 12pt; font-family: georgia, palatino, serif;\">Triangle Exposure:</span></p>\n<ul>\n<li><span style=\"font-size: 12pt; font-family: georgia, palatino, serif;\">Aperture</span></li>\n<li><span style=\"font-size: 12pt; font-family: georgia, palatino, serif;\">Shutter</span></li>\n<li><span style=\"font-size: 12pt; font-family: georgia, palatino, serif;\">ISO</span></li>\n</ul>\n<p><span style=\"font-size: 12pt; font-family: georgia, palatino, serif;\">File/Image management under Windows Operating System</span></p>\n<p><span style=\"font-size: 12pt; font-family: georgia, palatino, serif;\">Introduction to photography composition:</span></p>\n<ul>\n<li><span style=\"font-size: 12pt; font-family: georgia, palatino, serif;\">Line, Shape, Form, and Texture</span></li>\n<li><span style=\"font-size: 12pt; font-family: georgia, palatino, serif;\">Light and Color</span></li>\n</ul>\n<p><span style=\"font-size: 12pt; font-family: georgia, palatino, serif;\">Montion in Photography</span></p>\n<p><span style=\"font-size: 12pt; font-family: georgia, palatino, serif;\">Introduction to RAW image and modern digital darkroom.</span></p>\n<p><span style=\"font-size: 12pt; font-family: georgia, palatino, serif;\">Introduction to image editing using Photoshop</span></p>\n<p><span style=\"color: #f1c40f; font-size: 14pt;\"><strong><a style=\"color: #f1c40f;\" title=\"TESTING TESTING\" href=\"https://photos.google.com/share/AF1QipNag270dhQckdbs6GY5I5vEClfaK1zxGPhK23DA0hhZhMx7qEbe4dTY5NaWHchDdg?key=S2VSRk4ySU9DRHJuNzNsVFBwS0VwSjdZQVhlOGR3\" target=\"_blank\" rel=\"noopener\">Level3 Graduation Photo Essay Day2</a></strong></span></p>','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-11-21 06:00:16','79f9a290-6f38-11e9-8849-848f69b86260','2019-12-27 12:49:37'),('9ae132bd-ba4f-11e9-9511-08002764505e','Vnps Camping at First Landing.','<p>asdf asdfsafafasd ds asdf as.</p>\n<p>Normalization date</p>\n<p><iframe src=\"//www.youtube.com/embed/3FEs2IFnkEw\" width=\"560\" height=\"314\" allowfullscreen=\"allowfullscreen\"></iframe></p>\n<p>&nbsp;</p>','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-08 22:44:27','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-09-01 14:11:20'),('b9e258dd-c186-11e9-8cf1-08002764505e','Special Interview- Master Do Linh Dung','<p>asdf asdfasdf asdfs</p>\n<p><iframe src=\"//www.youtube.com/embed/okceADa846I\" width=\"560\" height=\"314\" allowfullscreen=\"allowfullscreen\"></iframe></p>','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-18 03:06:40','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-09-01 14:02:54'),('c09783f8-5dc9-4cfb-a5cc-3e515813dcc6','VNPS 2020 Summer Camping','<p>VNPS group Annual Camping at First Landing State Park.&nbsp;</p>\n<p>Please clikc <a href=\"campingregistration\">here</a> to register. as sdsadsadsada</p>','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-12-28 16:06:23','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-02-13 07:05:23');
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`dcvnpsor_dcvnps`@`%`*/ /*!50003 TRIGGER `bir_announcements` BEFORE INSERT ON `announcements` FOR EACH ROW BEGIN
IF new.announcementId is null then
	set new.announcementId = uuid();
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

-- Dump completed on 2020-02-17 22:17:45
