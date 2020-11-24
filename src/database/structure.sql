CREATE TABLE `client` (
  `clientId` INT PRIMARY KEY AUTO_INCREMENT,
  `mail` VARCHAR(255),
  `password` VARCHAR(20),
  `createdAt` INT(13),
  `updatedAt` INT(13)
);

CREATE TABLE `program` (
  `programId` INT PRIMARY KEY AUTO_INCREMENT,
  `clientId` INT,
  `title` VARCHAR(40),
  `image` TINYTEXT
);

CREATE TABLE `category` (
  `categoryId` INT PRIMARY KEY AUTO_INCREMENT,
  `clientId` INT,
  `name` VARCHAR(40)
);

CREATE TABLE `tag` (
  `tagId` INT PRIMARY KEY AUTO_INCREMENT,
  `programId` INT,
  `categoryId` INT
);

CREATE TABLE `banner` (
  `bannerId` INT PRIMARY KEY AUTO_INCREMENT,
  `clientId` INT,
  `title` VARCHAR(40),
  `description` TINYTEXT,
  `image` TINYTEXT,
  `link` TINYTEXT,
  `targetProgram` INT,
  `targetCategory` INT,
  `createdAt` INT(13),
  `expiresAt` INT(13)
);

CREATE TABLE `scheduleProgram` (
  `scheduleProgramId` INT PRIMARY KEY AUTO_INCREMENT,
  `programId` INT,
  `weekday` INT,
  `startAt` VARCHAR(5),
  `duration` float
);

CREATE TABLE `user` (
  `userId` INT PRIMARY KEY AUTO_INCREMENT,
  `clientId` INT,
  `notificationToken` TEXT,
  `platform` VARCHAR(50)
);

ALTER TABLE `tag` ADD FOREIGN KEY (`programId`) REFERENCES `program` (`programId`);

ALTER TABLE `tag` ADD FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`);

ALTER TABLE `banner` ADD FOREIGN KEY (`targetProgram`) REFERENCES `program` (`programId`);

ALTER TABLE `banner` ADD FOREIGN KEY (`targetCategory`) REFERENCES `category` (`categoryId`);

ALTER TABLE `program` ADD FOREIGN KEY (`clientId`) REFERENCES `client` (`clientId`);

ALTER TABLE `category` ADD FOREIGN KEY (`clientId`) REFERENCES `client` (`clientId`);

ALTER TABLE `banner` ADD FOREIGN KEY (`clientId`) REFERENCES `client` (`clientId`);

ALTER TABLE `scheduleProgram` ADD FOREIGN KEY (`programId`) REFERENCES `program` (`programId`);

ALTER TABLE `user` ADD FOREIGN KEY (`clientId`) REFERENCES `client` (`clientId`);
