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
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `level` smallint(3) unsigned NOT NULL DEFAULT '0',
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
  `enabled` tinyint(3) unsigned DEFAULT NULL,
  `join_count` int(8) unsigned DEFAULT 0,
  `win_count` int(8) unsigned DEFAULT 0,
  `relive` int(8) unsigned DEFAULT 1,
  `question_count` int(8) unsigned DEFAULT 0,
  `win` float DEFAULT 0.0,
  `belance` float DEFAULT 1.0,
  PRIMARY KEY (`id`),
  KEY `account` (`account`),
  UNIQUE KEY `openid` (`openid`),
  KEY `enabled` (`enabled`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_user`
--

LOCK TABLES `weshow_user` WRITE;
/*!40000 ALTER TABLE `weshow_user` DISABLE KEYS */;
INSERT INTO `weshow_user` 
VALUES (1,0,1,'1','1','wx-1','Zhan1','','','','','','','','https://wx.qlogo.cn/mmopen/vi_32/bMqoLrFBhxP8ZsHJqOd2eIsEtpkCuSW0JtfOPZpsIaBKhqMaeONREia3R2TdtIf9oMAY2wq0pJPHUOCqzNXR7iaw/0',1503171637,1,1,1,1,1,1,0),
  (2,0,1,'2','1','wx-2','Zhan2','','','','','','','','https://tvax1.sinaimg.cn/crop.0.0.996.996.180/005WFisyly8fghoqxipmsj30ro0romzf.jpg',1503171637,1,1,1,1,1,1,0),
  (3,0,1,'3','1','wx10000104','西居士','','','','','','','','https://tva3.sinaimg.cn/crop.0.0.1125.1125.180/cc981db8jw8f1oifzwvxqj20v90v941q.jpg',1503171637,1,1,1,1,1,1,0),
  (4,0,0,'4','1','wx147','筱沐羊','','','','','','','','https://tva3.sinaimg.cn/crop.11.0.727.727.50/a26464c3jw8f907h6mn0aj20ku0k774w.jpg',1503171637,1,1,1,1,1,1,0),
  (5,0,1,'5','1','wx6798','Malcolm','','','','','','','','https://tva3.sinaimg.cn/crop.0.0.720.720.180/005vjZrTjw8edotcpsvndj30k00k040n.jpg',1503171637,1,1,1,1,1,1,0),
  (6,0,0,'6','1','wx0014','Frieda小姐','','','','','','','','https://tvax3.sinaimg.cn/crop.0.0.996.996.180/c33b59d9ly8fdftoeyeewj20ro0rp76n.jpg',1503171637,1,1,1,1,1,1,0),
  (7,0,1,'7','1','wx00763','著名有钱人','','','','','','','','https://tva3.sinaimg.cn/crop.0.0.180.180.180/4d114f3ejw1e8qgp5bmzyj2050050aa8.jpg',1503171637,1,1,1,1,1,1,0);
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
  `longitude` decimal(11,8) NOT NULL DEFAULT '0.00',
  `latitude` decimal(11,8) NOT NULL DEFAULT '0.00',
  `poster_url` varchar(255) NOT NULL DEFAULT '',
  `video_url` varchar(255) NOT NULL DEFAULT '',
  `comment` int(8) NOT NULL DEFAULT '0',
  `like` int(11) NOT NULL DEFAULT '0',
  `watch` int(16) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_video`
--

LOCK TABLES `weshow_video` WRITE;
/*!40000 ALTER TABLE `weshow_video` DISABLE KEYS */;
INSERT INTO `weshow_video` 
VALUES (1,1,'西二旗大街路面塌陷，轿车陷大坑四轮朝天',1,1,1503181437,1503171637,39.9181,116.3012,
       'http://ww2.sinaimg.cn/bmiddle/652f5916gy1fhwl5bnikyj20zk0no0y9.jpg',
       'http://hhvr3whp728i1txm4kv.exp.bcevod.com/mda-hhvr7jstd050ryjc/mda-hhvr7jstd050ryjc.mp4',10,7,3),
   (2,2,'八达岭长城关闭游览致高速拥堵数公里',2,2,1502481237,1502381237,39.9181,116.3012,
       'http://ww4.sinaimg.cn/bmiddle/c268f966ly1fi5sxnjrrmj21hc0u0gwq.jpg',
	   'http://hhvr3whp728i1txm4kv.exp.bcevod.com/mda-hhwx67mykh8fwbxr/mda-hhwx67mykh8fwbxr.m3u8',14,33,6),
   (3,3,'降雨致北京171处景区关闭13处积水断路',3,3,1501481237,1501381237,39.9181,116.3012,
       'http://ww2.sinaimg.cn/bmiddle/7f5092a4gw1f669izfr79j20hs091q39.jpg',
	   'http://weshowvideo.oss-cn-beijing.aliyuncs.com/video/%E7%A7%92%E6%8B%8D4.mp4',80,10,7),
   (4,4,'Snapchat AI视频拼接',1,4,1503181637,1501381237,39.9181,116.3012,
       'http://ww2.sinaimg.cn/bmiddle/7f5092a4gw1f669izfr79j20hs091q39.jpg',
	   'http://hhvr3whp728i1txm4kv.exp.bcevod.com/mda-hhwwwebf2x1rhuft/mda-hhwwwebf2x1rhuft.m3u8',67,44,9),
   (5,5,'蹦极坠落悬崖',1,5,1503181467,1501381237,39.9181,116.3012,
       'https://wx2.sinaimg.cn/mw690/005FHEwGly1finjtkybjsj30qo0zijvd.jpg',
	   'http://video.pearvideo.com/mp4/short/20170819/cont-1135553-10774036-hd.mp4',18,71,6),
   (6,6,'暴雨突袭甘肃会宁，山洪泥沙涌进城',2,9,1501481237,1501381237,39.9181,116.3012,
       'https://dslb.cdn.krcom.cn/stream/lEZprg--N1Z~rhg9xlrHnmM0EJLaiqzSCzkX8g___32768.jpg',
	   'http://video.pearvideo.com/mp4/short/20170819/cont-1135841-10775645-hd.mp4',18,71,6),
   (7,7,'Snapchat AI视频拼接',4,6,1501481237,1501381237,39.9181,116.3012,
       'https://dslb.cdn.krcom.cn/stream/u00yUKy1clwsQZpLvX-7ULWeC~zj3doPC2a2lw___32768.jpg',
	   'http://video.pearvideo.com/mp4/short/20170819/cont-1131645-10752152-hd.mp4',18,71,6),
   (8,4,'Snapchat AI视频拼接',5,7,1501481237,1501381237,39.9181,116.3012,
       'https://dslb.cdn.krcom.cn/stream/zpUlK5EVJiDJIIrS1kfdgfIVaa4mkEuSjE6sZQ___32768.jpg',
	   'http://video.pearvideo.com/mp4/short/20170819/cont-1135553-10774036-hd.mp4',18,71,6),
   (9,6,'Snapchat AI视频拼接',6,8,1461481237,1501381237,39.9181,116.3012,
       'http://img.mp.itc.cn/upload/20170816/92d8d9fb67b24fe2853c31a75afa98ce_th.jpg',
	   'http://video.pearvideo.com/mp4/short/20170819/cont-1135553-10774036-hd.mp4',18,71,6);
/*!40000 ALTER TABLE `weshow_video` ENABLE KEYS */;
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
  `longitude` decimal(11,8) NOT NULL DEFAULT '0.00',
  `latitude` decimal(11,8) NOT NULL DEFAULT '0.00',
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
VALUES (1,'西二旗大街路面塌陷，轿车陷大坑四轮朝天',1,1503181437,1503171637,1503181437,1503171637,39.9181,116.3012,'西二旗大街'),
  (2,'八达岭长城关闭游览致高速拥堵数公里',1,1503181437,1503171637,1503181437,1503171637,39.9181,116.3012,'八达岭'),
  (3,'降雨致北京171处景区关闭13处积水断路',1,1502481237,1502381237,1502481237,1502381237,39.9181,116.3012,'北京'),
  (4,'房山大雨，路面积水',1,1501481237,1502381237,1501481237,1502381237,39.9181,116.3012,'房山良乡'),
  (5,'海淀田村整治散污乱',1,1481481237,1482381237,1481481237,1482381237,39.9181,116.3012,'田村'),
  (6,'林志炫0819北京演唱会',1,1401481237,1442381237,1401481237,1442381237,39.9181,116.3012,'五棵松');
/*!40000 ALTER TABLE `weshow_news` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_comment`
--

LOCK TABLES `weshow_comment` WRITE;
/*!40000 ALTER TABLE `weshow_comment` DISABLE KEYS */;
INSERT INTO `weshow_comment` 
VALUES (1,1,1,1,'突然塌陷了？还是大车压塌的？',1503181437,0,0),
  (2,1,2,1,'人没事吧？车里几个人啊，坑里是啥？',1503182437,0,0),
  (3,1,3,1,'刚刚路过，我说怎么堵了，以为是铺路呢，好危险啊',1503183437,0,0),
  (4,1,4,2,'用啥方式把车弄出来啊？会不会周边继续塌啊？',1503184437,0,0),
  (5,2,5,1,'语音评论',1503185437,0,0),
  (6,1,6,3,'天塌啦地陷啦小花狗不见啦',1503186437,0,0),
  (7,1,7,4,'驾驶员体重超标引起的吧？',1503186437,0,0),
  (8,1,1,1,'这条路我早觉得要出问题',1503186437,0,0);
/*!40000 ALTER TABLE `weshow_comment` ENABLE KEYS */;
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
  KEY `creator_video` (`creator`, `video_id`),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_like`
--

LOCK TABLES `weshow_like` WRITE;
/*!40000 ALTER TABLE `weshow_like` DISABLE KEYS */;
INSERT INTO `weshow_like` 
VALUES (1,1,1,1503181437),
  (2,2,1,1503182437),
  (3,3,1,1503183437),
  (4,4,2,1503184437),
  (5,5,1,1503185437),
  (6,6,3,1503186437),
  (7,7,4,1503186437),
  (8,1,1,1503186437);
/*!40000 ALTER TABLE `weshow_like` ENABLE KEYS */;
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
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_feedback`
--

LOCK TABLES `weshow_feedback` WRITE;
/*!40000 ALTER TABLE `weshow_feedback` DISABLE KEYS */;
INSERT INTO `weshow_feedback` 
VALUES (1,1,'A1','很好，很有趣，很有用',1503481437);
/*!40000 ALTER TABLE `weshow_feedback` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `weshow_question`
--

DROP TABLE IF EXISTS `weshow_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weshow_question` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `creator` int(20) NOT NULL DEFAULT '1',
  `creator_name` varchar(16) NOT NULL DEFAULT '',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `type` int(8) unsigned NOT NULL DEFAULT '0',
  `level` int(4) unsigned NOT NULL DEFAULT '0',
  `category0` int(8) unsigned NOT NULL DEFAULT '0',
  `category1` int(8) unsigned NOT NULL DEFAULT '0',
  `category2` int(8) unsigned NOT NULL DEFAULT '0',
  `category3` int(8) unsigned NOT NULL DEFAULT '0',
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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_question`
--

LOCK TABLES `weshow_question` WRITE;
/*!40000 ALTER TABLE `weshow_question` DISABLE KEYS */;
INSERT INTO `weshow_question` 
VALUES (1,1,'A1',1516199514,1,1,0,0,0,0,'','北京在古代曾经叫做?','蓟','京','燕','',3,0,'北京在秦代称作蓟',''),
  (2,2,'A1',1516199514,1,1,0,0,0,0,'','以下哪种动物是哺乳动物？','鱼','燕子','恐龙','熊',4,3,'熊是哺乳动物',''),
  (3,3,'A1',1516199514,1,1,0,0,0,0,'','以下哪种动物不是哺乳动物？','豹子','虎鲸','恐龙','熊',4,2,'鲸也是哺乳动物,恐龙是爬行动物',''),
  (4,4,'A1',1516199514,1,1,0,0,0,0,'','“采菊东篱下，悠然见南山。”出自以下哪位诗人之手？','李白','王维','陶渊明','',3,2,'著名诗人陶渊明',''),
  (5,5,'A1',1516199514,1,1,0,0,0,0,'','大气压的单位是什么？','帕斯卡','培','码','',3,0,'帕斯卡',''),
  (6,6,'A1',1516199514,1,1,0,0,0,0,'','家用电器所使用的电线，一般是以下哪种材料制成的？','铁','铜','铝','',3,1,'铜的导电性能和柔软度最合适',''),
  (7,7,'A1',1516199514,1,1,0,0,0,0,'','中国传统中，大年初几迎财神？','初一','初三','初五','',3,2,'中国民间传说正月初五是财神的生日，所以过了年初一，接下来最重要的活动就是初五接财神。',''),
  (8,6,'A1',1516199514,1,1,0,0,0,0,'','"五日财源五日求，一年心愿一时酬；提防别处迎神早，隔夜匆匆抱路头" 描绘的是哪里人迎财神的情形？','上海人','苏州人','杭州人','',3,1,'清人顾铁卿《清嘉录》中引了一首蔡云的竹枝词，描绘了苏州人初五迎财神的情形："五日财源五日求，一年心愿一时酬；提防别处迎神早，隔夜匆匆抱路头"。"抱路头"亦即"迎财神"。',''),
  (9,6,'A1',1516199514,1,1,0,0,0,0,'','春节是农历的哪一天？','十二月二十九','十二月三十','正月初一','',3,2,'春节俗称“年节”，是中华民族最隆重的传统佳节，汉武帝时期之前，各朝各代春节的日期并不一致，自汉武帝太初元年始，以夏历（农历）正月为岁首，年节的日期由此固定下来。1911年辛亥革命以后，开始采用公历计年，遂称公历1月1日为“元旦”，称农历正月初一为“春节”。',''),
  (10,6,'A1',1516199514,1,1,0,0,0,0,'','民间习俗中，农历腊月二十三日送哪位神仙上天汇报工作？','灶君','财神','门神','',3,0,'灶神又称灶王爷，灶君。中国民间传说灶神每年腊月二十三晚，上天汇报，正月初四日返回人间。',''),
  (11,6,'A1',1516199514,1,1,0,0,0,0,'','可燃冰的主要有效成分是？','乙炔','甲烷','乙醇','',3,1,'可燃冰，是分布于深海沉积物或陆域的永久冻土中，由天然气与水在高压低温条件下形成的类冰状的结晶物质，有极强的燃烧力，主要由水分子和烃类气体分子（主要是甲烷）组成。',''),
  (12,6,'A1',1516199514,1,1,0,0,0,0,'','下列生活用品中主要由合成纤维制造的是？','棉衬衣','羊绒衫','尼龙绳','',3,2,'棉衬衣的主要成分为天然纤维素，羊绒衫的主要成分是蛋白质，尼龙绳的主要成分是聚酯类合成纤维',''),
  (13,6,'A1',1516199514,1,1,0,0,0,0,'','“政启开元，治宏贞观”是郭沫若对下列哪一帝王功绩的正确评价?','唐太宗','武则天','唐玄宗','',3,1,'武则天当政期间，继续推行唐太宗发展农业生产、选拔贤才的政策，使唐朝社会经济进一步发展，国力不断增强。',''),
  (30,30,'A1',1516199514,1,1,0,0,0,0,'','玄武门之变发生在以下哪个皇帝时期','唐太宗','唐明皇','唐高祖','',3,2,'李世民争夺太子之战','');
/*!40000 ALTER TABLE `weshow_question` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `weshow_quiz`
--

DROP TABLE IF EXISTS `weshow_quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weshow_quiz` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `creator_id` varchar(64) NOT NULL DEFAULT '',
  `creator_name` varchar(16) NOT NULL DEFAULT '',
  `creator_photo` text NOT NULL DEFAULT '',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `title` varchar(32) NOT NULL DEFAULT '',
  `questions` varchar(255) NOT NULL DEFAULT '',
  `quest_count` smallint(6) unsigned NOT NULL DEFAULT '1',
  `level` int(4) unsigned NOT NULL DEFAULT '0',
  `category` int(4) unsigned NOT NULL DEFAULT '0',
  `price` float unsigned NOT NULL DEFAULT '0',
  `min_users` int(8) unsigned NOT NULL DEFAULT '0',
  `win_users` int(8) NOT NULL DEFAULT '-1',
  `start_time` int(11) unsigned NOT NULL DEFAULT '0',
  `share_ticket` varchar(64) NOT NULL DEFAULT '',
  `open_gid` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_quiz`
--

LOCK TABLES `weshow_quiz` WRITE;
/*!40000 ALTER TABLE `weshow_quiz` DISABLE KEYS */;
INSERT INTO `weshow_quiz` 
VALUES (1,'1','A1','',1516199514,'','1-3-6',3,1,0,1.0,1,0,1516219514,'','');
/*!40000 ALTER TABLE `weshow_quiz` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `weshow_group`
--

DROP TABLE IF EXISTS `weshow_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weshow_group` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(20) NOT NULL DEFAULT '1',
  `add_uid` varchar(64) NOT NULL DEFAULT '1',
  `add_name` varchar(16) NOT NULL DEFAULT '',
  `add_time` int(11) unsigned NOT NULL DEFAULT '0',
  `name` varchar(32) NOT NULL DEFAULT '',
  `open_gid` varchar(64) NOT NULL DEFAULT '',
  `share_ticket` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weshow_usergroup` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(20) NOT NULL DEFAULT '1',
  `gid` int(20) NOT NULL DEFAULT '1',
  `openid` varchar(32) NOT NULL DEFAULT '',
  `open_gid` varchar(64) NOT NULL DEFAULT '',
  `note` varchar(32) NOT NULL DEFAULT '',
  `check_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`openid`, `open_gid`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
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
/*!40101 SET character_set_client = utf8 */;
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
  `add_time` int(16) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`openid`, `quizid`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_quizuser`
--

LOCK TABLES `weshow_quizuser` WRITE;
/*!40000 ALTER TABLE `weshow_quizuser` DISABLE KEYS */;
INSERT INTO `weshow_quizuser` 
VALUES (1,1,1,'A1','A1',0,0,0,0,1516199514);
/*!40000 ALTER TABLE `weshow_quizuser` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `weshow_questionuser`
--

DROP TABLE IF EXISTS `weshow_questionuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weshow_questionuser` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(20) NOT NULL DEFAULT '1',
  `quizid` int(20) NOT NULL DEFAULT '1',
  `openid` varchar(32) NOT NULL DEFAULT '',
  `question_id` int(20) NOT NULL DEFAULT '1',
  `note` varchar(32) NOT NULL DEFAULT '',
  `game_status` tinyint(3) NOT NULL DEFAULT '0',
  `add_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weshow_questionuser`
--

LOCK TABLES `weshow_questionuser` WRITE;
/*!40000 ALTER TABLE `weshow_questionuser` DISABLE KEYS */;
INSERT INTO `weshow_questionuser` 
VALUES (1,1,1,'A1',1,'A1',0,1516199514);
/*!40000 ALTER TABLE `weshow_questionuser` ENABLE KEYS */;
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
