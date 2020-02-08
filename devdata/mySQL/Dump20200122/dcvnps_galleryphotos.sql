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
-- Table structure for table `galleryphotos`
--

DROP TABLE IF EXISTS `galleryphotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `galleryphotos` (
  `galleryPhotoId` varchar(36) NOT NULL,
  `galleryId` varchar(36) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `portrait` int(11) NOT NULL DEFAULT '0',
  `author` varchar(100) NOT NULL DEFAULT 'dcvnps',
  `year` varchar(4) NOT NULL,
  `updatedUserId` varchar(45) NOT NULL DEFAULT 'dcvnps',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`galleryPhotoId`),
  KEY `idx_gallery_id` (`galleryId`),
  KEY `idx_author` (`author`),
  KEY `uidx_galleryId_photo_author` (`galleryId`,`photo`,`author`,`year`),
  CONSTRAINT `fk_gallery_id` FOREIGN KEY (`galleryId`) REFERENCES `galleries` (`galleryId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galleryphotos`
--
-- ORDER BY:  `galleryPhotoId`

LOCK TABLES `galleryphotos` WRITE;
/*!40000 ALTER TABLE `galleryphotos` DISABLE KEYS */;
INSERT INTO `galleryphotos` (`galleryPhotoId`, `galleryId`, `photo`, `portrait`, `author`, `year`, `updatedUserId`, `createdDate`, `updatedDate`) VALUES ('18c588c2-616b-4e11-bcca-66f6751c6a78','eedc7f28-6dfe-11e9-8849-848f69b86260','level102.jpg',0,'quynhmai.vu','2018','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-20 15:19:54','2020-01-20 15:19:54'),('1a2a2c6d-679f-4842-a7f3-1aa7f2606497','ecdee564-6dfe-11e9-8849-848f69b86260','level101.jpg',0,'quynhmai.vu','2020','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-22 17:44:34','2020-01-22 17:44:34'),('1ca49e72-c1d4-11e9-9b83-08002764505e','eac81e4c-6dfe-11e9-8849-848f69b86260','level303.jpg',0,'binh.le','2016','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-18 12:20:37','2019-08-18 12:20:37'),('1cabaad1-c1d4-11e9-9b83-08002764505e','eac81e4c-6dfe-11e9-8849-848f69b86260','level301.jpg',0,'binh.le','2016','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-18 12:20:37','2019-08-18 12:20:37'),('1cabf153-c1d4-11e9-9b83-08002764505e','eac81e4c-6dfe-11e9-8849-848f69b86260','level302.jpg',0,'binh.le','2016','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-18 12:20:37','2019-08-18 12:20:37'),('263ec8ae-e409-4f1b-8d8a-825577313675','ecdee564-6dfe-11e9-8849-848f69b86260','level103.jpg',0,'quynhmai.vu','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-22 17:46:05','2020-01-22 17:46:05'),('296992d5-95ef-4fb7-b572-f3e9db38d044','eac81e4c-6dfe-11e9-8849-848f69b86260','A77-00069.jpg',1,'henry.nguyen','2014','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-12-15 13:08:53','2019-12-15 13:08:53'),('29773047-4388-4ccb-bc3a-49e3501a3d94','ecdee564-6dfe-11e9-8849-848f69b86260','level103.jpg',0,'quynhmai.vu','2020','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-22 17:31:19','2020-01-22 17:31:19'),('32c57460-c1d3-11e9-9b83-08002764505e','e8104b61-6dfe-11e9-8849-848f69b86260','members_003.jpg',0,'binh.le','2017','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-18 12:14:05','2019-08-18 12:14:05'),('3cdbc420-b993-11e9-be05-08002764505e','e8104b61-6dfe-11e9-8849-848f69b86260','members_001.jpg',0,'binh.le','2017','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-08 00:16:06','2019-08-08 00:16:06'),('44602ca7-c1d4-11e9-9b83-08002764505e','ecdee564-6dfe-11e9-8849-848f69b86260','level201.jpg',0,'robert.pham','2017','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-18 12:21:44','2019-08-18 12:21:44'),('446033a3-c1d4-11e9-9b83-08002764505e','ecdee564-6dfe-11e9-8849-848f69b86260','level202.jpg',0,'robert.pham','2017','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-18 12:21:44','2019-08-18 12:21:44'),('46fedfa0-8201-4eb2-ae37-9c94e92a7626','eedc7f28-6dfe-11e9-8849-848f69b86260','pricneck-hotair-balloon.jpg',0,'huan.hoang','2018','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-12-11 22:01:48','2019-12-11 22:01:48'),('4b13f5ec-c1d4-11e9-9b83-08002764505e','ecdee564-6dfe-11e9-8849-848f69b86260','level203.jpg',0,'thaiphuc.nguyen','2017','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-18 12:21:55','2019-08-18 12:21:55'),('4b4397d6-c1d4-11e9-9b83-08002764505e','ecdee564-6dfe-11e9-8849-848f69b86260','level202.jpg',0,'thaiphuc.nguyen','2017','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-18 12:21:56','2019-08-18 12:21:56'),('4b4397d7-c1d4-11e9-9b83-08002764505e','ecdee564-6dfe-11e9-8849-848f69b86260','level201.jpg',0,'thaiphuc.nguyen','2017','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-18 12:21:56','2019-08-18 12:21:56'),('4b746df4-8155-4dcd-a67b-cd34a405cc24','eedc7f28-6dfe-11e9-8849-848f69b86260','level103.jpg',0,'quynhmai.vu','2018','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-20 14:41:45','2020-01-20 14:41:45'),('4d874257-54f8-4b55-90fc-d71bff10be78','eedc7f28-6dfe-11e9-8849-848f69b86260','level101.jpg',0,'quynhmai.vu','2018','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-20 15:12:38','2020-01-20 15:12:38'),('67e6693d-c853-4f2b-a4a0-f9b718daa261','ecdee564-6dfe-11e9-8849-848f69b86260','level101.jpg',0,'quynhmai.vu','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-22 17:46:03','2020-01-22 17:46:03'),('74c68974-2842-497c-8e85-68ff800111e7','ecdee564-6dfe-11e9-8849-848f69b86260','level203.jpg',0,'robert.pham','2017','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-20 21:44:59','2020-01-20 21:44:59'),('7cb6c334-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image001.jpg',0,'dcvnps','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 20:42:25','2019-06-26 20:42:25'),('7cb6c5aa-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image002.jpg',0,'dcvnps','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 20:42:25','2019-06-26 20:42:25'),('7cb6c7c2-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image003.jpg',0,'dcvnps','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 20:42:25','2019-06-26 20:42:25'),('7cb6c912-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image004.jpg',0,'dcvnps','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 20:42:25','2019-06-26 20:42:25'),('7cb6ca67-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image005.jpg',0,'dcvnps','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 20:42:25','2019-06-26 20:42:25'),('7cb6cd27-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image006.jpg',1,'dcvnps','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 20:42:25','2019-06-26 20:42:25'),('7cb6ceb4-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image007.jpg',0,'dcvnps','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 20:42:25','2019-06-26 20:42:25'),('7cb6d0c8-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image008.jpg',0,'dcvnps','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 20:42:25','2019-06-26 20:42:25'),('7cb6d21c-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image009.jpg',0,'dcvnps','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 20:42:25','2019-06-26 20:42:25'),('7cb6d363-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image010.jpg',1,'dcvnps','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 20:42:25','2019-06-26 20:42:25'),('7cb6d49b-6eb2-11e9-8849-848f69b86260','f10448dd-6dfe-11e9-8849-848f69b86260','image011.jpg',0,'dcvnps','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-06-26 20:42:25','2019-06-26 20:42:25'),('93804cfc-ee36-4b60-9db7-ce439b7b2f46','eac81e4c-6dfe-11e9-8849-848f69b86260','VAB-07556.jpg',0,'henry.nguyen','2014','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-01 19:02:38','2020-01-01 19:02:38'),('9ba01fc0-b0ad-11e9-a270-08002764505e','d63a6b38-6dfe-11e9-8849-848f69b86260','home00.jpg',0,'vnps.home','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-07-27 16:32:10','2019-07-27 16:32:10'),('9e6933e5-b0ad-11e9-a270-08002764505e','d63a6b38-6dfe-11e9-8849-848f69b86260','home01.jpg',0,'vnps.home','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-07-27 16:32:14','2019-07-27 16:32:14'),('9fb57503-b0ad-11e9-a270-08002764505e','d63a6b38-6dfe-11e9-8849-848f69b86260','home02.jpg',0,'vnps.home','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-07-27 16:32:16','2019-07-27 16:32:16'),('a61393aa-b0ad-11e9-a270-08002764505e','d63a6b38-6dfe-11e9-8849-848f69b86260','home03.jpg',0,'vnps.home','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-07-27 16:32:27','2019-07-27 16:32:27'),('a6bf8751-b0ad-11e9-a270-08002764505e','d63a6b38-6dfe-11e9-8849-848f69b86260','home04.jpg',0,'vnps.home','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-07-27 16:32:28','2019-07-27 16:32:28'),('a7a32cb9-b0ad-11e9-a270-08002764505e','d63a6b38-6dfe-11e9-8849-848f69b86260','home05.jpg',0,'vnps.home','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-07-27 16:32:30','2019-07-27 16:32:30'),('a8046256-c1d4-11e9-9b83-08002764505e','eedc7f28-6dfe-11e9-8849-848f69b86260','3_HM.JPG',0,'huan.hoang','2018','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-18 12:24:31','2019-08-18 12:24:31'),('a8065c95-b0ad-11e9-a270-08002764505e','d63a6b38-6dfe-11e9-8849-848f69b86260','home06.jpg',0,'henry.nguyen','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-07-27 16:32:30','2019-07-27 16:32:30'),('a9c2d56c-d640-4ed2-a497-474d951eb700','cc9bc0f3-47a0-45e4-b220-2f6c777f99eb','level103.jpg',0,'quynhmai.vu','2020','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 19:37:19','2020-01-26 19:37:19'),('b1c8d717-c1d4-11e9-9b83-08002764505e','eedc7f28-6dfe-11e9-8849-848f69b86260','2_HM.jpg',0,'namhuan.phung','2018','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-18 12:24:48','2019-08-18 12:24:48'),('cef71827-4a38-4692-9717-647b4208e683','eac81e4c-6dfe-11e9-8849-848f69b86260','A77-00166.jpg',0,'henry.nguyen','2014','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-12-15 13:08:53','2019-12-15 13:08:53'),('d0436534-025e-410a-81b6-2dec05055824','ecdee564-6dfe-11e9-8849-848f69b86260','level102.jpg',0,'quynhmai.vu','2020','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-22 17:44:40','2020-01-22 17:44:40'),('ea4464a2-ff22-45ea-aa9f-dcbca238c009','eedc7f28-6dfe-11e9-8849-848f69b86260','butter-fly.jpeg',0,'huan.hoang','2018','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-12-11 21:55:59','2019-12-11 21:55:59'),('efc5ff07-c1d3-11e9-9b83-08002764505e','eac81e4c-6dfe-11e9-8849-848f69b86260','level303.jpg',0,'chuan.truong','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-18 12:19:22','2019-08-18 12:19:22'),('f1343012-c1d3-11e9-9b83-08002764505e','eac81e4c-6dfe-11e9-8849-848f69b86260','level301.jpg',0,'chuan.truong','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-18 12:19:25','2019-08-18 12:19:25'),('f1d61b15-c1d3-11e9-9b83-08002764505e','eac81e4c-6dfe-11e9-8849-848f69b86260','level302.jpg',1,'chuan.truong','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-18 12:19:26','2019-08-18 12:19:26'),('f1f97502-56dc-4d5f-b6b0-de8f14b19695','cc9bc0f3-47a0-45e4-b220-2f6c777f99eb','level101.jpg',0,'quynhmai.vu','2020','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 19:37:19','2020-01-26 19:37:19'),('f7585837-b993-11e9-be05-08002764505e','e8104b61-6dfe-11e9-8849-848f69b86260','members_002.jpg',0,'binh.le','2017','7cb5e812-6eb2-11e9-8849-848f69b86260','2019-08-08 00:21:19','2019-08-08 00:21:19'),('f91095d8-86dd-419b-8012-889c57cc8973','cc9bc0f3-47a0-45e4-b220-2f6c777f99eb','level102.jpg',0,'quynhmai.vu','2020','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-26 19:37:19','2020-01-26 19:37:19'),('f92e1754-a104-4845-be0e-04c6cbdf4d74','ecdee564-6dfe-11e9-8849-848f69b86260','level102.jpg',0,'quynhmai.vu','2019','7cb5e812-6eb2-11e9-8849-848f69b86260','2020-01-22 17:46:04','2020-01-22 17:46:04');
/*!40000 ALTER TABLE `galleryphotos` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`dcvnps`@`%`*/ /*!50003 TRIGGER `bir_galleryphotos` BEFORE INSERT ON `galleryphotos` FOR EACH ROW begin
IF new.galleryPhotoId is null then
	set new.galleryPhotoId = uuid();
end if;
end */;;
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
