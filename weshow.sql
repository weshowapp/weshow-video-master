-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: weshow
-- ------------------------------------------------------
-- Server version	5.5.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
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
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `weshow_user` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `level` smallint(4) unsigned NOT NULL DEFAULT '0',
  `gender` smallint(1) unsigned NOT NULL DEFAULT '0',
  `openid` varchar(32) NOT NULL DEFAULT '',
  `mobile` varchar(16) NOT NULL DEFAULT '',
  `account` varchar(32) NOT NULL DEFAULT '',
  `name` varchar(60) NOT NULL DEFAULT '',
  `country` varchar(32) NOT NULL DEFAULT '',
  `province` varchar(32) NOT NULL DEFAULT '',
  `city` varchar(32) NOT NULL DEFAULT '',
  `language` varchar(32) NOT NULL DEFAULT '',
  `photo_url` text NOT NULL DEFAULT '',
  `inviter_id` varchar(32) NOT NULL DEFAULT '',
  `inviter_code` varchar(32) NOT NULL DEFAULT '',
  `invition_code` varchar(32) NOT NULL DEFAULT '',
  `reg_time` int(11) NOT NULL DEFAULT '0',
  `enabled` tinyint(3) unsigned DEFAULT 1,
  `join_count` int(8) unsigned DEFAULT 0,
  `win_count` int(8) unsigned DEFAULT 0,
  `relive` int(8) unsigned DEFAULT 1,
  `question_count` int(8) unsigned DEFAULT 0,
  `win` float DEFAULT 0.0,
  `balance` float DEFAULT 0.0,
  `note` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `openid` (`openid`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_user`
--

LOCK TABLES `weshow_user` WRITE;
/*!40000 ALTER TABLE `weshow_user` DISABLE KEYS */;
INSERT INTO `weshow_user` 
VALUES (1,0,1,'wx-1','10086','wx-1','Zhan0','CN','BJ','BJ','CN','https://wx.qlogo.cn/mmopen/vi_32/bMqoLrFBhxP8ZsHJqOd2eIsEtpkCuSW0JtfOPZpsIaBKhqMaeONREia3R2TdtIf9oMAY2wq0pJPHUOCqzNXR7iaw/0','0','AA','A1',1513171637,1,1,1,1,1,0,0,''),
  (2,0,1,'wx-0','10010','wx-2','Zhan1','CN','BJ','Hai','CN','https://tvax1.sinaimg.cn/crop.0.0.996.996.180/005WFisyly8fghoqxipmsj30ro0romzf.jpg','0','BB','B1',1513171637,1,1,1,1,1,0,0,'');
/*!40000 ALTER TABLE `weshow_user` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `weshow_question`
--

DROP TABLE IF EXISTS `weshow_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `weshow_question` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `creator_id` varchar(64) NOT NULL DEFAULT '',
  `creator_name` varchar(32) NOT NULL DEFAULT '',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `type` int(8) unsigned NOT NULL DEFAULT '0',
  `level` int(4) unsigned NOT NULL DEFAULT '0',
  `filter` int(4) unsigned NOT NULL DEFAULT '0',
  `category0` varchar(32) NOT NULL DEFAULT '0',
  `category1` varchar(32) NOT NULL DEFAULT '1',
  `category2` varchar(32) NOT NULL DEFAULT '2',
  `category3` varchar(32) NOT NULL DEFAULT '3',
  `tags` varchar(64) NOT NULL DEFAULT '',
  `source` varchar(64) NOT NULL DEFAULT '',
  `title` varchar(32) NOT NULL DEFAULT '',
  `content` varchar(255) NOT NULL DEFAULT '',
  `item0` varchar(32) NOT NULL DEFAULT '',
  `item1` varchar(32) NOT NULL DEFAULT '',
  `item2` varchar(32) NOT NULL DEFAULT '',
  `item3` varchar(32) NOT NULL DEFAULT '',
  `item_count` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `answer` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `note` varchar(255) NOT NULL DEFAULT '',
  `more` varchar(255) NOT NULL DEFAULT '',
  `correct_count` int(11) unsigned NOT NULL DEFAULT '0',
  `wrong_count` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `creator_id` (`creator_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_question`
--

LOCK TABLES `weshow_question` WRITE;
/*!40000 ALTER TABLE `weshow_question` DISABLE KEYS */;
INSERT INTO `weshow_question` 
VALUES (1,'1','A1',1516199514,1,1,0,'0','1','2','3','','','','北京在秦代曾经叫做?','蓟','京','燕','',3,0,'北京在秦代称作蓟','',1,0),
  (2,'1','AA',1516199666,1,1,0,'0','1','2','3','','','','甄嬛传是哪个皇帝时代？','乾隆','康熙','雍正','',3,2,'电视剧','',1,0),
  (3,'1','AA',1516199666,1,1,0,'0','1','2','3','','','','下列名称不属于二十四节气的？','谷雨','大伏','春分','',3,1,'二十四节气','',1,0),
  (4,'3','A1',1516199666,1,1,0,'0','1','2','3','','','','玄武门之变发生在以下哪个皇帝时期','唐太宗','唐明皇','唐高祖','',3,2,'李世民争夺太子之战','',1,0);
/*!40000 ALTER TABLE `weshow_question` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `weshow_quiz`
--

DROP TABLE IF EXISTS `weshow_quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `weshow_quiz` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `creator_id` varchar(64) NOT NULL DEFAULT '',
  `creator_name` varchar(16) NOT NULL DEFAULT '',
  `creator_photo` text NOT NULL DEFAULT '',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `title` varchar(32) NOT NULL DEFAULT '',
  `questions` varchar(255) NOT NULL DEFAULT '',
  `quest_count` smallint(6) unsigned NOT NULL DEFAULT '1',
  `type` int(4) unsigned NOT NULL DEFAULT '0',
  `level` int(4) unsigned NOT NULL DEFAULT '0',
  `category` int(4) unsigned NOT NULL DEFAULT '0',
  `price` float unsigned NOT NULL DEFAULT '0',
  `pay_status` tinyint(3) unsigned DEFAULT '0',
  `min_users` int(8) unsigned NOT NULL DEFAULT '0',
  `win_users` int(8) NOT NULL DEFAULT '-1',
  `start_time` int(11) unsigned NOT NULL DEFAULT '0',
  `share_ticket` varchar(64) NOT NULL DEFAULT '',
  `open_gid` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_quiz`
--

LOCK TABLES `weshow_quiz` WRITE;
/*!40000 ALTER TABLE `weshow_quiz` DISABLE KEYS */;
INSERT INTO `weshow_quiz` 
VALUES (1,'1','A1','',1516199514,'','1-3-6',3,0,1,0,1.0,0,1,0,1516219514,'','');
/*!40000 ALTER TABLE `weshow_quiz` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `weshow_group`
--

DROP TABLE IF EXISTS `weshow_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `weshow_group` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(20) NOT NULL DEFAULT '1',
  `add_uid` varchar(64) NOT NULL DEFAULT '1',
  `add_name` varchar(16) NOT NULL DEFAULT '',
  `add_time` int(11) unsigned NOT NULL DEFAULT '0',
  `name` varchar(32) NOT NULL DEFAULT '',
  `open_gid` varchar(64) NOT NULL DEFAULT '',
  `share_ticket` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `open_gid` (`open_gid`),
  KEY `add_uid` (`add_uid`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_group`
--

LOCK TABLES `weshow_group` WRITE;
/*!40000 ALTER TABLE `weshow_group` DISABLE KEYS */;
INSERT INTO `weshow_group` 
VALUES (1,1,'oZ','A1',1516199514,'','1','1');
/*!40000 ALTER TABLE `weshow_group` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `weshow_usergroup`
--

DROP TABLE IF EXISTS `weshow_usergroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `weshow_usergroup` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(20) NOT NULL DEFAULT '1',
  `gid` int(20) NOT NULL DEFAULT '1',
  `openid` varchar(32) NOT NULL DEFAULT '',
  `open_gid` varchar(64) NOT NULL DEFAULT '',
  `note` varchar(32) NOT NULL DEFAULT '',
  `check_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `openid` (`openid`),
  KEY `open_gid` (`open_gid`),
  UNIQUE KEY `usergroup_acc` (`openid`, `open_gid`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_usergroup`
--

LOCK TABLES `weshow_usergroup` WRITE;
/*!40000 ALTER TABLE `weshow_usergroup` DISABLE KEYS */;
INSERT INTO `weshow_usergroup` 
VALUES (1,1,1,'A1','A1','',1516199514);
/*!40000 ALTER TABLE `weshow_usergroup` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `weshow_quizuser`
--

DROP TABLE IF EXISTS `weshow_quizuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `weshow_quizuser` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(20) NOT NULL DEFAULT '1',
  `quizid` int(20) NOT NULL DEFAULT '1',
  `openid` varchar(32) NOT NULL DEFAULT '',
  `note` varchar(32) NOT NULL DEFAULT '',
  `answer_status` int(20) NOT NULL DEFAULT '0',
  `game_status` tinyint(3) NOT NULL DEFAULT '0',
  `game_gain` float NOT NULL DEFAULT '0',
  `answer_time` int(16) unsigned NOT NULL DEFAULT '0',
  `answer_set` int(4) unsigned NOT NULL DEFAULT '0',
  `answer_correct` int(4) unsigned NOT NULL DEFAULT '0',
  `add_time` int(16) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `quizid` (`quizid`),
  KEY `openid` (`openid`),
  UNIQUE KEY `quizuser_acc` (`openid`, `quizid`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_quizuser`
--

LOCK TABLES `weshow_quizuser` WRITE;
/*!40000 ALTER TABLE `weshow_quizuser` DISABLE KEYS */;
INSERT INTO `weshow_quizuser` 
VALUES (1,1,1,'A1','A1',0,0,0,0,0,0,1516199514);
/*!40000 ALTER TABLE `weshow_quizuser` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `weshow_relive`
--

DROP TABLE IF EXISTS `weshow_relive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `weshow_relive` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(64) NOT NULL DEFAULT '',
  `quizid` int(20) NOT NULL DEFAULT '1',
  `invitee_id` varchar(64) NOT NULL DEFAULT '',
  `note` varchar(32) NOT NULL DEFAULT '',
  `increase` tinyint(3) NOT NULL DEFAULT '1',
  `add_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `quizid` (`quizid`),
  KEY `openid` (`openid`),
  UNIQUE KEY `relive_acc` (`openid`, `quizid`, `invitee_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_relive`
--

LOCK TABLES `weshow_relive` WRITE;
/*!40000 ALTER TABLE `weshow_relive` DISABLE KEYS */;
INSERT INTO `weshow_relive` 
VALUES (1,'A1',1,'A1','0',1,1516199514);
/*!40000 ALTER TABLE `weshow_relive` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `weshow_wxcash`
--

DROP TABLE IF EXISTS `weshow_wxcash`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `weshow_wxcash` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(64) NOT NULL DEFAULT '',
  `username` varchar(32) NOT NULL DEFAULT '',
  `quizid` int(20) NOT NULL DEFAULT '0',
  `cash_val` float NOT NULL DEFAULT '0',
  `draw_type` int(4) NOT NULL DEFAULT '0',
  `draw_status` int(4) NOT NULL DEFAULT '0',
  `note` varchar(256) NOT NULL DEFAULT '',
  `add_time` int(18) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `openid` (`openid`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_wxcash`
--

LOCK TABLES `weshow_wxcash` WRITE;
/*!40000 ALTER TABLE `weshow_wxcash` DISABLE KEYS */;
INSERT INTO `weshow_wxcash` 
VALUES (1,'00','A1',0,0.0,0,0,'0',1516199514);
/*!40000 ALTER TABLE `weshow_wxcash` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `weshow_wxpay`
--

DROP TABLE IF EXISTS `weshow_wxpay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `weshow_wxpay` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(32) NOT NULL DEFAULT '',
  `quizid` int(20) NOT NULL DEFAULT '0',
  `notify` varchar(8096) NOT NULL DEFAULT '',
  `note` varchar(1024) NOT NULL DEFAULT '',
  `add_time` int(18) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `openid` (`openid`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_wxpay`
--

LOCK TABLES `weshow_wxpay` WRITE;
/*!40000 ALTER TABLE `weshow_wxpay` DISABLE KEYS */;
INSERT INTO `weshow_wxpay` 
VALUES (1,'A1',0,'A1','0',1516199514);
/*!40000 ALTER TABLE `weshow_wxpay` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `weshow_note`
--

DROP TABLE IF EXISTS `weshow_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `weshow_note` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `userid` varchar(64) NOT NULL DEFAULT '',
  `note` varchar(8096) NOT NULL DEFAULT '',
  `more` varchar(1024) NOT NULL DEFAULT '',
  `add_time` int(18) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_note`
--

LOCK TABLES `weshow_note` WRITE;
/*!40000 ALTER TABLE `weshow_note` DISABLE KEYS */;
INSERT INTO `weshow_note` 
VALUES (1,'0','ABC','0',1516199514);
/*!40000 ALTER TABLE `weshow_note` ENABLE KEYS */;
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
