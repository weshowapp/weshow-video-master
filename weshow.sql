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
  `gender` smallint(1) unsigned NOT NULL DEFAULT '0',
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

LOCK TABLES `weshow_user` WRITE;s
/*!40000 ALTER TABLE `weshow_user` DISABLE KEYS */;
INSERT INTO `weshow_user` 
VALUES (1,1,'wx-1','Zhan1','https://wx.qlogo.cn/mmopen/vi_32/bMqoLrFBhxP8ZsHJqOd2eIsEtpkCuSW0JtfOPZpsIaBKhqMaeONREia3R2TdtIf9oMAY2wq0pJPHUOCqzNXR7iaw/0',0,1),
  (2,1,'wx-2','Zhan2','https://wx.qlogo.cn/mmopen/vi_32/bMqoLrFBhxP8ZsHJqOd2eIsEtpkCuSW0JtfOPZpsIaBKhqMaeONREia3R2TdtIf9oMAY2wq0pJPHUOCqzNXR7iaw/0',0,1),
  (3,1,'wx-3','Zhan3','http://yanxuan.nosdn.127.net/8e50c65fda145e6dd1bf4fb7ee0fcecc.jpg',0,1);
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
  `creator` int(11) NOT NULL DEFAULT '1',
  `title` varchar(90) NOT NULL DEFAULT '',
  `news_id` int(16) NOT NULL DEFAULT '1',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `upload_time` int(11) unsigned NOT NULL DEFAULT '0',
  `longitude` decimal(4,9) NOT NULL DEFAULT '0.00',
  `latitude` decimal(4,9) NOT NULL DEFAULT '0.00',
  `poster_url` varchar(255) NOT NULL DEFAULT '',
  `video_url` varchar(255) NOT NULL DEFAULT '',
  `like` int(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_video`
--

LOCK TABLES `weshow_video` WRITE;
/*!40000 ALTER TABLE `weshow_video` DISABLE KEYS */;
INSERT INTO `weshow_video` 
VALUES (1,1,'西二旗大街路面塌陷，轿车陷大坑四轮朝天',1,150,200,39.9181,116.3012,
       'http://ww2.sinaimg.cn/bmiddle/652f5916gy1fhwl5bnikyj20zk0no0y9.jpg',
       'http://1254157576.vod2.myqcloud.com/7414dc4avodgzp1254157576/864b9df09031868223111231080/jR4btnzq24oA.mp4',10),
   (2,2,'八达岭长城关闭游览致高速拥堵数公里',2,150,200,39.9181,116.3012,
       'http://ww4.sinaimg.cn/bmiddle/c268f966ly1fi5sxnjrrmj21hc0u0gwq.jpg',
	   'http://1254157576.vod2.myqcloud.com/7414dc4avodgzp1254157576/5fc4184b9031868223117727478/vhpGtwf3HuUA.mp4',14),
   (3,3,'降雨致北京171处景区关闭13处积水断路',3,150,200,39.9181,116.3012,
       'http://ww2.sinaimg.cn/bmiddle/7f5092a4gw1f669izfr79j20hs091q39.jpg',
	   'http://1254157576.vod2.myqcloud.com/7414dc4avodgzp1254157576/601f1f4b9031868223117778481/WMckAN7SaOQA.mp4',80);
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
  `longitude` decimal(4,9) NOT NULL DEFAULT '0.00',
  `latitude` decimal(4,9) NOT NULL DEFAULT '0.00',
  `location` varchar(90) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_news`
--

LOCK TABLES `weshow_news` WRITE;
/*!40000 ALTER TABLE `weshow_news` DISABLE KEYS */;
INSERT INTO `weshow_news` 
VALUES (1,'西二旗大街路面塌陷，轿车陷大坑四轮朝天',1,100,300,39.9181,116.3012,'西二旗大街'),
  (2,'八达岭长城关闭游览致高速拥堵数公里',1,100,300,39.9181,116.3012,'八达岭'),
  (3,'降雨致北京171处景区关闭13处积水断路',1,100,300,39.9181,116.3012,'北京'),
  (4,'房山大雨，路面积水',1,100,300,39.9181,116.3012,'房山良乡');
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
