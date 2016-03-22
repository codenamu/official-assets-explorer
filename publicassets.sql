-- MySQL dump 10.13  Distrib 5.7.10, for osx10.9 (x86_64)
--
-- Host: localhost    Database: publicassets
-- ------------------------------------------------------
-- Server version	5.7.10

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
-- Table structure for table `Assets`
--

DROP TABLE IF EXISTS `Assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `relation` varchar(255) DEFAULT NULL,
  `change` int(11) DEFAULT NULL,
  `prevTotal` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `description` text,
  `reason` text,
  `cat2Id` int(11) DEFAULT NULL,
  `officialId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cat2Id` (`cat2Id`),
  KEY `officialId` (`officialId`),
  CONSTRAINT `assets_ibfk_1` FOREIGN KEY (`cat2Id`) REFERENCES `Cat2s` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `assets_ibfk_2` FOREIGN KEY (`officialId`) REFERENCES `Officials` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Assets`
--

LOCK TABLES `Assets` WRITE;
/*!40000 ALTER TABLE `Assets` DISABLE KEYS */;
INSERT INTO `Assets` VALUES (1,'본인',60000,2300000,2360000,'서울특별시 강남구 삼성동 대지 484.00㎡ 건물 317.35㎡','가액변동',1,1),(2,'본인',275920,533585,809505,'대우증권 18,953(2,039 증가), 외환은행 325,929(62,013 증가), 우리은행 0(34 감소), 신한은행 105, 농협은행 464,518(212,011 증가), 화원새마을금고 0(109 감소)','인세 등 예금액 증가',3,1),(3,'본인',0,2300000,2300000,'서울특별시 강남구 삼성동 대지 484.00㎡ 건물 317.35㎡','가액변동 없음',1,4),(4,'본인',19940,19940,0,'2008년식 베라크루즈 배기량(3,778cc)','매도',4,4),(5,'본인',80000,1020000,1100000,'서울특별시 종로구 평창동 대지 698.00㎡ 건물 275.12㎡','가액변동',1,2),(6,'본인',3000,141000,144000,'경상남도 거제시 고현동 신화인아파트 건물 84.43㎡','가액변동',2,2),(7,'본인',0,1020000,1020000,'서울특별시 종로구 평창동 대지 698.00㎡ 건물 275.12㎡','가액변동 없음',1,5),(8,'본인',0,141000,141000,'경상남도 거제시 고현동 신화인아파트 건물 84.43㎡','가액변동 없음',2,5),(9,'본인',-3400,25060,21660,'2013년식 싼타페 배기량(1,995cc)',NULL,4,3),(10,'본인',-8000,468000,460000,'서울특별시 성동구 옥수동 극동그린아파트 건물 114.32㎡','가액변동',2,3);
/*!40000 ALTER TABLE `Assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cat1s`
--

DROP TABLE IF EXISTS `Cat1s`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cat1s` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cat1s`
--

LOCK TABLES `Cat1s` WRITE;
/*!40000 ALTER TABLE `Cat1s` DISABLE KEYS */;
INSERT INTO `Cat1s` VALUES (1,'건물'),(2,'예금'),(3,'부동산에 관한 규정이 준용되는 권리와 자동차․건설기계․선박 및 항공기');
/*!40000 ALTER TABLE `Cat1s` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cat2s`
--

DROP TABLE IF EXISTS `Cat2s`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cat2s` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `cat1Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cat1Id` (`cat1Id`),
  CONSTRAINT `cat2s_ibfk_1` FOREIGN KEY (`cat1Id`) REFERENCES `Cat1s` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cat2s`
--

LOCK TABLES `Cat2s` WRITE;
/*!40000 ALTER TABLE `Cat2s` DISABLE KEYS */;
INSERT INTO `Cat2s` VALUES (1,'단독주택',1),(2,'아파트',1),(3,'예금',2),(4,'자동차',3);
/*!40000 ALTER TABLE `Cat2s` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Constituencies`
--

DROP TABLE IF EXISTS `Constituencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Constituencies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `uniqueId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Constituencies`
--

LOCK TABLES `Constituencies` WRITE;
/*!40000 ALTER TABLE `Constituencies` DISABLE KEYS */;
INSERT INTO `Constituencies` VALUES (1,'서울 종로구',1),(2,'서울 중구 성동구 갑',2);
/*!40000 ALTER TABLE `Constituencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Dongs`
--

DROP TABLE IF EXISTS `Dongs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Dongs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `constituencyId` int(11) DEFAULT NULL,
  `municipalId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `constituencyId` (`constituencyId`),
  KEY `municipalId` (`municipalId`),
  CONSTRAINT `dongs_ibfk_1` FOREIGN KEY (`constituencyId`) REFERENCES `Constituencies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `dongs_ibfk_2` FOREIGN KEY (`municipalId`) REFERENCES `Municipals` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dongs`
--

LOCK TABLES `Dongs` WRITE;
/*!40000 ALTER TABLE `Dongs` DISABLE KEYS */;
INSERT INTO `Dongs` VALUES (1,'마장동',2,2),(2,'사근동',2,2);
/*!40000 ALTER TABLE `Dongs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Municipals`
--

DROP TABLE IF EXISTS `Municipals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Municipals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `provinceId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `provinceId` (`provinceId`),
  CONSTRAINT `municipals_ibfk_1` FOREIGN KEY (`provinceId`) REFERENCES `Provinces` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Municipals`
--

LOCK TABLES `Municipals` WRITE;
/*!40000 ALTER TABLE `Municipals` DISABLE KEYS */;
INSERT INTO `Municipals` VALUES (1,'종로구',1),(2,'성동구',1);
/*!40000 ALTER TABLE `Municipals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Officials`
--

DROP TABLE IF EXISTS `Officials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Officials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(255) DEFAULT NULL,
  `page` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `personId` int(11) DEFAULT NULL,
  `positionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `personId` (`personId`),
  KEY `positionId` (`positionId`),
  CONSTRAINT `officials_ibfk_1` FOREIGN KEY (`personId`) REFERENCES `People` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `officials_ibfk_2` FOREIGN KEY (`positionId`) REFERENCES `Positions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Officials`
--

LOCK TABLES `Officials` WRITE;
/*!40000 ALTER TABLE `Officials` DISABLE KEYS */;
INSERT INTO `Officials` VALUES (1,NULL,NULL,2015,1,1),(2,NULL,NULL,2015,2,2),(3,NULL,NULL,2015,3,3),(4,NULL,NULL,2014,1,1),(5,NULL,NULL,2014,2,2),(6,NULL,NULL,2014,3,3);
/*!40000 ALTER TABLE `Officials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Org1s`
--

DROP TABLE IF EXISTS `Org1s`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Org1s` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `publisherId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `publisherId` (`publisherId`),
  CONSTRAINT `org1s_ibfk_1` FOREIGN KEY (`publisherId`) REFERENCES `Publishers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Org1s`
--

LOCK TABLES `Org1s` WRITE;
/*!40000 ALTER TABLE `Org1s` DISABLE KEYS */;
INSERT INTO `Org1s` VALUES (1,'중앙부처 및 산하기관',1);
/*!40000 ALTER TABLE `Org1s` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Org2s`
--

DROP TABLE IF EXISTS `Org2s`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Org2s` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `org1Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `org1Id` (`org1Id`),
  CONSTRAINT `org2s_ibfk_1` FOREIGN KEY (`org1Id`) REFERENCES `Org1s` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Org2s`
--

LOCK TABLES `Org2s` WRITE;
/*!40000 ALTER TABLE `Org2s` DISABLE KEYS */;
INSERT INTO `Org2s` VALUES (1,'대통령',1),(2,'대통령 비서실',1);
/*!40000 ALTER TABLE `Org2s` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Org3s`
--

DROP TABLE IF EXISTS `Org3s`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Org3s` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `org2Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `org2Id` (`org2Id`),
  CONSTRAINT `org3s_ibfk_1` FOREIGN KEY (`org2Id`) REFERENCES `Org2s` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Org3s`
--

LOCK TABLES `Org3s` WRITE;
/*!40000 ALTER TABLE `Org3s` DISABLE KEYS */;
INSERT INTO `Org3s` VALUES (1,'대통령',1),(2,'대통령 비서실',2);
/*!40000 ALTER TABLE `Org3s` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `People`
--

DROP TABLE IF EXISTS `People`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `People` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `uniqueId` varchar(255) DEFAULT NULL,
  `constituencyId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `constituencyId` (`constituencyId`),
  CONSTRAINT `people_ibfk_1` FOREIGN KEY (`constituencyId`) REFERENCES `Constituencies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `People`
--

LOCK TABLES `People` WRITE;
/*!40000 ALTER TABLE `People` DISABLE KEYS */;
INSERT INTO `People` VALUES (1,'박근혜','https://avatars1.githubusercontent.com/u/1366161?v=3&s=460','open42976',2),(2,'김기춘','https://avatars1.githubusercontent.com/u/1366161?v=3&s=460','open42977',2),(3,'유민봉','https://avatars1.githubusercontent.com/u/1366161?v=3&s=460','open42978',2);
/*!40000 ALTER TABLE `People` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Positions`
--

DROP TABLE IF EXISTS `Positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Positions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `org3Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `org3Id` (`org3Id`),
  CONSTRAINT `positions_ibfk_1` FOREIGN KEY (`org3Id`) REFERENCES `Org3s` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Positions`
--

LOCK TABLES `Positions` WRITE;
/*!40000 ALTER TABLE `Positions` DISABLE KEYS */;
INSERT INTO `Positions` VALUES (1,'대통령',1),(2,'대통령 비서실장',2),(3,'국정기획 수석비서관',2);
/*!40000 ALTER TABLE `Positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Provinces`
--

DROP TABLE IF EXISTS `Provinces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Provinces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Provinces`
--

LOCK TABLES `Provinces` WRITE;
/*!40000 ALTER TABLE `Provinces` DISABLE KEYS */;
INSERT INTO `Provinces` VALUES (1,'서울특별시');
/*!40000 ALTER TABLE `Provinces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Publishers`
--

DROP TABLE IF EXISTS `Publishers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Publishers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Publishers`
--

LOCK TABLES `Publishers` WRITE;
/*!40000 ALTER TABLE `Publishers` DISABLE KEYS */;
INSERT INTO `Publishers` VALUES (1,'정부공직자윤리위원회');
/*!40000 ALTER TABLE `Publishers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-22 22:50:17
