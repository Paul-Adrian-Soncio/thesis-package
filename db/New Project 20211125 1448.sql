-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.5.11


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema bio_db
--

CREATE DATABASE IF NOT EXISTS bio_db;
USE bio_db;

--
-- Definition of table `tbl_location`
--

DROP TABLE IF EXISTS `tbl_location`;
CREATE TABLE `tbl_location` (
  `locid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `loc_name` varchar(15) NOT NULL,
  `val` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`locid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_location`
--

/*!40000 ALTER TABLE `tbl_location` DISABLE KEYS */;
INSERT INTO `tbl_location` (`locid`,`loc_name`,`val`) VALUES 
 (1,'A1',0),
 (2,'A2',0),
 (3,'A3',0),
 (4,'A4',0),
 (5,'A5',0),
 (6,'B1',0),
 (7,'B2',0),
 (8,'B3',0),
 (9,'B4',0),
 (10,'B5',0),
 (11,'C1',0),
 (12,'C2',0),
 (13,'C3',0),
 (14,'C4',0),
 (15,'C5',0);
/*!40000 ALTER TABLE `tbl_location` ENABLE KEYS */;


--
-- Definition of table `tblinventorydata`
--

DROP TABLE IF EXISTS `tblinventorydata`;
CREATE TABLE `tblinventorydata` (
  `inv` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `itemid` int(10) unsigned NOT NULL,
  `userid` int(10) unsigned NOT NULL,
  `desc` varchar(15) NOT NULL,
  `datetimelogged` datetime NOT NULL,
  PRIMARY KEY (`inv`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblinventorydata`
--

/*!40000 ALTER TABLE `tblinventorydata` DISABLE KEYS */;
INSERT INTO `tblinventorydata` (`inv`,`itemid`,`userid`,`desc`,`datetimelogged`) VALUES 
 (4,20,1,'IN','2021-11-19 14:48:40'),
 (5,20,1,'IN','2021-11-22 16:41:34'),
 (6,20,1,'IN','2021-11-22 19:06:55'),
 (7,20,1,'IN','2021-11-22 19:11:44'),
 (8,20,1,'IN','2021-11-22 19:14:47'),
 (9,20,1,'IN','2021-11-22 19:17:51'),
 (10,20,1,'OUT','2021-11-22 19:19:55'),
 (11,21,1,'IN','2021-11-22 20:27:09'),
 (12,20,1,'OUT','2021-11-22 20:54:21'),
 (13,20,1,'IN','2021-11-22 20:55:42'),
 (14,20,1,'OUT','2021-11-25 14:18:23'),
 (15,20,1,'IN','2021-11-25 14:22:11'),
 (16,20,1,'OUT','2021-11-25 14:22:36');
/*!40000 ALTER TABLE `tblinventorydata` ENABLE KEYS */;


--
-- Definition of table `tblitemdata`
--

DROP TABLE IF EXISTS `tblitemdata`;
CREATE TABLE `tblitemdata` (
  `itemID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `itemQR` varchar(45) NOT NULL,
  `itemName` varchar(45) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `item_location` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`itemID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblitemdata`
--

/*!40000 ALTER TABLE `tblitemdata` DISABLE KEYS */;
INSERT INTO `tblitemdata` (`itemID`,`itemQR`,`itemName`,`description`,`item_location`) VALUES 
 (1,'2122515125854115454','SAMPLE A','RED BLOD The quick brown fox jumps over the lazy dog','STORAGE 1-21'),
 (2,'32424235643543523423','SAMPLE B','PLASMA The quick brown fox jumps over the lazy dog','STORAGE 2-222'),
 (3,'324242356432332233','SAMPLE C','MNNMBVVB The quick brown fox jumps over the lazy dog','STORAGE 3-222'),
 (4,'546464523442342','SAMPLE D','PLASMA The quick brown fox jumps over the lazy dog','STORAGE 112213'),
 (5,'545464654654645645','SAMPLE E','MNNMBVVB The quick brown fox jumps over the lazy dog','STORAGE 8874-222'),
 (6,'34534535435435435','SAMPLE F','ADASDASDASDAS','STORAGE 01-222'),
 (7,'2332424234234324234','SAMPLE G','FDSFSDFSDFSDFSDF','STORAGE 959459-222');
/*!40000 ALTER TABLE `tblitemdata` ENABLE KEYS */;


--
-- Definition of table `tblmaterials`
--

DROP TABLE IF EXISTS `tblmaterials`;
CREATE TABLE `tblmaterials` (
  `matID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dateentry` varchar(45) NOT NULL,
  `sampletype` varchar(45) NOT NULL,
  `source` varchar(45) DEFAULT NULL,
  `collector` varchar(45) DEFAULT NULL,
  `location` int(10) NOT NULL DEFAULT '0',
  `userid` int(10) unsigned NOT NULL,
  `timelogged` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`matID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblmaterials`
--

/*!40000 ALTER TABLE `tblmaterials` DISABLE KEYS */;
INSERT INTO `tblmaterials` (`matID`,`dateentry`,`sampletype`,`source`,`collector`,`location`,`userid`,`timelogged`) VALUES 
 (4,'2021-11-18','Plasma','da','dasd',2,1,'2021-11-18 09:51:45'),
 (5,'2021-11-18','Serum','dasd','dada',3,1,'2021-11-18 09:52:55'),
 (6,'2021-11-18','Saliva','dadsa','dasda',5,1,'2021-11-18 09:55:11'),
 (7,'2021-11-18','Breast Milk','fsd','fsdfss',6,1,'2021-11-18 09:56:41'),
 (8,'2021-11-18','Semen','asda','admin',15,1,'2021-11-18 10:10:03'),
 (20,'2021-11-19','Cord Blood','fdfs','admin',7,1,'2021-11-19 14:48:40'),
 (21,'2021-11-21','czczx9999','pfospdfsdf','Hdjdiepppeh',1,1,'2021-11-22 20:27:09');
/*!40000 ALTER TABLE `tblmaterials` ENABLE KEYS */;


--
-- Definition of table `tbltemperature`
--

DROP TABLE IF EXISTS `tbltemperature`;
CREATE TABLE `tbltemperature` (
  `tmpid` int(11) NOT NULL AUTO_INCREMENT,
  `temp` float(5,2) DEFAULT NULL,
  `timelogged` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tmpid`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbltemperature`
--

/*!40000 ALTER TABLE `tbltemperature` DISABLE KEYS */;
INSERT INTO `tbltemperature` (`tmpid`,`temp`,`timelogged`) VALUES 
 (36,21.23,'2021-11-13 09:51:45'),
 (37,22.50,'2021-11-13 11:52:07'),
 (38,20.50,'2021-11-13 14:52:37'),
 (39,23.25,'2021-11-13 15:53:07'),
 (40,22.25,'2021-11-13 17:53:38'),
 (41,23.25,'2021-11-13 19:54:08'),
 (42,22.50,'2021-11-13 21:54:38'),
 (43,33.75,'2021-11-22 20:23:18'),
 (44,33.75,'2021-11-22 20:23:48'),
 (45,33.50,'2021-11-22 20:24:18'),
 (46,33.75,'2021-11-22 20:24:48'),
 (47,33.25,'2021-11-22 20:25:18'),
 (48,33.25,'2021-11-22 20:25:48'),
 (49,33.00,'2021-11-22 20:26:18'),
 (50,33.50,'2021-11-22 20:26:48'),
 (51,33.25,'2021-11-22 20:27:18'),
 (52,33.50,'2021-11-22 20:27:48'),
 (53,33.50,'2021-11-22 20:28:18'),
 (54,33.25,'2021-11-22 20:28:49'),
 (55,33.25,'2021-11-22 20:29:19'),
 (56,33.25,'2021-11-22 20:29:49'),
 (57,33.75,'2021-11-22 20:30:19'),
 (58,33.50,'2021-11-22 20:30:49'),
 (59,34.00,'2021-11-22 23:31:19'),
 (60,34.25,'2021-11-22 20:48:12'),
 (61,34.00,'2021-11-22 20:48:42'),
 (62,34.00,'2021-11-22 20:49:12'),
 (63,34.25,'2021-11-22 20:49:42');
INSERT INTO `tbltemperature` (`tmpid`,`temp`,`timelogged`) VALUES 
 (64,34.25,'2021-11-22 20:50:12'),
 (65,33.75,'2021-11-22 20:50:42'),
 (66,34.00,'2021-11-22 20:51:13'),
 (67,34.25,'2021-11-22 20:51:43');
/*!40000 ALTER TABLE `tbltemperature` ENABLE KEYS */;


--
-- Definition of table `tblusers`
--

DROP TABLE IF EXISTS `tblusers`;
CREATE TABLE `tblusers` (
  `userid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `userpass` varchar(45) NOT NULL,
  `fname` varchar(45) NOT NULL,
  `mname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) NOT NULL,
  `contactno` varchar(15) DEFAULT NULL,
  `email` varchar(25) DEFAULT NULL,
  `role` varchar(15) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblusers`
--

/*!40000 ALTER TABLE `tblusers` DISABLE KEYS */;
INSERT INTO `tblusers` (`userid`,`username`,`userpass`,`fname`,`mname`,`lname`,`contactno`,`email`,`role`) VALUES 
 (1,'admin','21232f297a57a5a743894a0e4a801fc3','pedro','b','delacruz','28321','das@dmoin.com','Admin'),
 (2,'asdas','cvbcvcv','qqqq','ccccccc','opoppewqeq','mmmmmm','vvvvvv','admin'),
 (3,'asdas','6dbc8b3d23484f560e81276e19d04aab','qqqq','ccccccc','opoppewqeq','mmmmmm','vvvvvv','admin'),
 (4,'dosahda','3c4653072dacd9afa2dd1122ca704c7c','sdfsdfs','ouhuoasd','oudhasouhd','douashduhau','dohahsd','Admin'),
 (5,'ljn','f87c5cc09bcb5331f1dc62d4045d6cc9','jnj','njn','jnl','lnj','jln','User'),
 (6,'dasds','a7f1bbc90496ca91cfd4c4fd6a33d161','asda','dasd','dasd','dsad','dasdsa','User'),
 (7,'dsadd','3bd87c4bf28ea59aa9746d56720bb013','asdsa','dasd','dad','dsad','dsad','User'),
 (8,'addas','63373b41cf913e9f9b3226b4a0452737','deputa','adas','dsad','dsa','dsada','Admin'),
 (9,'dadasda','252bcff712003984e9fbe7fdbc8e6f7d','depta','add','das','da','dsa','Admin');
/*!40000 ALTER TABLE `tblusers` ENABLE KEYS */;


--
-- Definition of procedure `procGetLastID`
--

DROP PROCEDURE IF EXISTS `procGetLastID`;

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `procGetLastID`()
BEGIN
DECLARE last_no INTEGER;

SELECT matid FROM tblmaterials ORDER BY matID desc limit 1 into last_no;

IF last_no IS NULL THEN
  SET last_no := 0;
END IF;

SELECT last_no + 1 as new_num;




END $$

DELIMITER ;



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
