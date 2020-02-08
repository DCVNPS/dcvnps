CREATE TABLE `announcements` (
  `announcementId` varchar(36) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` mediumtext NOT NULL,
  `postedUserId` varchar(36) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedUserId` varchar(36) NOT NULL,
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`announcementId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE DEFINER=`dcvnps`@`%` TRIGGER `bir_announcements` BEFORE INSERT ON `dcvnps`.`announcements` FOR EACH ROW BEGIN
IF new.announcementId is null then
	set new.announcementId = uuid();
end if;
END;

CREATE TABLE `galleries` (
  `galleryId` varchar(36) NOT NULL,
  `gallery` varchar(100) NOT NULL,
  `profilePhoto` varchar(100) DEFAULT NULL,
  `activeInd` varchar(1) NOT NULL DEFAULT 'Y',
  `updatedUserId` varchar(45) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`galleryId`),
  UNIQUE KEY `gallery_UNIQUE` (`gallery`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE DEFINER=`dcvnps`@`%` TRIGGER `bir_galleries` BEFORE INSERT ON `galleries` FOR EACH ROW BEGIN
IF new.galleryId is null then
	set new.galleryId = uuid();
end if;
END;

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

CREATE DEFINER=`dcvnps`@`%` TRIGGER `bir_galleryphotos` BEFORE INSERT ON `dcvnps`.`galleryphotos` FOR EACH ROW begin
IF new.galleryPhotoId is null then
	set new.galleryPhotoId = uuid();
end if;
end;

CREATE TABLE `orders` (
  `orderId` varchar(36) NOT NULL COMMENT 'paypal transaction id',
  `payerId` varchar(36) NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedUserId` varchar(45) NOT NULL DEFAULT 'dcvnps',
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `payers` (
  `payerId` varchar(36) NOT NULL,
  `emailAddress` varchar(300) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `givenName` varchar(45) NOT NULL,
  `countryCode` varchar(5) DEFAULT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedUserId` varchar(45) NOT NULL DEFAULT 'dcvnps',
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payerId`),
  UNIQUE KEY `index2` (`emailAddress`,`surname`,`givenName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `payments` (
  `paymentId` varchar(36) NOT NULL COMMENT 'paypal payment id',
  `orderId` varchar(36) NOT NULL,
  `amount` varchar(32) NOT NULL,
  `currencyCode` varchar(10) NOT NULL,
  `paymentStatus` varchar(45) DEFAULT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedUserId` varchar(45) NOT NULL DEFAULT 'dcvnps',
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`paymentId`),
  KEY `fk_payments_order_idx` (`orderId`),
  CONSTRAINT `fk_payments_order` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL AUTO_INCREMENT,
  `roleCode` varchar(45) NOT NULL,
  `roleDescription` varchar(45) NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateUserId` varchar(45) DEFAULT 'dcvnps',
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`roleId`),
  UNIQUE KEY `roleCode_UNIQUE` (`roleCode`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

CREATE DEFINER=`dcvnps`@`%` TRIGGER `bir_roles` BEFORE INSERT ON `roles` FOR EACH ROW BEGIN
IF new.roleId is null then
	set new.roleId = uuid();
end if;
END;

CREATE TABLE `states` (
  `fipsCode` int(11) NOT NULL,
  `stateCode` varchar(5) NOT NULL,
  `description` varchar(100) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedUserId` varchar(36) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`fipsCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

CREATE TABLE `users` (
  `userId` varchar(36) NOT NULL,
  `email` varchar(50) NOT NULL,
  `userSurname` varchar(50) NOT NULL,
  `userGivenName` varchar(50) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `roleCode` varchar(45) NOT NULL DEFAULT 'SITEUSR',
  `activeInd` varchar(1) NOT NULL DEFAULT 'N',
  `createdUserId` varchar(36) NOT NULL DEFAULT 'bebc3980-c987-11e9-b193-08002764505e',
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedUserId` varchar(36) NOT NULL DEFAULT 'bebc3980-c987-11e9-b193-08002764505e',
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userName_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Dcvnps users with role';

CREATE DEFINER=`dcvnps`@`%` TRIGGER `bir_users` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
IF new.userId is null then
	set new.userId = uuid();
end if;
END;

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
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`classId`),
  UNIQUE KEY `classLevel_UNIQUE` (`classLevel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE DEFINER=`dcvnps`@`%` TRIGGER `bir_photoclasses` BEFORE INSERT ON `vnpsclasses` FOR EACH ROW BEGIN
IF new.classId is null then
	set new.classId = uuid();
end if;
END;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `dcvnps`.`userRoleClasses` AS select `u`.`userId` AS `userId`,concat_ws(' ',`u`.`userGivenName`,`u`.`userSurname`) AS `userName`,`u`.`roleCode` AS `role`,`c`.`classId` AS `classId`,`uc`.`userClassId` AS `userClassId`,`uc`.`year` AS `year`,`c`.`classLevel` AS `level`,`c`.`classLevelDesc` AS `levelDescription` from ((`dcvnps`.`users` `u` left join `dcvnps`.`userclasses` `uc` on((`u`.`userId` = `uc`.`userId`))) left join `dcvnps`.`vnpsclasses` `c` on((`c`.`classId` = convert(`uc`.`classId` using utf8mb4)))) where (`u`.`roleCode` = 'SITEUSR');
