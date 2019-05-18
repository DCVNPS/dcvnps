CREATE TABLE `galleries` (
  `gallery_id` varchar(36) DEFAULT NULL,
  `galleryId` int(11) NOT NULL AUTO_INCREMENT,
  `gallery` varchar(100) NOT NULL,
  `profilePhoto` varchar(100) DEFAULT NULL,
  `updateUser` varchar(45) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`galleryId`),
  UNIQUE KEY `gallery_UNIQUE` (`gallery`)
);

CREATE DEFINER=`dcvnps`@`%` TRIGGER `dcvnps`.`bir_galleries` BEFORE INSERT ON `galleries` FOR EACH ROW
BEGIN
IF new.galleryId is null then
	set new.galleryId = uuid();
end if;
END

drop table `dcvnps`.`galleryphotos`;

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
);

CREATE DEFINER=`dcvnps`@`%` TRIGGER `dcvnps`.`bir_galleryPhotos` BEFORE INSERT ON `galleryphotos` FOR EACH ROW
BEGIN
IF new.galleryPhotoId is null then
	set new.galleryPhotoId = uuid();
end if;
END

CREATE TABLE `dcvnps`.`roles` (
  `roleId` INT NOT NULL AUTO_INCREMENT,
  `roleCode` VARCHAR(45) NOT NULL,
  `roleDescription` VARCHAR(45) NOT NULL,
  `createdDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updateUser` VARCHAR(45) NULL DEFAULT 'dcvnps',
  `updatedDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`roleId`),
  UNIQUE INDEX `roleCode_UNIQUE` (`roleCode` ASC));
