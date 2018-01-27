-- MySQL dump 10.13  Distrib 5.7.19, for Linux (x86_64)
--
-- Host: localhost    Database: weshow
-- ------------------------------------------------------
-- Server version	5.7.19-0ubuntu0.16.04.1

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
-- Table structure for table `weshow_comment`
--

DROP TABLE IF EXISTS `weshow_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weshow_comment` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `creator` int(20) NOT NULL DEFAULT '1',
  `video_id` int(20) NOT NULL DEFAULT '1',
  `content` varchar(255) NOT NULL DEFAULT '',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `like` int(11) NOT NULL DEFAULT '0',
  `unlike` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_comment`
--

LOCK TABLES `weshow_comment` WRITE;
/*!40000 ALTER TABLE `weshow_comment` DISABLE KEYS */;
INSERT INTO `weshow_comment` VALUES (1,1,1,1,'突然塌陷了？还是大车压塌的？',1503181437,0,0),(2,1,2,1,'人没事吧？车里几个人啊，坑里是啥？',1503182437,0,0),(3,1,3,1,'刚刚路过，我说怎么堵了，以为是铺路呢，好危险啊',1503183437,0,0),(4,1,4,2,'用啥方式把车弄出来啊？会不会周边继续塌啊？',1503184437,0,0),(5,2,5,1,'语音评论',1503185437,0,0),(6,1,6,3,'天塌啦地陷啦小花狗不见啦',1503186437,0,0),(7,1,7,4,'驾驶员体重超标引起的吧？',1503186437,0,0),(8,1,1,1,'这条路我早觉得要出问题',1503186437,0,0),(12,0,9,16,'弹幕文字',1505113011,0,0),(13,0,9,16,'评论文字',1505113029,0,0);
/*!40000 ALTER TABLE `weshow_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weshow_feedback`
--

DROP TABLE IF EXISTS `weshow_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weshow_feedback` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `creator` int(20) NOT NULL DEFAULT '1',
  `creator_name` varchar(16) NOT NULL DEFAULT '',
  `content` varchar(255) NOT NULL DEFAULT '',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_feedback`
--

LOCK TABLES `weshow_feedback` WRITE;
/*!40000 ALTER TABLE `weshow_feedback` DISABLE KEYS */;
INSERT INTO `weshow_feedback` VALUES (1,1,'A1','很好，很有趣，很有用',1503481437),(12,0,'湛','反馈意见\n',1504937605),(13,0,'匿名用户','niming',1504937983),(14,0,'匿名用户','Test the input.\n获取输入框内容\n',1505036793);
/*!40000 ALTER TABLE `weshow_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weshow_like`
--

DROP TABLE IF EXISTS `weshow_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weshow_like` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `creator` int(20) NOT NULL DEFAULT '1',
  `video_id` int(20) NOT NULL DEFAULT '1',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `creator_video` (`creator`,`video_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_like`
--

LOCK TABLES `weshow_like` WRITE;
/*!40000 ALTER TABLE `weshow_like` DISABLE KEYS */;
INSERT INTO `weshow_like` VALUES (1,1,1,1503181437),(2,2,1,1503182437),(3,3,1,1503183437),(4,4,2,1503184437),(5,5,1,1503185437),(6,6,3,1503186437),(7,7,4,1503186437),(8,1,1,1503186437);
/*!40000 ALTER TABLE `weshow_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weshow_news`
--

DROP TABLE IF EXISTS `weshow_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weshow_news` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(90) NOT NULL DEFAULT '',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  `start_time` int(11) unsigned NOT NULL DEFAULT '0',
  `end_time` int(11) unsigned NOT NULL DEFAULT '0',
  `longitude` decimal(11,8) NOT NULL DEFAULT '0.00000000',
  `latitude` decimal(11,8) NOT NULL DEFAULT '0.00000000',
  `location` varchar(90) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_news`
--

LOCK TABLES `weshow_news` WRITE;
/*!40000 ALTER TABLE `weshow_news` DISABLE KEYS */;
INSERT INTO `weshow_news` VALUES 
(25,'西二旗大街塌陷，救护车来了，很及时',0,1505186059,0,1505188859,1505146859,116.44355000,39.92190000,'西二旗大街'),
(35,'加油站附近发生事故',0,1505145340,0,1505138140,1505156140,116.27096000,39.94777000,'门头沟'),
(47,'8月26日下午三点半，看到天通苑冒黑烟',0,1505087408,0,1505080208,1505098208,116.41298500,40.08329100,'天通苑'),
(46,'天通苑像是着火了，浓烟滚滚',0,1505000111,0,1505002911,1505010911,116.41967000,40.06359000,'天通苑'),
(44,'汪峰鸟巢演唱会',0,1504955769,0,1504948569,1504966569,116.40717000,39.90469000,'鸟巢'),
(40,'林宥嘉口的形状演唱会',0,1504854682,0,1504847482,1504865482,114.05454000,22.52291000,'深圳'),
(43,'InMusic巡回演唱会昆明站',0,1504755346,0,1504748146,1504766146,102.72254000,25.01567000,'昆明'),
(29,'门头沟发生泥石流',0,1504641548,0,1504634348,1504652348,116.10146000,39.94048000,'门头沟'),
(17,'复兴路五棵松附近西向东拥堵',0,1504554480,0,1504547280,1504565280,116.27104000,39.90587000,'复兴路'),
(39,'女司机开车坠河',0,1505045990,0,1505038790,1505056790,114.34275300,36.10471900,'安阳'),
(27,'交警蜀黍长安街追羊',0,1505041295,0,1505034095,1505052095,116.41306600,39.90795900,'王府井'),
(30,'福建仙游乡村客运车坠桥',0,1505042582,0,1505035382,1505053382,118.69181000,25.36215000,'福建仙游'),
(23,'西二旗大街路面塌陷，一俩轿车坠入坑内',0,1505034274,0,1505027074,1505045074,116.30603000,40.05296000,'北京市西二旗'),
(24,'北京电视台西二旗路面塌陷事件报道',0,1505035771,0,1505028571,1505046571,116.46827000,39.90651000,'北京电视台'),
(26,'西二旗塌陷，车陷进去了',0,1505036161,0,1505028961,1505046961,116.19092000,39.99009000,'西二旗'),
(28,'行驶途中车辆自燃',0,1505041364,0,1505034164,1505052164,121.38206000,31.11325000,'闵行区'),
(36,'摩托车左转与直行小客车撞车',0,1505045563,0,1505038363,1505056363,116.03081000,40.06768000,'门头沟'),
(37,'发生交通事故，众人围观',0,1505045656,0,1505038456,1505056456,116.14294000,39.74788000,'门头沟'),
(38,'加油站附近发生事故，车辆都在绕行',0,1505045723,0,1505038523,1505056523,116.28616000,39.85856000,'门头沟');
/*!40000 ALTER TABLE `weshow_news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weshow_user`
--

DROP TABLE IF EXISTS `weshow_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weshow_user` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `level` smallint(3) unsigned NOT NULL DEFAULT '0',
  `gender` smallint(1) unsigned NOT NULL DEFAULT '0',
  `openid` varchar(32) NOT NULL DEFAULT '',
  `mobile` varchar(16) NOT NULL DEFAULT '',
  `account` varchar(32) NOT NULL DEFAULT '',
  `name` varchar(60) NOT NULL DEFAULT '',
  `photo_url` text NOT NULL,
  `reg_time` int(11) NOT NULL DEFAULT '0',
  `enabled` tinyint(3) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `account` (`account`),
  KEY `openid` (`openid`),
  KEY `enabled` (`enabled`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_user`
--

LOCK TABLES `weshow_user` WRITE;
/*!40000 ALTER TABLE `weshow_user` DISABLE KEYS */;
INSERT INTO `weshow_user` VALUES (1,0,1,'1','1','wx-1','Zhan1','https://wx.qlogo.cn/mmopen/vi_32/bMqoLrFBhxP8ZsHJqOd2eIsEtpkCuSW0JtfOPZpsIaBKhqMaeONREia3R2TdtIf9oMAY2wq0pJPHUOCqzNXR7iaw/0',1503171637,1),(2,0,1,'2','1','wx-2','Zhan2','https://tvax1.sinaimg.cn/crop.0.0.996.996.180/005WFisyly8fghoqxipmsj30ro0romzf.jpg',1503171637,1),(3,0,1,'3','1','wx10000104','西居士','https://tva3.sinaimg.cn/crop.0.0.1125.1125.180/cc981db8jw8f1oifzwvxqj20v90v941q.jpg',1503171637,1),(4,0,0,'4','1','wx147','筱沐羊','https://tva3.sinaimg.cn/crop.11.0.727.727.50/a26464c3jw8f907h6mn0aj20ku0k774w.jpg',1503171637,1),(5,0,1,'5','1','wx6798','Malcolm','https://tva3.sinaimg.cn/crop.0.0.720.720.180/005vjZrTjw8edotcpsvndj30k00k040n.jpg',1503171637,1),(6,0,0,'6','1','wx0014','Frieda小姐','https://tvax3.sinaimg.cn/crop.0.0.996.996.180/c33b59d9ly8fdftoeyeewj20ro0rp76n.jpg',1503171637,1),(7,0,1,'7','1','wx00763','著名有钱人','https://tva3.sinaimg.cn/crop.0.0.180.180.180/4d114f3ejw1e8qgp5bmzyj2050050aa8.jpg',1503171637,1),(8,0,1,'obZEe0R4nfePjf1iIvx8Ud6c4xAQ','','obZEe0R4nfePjf1iIvx8Ud6c4xAQ','李占胜','https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKY1VcUlJic2xwadr7Ij04MRKsqF30qvKgmAHI0mF8dJGoN3OsesdRQBDnuYdZ318KHRX8LPEfCfFQ/0',1504939136,1),(9,1,1,'obZEe0QX5G_IpOizfItefPkX7zdM','','obZEe0QX5G_IpOizfItefPkX7zdM','湛','https://wx.qlogo.cn/mmopen/vi_32/bMqoLrFBhxORmc8kfXQrq9Fsozia7K2TlNFeSCXYjxME6H3ob2tMnYibicbslgOx6wDkAiaQwf0BVC3gQG0AjgF9Jg/0',1504940591,1),(10,1,2,'','','','倩ʕ-̫͡-ʔ','https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJw6FzW8RiaR2MJZ4q8YQROcbibkDzb8fs3AnNbpL1V0fdswmRporrafjEPcVVpibn9c7YhkEGqUgqtw/0',1504941511,1),(11,0,1,'obZEe0bZFZ-7T3M8OwUtU-Lb6rdg','','obZEe0bZFZ-7T3M8OwUtU-Lb6rdg','Sam','https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIDWkPXCyRmpBicibfZmz2JoGia0q5qmwrfTIH55Dd5tRtzEdXOHSXciaPJl3Gxn8Qjz2ODf3Dq6eqcRw/0',1504948761,1),(12,0,1,'10019','','obZEe0QX5G_IpOizfItefPkX7zdM','凹凸君','https://wx.ibobcat.com/static/user/avatar/photo19.png',1504949846,1),(13,0,1,'10035','','obZEe0QX5G_IpOizfItefPkX7zdM','包几','https://wx.ibobcat.com/static/user/avatar/photo35.png',1504950040,1),(14,0,1,'1000','','obZEe0QX5G_IpOizfItefPkX7zdM','汪先生','https://wx.ibobcat.com/static/user/avatar/photo0.png',1504954527,1),(15,0,1,'10031','','obZEe0QX5G_IpOizfItefPkX7zdM','主持人','https://wx.ibobcat.com/static/user/avatar/photo31.png',1504954584,1),(16,0,1,'1005','','obZEe0QX5G_IpOizfItefPkX7zdM','极疯','https://wx.ibobcat.com/static/user/avatar/photo5.png',1505007148,1),(17,0,1,'10026','','obZEe0QX5G_IpOizfItefPkX7zdM','Angel','https://wx.ibobcat.com/static/user/avatar/photo26.png',1505013558,1),(18,0,1,'10011','','obZEe0QX5G_IpOizfItefPkX7zdM','爱Vi','https://wx.ibobcat.com/static/user/avatar/photo11.png',1505014424,1),(19,0,1,'1006','','obZEe0QX5G_IpOizfItefPkX7zdM','山人王','https://wx.ibobcat.com/static/user/avatar/photo6.png',1505015128,1),(20,0,1,'10023','','obZEe0QX5G_IpOizfItefPkX7zdM','大胃王','https://wx.ibobcat.com/static/user/avatar/photo23.png',1505018153,1),(21,0,1,'10013','','obZEe0QX5G_IpOizfItefPkX7zdM','神贴','https://wx.ibobcat.com/static/user/avatar/photo13.png',1505019655,1),(22,0,1,'1004','','obZEe0QX5G_IpOizfItefPkX7zdM','冰淇淋','https://wx.ibobcat.com/static/user/avatar/photo4.png',1505034329,1),(23,0,1,'10028','','obZEe0QX5G_IpOizfItefPkX7zdM','Sosay','https://wx.ibobcat.com/static/user/avatar/photo28.png',1505034440,1),(24,0,1,'10015','','obZEe0QX5G_IpOizfItefPkX7zdM','央视新闻','https://wx.ibobcat.com/static/user/avatar/photo15.png',1505034535,1),(25,0,1,'10033','','obZEe0QX5G_IpOizfItefPkX7zdM','小白','https://wx.ibobcat.com/static/user/avatar/photo33.png',1505034612,1),(26,0,1,'1008','','obZEe0QX5G_IpOizfItefPkX7zdM','M鹿M','https://wx.ibobcat.com/static/user/avatar/photo8.png',1505034681,1),(27,0,1,'10016','','obZEe0QX5G_IpOizfItefPkX7zdM','帮帮忙','https://wx.ibobcat.com/static/user/avatar/photo16.png',1505034736,1),(28,0,1,'10025','','obZEe0QX5G_IpOizfItefPkX7zdM','嘻嘻','https://wx.ibobcat.com/static/user/avatar/photo25.png',1505034919,1),(29,0,1,'10018','','obZEe0QX5G_IpOizfItefPkX7zdM','新浪科技','https://wx.ibobcat.com/static/user/avatar/photo18.png',1505035209,1),(30,0,1,'10017','','obZEe0QX5G_IpOizfItefPkX7zdM','搞笑集中营','https://wx.ibobcat.com/static/user/avatar/photo17.png',1505035820,1),(31,0,1,'1009','','obZEe0QX5G_IpOizfItefPkX7zdM','小仙女','https://wx.ibobcat.com/static/user/avatar/photo9.png',1505036110,1),(32,0,1,'10027','','obZEe0QX5G_IpOizfItefPkX7zdM','古月月','https://wx.ibobcat.com/static/user/avatar/photo27.png',1505041338,1),(33,0,1,'10029','','obZEe0QX5G_IpOizfItefPkX7zdM','微反应','https://wx.ibobcat.com/static/user/avatar/photo29.png',1505041437,1),(34,0,1,'10020','','obZEe0QX5G_IpOizfItefPkX7zdM','段子楼','https://wx.ibobcat.com/static/user/avatar/photo20.png',1505041661,1),(35,0,1,'10010','','obZEe0QX5G_IpOizfItefPkX7zdM','科技饭','https://wx.ibobcat.com/static/user/avatar/photo10.png',1505042703,1),(36,0,1,'10012','','obZEe0QX5G_IpOizfItefPkX7zdM','虫虫','https://wx.ibobcat.com/static/user/avatar/photo12.png',1505042747,1),(37,0,1,'10022','','obZEe0QX5G_IpOizfItefPkX7zdM','兜看','https://wx.ibobcat.com/static/user/avatar/photo22.png',1505042805,1),(38,0,1,'10034','','obZEe0QX5G_IpOizfItefPkX7zdM','王思聪','https://wx.ibobcat.com/static/user/avatar/photo34.png',1505042878,1),(39,0,1,'10021','','obZEe0QX5G_IpOizfItefPkX7zdM','Feng','https://wx.ibobcat.com/static/user/avatar/photo21.png',1505044862,1),(40,0,1,'1003','','obZEe0QX5G_IpOizfItefPkX7zdM','Ms韩','https://wx.ibobcat.com/static/user/avatar/photo3.png',1505045049,1),(41,0,1,'1007','','obZEe0QX5G_IpOizfItefPkX7zdM','看天下','https://wx.ibobcat.com/static/user/avatar/photo7.png',1505045381,1),(42,0,1,'10030','','obZEe0QX5G_IpOizfItefPkX7zdM','饲养员','https://wx.ibobcat.com/static/user/avatar/photo30.png',1505045634,1),(43,0,1,'10024','','obZEe0QX5G_IpOizfItefPkX7zdM','汤小思','https://wx.ibobcat.com/static/user/avatar/photo24.png',1505054776,1),(44,0,1,'10032','','obZEe0QX5G_IpOizfItefPkX7zdM','鱼哥','https://wx.ibobcat.com/static/user/avatar/photo32.png',1505055260,1);
/*!40000 ALTER TABLE `weshow_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weshow_video`
--

DROP TABLE IF EXISTS `weshow_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weshow_video` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `creator` int(20) NOT NULL DEFAULT '1',
  `title` varchar(90) NOT NULL DEFAULT '',
  `news_id` int(20) NOT NULL DEFAULT '1',
  `field_id` varchar(32) NOT NULL DEFAULT '1',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `upload_time` int(11) unsigned NOT NULL DEFAULT '0',
  `longitude` decimal(11,8) NOT NULL DEFAULT '0.00000000',
  `latitude` decimal(11,8) NOT NULL DEFAULT '0.00000000',
  `poster_url` varchar(255) NOT NULL DEFAULT '',
  `video_url` varchar(255) NOT NULL DEFAULT '',
  `comment` int(8) NOT NULL DEFAULT '0',
  `like` int(11) NOT NULL DEFAULT '0',
  `watch` int(16) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM AUTO_INCREMENT=89 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_video`
--

LOCK TABLES `weshow_video` WRITE;
/*!40000 ALTER TABLE `weshow_video` DISABLE KEYS */;
INSERT INTO `weshow_video` VALUES 
(81,25,'谁知道天通苑这栋楼怎么着火了',46,'9031868223215456805',1505100230,1505100282,116.41967000,40.06359000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/338263239031868223215456805/coverBySnapshot/1505100287_2927231778.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/338263239031868223215456805/v.f20.mp4',0,0,1),
(46,33,'行驶途中车辆自燃',28,'9031868223213470320',1505041419,1505041437,121.38206000,31.11325000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/99aebb559031868223213470320/coverBySnapshot/1505041442_541024656.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/99aebb559031868223213470320/v.f20.mp4',0,0,1),
(74,20,'InMusic巡回演唱会，昆明',43,'9031868223214641587',1505055424,1505055464,102.72254000,25.01567000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/eb1d95859031868223214641587/coverBySnapshot/1505055472_3157734760.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/eb1d95859031868223214641587/v.f20.mp4',0,0,1),
(75,17,'汪峰鸟巢演唱会',44,'9031868223214642057',1505055769,1505055813,116.40717000,39.90469000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/eb1e0c3e9031868223214642057/coverBySnapshot/1505055822_4117242402.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/eb1e0c3e9031868223214642057/v.f20.mp4',0,0,1),
(76,15,'汪峰演唱会，远距离观看',44,'9031868223214642088',1505055831,1505055875,116.40717000,39.90469000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/eb1e0ca29031868223214642088/coverBySnapshot/1505055882_1146010608.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/eb1e0ca29031868223214642088/v.f20.mp4',0,0,1),
(79,38,'高台观看，鸟巢汪峰演唱会',44,'9031868223214692800',1505056359,1505056396,116.40717000,39.90469000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/eb78a81f9031868223214692800/coverBySnapshot/1505056402_860101870.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/eb78a81f9031868223214692800/v.f20.mp4',0,0,1),
(80,40,'天通苑像是着火了，浓烟滚滚',46,'9031868223215456606',1505100111,1505100186,116.41967000,40.06359000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/33825aa29031868223215456606/coverBySnapshot/1505100192_6291378.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/33825aa29031868223215456606/v.f20.mp4',0,0,1),
(82,37,'天通苑楼顶着火',46,'9031868223215457290',1505100485,1505100537,116.41967000,40.06359000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/3382d7229031868223215457290/coverBySnapshot/1505100542_3919148019.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/3382d7229031868223215457290/v.f20.mp4',0,0,1),
(85,40,'8月26日下午三点半，看到天通苑冒黑烟',47,'9031868223218777267',1505187408,1505187483,116.41298500,40.08329100,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/219537ee9031868223218777267/coverBySnapshot/1505187492_2083757657.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/219537ee9031868223218777267/v.f20.mp4',0,0,1),
(73,35,'InMusic巡回演唱会昆明站',43,'9031868223214641482',1505055346,1505055400,102.72254000,25.01567000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/eb1d913f9031868223214641482/coverBySnapshot/1505055407_3749886107.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/eb1d913f9031868223214641482/v.f20.mp4',0,0,1),
(70,33,'口的形状演唱会灯光',40,'9031868223214590918',1505054927,1505054969,114.05454000,22.52291000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/e9226b269031868223214590918/coverBySnapshot/1505054977_772616807.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/e9226b269031868223214590918/v.f20.mp4',0,0,1),
(87,19,'天通苑北东三旗着火',47,'9031868223218777392',1505187569,1505187597,116.41298500,40.08329100,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/21953c8d9031868223218777392/coverBySnapshot/1505187602_2779436774.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/21953c8d9031868223218777392/v.f20.mp4',0,0,1),
(88,19,'天通苑出现浓烟',47,'9031868223218777574',1505187606,1505187756,116.41298500,40.08329100,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/219544cf9031868223218777574/coverBySnapshot/1505187762_332321464.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/219544cf9031868223218777574/v.f20.mp4',0,0,1),
(18,14,'复兴路五棵松附近西向东拥堵',17,'9031868223209389054',1504954480,1504954527,116.27104000,39.90587000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/790c25e79031868223209389054/coverBySnapshot/1504954527_4097078600.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/790c25e79031868223209389054/v.f20.mp4',0,0,1),
(19,15,'西向东拥堵',17,'9031868223209389161',1504954566,1504954584,116.27104000,39.90587000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/790c2a469031868223209389161/coverBySnapshot/1504954587_3614078366.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/790c2a469031868223209389161/v.f20.mp4',0,0,1),
(20,15,'301附近西向东车辆行驶缓慢',17,'9031868223209389543',1504954785,1504954813,116.27104000,39.90587000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/790c3b0a9031868223209389543/coverBySnapshot/1504954822_4097704540.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/790c3b0a9031868223209389543/v.f20.mp4',0,0,1),
(67,30,'林宥嘉口的形状演唱会',40,'9031868223214590510',1505054682,1505054705,114.05454000,22.52291000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/e9225a1a9031868223214590510/coverBySnapshot/1505054712_913333204.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/e9225a1a9031868223214590510/v.f20.mp4',0,0,1),
(68,43,'林宥嘉口的形状演唱会',40,'9031868223214590605',1505054752,1505054776,114.05454000,22.52291000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/e9225e3f9031868223214590605/coverBySnapshot/1505054782_608239396.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/e9225e3f9031868223214590605/v.f20.mp4',0,0,1),
(86,13,'天通苑北亚市着火',47,'9031868223218777350',1505187519,1505187555,116.41298500,40.08329100,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/21953c079031868223218777350/coverBySnapshot/1505187562_2566208575.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/21953c079031868223218777350/v.f20.mp4',0,0,1),
(44,32,'交警蜀黍长安街追羊',27,'9031868223213470226',1505041295,1505041338,116.41306600,39.90795900,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/99aeb71a9031868223213470226/coverBySnapshot/1505041347_1325116514.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/99aeb71a9031868223213470226/v.f20.mp4',0,0,1),
(66,21,'女司机开车坠河',39,'9031868223213727633',1505045990,1505046035,114.34275300,36.10471900,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/a0579e419031868223213727633/coverBySnapshot/1505046042_1277095518.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/a0579e419031868223213727633/v.f20.mp4',0,0,1),
(45,32,'行驶途中车辆自燃',28,'9031868223213470284',1505041364,1505041407,121.38206000,31.11325000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/99aeb7de9031868223213470284/coverBySnapshot/1505041407_556734581.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/99aeb7de9031868223213470284/v.f20.mp4',0,0,1),
(29,22,'西二旗大街路面塌陷，一俩轿车坠入坑内',23,'9031868223213159118',1505034274,1505034329,116.30603000,40.05296000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/928ff73e9031868223213159118/coverBySnapshot/1505034332_2340551381.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/928ff73e9031868223213159118/v.f20.mp4',0,0,1),
(30,23,'西二旗大街路面塌陷，车辆坠落时',23,'9031868223213159276',1505034383,1505034440,116.30603000,40.05296000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/928ffc439031868223213159276/coverBySnapshot/1505034442_962273710.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/928ffc439031868223213159276/v.f20.mp4',0,0,1),
(31,24,'西二旗大街路面塌陷，车辆坠入，群众围观',23,'9031868223213159385',1505034499,1505034535,116.30603000,40.05296000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929000a49031868223213159385/coverBySnapshot/1505034542_2359729215.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929000a49031868223213159385/v.f20.mp4',0,0,1),
(32,25,'民警达到现场',23,'9031868223213159527',1505034574,1505034612,116.30603000,40.05296000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929008629031868223213159527/coverBySnapshot/1505034617_2957740805.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929008629031868223213159527/v.f20.mp4',0,0,1),
(33,26,'消防施救人员到达现场',23,'9031868223213159584',1505034646,1505034681,116.30603000,40.05296000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929009259031868223213159584/coverBySnapshot/1505034682_717304102.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929009259031868223213159584/v.f20.mp4',0,0,1),
(34,27,'施救人员现场布控',23,'9031868223213159710',1505034709,1505034736,116.30603000,40.05296000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929010bc9031868223213159710/coverBySnapshot/1505034742_1443055192.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929010bc9031868223213159710/v.f20.mp4',0,0,1),
(35,18,'消防施救人员开始进入塌坑内',23,'9031868223213159890',1505034801,1505034829,116.30603000,40.05296000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929016059031868223213159890/coverBySnapshot/1505034832_3239153905.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929016059031868223213159890/v.f20.mp4',0,0,1),
(36,28,'施救人员勘察现场并开始施救',23,'9031868223213159948',1505034880,1505034919,116.30603000,40.05296000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929019a99031868223213159948/coverBySnapshot/1505034927_4252934166.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929019a99031868223213159948/v.f20.mp4',0,0,1),
(37,27,'被困人员陆续被救出',23,'9031868223213160079',1505034973,1505034999,116.30603000,40.05296000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929d1cdc9031868223213160079/coverBySnapshot/1505035007_1813466964.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929d1cdc9031868223213160079/v.f20.mp4',0,0,1),
(38,27,'被困人员全部救出',23,'9031868223213160260',1505035082,1505035111,116.30603000,40.05296000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929d25349031868223213160260/coverBySnapshot/1505035117_1790775181.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929d25349031868223213160260/v.f20.mp4',0,0,1),
(39,29,'被困车辆施救过程',23,'9031868223213160430',1505035160,1505035209,116.30603000,40.05296000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929d2d539031868223213160430/coverBySnapshot/1505035217_440908976.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929d2d539031868223213160430/v.f20.mp4',0,0,1),
(40,28,'事故车辆被救出损坏并不严重',23,'9031868223213160600',1505035233,1505035280,116.30603000,40.05296000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929d35729031868223213160600/coverBySnapshot/1505035287_134506343.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929d35729031868223213160600/v.f20.mp4',0,0,1),
(41,30,'北京电视台西二旗路面塌陷事件报道',24,'9031868223213161430',1505035771,1505035820,116.46827000,39.90651000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929db9b49031868223213161430/coverBySnapshot/1505035827_3889499838.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929db9b49031868223213161430/v.f20.mp4',0,0,1),
(42,31,'西二旗大街塌陷，救护车来了，很及时',25,'9031868223213161842',1505036059,1505036110,116.44355000,39.92190000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929dcadb9031868223213161842/coverBySnapshot/1505036117_2721592932.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929dcadb9031868223213161842/v.f20.mp4',0,0,1),
(43,16,'西二旗塌陷，车陷进去了',26,'9031868223213162067',1505036161,1505036210,116.19092000,39.99009000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929e357b9031868223213162067/coverBySnapshot/1505036217_3973234552.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/929e357b9031868223213162067/v.f20.mp4',0,0,1),
(47,31,'路遇车辆自燃',28,'9031868223213470440',1505041453,1505041477,121.38206000,31.11325000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/99aebfd89031868223213470440/coverBySnapshot/1505041482_2425404162.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/99aebfd89031868223213470440/v.f20.mp4',0,0,1),
(48,18,'门头沟发生泥石流',29,'9031868223213470648',1505041548,1505041581,116.10146000,39.94048000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/99aec8629031868223213470648/coverBySnapshot/1505041587_3000834841.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/99aec8629031868223213470648/v.f20.mp4',0,0,1),
(49,12,'泥石流现场，顺水而下',29,'9031868223213470708',1505041596,1505041625,116.10146000,39.94048000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/99aecc1f9031868223213470708/coverBySnapshot/1505041627_1777904946.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/99aecc1f9031868223213470708/v.f20.mp4',0,0,1),
(50,34,'泥石流很大，进入村庄',29,'9031868223213470746',1505041632,1505041661,116.10146000,39.94048000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/99aecca19031868223213470746/coverBySnapshot/1505041662_2481287056.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/99aecca19031868223213470746/v.f20.mp4',0,0,1),
(51,35,'福建仙游乡村客运车坠桥',30,'9031868223213522361',1505042582,1505042703,118.69181000,25.36215000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/9baa82b89031868223213522361/coverBySnapshot/1505042712_2424929216.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/9baa82b89031868223213522361/v.f20.mp4',0,0,1),
(52,36,'车辆坠桥之后',30,'9031868223213522392',1505042715,1505042747,118.69181000,25.36215000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/9baa831c9031868223213522392/coverBySnapshot/1505042752_3033468913.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/9baa831c9031868223213522392/v.f20.mp4',0,0,1),
(58,40,'加油站附近发生事故',29,'9031868223213675953',1505045024,1505045049,116.10146000,39.94048000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/9e5be4689031868223213675953/coverBySnapshot/1505045057_2405749094.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/9e5be4689031868223213675953/v.f20.mp4',0,0,1),
(57,20,'摩托车与小客车撞车，众人围观',29,'9031868223213675879',1505044898,1505044960,116.10146000,39.94048000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/9e5be06f9031868223213675879/coverBySnapshot/1505044962_2593053995.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/9e5be06f9031868223213675879/v.f20.mp4',0,0,1),
(59,38,'加油站附近发生事故',29,'9031868223213726355',1505045258,1505045286,116.10146000,39.94048000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/a05705619031868223213726355/coverBySnapshot/1505045292_2610583312.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/a05705619031868223213726355/v.f20.mp4',0,0,1),
(60,41,'加油站附近发生事故',35,'9031868223213726544',1505045340,1505045381,116.27096000,39.94777000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/a0570dc19031868223213726544/coverBySnapshot/1505045382_3823839337.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/a0570dc19031868223213726544/v.f20.mp4',0,0,1),
(61,25,'发生事故，众人围观',35,'9031868223213726699',1505045404,1505045458,116.27096000,39.94777000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/a05712ac9031868223213726699/coverBySnapshot/1505045467_1104596875.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/a05712ac9031868223213726699/v.f20.mp4',0,0,1),
(62,34,'摩托车与小客车相撞',35,'9031868223213726783',1505045501,1505045533,116.27096000,39.94777000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/a05716c69031868223213726783/coverBySnapshot/1505045542_1417415699.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/a05716c69031868223213726783/v.f20.mp4',0,0,1),
(63,42,'摩托车左转与直行小客车撞车',36,'9031868223213726929',1505045563,1505045634,116.03081000,40.06768000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/a0571e889031868223213726929/coverBySnapshot/1505045637_3712000058.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/a0571e889031868223213726929/v.f20.mp4',0,0,1),
(64,25,'发生交通事故，众人围观',37,'9031868223213727104',1505045656,1505045698,116.14294000,39.74788000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/a057889a9031868223213727104/coverBySnapshot/1505045702_3619391784.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/a057889a9031868223213727104/v.f20.mp4',0,0,1),
(65,38,'加油站附近发生事故，车辆都在绕行',38,'9031868223213727174',1505045723,1505045766,116.28616000,39.85856000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/a05789819031868223213727174/coverBySnapshot/1505045767_3118980915.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/a05789819031868223213727174/v.f20.mp4',0,0,1),
(83,28,'谁知道天通苑这栋楼怎么着火了',46,'9031868223215457673',1505100716,1505100756,116.41967000,40.06359000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/3382e7e79031868223215457673/coverBySnapshot/1505100762_2977804089.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/3382e7e79031868223215457673/v.f20.mp4',0,0,1),
(84,19,'远处看天通苑着火了',46,'9031868223215457833',1505100806,1505100833,116.41967000,40.06359000,'https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/3382efe59031868223215457833/coverBySnapshot/1505100842_2255655140.100_0.jpg','https://1254157576.vod2.myqcloud.com/283c7ef2vodtransgzp1254157576/3382efe59031868223215457833/v.f20.mp4',0,0,1);
/*!40000 ALTER TABLE `weshow_video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-12 13:01:03
