-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 08, 2020 at 09:09 PM
-- Server version: 5.5.57-MariaDB
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dcvnpsor_dcvnps`
--
CREATE DATABASE IF NOT EXISTS `dcvnpsor_dcvnps` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `dcvnpsor_dcvnps`;

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `announcementId` varchar(36) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` mediumtext NOT NULL,
  `postedUserId` varchar(36) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedUserId` varchar(36) NOT NULL,
  `updatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`announcementId`, `title`, `content`, `postedUserId`, `createdDate`, `updatedUserId`, `updatedDate`) VALUES
('197e31c9-0c4e-11ea-b30f-08002764505e', 'Level 3 2019 Gradudation', '<p><span style=\"color: #f1c40f; font-size: 14pt;\"><strong><a style=\"color: #f1c40f;\" title=\"TESTING TESTING\" href=\"https://photos.google.com/share/AF1QipNag270dhQckdbs6GY5I5vEClfaK1zxGPhK23DA0hhZhMx7qEbe4dTY5NaWHchDdg?key=S2VSRk4ySU9DRHJuNzNsVFBwS0VwSjdZQVhlOGR3\" target=\"_blank\" rel=\"noopener\">Level3 Graduation Photo Essay Day2</a></strong></span></p>', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-11-21 06:00:16', '79f9a290-6f38-11e9-8849-848f69b86260', '2020-04-17 12:17:09'),
('9ae132bd-ba4f-11e9-9511-08002764505e', '2019 Vnps Camping at First Landing.', '<p>&nbsp;</p>\n<p><iframe src=\"//www.youtube.com/embed/3FEs2IFnkEw\" width=\"560\" height=\"314\" allowfullscreen=\"allowfullscreen\"></iframe></p>\n<p>&nbsp;</p>', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-08-08 22:44:27', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-05-05 23:37:05'),
('b9e258dd-c186-11e9-8cf1-08002764505e', 'Hội Ngộ Tân Niên 2020', '<p>&nbsp;</p>\n<p><iframe src=\"//www.youtube.com/embed/HAA3pRZbVCA?feature=emb_logo\" width=\"560\" height=\"314\" allowfullscreen=\"allowfullscreen\"></iframe></p>', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-08-18 03:06:40', '79f9a290-6f38-11e9-8849-848f69b86260', '2020-04-17 09:55:12'),
('c09783f8-5dc9-4cfb-a5cc-3e515813dcc6', 'KHAI GIÁNG NIÊN KHÓA 2020 ', '<p class=\"MsoNormal\"><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext;\">Lễ Khai Giảng Ng&agrave;y 23 th&aacute;ng 2 năm 2010</span></strong></p>\n<p class=\"MsoNormal\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext;\">Ch&agrave;o đ&oacute;n Học vi&ecirc;n của thầy Hội Trưởng<strong style=\"mso-bidi-font-weight: normal;\"><span style=\"mso-spacerun: yes;\">&nbsp; </span></strong></span></p>\n<p class=\"MsoNormal\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext;\">Giới thiệu về VNPS v&agrave; Giảng vi&ecirc;n c&aacute;c lớp </span></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: .7pt; line-height: 104%;\"><span style=\"font-size: 12.0pt; line-height: 104%; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext;\">Th&ocirc;ng b&aacute;o về Nội Quy v&agrave; Chương tr&igrave;nh học NK 2019</span></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: .7pt; line-height: 104%;\"><span style=\"font-size: 12.0pt; line-height: 104%; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext;\">Nhắc nhở quy luật của trường Willston</span></p>\n<p class=\"MsoNormal\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext;\">N&oacute;i chuyện về &ldquo;An To&agrave;n&rdquo; , &ldquo;Ph&aacute;p luật &rdquo;&hellip; </span></p>\n<p class=\"MsoNormal\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext;\">Nhắc nhở tất cả học vi&ecirc;n phải đem theo camera v&agrave; laptop, nếu c&oacute;, cho c&aacute;c lớp Computer v&agrave; Photoshop.</span></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: .9pt;\"><em><span lang=\"EN\" style=\"font-size: 12.0pt; line-height: 107%; font-family: \'Times New Roman\',serif; color: windowtext; mso-ansi-language: EN; font-weight: normal; mso-bidi-font-weight: bold;\">Ph&acirc;n chia</span></em><em><span lang=\"EN\" style=\"font-size: 12.0pt; line-height: 107%; font-family: \'Times New Roman\',serif; color: windowtext; mso-ansi-language: EN;\"> </span></em><span style=\"font-size: 12.0pt; line-height: 107%; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext;\">lớp.</span></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: .9pt;\"><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext;\">&nbsp;</span></strong></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: .9pt;\"><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext;\">Hội Vi&ecirc;n : </span></strong><span style=\"font-size: 12.0pt; line-height: 107%; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext; mso-bidi-font-weight: bold;\">Tr&igrave;nh b&agrave;y Chương Tr&igrave;nh Sinh Hoạt Hội Vi&ecirc;n cho năm 2020.</span></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: .9pt;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext; mso-bidi-font-weight: bold;\"><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Đ&oacute;n nhận &yacute; kiến đ&oacute;ng g&oacute;p của hội vi&ecirc;n</span></p>\n<p class=\"TableParagraph\"><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif; mso-bidi-font-weight: bold;\"><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Nhắc nhở về sự An To&agrave;n v&agrave; Ph&aacute;p Luật<span style=\"mso-spacerun: yes;\">&nbsp; </span></span></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: .0001pt; line-height: normal;\"><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif;\"><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Bầu Trưởng, Ph&oacute; lớp, Ban s&aacute;ng t&aacute;c</span></p>\n<p class=\"MsoNormal\" style=\"line-height: 107%;\"><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext;\">&nbsp;</span></strong></p>\n<p class=\"MsoNormal\" style=\"line-height: 107%;\"><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext;\">Lớp 1:<span style=\"mso-spacerun: yes;\">&nbsp; </span><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span></strong><span style=\"font-size: 12.0pt; line-height: 107%; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext; mso-bidi-font-weight: bold;\">Tr&igrave;nh b&agrave;y chương tr&igrave;nh học lớp 1 cho NK2020</span></p>\n<p class=\"TableParagraph\"><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial;\"><span style=\"mso-spacerun: yes;\">&nbsp;</span></span></strong></p>\n<p class=\"TableParagraph\"><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial;\">Lớp 2:<span style=\"mso-spacerun: yes;\">&nbsp; </span><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span></strong><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif; mso-bidi-font-weight: bold;\">Ch&agrave;o đ&oacute;n học vi&ecirc;n lớp 2: <span style=\"mso-spacerun: yes;\">&nbsp;</span></span></p>\n<p class=\"TableParagraph\"><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif; mso-bidi-font-weight: bold;\"><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"mso-spacerun: yes;\">&nbsp;</span><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Lập danh s&aacute;ch học vi&ecirc;n, bầu Trưởng Lớp, Ph&oacute; Lớp, Trưởng Ban S&aacute;ng T&aacute;c .<span style=\"mso-spacerun: yes;\">&nbsp; </span></span></p>\n<p class=\"TableParagraph\"><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif; mso-bidi-font-weight: bold;\"><span style=\"mso-spacerun: yes;\">&nbsp;</span><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"mso-spacerun: yes;\">&nbsp;</span><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Giới thiệu Giảng Vi&ecirc;n hướng dẫn Lớp 2<span style=\"mso-spacerun: yes;\">&nbsp; </span></span></p>\n<p class=\"TableParagraph\"><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif; mso-bidi-font-weight: bold;\"><span style=\"mso-spacerun: yes;\">&nbsp;</span><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"mso-spacerun: yes;\">&nbsp;</span><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Sơ lược CT học lớp 2 năm 2020 </span></p>\n<p class=\"TableParagraph\"><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif; letter-spacing: .05pt; mso-bidi-font-weight: bold;\"><span style=\"mso-spacerun: yes;\">&nbsp;</span><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"mso-spacerun: yes;\">&nbsp;</span><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif; mso-bidi-font-weight: bold;\">Nhắc nhở về sự An To&agrave;n v&agrave; Ph&aacute;p Luật<span style=\"mso-spacerun: yes;\">&nbsp; </span></span></p>\n<p class=\"TableParagraph\"><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif; mso-bidi-font-weight: bold;\"><span style=\"mso-spacerun: yes;\">&nbsp;</span><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"mso-spacerun: yes;\">&nbsp;</span><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Hỏi v&agrave; đ&aacute;p những trở ngại trong l&uacute;c chụp ảnh<span style=\"mso-font-width: 99%;\"><span style=\"mso-spacerun: yes;\">&nbsp; </span></span></span></p>\n<p class=\"MsoNormal\"><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"font-size: 12.0pt; line-height: 107%; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext;\">&nbsp;</span></strong></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: .0001pt; line-height: normal;\"><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif; mso-fareast-font-family: Arial; color: windowtext;\">Lớp 3:<span style=\"mso-spacerun: yes;\">&nbsp; </span><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;</span></span></strong><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif;\">Ch&agrave;o đ&oacute;n HV-L3 v&agrave; giới thiệu Giảng vi&ecirc;n Chủ nhiệm v&agrave; Phụ giảng </span></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: .0001pt; line-height: normal;\"><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif;\"><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;</span>Giới thiệu về chương tr&igrave;nh học NK</span><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif; mso-ansi-language: VI;\"> </span><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif;\">2020</span></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: .0001pt; line-height: normal;\"><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif;\"><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;</span>Lập danh s&aacute;ch học vi&ecirc;n </span></p>\n<p class=\"MsoNormal\" style=\"margin-bottom: .0001pt; line-height: normal;\"><span style=\"font-size: 12.0pt; font-family: \'Times New Roman\',serif;\"><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"mso-spacerun: yes;\">&nbsp;&nbsp;&nbsp;&nbsp;</span>Bầu Trưởng/Ph&oacute; lớp</span></p>', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-12-28 16:06:23', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 21:15:02');

-- --------------------------------------------------------

--
-- Table structure for table `galleries`
--

CREATE TABLE `galleries` (
  `galleryId` varchar(36) NOT NULL,
  `gallery` varchar(100) NOT NULL,
  `profilePhoto` varchar(100) DEFAULT NULL,
  `activeInd` varchar(1) NOT NULL DEFAULT 'Y',
  `updatedUserId` varchar(45) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `galleries`
--

INSERT INTO `galleries` (`galleryId`, `gallery`, `profilePhoto`, `activeInd`, `updatedUserId`, `createdDate`, `updatedDate`) VALUES
('b6a0bff0-fc18-4023-aa13-7b181b675684', 'blue team', 'a7-00045-2.jpg', 'Y', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-04-30 10:03:04', '2020-04-30 18:03:04'),
('d63a6b38-6dfe-11e9-8849-848f69b86260', 'home', NULL, 'Y', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 21:07:41', '2019-06-26 21:07:41'),
('e8104b61-6dfe-11e9-8849-848f69b86260', 'members', 'member-2018.jpg', 'Y', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 21:07:41', '2019-06-26 21:07:41'),
('eac81e4c-6dfe-11e9-8849-848f69b86260', 'level3', 'level3-2018.jpg', 'Y', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 21:07:41', '2019-06-26 21:07:41'),
('ecdee564-6dfe-11e9-8849-848f69b86260', 'level2', 'level2-2018.jpg', 'Y', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 21:07:41', '2019-06-26 21:07:41'),
('eedc7f28-6dfe-11e9-8849-848f69b86260', 'level1', 'level1-2018.jpg', 'Y', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 21:07:41', '2019-06-26 21:07:41'),
('f10448dd-6dfe-11e9-8849-848f69b86260', 'aboutus', NULL, 'Y', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 21:07:41', '2019-06-26 21:07:41');

-- --------------------------------------------------------

--
-- Table structure for table `galleryphotos`
--

CREATE TABLE `galleryphotos` (
  `galleryPhotoId` varchar(36) NOT NULL,
  `galleryId` varchar(36) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `portrait` int(11) NOT NULL DEFAULT '0',
  `author` varchar(100) NOT NULL DEFAULT 'dcvnps',
  `year` varchar(4) NOT NULL,
  `updatedUserId` varchar(45) NOT NULL DEFAULT 'dcvnps',
  `createdDate` datetime NOT NULL,
  `updatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `galleryphotos`
--

INSERT INTO `galleryphotos` (`galleryPhotoId`, `galleryId`, `photo`, `portrait`, `author`, `year`, `updatedUserId`, `createdDate`, `updatedDate`) VALUES
('0013755f-0eed-4834-ad27-3cd8cec55c9b', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Honest Abe.jpg', 1, 'bich.ngoc', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('007d636b-f3c4-41b5-ba33-2a4d95a2e914', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '05 Hennessy XO.jpg', 0, 'cam.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:13', '2020-02-21 12:46:13'),
('01b3f7b5-9e6f-44ed-bac1-952d378205bb', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Darren 9.jpg', 0, 'darren.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:13', '2020-02-21 12:46:13'),
('01ffd848-59df-11ea-9d8d-0cc47ac1ac6e', 'd63a6b38-6dfe-11e9-8849-848f69b86260', 'home11.jpg', 0, 'vnps.home', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-07-27 16:32:10', '2019-07-27 16:32:10'),
('028d48d5-7100-4d49-bccb-458e821a7b82', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'SydneyLight2.jpg', 0, 'phillip.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('03a3e9bf-7ef9-495d-8151-679c144d5576', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '01 Cover.jpg', 0, 'cam.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:13', '2020-02-21 12:46:13'),
('03afde20-a529-4fb5-88c2-5aa0628b0eff', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '7_Chanh Vang.jpg', 1, 'phuoc.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:54:41', '2020-02-21 13:54:41'),
('03e197bf-2afb-4f96-8893-4800961a6f88', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Picture12.jpg', 0, 'chau.le', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:00:10', '2020-02-21 13:00:10'),
('049fc735-a48d-4a6a-8e3c-d6194ac9ab96', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'DSC04155 (PS) 2 (PL3) (18x 12).jpg', 0, 'ngan.ngo', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:15', '2020-02-21 12:46:15'),
('054fc532-e413-4904-9c2e-397ff4088677', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Lữ Hành.jpg', 0, 'bai.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:11:57', '2020-02-21 12:11:57'),
('07399126-2f69-4040-ac67-5ca268aa0de6', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'IMG_6368 (2).jpg', 1, 'dominick.dinh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('07aa5b48-22b3-4d89-a07e-4d7c36bac2ba', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'RÊU XANH.jpg', 0, 'hong.thai', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('07ab73fe-fbcc-4d3d-a0dc-8338d29fc3be', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '7-KN.jpg', 1, 'kim.nguyet', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('08153fdc-8e46-4013-b3a2-b0038678e869', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Going with the wind.jpg', 0, 'tran.thanh', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('0928a6e2-d72e-4fb2-bfb6-d793a03ef4db', 'eedc7f28-6dfe-11e9-8849-848f69b86260', '_4395.jpg', 0, 'dung.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:36', '2020-02-21 17:38:36'),
('09fc511c-fed7-436a-9fbe-b79c667100b2', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'BRONZE2.jpg', 0, 'dinh.hoang', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('0bd6f1d6-29cd-416c-ba18-c0ae15038a2a', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'DSC02680 (PS) (HDR) (18 x 12) 2.jpg', 0, 'ngan.ngo', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:15', '2020-02-21 12:46:15'),
('0c663255-200b-41cd-8996-fa270bc50f9a', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'SwimGirl.jpg', 0, 'tont.tai', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:39', '2020-02-21 17:38:39'),
('0cf3b395-28db-481e-a420-c869fb6e1975', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '1-KN Cover Page.jpg', 1, 'kim.nguyet', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('0da82788-c4a6-46c4-96c5-3b8dd3f2b143', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '04 DSMK.jpg', 0, 'to.yen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:12', '2020-02-21 13:11:12'),
('0dd22617-a2c5-4e05-9235-43dcc7e47d69', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '03 Phong chua ruou.jpg', 0, 'cam.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:13', '2020-02-21 12:46:13'),
('0eae8e1f-cfbe-445b-90a1-fd281833c562', 'eedc7f28-6dfe-11e9-8849-848f69b86260', '3771.jpg', 0, 'ngoc.tram', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:37', '2020-02-21 17:38:37'),
('0eb34f51-f4a7-4e95-a9ee-00c34005b71f', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Buom1.jpg', 1, 'helene.loc', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('114f551a-cef4-4744-ad8d-ac635064387b', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Nông Trại.jpg', 0, 'bai.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:11:57', '2020-02-21 12:11:57'),
('14468b44-55e2-4347-b108-b72868665736', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '05 DSMK.jpg', 0, 'phuong.nhi', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:32:25', '2020-02-21 12:32:25'),
('14e624c5-02ba-4250-ba89-21e297e524ab', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Alone.jpg', 0, 'hong.renlund', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('1751f017-891b-45c5-a662-ec0b89a95965', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Vo de 1.jpg', 0, 'truc.ly', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('176b36cb-c8ba-4417-b7e2-70221a50ced8', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'Venice.jpg', 0, 'tont.tai', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:39', '2020-02-21 17:38:39'),
('18247d03-c91b-4f57-8934-53cbeb5b7060', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Picture9.jpg', 0, 'chau.le', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:00:09', '2020-02-21 13:00:09'),
('187f3a45-ec91-46f2-95d1-0464d42feead', 'eedc7f28-6dfe-11e9-8849-848f69b86260', '_VTV5359.jpg', 0, 'tony.trac', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:39', '2020-02-21 17:38:39'),
('191a991b-10d4-4c45-86e9-4e1cf113222d', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'image164.jpg', 1, 'dinh.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:13:49', '2020-02-21 12:13:49'),
('1a59634c-9b67-4adc-8dee-4600db8db021', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Lotus Late Stage.jpg', 0, 'hai.pham', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('1a650c92-ba70-4e58-9364-6d7d8227634e', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'sen_6.jpg', 0, 'thanh.cao', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('1b1a877d-358f-413e-a32d-a6ea7ceb1768', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'DSC09284.jpg', 0, 'thuan.anh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:39', '2020-02-21 17:38:39'),
('1b602768-fe1c-4637-b80a-848ade45fd79', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'A3.jpg', 0, 'my.van', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('1ba28187-76e4-473d-9b43-1685f6d45509', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Picture6.jpg', 0, 'chau.le', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:00:09', '2020-02-21 13:00:09'),
('1bb0e44b-9281-4eeb-923c-409e86b6f76e', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'FrontPage.jpg', 0, 'thuy.phuong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:18:09', '2020-02-21 13:18:09'),
('1c86289c-47a4-4708-ab50-b0e30a2e65a9', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '10_Pea.jpg', 1, 'phuoc.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:54:41', '2020-02-21 13:54:41'),
('1ca49e72-c1d4-11e9-9b83-08002764505e', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'level303.jpg', 0, 'binh.le', '2016', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-08-18 12:20:37', '2019-08-18 12:20:37'),
('1cabaad1-c1d4-11e9-9b83-08002764505e', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'level301.jpg', 0, 'binh.le', '2016', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-08-18 12:20:37', '2019-08-18 12:20:37'),
('1cabf153-c1d4-11e9-9b83-08002764505e', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'level302.jpg', 0, 'binh.le', '2016', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-08-18 12:20:37', '2019-08-18 12:20:37'),
('1cfe30ce-cb4f-440a-a4ca-d26a933f7fe8', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'foto2.jpg', 0, 'minh.trac', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('1de58231-d16d-4946-afe0-c9c0f2b8655e', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '06 Rot Ruou.jpg', 1, 'cam.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:13', '2020-02-21 12:46:13'),
('1e194de0-e475-48a0-8d76-38e1c738917b', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'Greece.jpg', 0, 'tont.tai', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:39', '2020-02-21 17:38:39'),
('1e43364c-8bf0-4756-86c9-355567aeafdd', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '3-KN.jpg', 1, 'kim.nguyet', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('1feb9453-54c2-4e66-9b35-4a90f1cdfc99', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Pic6.jpg', 0, 'thuy.phuong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:18:09', '2020-02-21 13:18:09'),
('204fd04c-b4d0-4acd-a3ab-d976a9fcdf7f', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'First Abstract.jpg', 0, 'quynh.giao', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:35', '2020-02-21 14:16:35'),
('20513b94-ef0d-4e5c-8603-e24e292ff026', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '6-KN.jpg', 1, 'kim.nguyet', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('226ca5ab-7333-40cb-8c58-878aba9dff29', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Le.jpg', 1, 'phuong.thao', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('23454e72-f30b-4d09-9d6a-1034574a40c9', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'image117.jpg', 1, 'dinh.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:13:49', '2020-02-21 12:13:49'),
('23c33c60-9131-4bf2-af76-2cabe434c090', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'sen_4.jpg', 0, 'thanh.cao', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('23f4e366-914f-41df-a39d-efcd3f79263a', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'sen_2.jpg', 0, 'thanh.cao', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('24227514-c7ab-46ea-9bbc-b2e73282b545', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '5.jpg', 0, 'lan.anh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('244b2846-cb07-429d-a56b-ef7acd9f419c', 'e8104b61-6dfe-11e9-8849-848f69b86260', '352A2702.jpg', 0, 'bich.van', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('25c77128-7e77-4d02-b7c9-a634ca835258', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '8_Kiwi.jpg', 1, 'phuoc.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:54:41', '2020-02-21 13:54:41'),
('26e51812-7449-4e7e-a201-5f7b24f493e4', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Darren 5.jpg', 0, 'darren.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('2746521e-4980-46cc-ae4f-ea67e354b95d', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '03 DSMK.jpg', 0, 'to.yen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:12', '2020-02-21 13:11:12'),
('27c8de8e-4f29-409c-b259-c33c67eddd59', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '04 DSMK.jpg', 0, 'phuong.nhi', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:32:25', '2020-02-21 12:32:25'),
('27d160c2-55a7-4aac-8612-a8dcb056f540', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'When I am Seventeen.jpg', 1, 'hong.renlund', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('29bfd2cd-38c0-49d4-8cd6-868a3750dfbf', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'fotoFreedom Is Not Free2.jpg', 0, 'sen.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:35', '2020-02-21 14:16:35'),
('29d8033c-cd8d-4bac-b1e0-c09c019eabb9', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Pic2.jpg', 0, 'thuy.phuong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:18:09', '2020-02-21 13:18:09'),
('2a99b3fd-1fb5-4ed5-9061-51cb276c259c', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'BichQuyen4.jpg', 1, 'bich.quyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:17:07', '2020-02-21 12:17:07'),
('2afe232d-fbe2-4697-9bd6-e5700c49b203', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Picture10.jpg', 0, 'chau.le', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:00:09', '2020-02-21 13:00:09'),
('2cb509bc-e8aa-4a03-8713-f4557021e0c9', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'My_Travel_Destination_2.jpg', 0, 'oanh.trieu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:11', '2020-02-21 13:11:11'),
('2e9aedd1-6575-4571-a752-7891edc73052', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'RangSong.jpg', 0, 'dang.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('2eec4a0c-e6d6-4516-9f81-7d0f5058def5', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '11 phi thuyen 11.jpg', 1, 'phuong.doan', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('2f1e4966-920d-4fcb-a3c9-1b93ca0d05c2', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'E ấp.jpg', 1, 'thu.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:37', '2020-02-21 17:38:37'),
('311f7c4f-0a93-48df-b615-ff2576288bb8', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '4_Pink Lily.jpg', 0, 'bao.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:16:45', '2020-02-21 12:16:45'),
('31478372-543e-4201-b03d-e00ce0fb1253', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Tulips_NhuyHoa.jpg', 0, 'andy.tran', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:32', '2020-02-21 14:16:32'),
('328882ec-6acb-487d-9069-3ea86f07f1c4', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'GoldDCbyNightSummer.jpg', 0, 'bich.dinh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('32c57460-c1d3-11e9-9b83-08002764505e', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'members_003.jpg', 0, 'binh.le', '2017', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-08-18 12:14:05', '2019-08-18 12:14:05'),
('32f3e116-c92a-4c1d-a220-e1f658e5e28e', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Pic5.jpg', 0, 'thuy.phuong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:18:09', '2020-02-21 13:18:09'),
('33a1a801-929b-4548-93f0-a0f329a20b26', 'eedc7f28-6dfe-11e9-8849-848f69b86260', '1703.jpg', 0, 'dung.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:36', '2020-02-21 17:38:36'),
('33b61271-2f3e-49e3-bfd6-1816c7d76e08', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '00 DSMK.jpg', 0, 'phuong.nhi', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:32:25', '2020-02-21 12:32:25'),
('33fe7c06-d8a3-43d9-8877-a00ba1b858cc', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Boston Harbor1.jpg', 0, 'kieu.dang', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('3490f301-36f2-4889-b776-67650807d534', 'e8104b61-6dfe-11e9-8849-848f69b86260', '1Q4A7116.jpg', 0, 'bich.van', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('353f1f2d-7750-42f3-8fec-dd34a260076c', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'IMG_6562 (3).jpg', 1, 'dominick.dinh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('360675c4-8ce5-4a7a-afb8-ddb46e55cbe4', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '2_Dragon Fruit_Thanh Long.jpg', 1, 'phuoc.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:54:41', '2020-02-21 13:54:41'),
('360f8f70-a65e-4a32-a1b0-e1fd3d16c547', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Fallingwater.jpg', 1, 'hien.le', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('37e2b2e5-51d5-49a4-8317-adc0ac47af98', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'image063.jpg', 0, 'dinh.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:13:49', '2020-02-21 12:13:49'),
('3855c852-055f-413b-a2e0-9b2a332b7afd', 'eedc7f28-6dfe-11e9-8849-848f69b86260', '_MG_1833.jpg', 0, 'dung.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:36', '2020-02-21 17:38:36'),
('3971011e-02d2-465d-b9e2-1c8522750a67', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'X1A0195 v2 copy6.jpg', 1, 'kieu.lan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 11:59:29', '2020-02-21 11:59:29'),
('3a46271e-2abd-42ff-adb8-ce5ebb1ebe82', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Freedom Is Not Free.jpg', 0, 'sen.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:35', '2020-02-21 14:16:35'),
('3a528615-a216-4560-b51b-bc3c96c497a6', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Chân-dung-3.jpg', 0, 'truc.ly', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:03:09', '2020-02-21 12:03:09'),
('3ad97997-5cc0-4728-9ddf-b6d550635d1b', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Wait For The Sun Set.jpg', 0, 'hong.renlund', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('3be9d92c-9421-443e-a408-6396bb6ef06c', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'CTran-DSC02745.jpg', 0, 'mai.huongc', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:44:43', '2020-02-21 17:44:43'),
('3cdbc420-b993-11e9-be05-08002764505e', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'members_001.jpg', 0, 'binh.le', '2017', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-08-08 00:16:06', '2019-08-08 00:16:06'),
('3d2ed01b-3fcf-4168-ae12-2dc0f77276ec', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Buom3.jpg', 0, 'helene.loc', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('3e48ff6b-15db-44fe-9d97-1c61769be258', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '4-KN.jpg', 1, 'kim.nguyet', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('3edf1779-7b84-4d1a-b66f-16561612f9f1', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'sen_5.jpg', 0, 'thanh.cao', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('3ef6d764-9959-4853-836e-c26511262e8d', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '07 2 ly ruou.jpg', 0, 'cam.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:13', '2020-02-21 12:46:13'),
('3f6e548f-f92b-4cf2-84ce-70f40f17be7b', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'I love Grandfather.jpg', 1, 'le.thien', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('3f7fbf98-27fa-45dc-81e4-b63500ac0290', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'The Hungarian Parliament Building.jpg', 0, 'thao.vu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:37', '2020-02-21 17:38:37'),
('3f981a67-f5e9-4aaa-b1b9-c18796c85d75', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Beyon The Lens.jpg', 0, 'bich.ngoc', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('40568e56-2309-4720-9933-a82fba27613f', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'DSC02635 v2.jpg', 0, 'duc.lam', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:36', '2020-02-21 17:38:36'),
('40a1f59f-cf69-435f-a8c2-ff8de8b0d2ee', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '3RedLilly.jpg', 0, 'anna.vu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:16:11', '2020-02-21 12:16:11'),
('4132f720-c9c8-4981-942b-e24c0eb67e05', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Hy Vọng.jpg', 0, 'bai.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:11:57', '2020-02-21 12:11:57'),
('42820042-33d0-4742-b29e-13e93d603190', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '6.jpg', 0, 'nghi.bui', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:11', '2020-02-21 13:11:11'),
('429c03a2-fdbc-4412-8c46-776c017d3f0d', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'My_Travel_Destination_6.jpg', 0, 'oanh.trieu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:11', '2020-02-21 13:11:11'),
('43d74f25-daac-4b89-8246-35610746f9ce', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'BichQuyen2.jpg', 1, 'bich.quyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:17:07', '2020-02-21 12:17:07'),
('43efc8af-f1aa-45ac-bf55-9d25a296febf', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'King Bird in Action.jpg', 0, 'hai.ngo', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('4487ab3d-03ac-4f9b-9728-4e13d0c8d5c1', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'eagle2.jpg', 0, 'diane.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('44b3348f-0140-4e75-b19c-9fa311014687', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Cogaibaibien.jpg', 0, 'minh.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('4524833f-4675-4254-919f-c2f9854500e1', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'My_Travel_Destinations_Cover Page OanhTrieu.jpg', 0, 'oanh.trieu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:11', '2020-02-21 13:11:11'),
('4538d6f6-e291-44ce-a9f9-f84a756e96e1', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '11_Artichoke_Bong Artiso.jpg', 1, 'phuoc.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:54:41', '2020-02-21 13:54:41'),
('454c51b6-8b18-410b-aa1b-732c42dfb6be', 'b6a0bff0-fc18-4023-aa13-7b181b675684', 'A7-03575.jpg', 0, 'henry.nguyen', '2019', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-05-05 23:16:08', '2020-05-05 23:16:08'),
('45dd27cd-b3a9-4472-ad4c-fd0072dd09f2', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'MOV01132 (2).jpg', 1, 'dominick.dinh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('46614779-256d-4ae0-b1aa-14e5d8594871', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Play with Apps.jpg', 0, 'quynh.giao', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:35', '2020-02-21 14:16:35'),
('46b13a4c-8a94-4e02-88c4-b2448043f929', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '06 DSMK.jpg', 0, 'phuong.nhi', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:32:25', '2020-02-21 12:32:25'),
('47a9e7dd-6575-47f3-b6ea-3b67ef1c7353', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Gold-Spider-final2.jpg', 0, 'dolinh.dz', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:42:49', '2020-02-22 11:42:49'),
('482611c9-2c6b-4b10-aa50-3b89b65f339e', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Lửa Hồng.jpg', 0, 'bai.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:11:57', '2020-02-21 12:11:57'),
('4855db21-e43c-4670-b667-f8c03bce8155', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '1.jpg', 0, 'nghi.bui', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:11', '2020-02-21 13:11:11'),
('486b368f-2aea-462d-9e62-1bee4d56fc47', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Waiting for the sun.jpg', 0, 'tran.thanh', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('49302ecc-d2bc-4b09-ad76-4354c80f5a38', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '5-KN.jpg', 1, 'kim.nguyet', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('49cbd482-6068-4848-b3ee-a968214ea731', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'IMG_7949 (2).jpg', 1, 'dominick.dinh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('4cc80162-4af5-40e4-b31f-9430694ff47a', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '3.jpg', 0, 'nghi.bui', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:11', '2020-02-21 13:11:11'),
('4d052457-2f5d-44d8-84bc-645fab395d6f', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'New Tech.jpg', 0, 'michelle.pham', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:37', '2020-02-21 17:38:37'),
('4d126dd2-a056-41c4-9a40-0be1353581fc', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'DSC02682 (PS)2 (18 x 12) 4.jpg', 0, 'ngan.ngo', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:15', '2020-02-21 12:46:15'),
('4d426abf-378f-43fd-8204-7e16f01d6102', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Picture001.jpg', 1, 'chau.le', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:03:45', '2020-02-21 13:03:45'),
('4d4f0f01-d06a-483f-a0a9-658a31e41907', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '05 DSMK.jpg', 0, 'to.yen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:12', '2020-02-21 13:11:12'),
('4d8ae60b-27bf-4ff1-9967-60dff143d54e', 'eedc7f28-6dfe-11e9-8849-848f69b86260', '3774.jpg', 0, 'ngoc.tram', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:37', '2020-02-21 17:38:37'),
('4f37c68d-68c4-4e8c-b002-89050687bfd7', 'e8104b61-6dfe-11e9-8849-848f69b86260', '1Q4A3126.jpg', 0, 'nghia.le', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('4fb5e281-ec01-4556-b652-61512112e113', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '2.jpg', 0, 'nghi.bui', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:11', '2020-02-21 13:11:11'),
('509bf1d6-2258-4c4f-a599-4a8f9c97ecd9', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Talaber2.jpg', 0, 'diane.thanhnhu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('50f0cc8f-f882-478d-bf2f-e13c277dd0f7', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Darren 8.jpg', 0, 'darren.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('538cb87d-bcec-4314-9bd9-f23ada90b39a', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Silence2.jpg', 1, 'tong.mai', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('5407f8d1-0300-4b92-b704-d736b7180899', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '7TwoDancers.jpg', 0, 'anna.vu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:16:10', '2020-02-21 12:16:10'),
('5425cc54-1a23-4d26-adc1-cdf2dfe392fb', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '1_Yellow Rose_Hoa Hong Vang.jpg', 0, 'bao.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:16:45', '2020-02-21 12:16:45'),
('54735cd6-5b42-446c-9e70-1715121e112b', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Action.jpg', 0, 'diem.tran', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('5697dc3b-5753-4ec5-9178-114b508d0222', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'HOÀNG HÔN.jpg', 0, 'hong.thai', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('57082777-51e4-4ddd-a846-bdf6c14dbb07', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Silence3.jpg', 1, 'tong.mai', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('57ff17e7-abe5-4f8e-b498-776d47eb8d70', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Morning Farmer at work 1.jpg', 0, 'chinh.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('58a4d57f-8d3b-40ef-955f-e6a4ebcca8dc', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Fly Latern.jpg', 0, 'tran.thanh', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('59c195ff-86c2-4d8c-82e9-313ad3ccfea4', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'MeCon.jpg', 1, 'minh.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('59fe6391-ba59-4dca-8c5d-443aa7bce1da', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'HoaHeo.jpg', 0, 'le.luu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('5b0158cb-2e9f-41f3-b039-2752e8343e81', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'MOV01178 (2).jpg', 1, 'dominick.dinh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('5fa4cf01-6fa0-437b-ab74-68303c369c2e', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Vo de 2.jpg', 0, 'truc.ly', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('5fcd99bf-c147-4557-9da7-f9fa4f25204b', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '06 phi thuyen 6.jpg', 1, 'phuong.doan', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('6178e625-d6e0-4271-8fbd-2d448e941d1b', 'e8104b61-6dfe-11e9-8849-848f69b86260', '1.jpg', 0, 'ty.auduong', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('621e1458-104f-4446-b4bf-0f96301f76a2', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'Tran-Sen2.jpg', 0, 'mai.huong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:37', '2020-02-21 17:38:37'),
('622e6469-39c1-4aaf-9fd1-fab7d7045358', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Bleeding Hearts.jpg', 1, 'kieu.lan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('63393694-0dbd-4ba7-a552-9332a64e14b8', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Bub1.jpg', 0, 'le.luu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('64dca4d3-1909-488c-9207-5506383a5715', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'happy family.jpg', 0, 'kieu.dang', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('65219d82-4d6b-4b73-a2b3-d2a6f0d7d6e5', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '02 DSMK.jpg', 0, 'phuong.nhi', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:32:25', '2020-02-21 12:32:25'),
('6895246d-1b70-49c2-908a-0178c69f0bd0', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '1ThreeDancers2.jpg', 0, 'anna.vu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:16:10', '2020-02-21 12:16:10'),
('68d05995-1daf-4abf-a2f1-0caabe5f0b78', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Chân-dung-5.jpg', 0, 'truc.ly', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:03:08', '2020-02-21 12:03:08'),
('69ea648f-f31d-4998-8695-d7fa724685e2', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'quotes.jpg', 1, 'truc.ly', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:03:10', '2020-02-21 12:03:10'),
('6c4604d6-3900-40e6-9483-86bab0977a5d', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'Grin and Bear it.jpg', 1, 'duc.lam', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:36', '2020-02-21 17:38:36'),
('6d07ab62-4f18-4cea-b89c-d1b2ea7ed7df', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'sen_8.jpg', 1, 'thanh.cao', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('6d179166-2f7e-408e-a6d8-723e6321efa6', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'foto2.jpg', 0, 'sen.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('6d557d5f-b4eb-4dbc-8611-9542903f4ff4', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Picture8.jpg', 0, 'chau.le', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:00:09', '2020-02-21 13:00:09'),
('6fae8e60-1d89-45a6-b47c-daf94e12466b', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Hoa sen 1.jpg', 0, 'steven.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('6fc6298b-93c0-4476-bdbe-feb427099426', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'VietnameseMM3.jpg', 0, 'phuong.thao', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('7024630a-24e9-455e-94bc-2653505261bc', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Young Female Snowy Owl.jpg', 0, 'minh.tan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 11:46:47', '2020-02-21 11:46:47'),
('70c45db1-69ab-420f-9497-813982019f08', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'VietnameseMM1.jpg', 0, 'phuong.thao', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('7110c661-6a57-444a-ad2f-65b1ad3fd6c3', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '02 DSMK.jpg', 0, 'to.yen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:11', '2020-02-21 13:11:11'),
('71e0100a-4872-4856-ba32-65a93f5164ad', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '3.jpg', 0, 'lan.anh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:15', '2020-02-21 12:46:15'),
('72dcf37d-c95d-4762-9745-774e483647f1', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'aodai.jpg', 1, 'son.nguyen', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('7397fb1e-0519-477c-940e-2d8bc419e9a7', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '6Flowers.jpg', 0, 'anna.vu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:16:10', '2020-02-21 12:16:10'),
('7398169a-eba6-429d-958d-9852ecfcb254', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'route 50 dsmk.jpg', 0, 'michelle.pham', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:37', '2020-02-21 17:38:37'),
('74e095ff-0b3f-417d-9d1d-d8b609826088', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Chân-dung-2.jpg', 0, 'truc.ly', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:03:09', '2020-02-21 12:03:09'),
('74f263ca-78de-4c5f-b335-b901fe70ec1b', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'SilverXế Chiều.jpg', 0, 'trong.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:35', '2020-02-21 14:16:35'),
('75575599-936e-4511-a068-651ed44fe57c', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '06 DSMK.jpg', 0, 'to.yen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:12', '2020-02-21 13:11:12'),
('7571612d-9256-4ef0-95ff-c78763c5f695', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'MOV01047 (2).jpg', 1, 'dominick.dinh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('75b1b13f-e5cf-4e15-bcaa-f166346d8be5', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '6_Apple_Tao.jpg', 1, 'phuoc.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:54:41', '2020-02-21 13:54:41'),
('75e12d96-9b21-4b8b-857e-3182dd0707d4', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Hoa Cuc Nhen.jpg', 0, 'bao.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:16:45', '2020-02-21 12:16:45'),
('77136de3-0580-4f13-ac77-2a716c536200', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'BRONZE3.jpg', 0, 'dinh.hoang', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('77a12705-acd2-43b3-84f5-af25448e8b07', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'Healthy Mind Happy Life.jpg', 0, 'thu.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:37', '2020-02-21 17:38:37'),
('781a5bff-7bb9-4d0b-aca0-5c53238d3370', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Yello Lily.jpg', 0, 'bao.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:16:45', '2020-02-21 12:16:45'),
('788d2c46-9ed2-47ce-8560-f40097e46907', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'BRONZE1.jpg', 1, 'dinh.hoang', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('7925f79b-f6b0-4046-8494-8bedd89e8438', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'DSC02506 (PS) (HDR) (18x12) 1.jpg', 0, 'ngan.ngo', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:15', '2020-02-21 12:46:15'),
('79b33bbd-5045-478e-9f4b-be38b3b6be1d', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '8_Thuoc Duoc Trang.jpg', 0, 'bao.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:16:45', '2020-02-21 12:16:45'),
('7b89e4a3-2bf8-4dbf-b934-4bc13db17d7f', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'BichQuyen3.jpg', 1, 'bich.quyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:17:07', '2020-02-21 12:17:07'),
('7c8abd65-0688-4136-9f10-615ad3d0efab', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'SydneyLight1.jpg', 0, 'phillip.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('7c953f1b-59dd-11ea-9d8d-0cc47ac1ac6e', 'd63a6b38-6dfe-11e9-8849-848f69b86260', 'home10.jpg', 0, 'vnps.home', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-07-27 16:32:10', '2019-07-27 16:32:10'),
('7cb6c334-6eb2-11e9-8849-848f69b86260', 'f10448dd-6dfe-11e9-8849-848f69b86260', 'image001.jpg', 0, 'dcvnps', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 20:42:25', '2019-06-26 20:42:25'),
('7cb6c5aa-6eb2-11e9-8849-848f69b86260', 'f10448dd-6dfe-11e9-8849-848f69b86260', 'image002.jpg', 0, 'dcvnps', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 20:42:25', '2019-06-26 20:42:25'),
('7cb6c7c2-6eb2-11e9-8849-848f69b86260', 'f10448dd-6dfe-11e9-8849-848f69b86260', 'image003.jpg', 0, 'dcvnps', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 20:42:25', '2019-06-26 20:42:25'),
('7cb6c912-6eb2-11e9-8849-848f69b86260', 'f10448dd-6dfe-11e9-8849-848f69b86260', 'image004.jpg', 0, 'dcvnps', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 20:42:25', '2019-06-26 20:42:25'),
('7cb6ca67-6eb2-11e9-8849-848f69b86260', 'f10448dd-6dfe-11e9-8849-848f69b86260', 'image005.jpg', 0, 'dcvnps', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 20:42:25', '2019-06-26 20:42:25'),
('7cb6cd27-6eb2-11e9-8849-848f69b86260', 'f10448dd-6dfe-11e9-8849-848f69b86260', 'image006.jpg', 1, 'dcvnps', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 20:42:25', '2019-06-26 20:42:25'),
('7cb6ceb4-6eb2-11e9-8849-848f69b86260', 'f10448dd-6dfe-11e9-8849-848f69b86260', 'image007.jpg', 0, 'dcvnps', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 20:42:25', '2019-06-26 20:42:25'),
('7cb6d0c8-6eb2-11e9-8849-848f69b86260', 'f10448dd-6dfe-11e9-8849-848f69b86260', 'image008.jpg', 0, 'dcvnps', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 20:42:25', '2019-06-26 20:42:25'),
('7cb6d21c-6eb2-11e9-8849-848f69b86260', 'f10448dd-6dfe-11e9-8849-848f69b86260', 'image009.jpg', 0, 'dcvnps', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 20:42:25', '2019-06-26 20:42:25'),
('7cb6d363-6eb2-11e9-8849-848f69b86260', 'f10448dd-6dfe-11e9-8849-848f69b86260', 'image010.jpg', 1, 'dcvnps', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 20:42:25', '2019-06-26 20:42:25'),
('7cb6d49b-6eb2-11e9-8849-848f69b86260', 'f10448dd-6dfe-11e9-8849-848f69b86260', 'image011.jpg', 0, 'dcvnps', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 20:42:25', '2019-06-26 20:42:25'),
('7d19874b-57db-4809-b552-725e587869af', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Đánh Côn dài..jpg', 0, 'kim.luong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('7dd3d5eb-2cd1-4fac-98ea-3bd2637ee07c', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '04 phi thuyen 4.jpg', 1, 'phuong.doan', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('7efc807c-d6de-4bf8-9b66-8247f7f75dc1', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'Tran-Flower2.jpg', 1, 'mai.huong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:37', '2020-02-21 17:38:37'),
('7f44f313-674b-4c70-88fc-bbd25eacaf1f', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'eagle3.jpg', 0, 'diane.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('813825c1-1b30-455f-8c88-bcd962ac9ecb', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'sen_7.jpg', 0, 'thanh.cao', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:14', '2020-02-21 13:11:14'),
('81664969-8cfd-4efb-a9b5-4590ef53bc5b', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '6.jpg', 0, 'lan.anh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('82626be0-bec0-464c-ab23-1c2c9479a2b2', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'SpringFlower.jpg', 0, 'dang.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('82c8a268-84f6-464a-8589-c6f5a28d2849', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '02 DSMK1.jpg', 0, 'to.yen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:12', '2020-02-21 13:11:12'),
('832f399b-6d11-4526-b39b-d07aae381c92', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'sen_1.jpg', 1, 'thanh.cao', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:14', '2020-02-21 13:11:14'),
('84950394-ee6b-4317-bdc8-55a8e7217cc5', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Picture01.jpg', 0, 'chau.le', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:00:10', '2020-02-21 13:00:10'),
('84e64e39-923e-47f8-9e8b-63b7a59549cd', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'BichQuyen1.jpg', 0, 'bich.quyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:17:07', '2020-02-21 12:17:07'),
('858793d8-2d47-4ba8-b240-f49d48488d5c', 'e8104b61-6dfe-11e9-8849-848f69b86260', '352A5881.jpg', 1, 'nghia.le', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('85b53dcb-a01f-4902-aea2-1a4efe9b7da6', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'DSC04560-1.jpg', 0, 'thuy.auduong', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('876adba3-fd12-4a09-b319-f177a4ba8206', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Son Tra.jpg', 0, 'anh.nguyen', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('88156ce2-18a2-4888-8210-0306c3e09f7f', 'eedc7f28-6dfe-11e9-8849-848f69b86260', '2 v2.jpg', 0, 'duc.lam', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:36', '2020-02-21 17:38:36'),
('8ac51d47-59dd-11ea-9d8d-0cc47ac1ac6e', 'd63a6b38-6dfe-11e9-8849-848f69b86260', 'home08.jpg', 0, 'vnps.home', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-07-27 16:32:10', '2019-07-27 16:32:10'),
('8d678a72-5c13-4c4b-a6a1-c07f7550e973', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'CTran-DSC02743.jpg', 0, 'mai.huongc', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:44:43', '2020-02-21 17:44:43'),
('8da3da37-9711-4511-ac69-7d26c2801872', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'GoldDCbyNightSping.jpg', 0, 'bich.dinh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:32', '2020-02-21 14:16:32'),
('8e3a3ca1-fb85-4d33-86ba-a85a43dd7acb', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '1.jpg', 1, 'bich.quyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:17:08', '2020-02-21 12:17:08'),
('8e589909-9e91-4005-94ec-96636a0c6fc2', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'My Breakfast Menu Is Fresh Fish.jpg', 1, 'hai.ngo', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('8ec7ab4a-0bbf-4b5f-bd77-ca8bc3acf2de', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Image5.jpg', 0, 'dien.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('8f52949e-082b-4f69-9bbd-fc5b279aaaa3', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Falling Water.jpg', 0, 'hien.le', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('8f7669e3-9173-420b-b2c3-961e32e257be', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Picture3.jpg', 0, 'chau.le', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:00:10', '2020-02-21 13:00:10'),
('9025673b-a309-40ef-8cdd-ffc4f2874cbb', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Snow In Autumn.jpg', 0, 'minh.tan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 11:46:48', '2020-02-21 11:46:48'),
('90d61da4-929a-43f2-9fe1-f8f8caaf8021', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'A1.jpg', 0, 'my.van', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('910ba991-59dd-11ea-9d8d-0cc47ac1ac6e', 'd63a6b38-6dfe-11e9-8849-848f69b86260', 'home09.jpg', 0, 'vnps.home', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-07-27 16:32:10', '2019-07-27 16:32:10'),
('913d7fac-c7e4-44f6-bf85-3057e9d55324', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'X1A0195 v2 copy.jpg', 1, 'kieu.lan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 11:59:30', '2020-02-21 11:59:30'),
('91683db7-bfb7-4ed6-ba9d-f06c8d84ec49', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Ice Photography.jpg', 1, 'christine.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 11:21:10', '2020-02-21 11:21:10'),
('918ac72f-1932-4dea-ace8-e39d8b86188b', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'Sunrise at the pier-HM.jpg', 0, 'jennifer.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:36', '2020-02-21 17:38:36'),
('922c0511-6589-4e9f-8a88-1eee490c5d7b', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Flowering Dogwood.jpg', 1, 'minh.tan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 11:46:47', '2020-02-21 11:46:47'),
('940b2fd9-f01e-4e6c-b309-9b7e6fbf8013', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Bird in Action.jpg', 0, 'hai.ngo', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('948def55-fe9f-43fd-9b3a-32ed69fd92b1', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Trompe oeil.jpg', 0, 'christine.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('97559884-aef5-4376-9360-4c3d7b0d18dd', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Darren 10.jpg', 0, 'darren.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('98441ee6-b5fb-4514-a192-f70ad78354e4', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Image6.jpg', 0, 'dien.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('986b38aa-c9e3-4a6f-9384-694c616190e7', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '5YellowWhiteScarf.jpg', 0, 'anna.vu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:16:10', '2020-02-21 12:16:10'),
('99fb6a6e-c7b8-43c7-9d93-31a96f06fc66', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '03 phi thuyen 3.jpg', 1, 'phuong.doan', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('9a355559-f136-401a-8e83-45d5dfe0d1a1', 'b6a0bff0-fc18-4023-aa13-7b181b675684', 'S8-184657.jpg', 0, 'henry.nguyen', '2019', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-05-05 23:16:08', '2020-05-05 23:16:08'),
('9b15c34b-fa93-44a4-ab37-43e8cbb296d7', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Image.jpg', 0, 'dien.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('9b3f8252-8df5-4d16-a5fa-cab40f444ca0', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '09 phi thuyen 9.jpg', 1, 'phuong.doan', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:12', '2020-02-21 13:11:12'),
('9b44969b-9915-49e4-929a-97de4e5e6ba7', 'eedc7f28-6dfe-11e9-8849-848f69b86260', '1776.jpg', 0, 'dung.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:36', '2020-02-21 17:38:36'),
('9b972825-fc43-4d12-a3f7-ef9957eb780d', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '01 DSMK.jpg', 0, 'phuong.nhi', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:32:25', '2020-02-21 12:32:25'),
('9ba01fc0-b0ad-11e9-a270-08002764505e', 'd63a6b38-6dfe-11e9-8849-848f69b86260', 'home00.jpg', 0, 'vnps.home', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-07-27 16:32:10', '2019-07-27 16:32:10'),
('9cb82f80-a992-4bd3-b622-37a88b233a35', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'DSC09006.jpg', 1, 'thuan.anh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:39', '2020-02-21 17:38:39'),
('9cfb621a-571b-4b78-ae33-bf4f709f269a', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'Butterfly.jpg', 0, 'my.phuong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:37', '2020-02-21 17:38:37'),
('9d20a9c3-7953-41f8-8a6f-baba74e7579c', 'eedc7f28-6dfe-11e9-8849-848f69b86260', '_VTV4939.jpg', 0, 'tony.trac', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:39', '2020-02-21 17:38:39'),
('9e6933e5-b0ad-11e9-a270-08002764505e', 'd63a6b38-6dfe-11e9-8849-848f69b86260', 'home01.jpg', 0, 'vnps.home', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-07-27 16:32:14', '2019-07-27 16:32:14'),
('9fb57503-b0ad-11e9-a270-08002764505e', 'd63a6b38-6dfe-11e9-8849-848f69b86260', 'home02.jpg', 0, 'vnps.home', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-07-27 16:32:16', '2019-07-27 16:32:16'),
('9ffd3939-a7b6-45ef-9c00-8af93e0844dc', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Darren 3.jpg', 0, 'darren.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('a05b4949-6ef4-436e-b7cb-48dff5ef4e2f', 'e8104b61-6dfe-11e9-8849-848f69b86260', '1U7A1127-Rain.jpg', 0, 'dolinh.dz', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:42:49', '2020-02-22 11:42:49'),
('a0aaedfa-a5f7-4d3f-a1b7-e21a5aa955f8', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'TruongThanh.jpg', 0, 'le.luu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('a1505073-4f05-4a59-99a0-6c70ae25fbde', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Hoa sen 2.jpg', 0, 'steven.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('a152cf68-f82f-4e39-928e-8dcfb3c666b8', 'ecdee564-6dfe-11e9-8849-848f69b86260', '1 Lotus Bud.jpg', 0, 'hai.pham', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('a259aadd-4cc8-4000-a813-937bfe50f588', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '12_Pine Apple_Thom.jpg', 1, 'phuoc.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:54:42', '2020-02-21 13:54:42');
INSERT INTO `galleryphotos` (`galleryPhotoId`, `galleryId`, `photo`, `portrait`, `author`, `year`, `updatedUserId`, `createdDate`, `updatedDate`) VALUES
('a2d7473e-6c12-4982-af42-c862ec359de2', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'DSC06597 (PS)  2 (PL3) (18 x 12).jpg', 0, 'ngan.ngo', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:15', '2020-02-21 12:46:15'),
('a42079dc-45de-430a-a0d6-ac9672bc3134', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'DoanLuHanh.jpg', 0, 'minh.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('a42eec0b-3d5e-48f6-a22a-92880e81fbf7', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '5.jpg', 0, 'nghi.bui', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:11', '2020-02-21 13:11:11'),
('a4a44a50-798a-4ab7-b89b-8399c6f59a1a', 'eedc7f28-6dfe-11e9-8849-848f69b86260', '3773.jpg', 0, 'ngoc.tram', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:37', '2020-02-21 17:38:37'),
('a55f4571-91ce-484f-bbc4-4faf7dff7137', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'X1A0195 v2 copy4.jpg', 0, 'kieu.lan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 11:59:29', '2020-02-21 11:59:29'),
('a5c667ab-1c93-4826-a51f-0efb1be6e167', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '01 DSMK.jpg', 0, 'to.yen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:12', '2020-02-21 13:11:12'),
('a61393aa-b0ad-11e9-a270-08002764505e', 'd63a6b38-6dfe-11e9-8849-848f69b86260', 'home03.jpg', 0, 'vnps.home', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-07-27 16:32:27', '2019-07-27 16:32:27'),
('a6aeb87b-f7e2-43c3-82c9-df279c2a0a1c', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Chi Mai.jpg', 0, 'thuy.auduong', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('a6bf8751-b0ad-11e9-a270-08002764505e', 'd63a6b38-6dfe-11e9-8849-848f69b86260', 'home04.jpg', 0, 'vnps.home', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-07-27 16:32:28', '2019-07-27 16:32:28'),
('a7980fb9-0a74-4d68-bbab-0993fffb373e', 'e8104b61-6dfe-11e9-8849-848f69b86260', '352A3918.jpg', 0, 'bich.van', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('a7a32cb9-b0ad-11e9-a270-08002764505e', 'd63a6b38-6dfe-11e9-8849-848f69b86260', 'home05.jpg', 0, 'vnps.home', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-07-27 16:32:30', '2019-07-27 16:32:30'),
('a7ad3697-1a5c-4199-9139-baf92c70ed98', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'IMG_0069.jpg', 1, 'tu.hoan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('a7d1d9cc-8008-4c21-8523-b873a07b93c0', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'IMG_0219.jpg', 1, 'tu.hoan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('a7ea7cf9-f1a0-4046-a724-7cdd218c0976', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Quay to.jpg', 0, 'chinh.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('a8065c95-b0ad-11e9-a270-08002764505e', 'd63a6b38-6dfe-11e9-8849-848f69b86260', 'home06.jpg', 0, 'henry.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-07-27 16:32:30', '2019-07-27 16:32:30'),
('a81119a4-dcb6-4fec-b3b8-9449c368e175', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Guggenhem museum.jpg', 0, 'dzung.nguyen', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('a8f47562-cd2b-4222-8d58-b7628c2e45cb', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '07 phi thuyen 7.jpg', 1, 'phuong.doan', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('a9140ad2-aadc-4a1d-bc20-26c0c7957eb5', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Talaber4.jpg', 0, 'diane.thanhnhu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('a9cf96b9-3444-41a6-9dc6-18b994460f5b', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'trai dau.jpg', 0, 'son.nguyen', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('aa08d34e-85af-488d-8b53-dcfeb3046521', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Eagle catching fish.jpg', 0, 'yen.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('aaac5412-89fd-41ac-91e1-9847899617ff', 'eedc7f28-6dfe-11e9-8849-848f69b86260', '_VTV5460.jpg', 0, 'tony.trac', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:39', '2020-02-21 17:38:39'),
('ab083def-8a34-41e3-8bb3-2c595b807659', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Tulips_VuonHoa.jpg', 0, 'andy.tran', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('ab3d9364-be70-4916-8787-6a83c646774d', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '4_Pomegranate_Trai Luu.jpg', 1, 'phuoc.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:54:41', '2020-02-21 13:54:41'),
('abe6eebd-2630-4ce9-b716-134fbcfc58d9', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'HBs.jpg', 0, 'yen.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('aca2953e-91b3-460c-afcc-997a911965cf', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Darren 4.jpg', 0, 'darren.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('af752080-b46f-4f4b-acba-b3522faa594a', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'HB & flower.jpg', 0, 'yen.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('afc6d4ea-fa92-40a7-827d-786a3ae75ba5', 'e8104b61-6dfe-11e9-8849-848f69b86260', '3E0A6044.jpg', 1, 'nghia.le', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('b09dee56-51b2-46a8-8a4c-ea2644f298f7', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Nguong cua.jpg', 0, 'bai.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:11:57', '2020-02-21 12:11:57'),
('b0cc8406-23c5-4924-bcb3-d7f804dcb7db', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'foto3.jpg', 0, 'minh.trac', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('b1796363-096c-42d7-a4b8-fb0b016db5b0', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Image3.jpg', 0, 'dien.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('b1dc3873-77b3-429f-a543-ca65074edd8a', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'Empty Sky.jpg', 0, 'my.phuong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:37', '2020-02-21 17:38:37'),
('b1ff1e22-4907-46b5-9d78-9b408957e957', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '1_Strawberry_Dau.jpg', 1, 'phuoc.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:54:41', '2020-02-21 13:54:41'),
('b2768a9a-5c2d-41ce-8090-4feffcb92f75', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'SilverTuổi Thơ.jpg', 0, 'trong.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:35', '2020-02-21 14:16:35'),
('b36b4ae8-52b5-4a7c-85cb-81479e91199a', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'VietnameseMM2.jpg', 0, 'phuong.thao', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('b3f31024-cdad-45e9-a3c0-e972ab07dda8', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '9_Hoa Lan Green.jpg', 0, 'bao.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:16:45', '2020-02-21 12:16:45'),
('b3f6736b-dca6-4eb2-8a2a-32fc6d001a6a', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'CÁT BIỂN.jpg', 1, 'hong.thai', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('b519c1b4-c4e7-4d29-916c-1552101ad9fc', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'We miss you2.jpg', 0, 'le.thien', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('b62556b7-701d-4cff-a71b-b4f6f03e7627', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'VN.jpg', 0, 'anh.nguyen', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('b749a5a5-8912-4e1c-8929-e2636e7139d1', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Thay Dinh.jpg', 0, 'dinh.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:13:50', '2020-02-21 12:13:50'),
('b80dcbb2-eca6-4c1e-a58f-5ac1889b42f3', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '2redscarf.jpg', 0, 'anna.vu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:16:10', '2020-02-21 12:16:10'),
('b912e203-6b24-4a17-8d22-a23907e85252', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Picture7.jpg', 0, 'chau.le', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:00:09', '2020-02-21 13:00:09'),
('b92c01c5-d6a3-4738-95d8-18af6f70cd74', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Darren 1-Cover.jpg', 0, 'darren.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('b9e0464c-f0ce-4a3f-9bb1-36934c9df466', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Tulips_CayHoa.jpg', 0, 'andy.tran', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:32', '2020-02-21 14:16:32'),
('ba076f74-59ea-447e-a687-cc2e8aac2c59', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Helsinki-Final.jpg', 0, 'dolinh.dz', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:42:49', '2020-02-22 11:42:49'),
('bc01b1ce-ed09-4f3d-87e4-eabad00402a5', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Picture5.jpg', 0, 'chau.le', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:00:09', '2020-02-21 13:00:09'),
('bc66a27c-54ae-4751-a5db-d8fefe72ef81', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '03 DSMK.jpg', 0, 'phuong.nhi', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:32:25', '2020-02-21 12:32:25'),
('bc864ba4-9a47-41c2-9e70-8ed691862b81', 'eedc7f28-6dfe-11e9-8849-848f69b86260', '_3156.jpg', 0, 'dung.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:36', '2020-02-21 17:38:36'),
('be4aa2d2-5b57-4b9a-8bf4-2e6e78e43201', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Somewhere in New York.jpg', 0, 'christine.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 11:21:09', '2020-02-21 11:21:09'),
('c04f0975-cc01-4734-a4cc-b8e1fd56860d', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'chandung.jpg', 1, 'son.nguyen', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('c1ccad66-919e-44b0-99d6-c087f2560abf', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'The vessel.jpg', 1, 'dzung.nguyen', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('c1ed643d-d8f7-40a4-814b-74937a81f390', 'eedc7f28-6dfe-11e9-8849-848f69b86260', '1816.jpg', 0, 'dung.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:36', '2020-02-21 17:38:36'),
('c232e8b0-c7f6-4331-b63b-f1c23ccfbfd3', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'I miss you Dad.jpg', 0, 'le.thien', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('c2683e1b-0e02-402c-998a-2e8764cdab77', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Buom2.jpg', 1, 'helene.loc', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('c3a90423-8deb-4647-8c73-9a1830f076b9', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '2-KN.jpg', 1, 'kim.nguyet', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('c4378bf7-cb87-43c1-aa31-abac46078f0d', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Pic7.jpg', 0, 'thuy.phuong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:18:09', '2020-02-21 13:18:09'),
('c52a28b5-a610-4abb-ac27-ec9945881f48', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'sen_3.jpg', 0, 'thanh.cao', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('c56eb8c5-39c0-4144-8e3b-b6418bdf353a', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'DSC00743 (PS) 1 (18x12).jpg', 0, 'ngan.ngo', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:15', '2020-02-21 12:46:15'),
('c84d1e5a-1646-4892-a06e-f0f2d96896bc', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'SydneyLight3.jpg', 0, 'phillip.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('c90afc19-ffc4-46d5-baa2-d305ff6be5ea', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '4.jpg', 0, 'nghi.bui', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:11', '2020-02-21 13:11:11'),
('c9c9e33b-8cb1-4e72-a897-8a0d2857ef07', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Curiosity.jpg', 0, 'diem.tran', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('cade667e-d4c9-43fd-9381-d6ef27c9f96a', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '9_Dau Bap.jpg', 1, 'phuoc.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:54:41', '2020-02-21 13:54:41'),
('cc024599-3e26-42fe-a7da-facefd3508cd', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Pic4.jpg', 0, 'thuy.phuong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:18:09', '2020-02-21 13:18:09'),
('cfe8c286-5638-4737-9704-7cd9f18ceeb5', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Green Heron.jpg', 0, 'kim.xuan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('d06938e9-d6a3-4a7f-aacc-eb722b356eed', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '08 phi thuyen 8.jpg', 1, 'phuong.doan', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('d1e2065f-9451-4ea3-9bd9-234bc795ec20', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'My_Travel_Destination_3.jpg', 0, 'oanh.trieu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:12', '2020-02-21 13:11:12'),
('d2edc6e1-7fe8-43b8-a310-50d78b7c7f69', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Get Sketchy.jpg', 0, 'quynh.giao', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('d3306021-bee7-46d1-a80c-192ad5a1f53e', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Image7.jpg', 0, 'dien.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('d3695134-a922-4598-a328-ac1ea66eedb8', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Image2.jpg', 0, 'dien.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('d43b052a-9f0c-479e-ba6a-edc5b26c1ff8', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'SpringFlower 2.jpg', 0, 'dang.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('d4a8db1f-3af5-49e0-9208-0c287b15531e', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Flower 1.jpg', 1, 'kieu.lan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('d4aef15a-5594-4079-af92-dadcbbef9634', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '2.jpg', 0, 'lan.anh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:15', '2020-02-21 12:46:15'),
('d7034998-60db-4653-90d7-9ed6712682f0', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Blue Heron.jpg', 0, 'kim.xuan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('d70efc9e-ded3-45ee-b513-4096193d4a68', 'eedc7f28-6dfe-11e9-8849-848f69b86260', '1299.jpg', 0, 'thuan.anh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:39', '2020-02-21 17:38:39'),
('d8854dd0-0a88-4b5a-87c9-7f4f3c56117b', 'b6a0bff0-fc18-4023-aa13-7b181b675684', 'A77-00166.jpg', 0, 'henry.nguyen', '2020', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-05-03 23:18:31', '2020-05-03 23:18:31'),
('d957c02a-ec29-4777-a792-d1963b1c3ed5', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Silence1.jpg', 0, 'tong.mai', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('d99093a2-f219-4e48-8e7a-cfcb3150e6f5', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Image4.jpg', 0, 'dien.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('d9cac94c-cb0c-4637-be45-de53ccb6b321', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'My_Travel_Destination_5.jpg', 0, 'oanh.trieu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:11', '2020-02-21 13:11:11'),
('ddae9f69-589d-4157-bd6a-b5af02242c4b', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'IMG_0624 (3).jpg', 1, 'dominick.dinh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('ddcb1231-5ab9-47cc-87ce-598655aec809', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'eagle1.jpg', 0, 'diane.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('de7c7ffe-cf4b-47f9-b745-0cfb1bfab627', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Lotus Blooming Stage.jpg', 0, 'hai.pham', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('df07c7da-a3c3-486b-a0a2-de39e9b5068b', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Darren 6.jpg', 0, 'darren.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('e0e9ee65-5e27-449f-a54f-ff8023cba2d3', 'e8104b61-6dfe-11e9-8849-848f69b86260', '3.jpg', 1, 'ty.auduong', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('e0ef3014-c1fb-495a-8c1b-47040b4394e3', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '7.jpg', 0, 'lan.anh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('e164758e-6076-4256-a346-a217f35e1a10', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Coffee.jpg', 0, 'thuy.auduong', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('e1c44ec7-375f-4216-8052-8abba033e312', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'Shoes on the Danube Bank.jpg', 0, 'thao.vu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:37', '2020-02-21 17:38:37'),
('e205825f-612c-4454-8e31-b9d643db8370', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Hoa Cuc Hong.jpg', 0, 'bao.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:16:44', '2020-02-21 12:16:44'),
('e4167252-6996-4913-a0ae-6fa03683f59e', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Picture4.jpg', 0, 'chau.le', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:00:10', '2020-02-21 13:00:10'),
('e51fe15b-59de-11ea-9d8d-0cc47ac1ac6e', 'd63a6b38-6dfe-11e9-8849-848f69b86260', 'home07.jpg', 0, 'vnps.home', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-07-27 16:32:10', '2019-07-27 16:32:10'),
('e55fdcca-08a7-46a4-8c9a-410bc65fef7d', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Le Vert Paradis.jpg', 1, 'hien.le', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('e586780c-9e75-4c4c-b870-a41fc584e3c7', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'My_Travel_Destination_1.jpg', 0, 'oanh.trieu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:11', '2020-02-21 13:11:11'),
('e5a47656-6e1d-498c-b6b6-fd6febe50b05', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'Surfing.jpg', 0, 'my.phuong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:37', '2020-02-21 17:38:37'),
('e69a48b4-4e79-4564-beb0-62ecff64139f', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'foto1.jpg', 0, 'minh.trac', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('e6c8b86c-5303-4035-ade9-4f8fa4b4e9bd', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '4.jpg', 0, 'lan.anh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('e7a7d7d1-55ac-4b69-b80a-def8ce645965', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Darren 2.jpg', 0, 'darren.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('e7b08fbe-11f0-4584-ad96-70438a37b180', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'BichQuyen6.jpg', 1, 'bich.quyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:17:07', '2020-02-21 12:17:07'),
('e7b8fbe7-2dfe-4d8c-b4ea-d0e0d4de8e54', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'Manhattan at night-HM.jpg', 0, 'jennifer.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:36', '2020-02-21 17:38:36'),
('e7e926d3-6c96-4caa-a021-e301814cee31', 'e8104b61-6dfe-11e9-8849-848f69b86260', '2.jpg', 0, 'ty.auduong', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('e82e4f8f-4eaa-42bb-9c90-4ea38d9ca39f', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '7.jpg', 0, 'nghi.bui', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:11', '2020-02-21 13:11:11'),
('e858d163-6380-4f69-9742-9c6233d61fea', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '02.jpg', 0, 'cam.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('e872f34c-8e61-4130-854b-8791f6a636d3', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Hoa sen 3.jpg', 0, 'steven.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('e8b4c365-0311-417d-b114-52d9d2e7cab3', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'DSC03631 (PS) (HDR) (18x12).jpg', 0, 'ngan.ngo', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:15', '2020-02-21 12:46:15'),
('e8e452bc-e729-4bdf-8e8d-653eb51db771', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'Tran-1110084.jpg', 0, 'mai.huong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:37', '2020-02-21 17:38:37'),
('e8fefb94-73b9-4d1f-89b3-752ae5aab1fe', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '08 Bien va ly.jpg', 0, 'cam.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:13', '2020-02-21 12:46:13'),
('e9098c19-ee07-4cc7-bb5a-b0d4cf20c3d9', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '3_Onion.jpg', 1, 'phuoc.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:54:41', '2020-02-21 13:54:41'),
('e9150668-f242-46eb-b3fe-c43b6ef5e7e3', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '02 phi thuyen 2.jpg', 1, 'phuong.doan', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('e991a32c-c42c-4b55-a61b-0ab5e5422fb7', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'GoldDCbyNightWinter.jpg', 0, 'bich.dinh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:32', '2020-02-21 14:16:32'),
('e9a88f9a-957a-4875-bde6-614a3d97d100', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'mot thoang que huong.jpg', 0, 'thu.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:39', '2020-02-21 17:38:39'),
('ea7b5b20-c6f3-41bc-bdb2-67bfadda2743', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Darren 7.jpg', 0, 'darren.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('eb1d7852-6b51-4dc3-89e3-00ed299ecbd1', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Gerbera Daisy Flower_Hoa Cuc Dong  Tien.jpg', 0, 'bao.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:16:45', '2020-02-21 12:16:45'),
('eb52eb8d-7c59-45bf-b417-4feb72df6471', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Ban ruou.jpg', 0, 'cam.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:13', '2020-02-21 12:46:13'),
('ec3a2391-7d1a-4c9f-a1da-449690f1c4e8', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'BichQuyen5.jpg', 0, 'bich.quyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:17:07', '2020-02-21 12:17:07'),
('ed64b2c5-3d70-4969-88e0-e7922bbd6560', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '4ColorScarf.jpg', 0, 'anna.vu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:16:10', '2020-02-21 12:16:10'),
('ed89cc53-d429-4fc1-8ced-fef6601b98ee', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Egret.jpg', 0, 'kim.xuan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('ef31561d-115c-4b64-8bf9-e0dbe45c4a67', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Pic8.jpg', 0, 'thuy.phuong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:18:09', '2020-02-21 13:18:09'),
('efe9e6b4-5fd1-41fb-aa30-b0fd92303416', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'Budapest at night.jpg', 0, 'thao.vu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:37', '2020-02-21 17:38:37'),
('f0097b53-dccb-410f-8951-f51daa35aa84', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '12 phi thuyen 12.jpg', 1, 'phuong.doan', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('f0235f45-9313-4aa9-8ee0-119bdfaee95b', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'IMG_0441.jpg', 1, 'tu.hoan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:45', '2020-02-22 11:30:45'),
('f0a28f1a-c594-4e7c-ac9f-2719192b0866', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Pic3.jpg', 0, 'thuy.phuong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:18:09', '2020-02-21 13:18:09'),
('f11ff04c-8b52-4b35-a1dd-ebc0cff1da6f', 'b6a0bff0-fc18-4023-aa13-7b181b675684', 'A77-00069.jpg', 1, 'henry.nguyen', '2020', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-05-03 17:00:13', '2020-05-03 17:00:13'),
('f137bde7-5bb5-4a4b-9056-f85a7f000dae', 'eedc7f28-6dfe-11e9-8849-848f69b86260', '4632 PS.jpg', 1, 'jennifer.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:38:36', '2020-02-21 17:38:36'),
('f238b8fc-7e7a-4757-bf26-84d2feb3276f', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'SilverTrưởng Thành.jpg', 0, 'trong.nguyen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:35', '2020-02-21 14:16:35'),
('f27e1657-60f2-44a8-8f85-ea6b78381046', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Múa Quyền.jpg', 0, 'kim.luong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('f2d0467a-0b87-4eac-b7a3-efaf0f617412', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'White-Tailed Kite Food Transfered.jpg', 0, 'minh.tan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 11:46:48', '2020-02-21 11:46:48'),
('f2dc7afa-cbf3-4085-af08-800ce538e9e3', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Dạ Môn.jpg', 1, 'bai.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:11:57', '2020-02-21 12:11:57'),
('f3963ad1-0014-41ba-b0e7-48551da5152b', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Talaber3.jpg', 0, 'diane.thanhnhu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('f39946b1-c67d-4301-a06c-af03f983411c', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '01 phi thuyen 1.jpg', 1, 'phuong.doan', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('f3bc0c35-759e-4577-95ae-3918c5ff071b', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Housekeepers Tricycle.jpg', 0, 'christine.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 11:21:10', '2020-02-21 11:21:10'),
('f3cbae72-f021-474c-8b8b-245ce5f5f01e', 'b6a0bff0-fc18-4023-aa13-7b181b675684', 'A6000-03822.jpg', 0, 'henry.nguyen', '2020', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-05-03 23:39:55', '2020-05-03 23:39:55'),
('f4060409-a40c-4810-a755-2539a52efd07', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'My_Travel_Destination_4.jpg', 0, 'oanh.trieu', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:12', '2020-02-21 13:11:12'),
('f43cf06a-a41a-4187-82be-a4dc6f1b9209', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'A2.jpg', 1, 'my.van', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('f49816cf-3a61-44f3-9292-b1cb7be4a059', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Baby Stella.jpg', 1, 'kieu.dang', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('f4a34872-6f7b-44f1-aa10-d48c149c8aac', 'e8104b61-6dfe-11e9-8849-848f69b86260', ' NY museum.jpg', 0, 'christine.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('f502eaa6-165e-400a-92c8-936130f82d9c', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'In The Eyes Of The Beholder.jpg', 0, 'bich.ngoc', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('f5516642-d8b6-48f3-9e16-c3d0674757ae', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Picture2.jpg', 0, 'chau.le', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:00:10', '2020-02-21 13:00:10'),
('f5692478-cae6-434e-b157-7c00f19ce84d', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Thay Dinh 2.jpg', 0, 'dinh.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:13:49', '2020-02-21 12:13:49'),
('f5bd8cd5-8a36-4e66-a0bb-0316fc6b6c57', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'White Tail Kite With Mouse.jpg', 0, 'minh.tan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 11:46:48', '2020-02-21 11:46:48'),
('f61c80b7-e633-49fe-ac18-86155f8a2fae', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '8.jpg', 1, 'nghi.bui', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:11', '2020-02-21 13:11:11'),
('f744dba9-1158-4c33-96d3-443de4ff88fb', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '08 DSMK.jpg', 0, 'to.yen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:12', '2020-02-21 13:11:12'),
('f7585837-b993-11e9-be05-08002764505e', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'members_002.jpg', 0, 'binh.le', '2017', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-08-08 00:21:19', '2019-08-08 00:21:19'),
('f7601073-ca04-471a-b0fa-5dc127594765', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'IMG_6984 (3).jpg', 1, 'dominick.dinh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:46:14', '2020-02-21 12:46:14'),
('f86d8a1f-a656-41cd-b986-d20202adbf48', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Pic1.jpg', 0, 'thuy.phuong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:18:09', '2020-02-21 13:18:09'),
('f898c4a1-e508-4705-a415-ee8d30ee5b74', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Ca Rang.jpg', 0, 'anh.nguyen', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('f8df332c-514c-41c5-931f-8688da468d05', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '05 phi thuyen 5.jpg', 1, 'phuong.doan', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('f8eb661b-d1a0-45bf-b919-6d3f41df1897', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'The Vessel\'s Ceiling NY.jpg', 0, 'dzung.nguyen', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:44', '2020-02-22 11:30:44'),
('f947dad4-0a05-4130-b815-7f88bf610c3b', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '5_Tomato.jpg', 1, 'phuoc.huynh', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:54:41', '2020-02-21 13:54:41'),
('f9e23002-3e9d-498a-aae2-ca56219c9213', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Satisfaction.jpg', 0, 'diem.tran', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:33', '2020-02-21 14:16:33'),
('fa373f29-918e-4974-b520-5ba57f556e12', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Nhom cui.jpg', 0, 'chinh.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('fa3e87bc-c5a5-4084-8dc2-9a7e5df2fa0f', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '07 DSMK.jpg', 0, 'phuong.nhi', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:32:25', '2020-02-21 12:32:25'),
('fb55039c-19bc-4da9-b55e-4e8c750946df', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '10 phi thuyen 10.jpg', 1, 'phuong.doan', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('fb86fc00-3ac3-448b-a812-f9dad473dd5c', 'b6a0bff0-fc18-4023-aa13-7b181b675684', 'A7-03678.jpg', 0, 'henry.nguyen', '2019', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-05-05 23:16:08', '2020-05-05 23:16:08'),
('fbf6f108-8c85-4955-b5b7-6a43ae9bcce6', 'eac81e4c-6dfe-11e9-8849-848f69b86260', '07 DSMK.jpg', 0, 'to.yen', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 13:11:13', '2020-02-21 13:11:13'),
('fcadc815-a6bc-4d6e-b111-218b7715745d', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'CTran-DSC02109.jpg', 0, 'mai.huongc', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:44:43', '2020-02-21 17:44:43'),
('fdd22cf0-be57-47fe-a8e8-5cb46de30d83', 'ecdee564-6dfe-11e9-8849-848f69b86260', 'Múa Kiếm.jpg', 0, 'kim.luong', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 14:16:34', '2020-02-21 14:16:34'),
('fe059447-7aa9-4a0e-8b86-84baff86b3ed', 'e8104b61-6dfe-11e9-8849-848f69b86260', ' Resting at the Beach.jpg', 0, 'christine.tran', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43'),
('fe605195-52d5-4f70-944a-0a7cd55da53a', 'eedc7f28-6dfe-11e9-8849-848f69b86260', 'New Church.jpg', 0, 'michelle.pham', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 17:42:08', '2020-02-21 17:42:08'),
('fe88450e-a608-4db9-990c-44400f8b6265', 'eac81e4c-6dfe-11e9-8849-848f69b86260', 'Lily Orange_Hoa Loa Ken.jpg', 0, 'bao.ha', '2019', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-21 12:16:45', '2020-02-21 12:16:45'),
('ff9e35af-2a68-4ad8-b23e-1779c040c762', 'e8104b61-6dfe-11e9-8849-848f69b86260', 'Poppy.jpg', 1, 'kieu.lan', '2020', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:30:43', '2020-02-22 11:30:43');

-- --------------------------------------------------------

--
-- Table structure for table `operations`
--

CREATE TABLE `operations` (
  `operationId` varchar(36) NOT NULL,
  `operationType` varchar(45) NOT NULL,
  `operationCode` varchar(30) NOT NULL,
  `operationDesc` varchar(200) NOT NULL,
  `updatedUserId` varchar(36) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `operations`
--

INSERT INTO `operations` (`operationId`, `operationType`, `operationCode`, `operationDesc`, `updatedUserId`, `createdDate`, `updatedDate`) VALUES
('1cfed262-40a8-11ea-8030-08002764505e', 'upload', 'UPLDLVL3', 'Upload Photo to Level3 Gallery', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-01-26 20:55:37', '2020-01-26 20:55:37'),
('70830490-40a8-11ea-8030-08002764505e', 'upload', 'UPLDMBMR', 'Upload Photo to Member Gallery', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-01-26 20:57:57', '2020-01-26 20:57:57'),
('718339f9-40a8-11ea-8030-08002764505e', 'upload', 'UPLDLVL1', 'Upload Photo to Level3 Gallery', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-01-26 20:57:59', '2020-01-26 20:57:59'),
('725208a7-40a8-11ea-8030-08002764505e', 'upload', 'UPLDLVL2', 'Upload Photo to Level2 Gallery', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-01-26 20:58:00', '2020-01-26 20:58:00'),
('c69c3fce-40a9-11ea-8030-08002764505e', 'upload', 'UPLDALL', 'Upload Photo to All Gallery', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-01-26 21:07:31', '2020-01-26 21:07:31');

-- --------------------------------------------------------

--
-- Table structure for table `orderItems`
--

CREATE TABLE `orderItems` (
  `orderItemId` varchar(36) NOT NULL,
  `orderId` varchar(36) NOT NULL,
  `amount` decimal(10,0) NOT NULL DEFAULT '0',
  `currencyCode` varchar(5) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `merchantId` varchar(36) NOT NULL,
  `merchantEmailAddress` varchar(300) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedUserId` varchar(45) NOT NULL DEFAULT 'dcvnps',
  `updatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` varchar(36) NOT NULL COMMENT 'paypal transaction id',
  `payerId` varchar(36) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedUserId` varchar(45) NOT NULL DEFAULT 'dcvnps',
  `updatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payers`
--

CREATE TABLE `payers` (
  `payerId` varchar(36) NOT NULL,
  `emailAddress` varchar(100) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `givenName` varchar(45) NOT NULL,
  `countryCode` varchar(5) DEFAULT NULL,
  `createdDate` datetime NOT NULL,
  `updatedUserId` varchar(45) NOT NULL DEFAULT 'dcvnps',
  `updatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `paymentId` varchar(36) NOT NULL COMMENT 'paypal payment id',
  `orderId` varchar(36) NOT NULL,
  `amount` varchar(32) NOT NULL,
  `currencyCode` varchar(10) NOT NULL,
  `paymentStatus` varchar(45) DEFAULT NULL,
  `createdDate` datetime NOT NULL,
  `updatedUserId` varchar(45) NOT NULL DEFAULT 'dcvnps',
  `updatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roleoperations`
--

CREATE TABLE `roleoperations` (
  `roleOperationId` varchar(36) NOT NULL,
  `roleId` varchar(36) NOT NULL,
  `operationId` varchar(36) NOT NULL,
  `updateUserId` varchar(45) DEFAULT 'dcvnps',
  `createdDate` datetime NOT NULL,
  `updatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` varchar(36) NOT NULL,
  `roleCode` varchar(45) NOT NULL,
  `roleDescription` varchar(45) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updateUserId` varchar(45) DEFAULT 'dcvnps',
  `updatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleCode`, `roleDescription`, `createdDate`, `updateUserId`, `updatedDate`) VALUES
('22278a31-40a7-11ea-8030-08002764505e', 'MBMRADM', 'Member Admin', '2019-06-26 21:07:41', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 21:07:41'),
('2a237c8e-40a7-11ea-8030-08002764505e', 'LVL3ADM', 'Level 3 Admin', '2019-06-26 21:07:41', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 21:07:41'),
('2d9526eb-40a7-11ea-8030-08002764505e', 'LVL2ADM', 'Level 2 Admin', '2019-06-26 21:07:41', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 21:07:41'),
('33122c2b-40a7-11ea-8030-08002764505e', 'LVL1ADM', 'Level 1 Admin', '2019-06-26 21:07:41', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 21:07:41'),
('3c4d5ca2-40a7-11ea-8030-08002764505e', 'SITEUSR', 'Site User', '2019-06-26 21:07:41', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 21:07:41'),
('3c4d5ecf-40a7-11ea-8030-08002764505e', 'SITEADM', 'Site Admin', '2019-06-26 21:07:41', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-06-26 21:07:41');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `fipsCode` int(11) NOT NULL,
  `stateCode` varchar(5) NOT NULL,
  `description` varchar(100) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedUserId` varchar(36) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`fipsCode`, `stateCode`, `description`, `createdDate`, `updatedUserId`, `updatedDate`) VALUES
(1, 'AL', 'Alabama', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(2, 'AK', 'Alaska', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(4, 'AZ', 'Arizona', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(5, 'AR', 'Arkansas', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(6, 'CA', 'California', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(8, 'CO', 'Colorado', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(9, 'CT', 'Connecticut', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(10, 'DE', 'Delaware', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(11, 'DC', 'District of Columbia', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(12, 'FL', 'Florida', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(13, 'GA', 'Georgia', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(15, 'HI', 'Hawaii', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(16, 'ID', 'Idaho', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(17, 'IL', 'Illinois', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(18, 'IN', 'Indiana', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(19, 'IA', 'Iowa', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(20, 'KS', 'Kansas', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(21, 'KY', 'Kentucky', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(22, 'LA', 'Louisiana', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(23, 'ME', 'Maine', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(24, 'MD', 'Maryland', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(25, 'MA', 'Massachusetts', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(26, 'MI', 'Michigan', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(27, 'MN', 'Minnesota', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(28, 'MS', 'Mississippi', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(29, 'MO', 'Missouri', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(30, 'MT', 'Montana', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(31, 'NE', 'Nebraska', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(32, 'NV', 'Nevada', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(33, 'NH', 'New Hampshire', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(34, 'NJ', 'New Jersey', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(35, 'NM', 'New Mexico', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(36, 'NY', 'New York', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(37, 'NC', 'North Carolina', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(38, 'ND', 'North Dakota', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(39, 'OH', 'Ohio', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(40, 'OK', 'Oklahoma', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(41, 'OR', 'Oregon', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(42, 'PA', 'Pennsylvania', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(44, 'RI', 'Rhode Island', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(45, 'SC', 'South Carolina', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(46, 'SD', 'South Dakota', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(47, 'TN', 'Tennessee', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(48, 'TX', 'Texas', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(49, 'UT', 'Utah', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(50, 'VT', 'Vermont', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(51, 'VA', 'Virginia', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(53, 'WA', 'Washington', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(54, 'WV', 'West Virginia', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(55, 'WI', 'Wisconsin', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(56, 'WY', 'Wyoming', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(72, 'PR', 'Puerto Rico', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27'),
(78, 'VI', 'Virgin Islands', '2019-12-22 22:48:27', 'bebc3980-c987-11e9-b193-08002764505e', '2019-12-22 22:48:27');

-- --------------------------------------------------------

--
-- Table structure for table `userclasses`
--

CREATE TABLE `userclasses` (
  `userClassId` varchar(36) NOT NULL,
  `userId` varchar(36) NOT NULL,
  `classId` varchar(36) NOT NULL,
  `year` int(11) NOT NULL,
  `createdUserId` varchar(36) NOT NULL DEFAULT 'bebc3980-c987-11e9-b193-08002764505e',
  `createdDate` datetime NOT NULL,
  `updatedUserId` varchar(36) NOT NULL DEFAULT 'bebc3980-c987-11e9-b193-08002764505e',
  `updatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` varchar(36) NOT NULL,
  `email` varchar(50) NOT NULL,
  `userSurname` varchar(50) NOT NULL,
  `userGivenName` varchar(50) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `roleCode` varchar(45) NOT NULL DEFAULT 'SITEUSR',
  `activeInd` varchar(1) NOT NULL DEFAULT 'N',
  `createdUserId` varchar(36) NOT NULL DEFAULT 'bebc3980-c987-11e9-b193-08002764505e',
  `createdDate` datetime NOT NULL,
  `updatedUserId` varchar(36) NOT NULL DEFAULT 'bebc3980-c987-11e9-b193-08002764505e',
  `updatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Dcvnps users with role';

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `email`, `userSurname`, `userGivenName`, `password`, `roleCode`, `activeInd`, `createdUserId`, `createdDate`, `updatedUserId`, `updatedDate`) VALUES
('30f16bf0-c98e-11e9-aa81-08002764505e', 'nguyen.valery@gmail.com', 'nguyen', 'valery', '$2b$10$ynxLLDE.ludnLcGLICCdNe7voeIuoAZeBIBG8M/r5ozDpO9.tN/22', 'LVL3ADM', 'Y', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-08-28 08:20:16', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-01-01 19:05:35'),
('79f9a290-6f38-11e9-8849-848f69b86260', 'siteuser@dcvnps.org', 'vnps', 'user', '$2b$10$rstPaW5n1yVD..JLBc0XQOLpfdlXpQZtbBwKF4mQJidsOcKTmGP2K', 'SITEUSR', 'Y', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-08-13 00:37:38', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-08-13 00:37:38'),
('7cb5eff6-6eb2-11e9-8849-848f69b86260', 'memberadmin@dcvnps.org', 'vnps', 'members', '$2b$10$YbPZ5SFYT.UVgNJCi4ntDe2CNC7Vf3vlS1Iq8f5JTMc2J.0PX6ldy', 'MBMRADM', 'Y', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-08-13 00:37:38', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-08-13 00:37:38'),
('92d8832a-fae9-4967-9b1a-540d77afd54b', 'chelmsworth@movie.star', 'Helmsworth', 'Chris', '$2b$10$V91ysEY5mfWAyxr2X2WxeeFuqznsMsS0uVgAl.l0ClMoW4/9HPmRK', 'SITEUSR', 'Y', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-04-20 22:38:21', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-04-20 22:38:43'),
('ae0af73a-f220-450a-b83c-24c192d59083', 'dolinh@dcvnps.org ', 'Dolinh', 'Dzung', '$2b$10$lWx9MpyAk5vzEWe4WRexOu/bWQ/qhpyddzhyF39od83VmWPHX5skC', 'SITEADM', 'Y', 'bebc3980-c987-11e9-b193-08002764505e', '2020-02-27 02:30:27', 'bebc3980-c987-11e9-b193-08002764505e', '2020-02-27 02:30:27'),
('cd9f353f-fd88-4bc8-804b-535a0d2a10d7', 'rthicks@movie.star', 'Thicks', 'Robin', '$2b$10$YW3mA762.ZeQRgqK3oeU9OeoDPGz0YAPQXEIACoPA8HFMjUZU2Z3m', 'LVL2ADM', 'Y', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-04-20 23:25:26', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-04-20 23:25:26'),
('f223b401-bb25-11e9-8110-08002764505e', 'level1admin@dcvnps.org', 'vnps1', 'level1', '$2b$10$YGWLooayOSW0n3Gg8Fae2uRBy2Onp.JRjhmx2FKN.ayeId6j8/jZC', 'LVL1ADM', 'Y', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-08-13 00:37:38', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-01-09 07:54:52');

-- --------------------------------------------------------

--
-- Table structure for table `vnpsclasses`
--

CREATE TABLE `vnpsclasses` (
  `classId` varchar(36) NOT NULL,
  `classLevel` varchar(200) NOT NULL,
  `classLevelDesc` varchar(200) NOT NULL,
  `classOrder` int(11) DEFAULT NULL,
  `classDescription` varchar(2000) NOT NULL,
  `prerequisite` varchar(1000) NOT NULL,
  `curriculum` mediumtext NOT NULL,
  `instructors` mediumtext NOT NULL,
  `postedUserId` varchar(36) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedUserId` varchar(36) NOT NULL,
  `updatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vnpsclasses`
--

INSERT INTO `vnpsclasses` (`classId`, `classLevel`, `classLevelDesc`, `classOrder`, `classDescription`, `prerequisite`, `curriculum`, `instructors`, `postedUserId`, `createdDate`, `updatedUserId`, `updatedDate`) VALUES
('dc5b5cc4-2ef8-4fe6-82b0-aa760fe0d989', 'level1', 'Basic Photography (Level 1)', 1, 'In Level 1, VNPS students will learn the fundamental photography skills: how to use and operate their camera properly, how to incorporate five photographic components (line, shape, form, light, and color) in composing an aesthetic image. In addition, they will also learn the rule of thirds in compositions. In the new era of digital photography, photo image post processing plays a major role in how good a photograph will turn out. The students will be learning the basics steps on how to edit the photo in Photoshop CC. To re-enforce the principles learned in the class room, the Level 1 students will have at least 15 photography field trips with hands-on guidance from the VNPS instructors. These field trips are designed to give the student opportunities to practice taking photograph on various subjects such as landscape photography, photo journalism, action photography, street photography, and night time photography.', 'N/A', '<div style=\"color: #283769; font-family: \'Lucida Grande\', \'Lucida Sans Unicode\', Arial, sans-serif; font-size: small; background-color: #ffffff;\">\n<ul>\n<li><span style=\"font-family: verdana, sans-serif;\"><span style=\"color: #000000; font-size: small;\">Introduction to Digital Single Lens </span><span style=\"color: #000000; font-size: small;\"><span style=\"font-size: small;\">Reflex </span>(DSLR) camera</span></span></li>\n<li><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Triangle Exposure: Aperture, Shutter, and ISO</span></span></li>\n<li><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Introduction to Landscape and Journalism Photography</span></span></li>\n<li><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">File/image management under Windows operating system</span></span></li>\n<li><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Introduction to photography composition</span></span></li>\n<ul>\n<li><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Line, shape, form and texture</span></span></li>\n<li><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Light and color</span></span></li>\n</ul>\n<li><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Motion in Photography</span></span></li>\n<li><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Introduction to RAW image and modern digital darkroom</span></span></li>\n<li><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Introduction to image editing using Photoshop</span></span></li>\n</ul>\n</div>', '<ul style=\"line-height: 1.5em; color: #283769; font-family: \'Lucida Grande\', \'Lucida Sans Unicode\', Arial, sans-serif; font-size: small; background-color: #ffffff;\">\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Kieu Lan</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Christine Nguyen</span></span></li>\n</ul>', '79f9a290-6f38-11e9-8849-848f69b86260', '2019-12-28 01:00:53', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:47:05'),
('e0833b24-2153-11ea-812e-08002764505e', 'level3', 'Advance Photography (Level 3)', 3, 'After gaining the solid basic understanding of photography and digital software from level 1 and level 2. The Level 3 program aims to push the students into much higher plane, both as a photographer and as an artist. With the idea that photographs could capture more than just surface appearances, the students will embrace both photography and digital software techniques, to complete their work of art portfolios, which are required for the final graduation exam. before becoming official VNPS members.', 'Completion of the intermediate photography (Level 2). It is not recommended a prospective student enter this level without completion of Level 2. ', '<ul style=\"line-height: 1.5em; color: #283769; font-family: \'Lucida Grande\', \'Lucida Sans Unicode\', Arial, sans-serif; font-size: 12px; background-color: #ffffff;\">\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Review of basic photography techniques and manipulations</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Different types of portfolio</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Trend and concept in photography</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Photoshop and post processing work flow</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Nature Photography</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Travel Photography</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Other photography applications</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Advanced topics in : Camera Raw, Composition, Macro, HDR, Long Exposure, High &amp; Low Key</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Basic Infrared photography</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Conceptual Photography</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Creative Photography&nbsp;</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif; font-size: small;\">Preparation for the final Photo Essay</span></span></li>\n</ul>', '<ul>\n<li><span style=\"font-family: verdana, sans-serif; font-size: small; background-color: #ffffff;\">Bai Tran</span></li>\n</ul>', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-12-18 00:04:32', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:48:18'),
('f38fba09-2152-11ea-812e-08002764505e', 'level2', 'Mid-Level Photography (Level 2)', 2, 'Level 2 focuses in intermediate photography lessons integrated with practice sessions and special topics in photography. The course is taught by Mr. Dinh Tran assisted with a teaching staff of experienced photographers and guest speakers. Hands-on practice session is either in class or  field trips to local parks or National Parks in and around the Washington Metropolitan, Pennsylvania, New Jersey, and New York. Field trip is normally organized on Saturday so that the normal course of classroom instruction will not be disrupted.', 'Completion of Level 1 Basic Photography, or pass an evaluation test', '<div style=\"color: #283769; font-family: \'Lucida Grande\', \'Lucida Sans Unicode\', Arial, sans-serif; font-size: small; background-color: #ffffff;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Lighting in photography</span></span></div>\n<div style=\"color: #283769; font-family: \'Lucida Grande\', \'Lucida Sans Unicode\', Arial, sans-serif; font-size: small; background-color: #ffffff;\">\n<ul style=\"line-height: 1.5em;\">\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Review Different types of lights in photography</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Flash versus ambient light</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"font-family: verdana, sans-serif;\"><span style=\"color: #000000;\">Lighting in event photography</span><br /></span></li>\n</ul>\n<span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Special photography techniques</span></span></div>\n<div style=\"color: #283769; font-family: \'Lucida Grande\', \'Lucida Sans Unicode\', Arial, sans-serif; font-size: small; background-color: #ffffff;\">\n<ul style=\"line-height: 1.5em;\">\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Intentional camera movement (ICM) (zooming, panning and shaking the camera)</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Long exposure in photographing fireworks (Fourth of July fireworks on the Mall)</span></span></li>\n</ul>\n<span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Introduction and Workshops on various photography genres</span></span></div>\n<div style=\"color: #283769; font-family: \'Lucida Grande\', \'Lucida Sans Unicode\', Arial, sans-serif; font-size: small; background-color: #ffffff;\">\n<ul style=\"line-height: 1.5em;\">\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Landscape photography</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Macro and close-up photography</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Event photography with special practice workshop on Lunar New Year (&ldquo;Tet&rdquo;) festival at Lao and Cambodia Temples</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Nature photography</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Portrait photography</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Night photography</span></span></li>\n</ul>\n<span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Photoshop</span></span></div>\n<div style=\"color: #283769; font-family: \'Lucida Grande\', \'Lucida Sans Unicode\', Arial, sans-serif; font-size: small; background-color: #ffffff;\">\n<ul style=\"line-height: 1.5em;\">\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Review Adobe Bridge and Camera Raw</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Review Basic Photoshop editing for photographers</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Non-destructive versus destructive Photoshop Adjustments</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Layer, layer mask and basic Photoshop selection techniques<br /></span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Introduction to Photoshop blending modes</span></span></li>\n</ul>\n<span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Special Topics</span></span></div>\n<p>&nbsp;</p>\n<div style=\"color: #283769; font-family: \'Lucida Grande\', \'Lucida Sans Unicode\', Arial, sans-serif; font-size: small; background-color: #ffffff;\">\n<ul style=\"line-height: 1.5em;\">\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Traditional compositions like the Rules of the Thirds versus contemporary trends in Beyond the Rule of the Thirds</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Creativity process in Photography</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Abstract Photography</span></span></li>\n</ul>\n<span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Final Photographic Project: Each student has to work on a photo story project that consists of three images, each image is a message. And the thee images should support an overall interesting story. A panel of three judges will grade the projects on composition and technical photographic presentation as well as the intended photo story.</span></span></div>', '<ul style=\"line-height: 1.5em; color: #283769; font-family: \'Lucida Grande\', \'Lucida Sans Unicode\', Arial, sans-serif; font-size: small; background-color: #ffffff;\">\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Dinh Tran, GM</span></span></li>\n<li style=\"list-style-position: outside; list-style-type: square;\"><span style=\"color: #000000;\"><span style=\"font-family: verdana, sans-serif;\">Kieuhanh Vu</span></span></li>\n</ul>', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2019-12-17 23:57:54', '7cb5e812-6eb2-11e9-8849-848f69b86260', '2020-02-22 11:47:34');

-- --------------------------------------------------------

--
-- Table structure for table `vnpslookup`
--

CREATE TABLE `vnpslookup` (
  `lookupType` varchar(100) NOT NULL,
  `lookupCode` varchar(30) NOT NULL,
  `lookupValue` varchar(100) NOT NULL,
  `createdUserId` varchar(36) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedUserId` varchar(36) NOT NULL,
  `updatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vnpslookup`
--

INSERT INTO `vnpslookup` (`lookupType`, `lookupCode`, `lookupValue`, `createdUserId`, `createdDate`, `updatedUserId`, `updatedDate`) VALUES
('AdminLevel', 'LVL1ADM', 'level1', 'ae0af73a-f220-450a-b83c-24c192d59083', '0000-00-00 00:00:00', 'ae0af73a-f220-450a-b83c-24c192d59083', '0000-00-00 00:00:00'),
('AdminLevel', 'LVL2ADM', 'level2', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-04-22 19:53:02', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-04-22 19:53:02'),
('AdminLevel', 'LVL3ADM', 'level3', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-04-22 19:53:02', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-04-22 19:53:02'),
('AdminLevel', 'MBRADM', 'members', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-04-22 19:53:02', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-04-22 19:53:02'),
('AdminLevel', 'SITEADM', 'All', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-04-22 19:53:02', 'ae0af73a-f220-450a-b83c-24c192d59083', '2020-04-22 19:53:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`announcementId`);

--
-- Indexes for table `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`galleryId`),
  ADD UNIQUE KEY `gallery_UNIQUE` (`gallery`);

--
-- Indexes for table `galleryphotos`
--
ALTER TABLE `galleryphotos`
  ADD PRIMARY KEY (`galleryPhotoId`),
  ADD KEY `idx_gallery_id` (`galleryId`),
  ADD KEY `idx_author` (`author`),
  ADD KEY `uidx_galleryId_photo_author` (`galleryId`,`photo`,`author`,`year`);

--
-- Indexes for table `operations`
--
ALTER TABLE `operations`
  ADD PRIMARY KEY (`operationId`),
  ADD UNIQUE KEY `uk_operation_type_code` (`operationType`,`operationCode`);

--
-- Indexes for table `orderItems`
--
ALTER TABLE `orderItems`
  ADD PRIMARY KEY (`orderItemId`),
  ADD KEY `fk_oder_id_idx` (`orderId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`);

--
-- Indexes for table `payers`
--
ALTER TABLE `payers`
  ADD PRIMARY KEY (`payerId`),
  ADD UNIQUE KEY `uk_email_name` (`emailAddress`,`surname`,`givenName`) USING BTREE;

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`paymentId`),
  ADD KEY `fk_payments_order_idx` (`orderId`);

--
-- Indexes for table `roleoperations`
--
ALTER TABLE `roleoperations`
  ADD PRIMARY KEY (`roleOperationId`),
  ADD UNIQUE KEY `uk_roleoperation` (`roleId`,`operationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`),
  ADD UNIQUE KEY `roleCode_UNIQUE` (`roleCode`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`fipsCode`);

--
-- Indexes for table `userclasses`
--
ALTER TABLE `userclasses`
  ADD PRIMARY KEY (`userClassId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userName_UNIQUE` (`email`);

--
-- Indexes for table `vnpslookup`
--
ALTER TABLE `vnpslookup`
  ADD PRIMARY KEY (`lookupType`,`lookupCode`,`lookupValue`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `galleryphotos`
--
ALTER TABLE `galleryphotos`
  ADD CONSTRAINT `fk_gallery_id` FOREIGN KEY (`galleryId`) REFERENCES `galleries` (`galleryId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderItems`
--
ALTER TABLE `orderItems`
  ADD CONSTRAINT `fk_oder_id` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_payments_order` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
