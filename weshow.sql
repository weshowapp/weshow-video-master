-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: weshow
-- ------------------------------------------------------
-- Server version	5.5.40

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
-- Table structure for table `weshow_user`
--

DROP TABLE IF EXISTS `weshow_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weshow_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `gender` smallint(2) unsigned NOT NULL DEFAULT '0',
  `account` varchar(32) NOT NULL DEFAULT '',
  `name` varchar(60) NOT NULL DEFAULT '',
  `photo_url` text NOT NULL,
  `reg_time` int(11) NOT NULL DEFAULT '0',
  `enabled` tinyint(3) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `account` (`account`),
  KEY `enabled` (`enabled`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_user`
--

LOCK TABLES `weshow_user` WRITE;
/*!40000 ALTER TABLE `weshow_user` DISABLE KEYS */;
INSERT INTO `weshow_user` VALUES (1, 1,'wx-1','Zhan','https://wx.qlogo.cn/mmopen/vi_32/bMqoLrFBhxP8ZsHJqOd2eIsEtpkCuSW0JtfOPZpsIaBKhqMaeONREia3R2TdtIf9oMAY2wq0pJPHUOCqzNXR7iaw/0',0,1),
  (2, 1,'wx-2','Zhan1','https://wx.qlogo.cn/mmopen/vi_32/bMqoLrFBhxP8ZsHJqOd2eIsEtpkCuSW0JtfOPZpsIaBKhqMaeONREia3R2TdtIf9oMAY2wq0pJPHUOCqzNXR7iaw/0',0,1),
  (3, 1,'wx-3','Zhan2','http://yanxuan.nosdn.127.net/8e50c65fda145e6dd1bf4fb7ee0fcecc.jpg',0,1);
/*!40000 ALTER TABLE `weshow_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weshow_video`
--

DROP TABLE IF EXISTS `weshow_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weshow_video` (
  `id` int(16) unsigned NOT NULL AUTO_INCREMENT,
  `creator` varchar(60) NOT NULL DEFAULT '',
  `title` varchar(90) NOT NULL DEFAULT '',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `upload_time` int(11) unsigned NOT NULL DEFAULT '0',
  `longitude` decimal(11,8) NOT NULL DEFAULT '0.00',
  `latitude` decimal(11,8) NOT NULL DEFAULT '0.00',
  `desc` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_video`
--

LOCK TABLES `weshow_video` WRITE;
/*!40000 ALTER TABLE `weshow_video` DISABLE KEYS */;
INSERT INTO `weshow_video` VALUES (1, 'Zhan','西二旗大街路面塌陷，轿车陷大坑四轮朝天',150,200,39.9181,116.3012,''),
  (2, 'Zhan1','八达岭长城关闭游览致高速拥堵数公里',150,200,39.9181,116.3012,'');
/*!40000 ALTER TABLE `weshow_video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weshow_news`
--

DROP TABLE IF EXISTS `weshow_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weshow_news` (
  `id` int(16) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(90) NOT NULL DEFAULT '',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  `longitude` decimal(11,8) NOT NULL DEFAULT '0.00',
  `latitude` decimal(11,8) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_news`
--

LOCK TABLES `weshow_news` WRITE;
/*!40000 ALTER TABLE `weshow_news` DISABLE KEYS */;
INSERT INTO `weshow_news` VALUES (1, '西二旗大街路面塌陷，轿车陷大坑四轮朝天',1,100,300,39.9181,116.3012),
  (2, '八达岭长城关闭游览致高速拥堵数公里',1,100,300,39.9181,116.3012);
/*!40000 ALTER TABLE `weshow_news` ENABLE KEYS */;
UNLOCK TABLES;


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-08-01 23:57:46
