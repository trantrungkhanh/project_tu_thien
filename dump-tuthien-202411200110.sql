-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: tuthien
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `full_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'admin','$2a$08$7eaMu.rOXq2QIo0q6Zrm1OhDiqEEtv4y22N9FoguIvBunDqdwPFJi','admin','ADMIN','+84793963901','2024-11-01 01:00:01','2024-11-13 13:03:01',NULL,'khanhtran4@gmail.com'),(2,'trung.khanh1@gmail.com','$2a$08$MC8/02tmT.Py0xl4.PfEhe9RzPinU0Vei9PftYSLO6TsmSGKBnB5m','contributor','Trần Trung Khánh','+84793963901','2024-11-03 14:27:20',NULL,NULL,NULL),(3,'trungkhanh7298','$2a$08$MN0bST3mAD.8xbSpSWtpRuWNmlocWEKDMbSlDcK1otoOYFMwDXcYW','recipient','Trần Trung Khánh','+84793963901','2024-11-03 22:40:15',NULL,NULL,NULL),(4,'trung.khanh222','$2a$08$.fn0UhS862nz6rxxzhZKyebN5Iz9zXQ3/NLTBI8Pb/CkNY22sp0fu','contributor','Trần Trung Khánh 2','+84793963901','2024-11-03 22:46:17',NULL,'2024-11-17 00:37:36',NULL),(5,'trungkhanh0000','$2a$08$UflLxpbZ1d0SiHJUbtk.aeE9J7v2INcWOriiCbxnTv9RBPF6pfyDS','charity','Tran Trung Khanh','+84793963901','2024-11-12 14:40:40',NULL,NULL,NULL),(6,'trungkhanh0000','$2a$08$QOSD3gq5IfRTPfcxoq1m8.45F0Fq5K.VeA4zZqDuc/CjHHT4962rm','charity','Tran Trung Khanh','+84793963901','2024-11-12 14:40:42',NULL,NULL,NULL),(7,'trungkhanhemail','$2a$08$8MaStyP1EVcbRdutvGIKOO1XyMExmZcmKXKzsG/tKxSF7r/jbotdC','contributor','Trần Trung Khánh','+84793963901','2024-11-12 15:17:55','2024-11-13 11:49:51',NULL,'khanhtrandesign98@gmail.com'),(11,'trungkhanh1','$2a$08$4YW0azDXytiKuID8ANb6Se2k8YJjCBByXbdtDLOCzu5XPwokfabeK','charity','Trần Trung Khánh','+84793963901','2024-11-13 10:49:50',NULL,NULL,'trungkhanh1@gmail.com'),(12,'thuyvi5698','$2a$08$f8ZGQMYZHR2MSuiRnSyt6uSL5yzgePS6ILiZOeAKJmmsG.gmaN0v.','charity','Nguyễn Thị Thúy Vy','+84793963901','2024-11-16 23:00:28','2024-11-16 23:12:21',NULL,'nguyenthuyvi56@gmail.com'),(13,'thuyvi5698','$2a$08$ToM.Hy3vqPgSNsrOH4rJeuuBjqCp9fSXsfN.VisaiyYMiqLvq5bA6','charity','Nguyễn Thị Thúy Vi','+84793963901','2024-11-16 23:00:30','2024-11-16 23:10:11',NULL,'nguyenthuyvi56@gmail.com'),(14,'trungkhanh7298_1','$2a$08$4BvdQbXADt/ULnbqphjUF.o9ASEcvGl2CNHZwbnaqh6UvhHE.7fzm','contributor','Trần Trung Khánh','+84793963901','2024-11-19 22:15:03','2024-11-19 23:00:07',NULL,'khanhtrandeveloper98@gmail.com'),(15,'trunga_1','$2a$08$MYnIslYs5Ashf0ceV2HfleUWhEJ3H40Omr9LrpJj6gcrzAOXjNKTa','recipient','Trần Trung A','+84793963901','2024-11-19 23:11:02',NULL,NULL,'trunga@gmail.com'),(16,'vivinguyen_1','$2a$08$xo6714KIWy8n2T4tgjmsveWLE/I38inqhaXoX/omS5cbUvNyg7X2W','charity','Nguyễn Thị Thúy Vi','+84793963902','2024-11-19 23:28:49',NULL,NULL,'vivi@gmail.com');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `budget_requirement` bigint NOT NULL,
  `budget` bigint NOT NULL,
  `status` int DEFAULT NULL,
  `started_at` datetime DEFAULT NULL,
  `ended_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `charity_id` bigint DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
INSERT INTO `campaign` VALUES (1,'Chiến dịch 1','Trà Vinh','23C Long Bình Bạch Đằng Phường 4',6000000000,2538922223,1,'2024-11-01 01:00:01','2024-11-30 01:00:01','2024-11-01 01:00:01','2024-11-20 00:00:19',NULL,1,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'),(2,'Chiến dịch 2','Vĩnh Long','Address 1',5000000000,2000000000,0,'2024-11-01 01:00:01','2024-11-30 01:00:01','2024-11-01 01:00:01',NULL,NULL,1,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'),(3,'Chiến dịch 3','Cà Mau','Address 2',4000000000,1000000000,0,'2024-11-01 01:00:01','2024-11-30 01:00:01','2024-11-01 01:00:01',NULL,NULL,1,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'),(4,'Chiến dịch 4','Cần Thơ','Address 3',3000000000,1500000000,1,'2024-11-01 01:00:01','2024-11-30 01:00:01','2024-11-01 01:00:01',NULL,NULL,2,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'),(5,'Chiến dịch 5','Kiên Giang','Address 4',2000000000,700000000,3,'2024-11-01 01:00:01','2024-11-30 01:00:01','2024-11-01 01:00:01',NULL,'2024-11-16 23:48:24',2,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'),(7,'Chiến dịch 1111','Trà Vinh','sddd2',222222222,0,1,'2024-11-21 00:00:00','2024-11-10 22:25:49','2024-11-29 00:00:00','2024-11-14 00:03:14',NULL,3,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'),(8,'Chiến dịch 11112222','Trà Vinh','sddd2',222222,0,1,'2024-11-10 22:28:19','2024-11-10 22:28:19','2024-11-10 22:28:19',NULL,NULL,3,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'),(10,'Timelasdsadsadasdaasd','Trà Vinh','project_tu_thien_backend',22222222,0,0,'2024-11-14 00:00:00','2024-11-22 00:00:00','2024-11-13 16:49:05',NULL,NULL,3,'Lỏemasdascascsa'),(11,'Timelasdsadsadasdaasd22222','Trà Vinh','project_tu_thien_frontend',22222222,0,0,'2024-11-22 00:00:00','2024-11-29 00:00:00','2024-11-13 16:59:46',NULL,'2024-11-14 00:15:32',3,'Lddddddddcccccccccccccc'),(12,'Timelasdsadsadasdaasdc214666666666666','Trà Vinh','project_tu_thien_backend',111111111111111,0,0,'2024-11-15 00:00:00','2024-11-28 00:00:00','2024-11-13 17:01:09',NULL,'2024-11-13 23:02:39',3,'âcscascsacascsacsa'),(13,'Timelasdsadsadasdaasd0000000000000','Trà Vinh','project_tu_thien_backend',11111111,0,0,'2024-11-14 00:00:00','2024-12-05 00:00:00','2024-11-13 17:06:07',NULL,'2024-11-13 23:05:12',3,'1dcdc\r\ncccccccccccccs\r\nccccccccc'),(14,'Chiến dịch ủng hộ đồng bào miền Trung','Huế','abc đường số 123 tỉnh Thừa Thiên Huế',1000000000,0,0,'2024-11-19 00:00:00','2024-11-30 00:00:00','2024-11-30 00:00:00','2024-11-14 00:13:12',NULL,3,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'),(15,'Chiến dịch hỗ trợ 1','Trà Vinh','Trà Vinh',1000000,1500000,0,'2024-11-24 00:00:00','2024-12-07 00:00:00','2024-11-16 23:15:44','2024-11-19 23:05:50',NULL,4,'Hỗ trợ Trà Vinh'),(16,'Chiến dịch 133333333','Trà Vinh','Trà Vinh',1000000000,5000000,0,'2024-11-21 00:00:00','2024-11-28 00:00:00','2024-11-28 00:00:00','2024-11-20 00:59:10',NULL,8,'Lossssssssssssssss2222222222');
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign_img`
--

DROP TABLE IF EXISTS `campaign_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_img` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `campaign_id` bigint DEFAULT NULL,
  `path` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_img`
--

LOCK TABLES `campaign_img` WRITE;
/*!40000 ALTER TABLE `campaign_img` DISABLE KEYS */;
INSERT INTO `campaign_img` VALUES (1,1,'/resource/home/home_landing_1.png','2024-11-08 22:22:00'),(2,1,'/resource/home/home_landing_2.png','2024-11-08 22:22:00'),(3,1,'/resource/home/home_landing_3.png','2024-11-08 22:22:00'),(4,8,'/uploads/1731252499045-1731252497583-jujutsu-kaisen-3840x2160-9277.jpg','2024-11-10 22:28:19'),(5,8,'/uploads/1731252499055-1731252497584-ROG-pc-wallpaper-4k.png','2024-11-10 22:28:19'),(6,10,'/uploads/1731491344884-1731491343122-anime-girl-blood-katana-sword-2k-wallpaper-uhdpaper.com-166@1@n.jpg','2024-11-13 16:49:05'),(7,10,'/uploads/1731491344900-1731491343122-Awesome Asus ROG 4K Gaming Wallpapers - WallpaperAccess.gif','2024-11-13 16:49:05'),(8,10,'/uploads/1731491344920-1731491343123-gojo-power-jujutsu-kaisen-2k-wallpaper-uhdpaper.com-214@2@a.jpg','2024-11-13 16:49:05'),(9,11,'/uploads/1731491986271-1731491984478-ce523d08-4fb7-4ccb-9a2f-c474eca100b4','2024-11-13 16:59:46'),(10,11,'/uploads/1731491986272-1731491984479-97ccebaf-be96-45e5-afa1-98d90cc9385e','2024-11-13 16:59:46'),(11,11,'/uploads/1731491986279-1731491984479-cc45e06b-afbf-4d02-8258-494d5d87a876','2024-11-13 16:59:46'),(12,11,'/uploads/1731491986280-1731491984480-1d10c43e-8434-49f4-bf4a-36fa3548510c','2024-11-13 16:59:46'),(13,11,'/uploads/1731491986287-1731491984480-2ac2657d-af2a-402d-bc3b-69cfbb096a73','2024-11-13 16:59:46'),(14,12,'/uploads/1731492069332-1731492067463-64d65983-cf8f-4479-b36b-b05beabc069b','2024-11-13 17:01:09'),(15,12,'/uploads/1731492069350-1731492067464-0a8b4700-de9c-4155-b21d-22955e255fa4','2024-11-13 17:01:09'),(16,12,'/uploads/1731492069359-1731492067464-30b3fbec-e775-4447-9f73-b138dcb41900','2024-11-13 17:01:09'),(17,12,'/uploads/1731492069361-1731492067464-a1dce690-a7b8-4e77-9dae-0d99258da23f','2024-11-13 17:01:09'),(18,13,'/uploads/1731492366600-1731492364166-db209730-554c-49df-b6c6-619fa6a8d61a','2024-11-13 17:06:07'),(19,13,'/uploads/1731492366618-1731492364168-7f438855-db73-458c-b49c-08d3d9e4c115','2024-11-13 17:06:07'),(20,13,'/uploads/1731492366619-1731492364168-8793f5eb-d14a-4f2f-9ce1-e79c7ba45dfb','2024-11-13 17:06:07'),(21,13,'/uploads/1731492366621-1731492364168-2fc8eeb3-2785-4913-9c29-2f53c8265e2d','2024-11-13 17:06:07'),(22,13,'/uploads/1731492366622-1731492364169-2656b9ad-8a5d-4bc6-937d-a8c286692d60','2024-11-13 17:06:07'),(23,13,'/uploads/1731492366636-1731492364170-044e0439-a60c-427e-a2a3-6196103e4e0f','2024-11-13 17:06:07'),(24,15,'/uploads/1731517978174-1731517976307-b98d729f-ff39-4e15-987b-e1c2f23d452c','2024-11-14 00:12:58'),(25,15,'/uploads/1731517978185-1731517976308-6659fc55-2584-46d5-8690-04606ab923d9','2024-11-14 00:12:58'),(26,15,'/uploads/1731517978185-1731517976309-7c54764c-348a-42f3-9207-e16d3a32aa3a','2024-11-14 00:12:58'),(27,15,'/uploads/1731773744202-1731773742845-0a672c59-5098-43c7-b246-563955961565','2024-11-16 23:15:44'),(28,15,'/uploads/1731773744213-1731773742845-14876fc3-e29d-4a31-b78a-4f74051a20a2','2024-11-16 23:15:44'),(29,15,'/uploads/1731773744225-1731773742846-bad25471-f3ec-4571-a536-308af2655b9f','2024-11-16 23:15:44'),(30,16,'/uploads/1732034165125-1732034163507-1139ea45-2d0d-4872-a0d5-a74743722ef3','2024-11-19 23:36:05');
/*!40000 ALTER TABLE `campaign_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign_news`
--

DROP TABLE IF EXISTS `campaign_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_news` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `campaign_id` bigint DEFAULT NULL,
  `content_1` text,
  `content_2` text,
  `content_3` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_news`
--

LOCK TABLES `campaign_news` WRITE;
/*!40000 ALTER TABLE `campaign_news` DISABLE KEYS */;
INSERT INTO `campaign_news` VALUES (1,1,'Time line 1',NULL,NULL,'2024-11-01 12:00:32',NULL,NULL),(2,1,'Time line 2',NULL,NULL,'2024-11-02 12:00:32',NULL,NULL),(3,1,'Time line 3',NULL,NULL,'2024-11-04 12:00:32',NULL,NULL),(4,1,'Time line 4',NULL,NULL,'2024-11-09 12:00:32',NULL,NULL),(5,8,'Time line 1',NULL,NULL,'2024-11-01 12:00:32',NULL,NULL),(6,8,'Time line 2',NULL,NULL,'2024-11-02 12:00:32',NULL,NULL),(7,8,'Time line 3',NULL,NULL,'2024-11-04 12:00:32',NULL,NULL),(8,8,'Time line 4',NULL,NULL,'2024-11-06 12:00:32',NULL,NULL),(9,8,'Time line 5',NULL,NULL,'2024-11-08 12:00:32',NULL,NULL),(10,8,'Time line 6',NULL,NULL,'2024-11-10 12:00:32',NULL,NULL),(11,NULL,'Timeline 5',NULL,NULL,'2024-11-12 14:23:49',NULL,NULL),(12,NULL,'Timeline 5',NULL,NULL,'2024-11-12 14:24:15',NULL,NULL),(13,7,'Timeline 5',NULL,NULL,'2024-11-12 14:25:01',NULL,NULL),(14,8,'Timelasdsadsadasdaasd',NULL,NULL,'2024-11-12 14:25:27',NULL,NULL),(15,16,'Chuẩn bị chiến dịch',NULL,NULL,'2024-11-19 23:36:59',NULL,NULL),(16,16,'Bắt đầu chiến dịch',NULL,NULL,'2024-11-19 23:37:08',NULL,NULL),(17,16,'Nhận quyên góp',NULL,NULL,'2024-11-20 00:29:19',NULL,NULL);
/*!40000 ALTER TABLE `campaign_news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign_rating`
--

DROP TABLE IF EXISTS `campaign_rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_rating` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_id` bigint DEFAULT NULL,
  `campaign_id` bigint DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `comment` text,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_rating`
--

LOCK TABLES `campaign_rating` WRITE;
/*!40000 ALTER TABLE `campaign_rating` DISABLE KEYS */;
INSERT INTO `campaign_rating` VALUES (1,1,1,4,'Chiến dịch tốt, hỗ trợ kịp thời cho người bị ảnh hưởng','2024-11-09 12:04:02',NULL),(2,2,1,5,'Chiến dịch tốt, hỗ trợ kịp thời cho người bị ảnh hưởng','2024-11-09 12:04:02',NULL),(3,3,4,4,'Chiến dịch tốt, hỗ trợ kịp thời cho người bị ảnh hưởng','2024-11-09 12:04:02',NULL),(4,4,6,1,'Hỗ trợ chậm, không theo lịch trình','2024-11-09 12:04:02',NULL),(5,3,1,5,'Chiến dịch tốt, hỗ trợ kịp thời cho người bị ảnh hưởng','2024-11-09 12:04:02',NULL),(6,1,6,2,'Lịch trình không theo dự kiến, thái độ với người bị ảnh hưởng','2024-11-09 12:04:02',NULL),(8,1,1,5,'Good good','2024-11-11 01:58:51',NULL),(9,1,1,1,'Bad bad','2024-11-11 02:00:17',NULL),(10,1,15,5,'Hỗ trợ kịp thời nhanh chóng','2024-11-16 23:20:58',NULL),(11,14,15,5,'Hỗ trọ tuyệt vời','2024-11-19 23:09:41',NULL),(12,15,15,5,'Cảm ơn rất nhiều','2024-11-19 23:16:53',NULL);
/*!40000 ALTER TABLE `campaign_rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `charity`
--

DROP TABLE IF EXISTS `charity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `charity` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_id` bigint NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `file` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `bank` varchar(100) DEFAULT NULL,
  `bank_account` varchar(100) DEFAULT NULL,
  `momo_account` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `charity_unique` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `charity`
--

LOCK TABLES `charity` WRITE;
/*!40000 ALTER TABLE `charity` DISABLE KEYS */;
INSERT INTO `charity` VALUES (1,3,'TO CHUC TU THIEN 1',NULL,2,'2024-11-01 01:00:01','2024-11-17 00:12:19',NULL,'970416','29124997','0793963902'),(2,2,'TO CHUC TU THIEN 2',NULL,1,'2024-11-01 01:00:01','2024-11-17 00:19:49',NULL,'970416','29124997','0793963902'),(3,1,'22222222','/uploads/charity/1731482711617-1731482708709-download.jpg',1,'2024-11-01 01:00:01','2024-11-17 00:19:52',NULL,'970416','29124997','0793963902'),(4,12,'Thuy Vi Entertaiment','/uploads/charity/1731482711617-1731482708709-download.jpg',2,'2024-11-16 01:00:01','2024-11-20 00:59:25',NULL,'970423','11205061998','0768108811'),(8,16,'Tổ chức từ thiện Vi Vi','/uploads/charity/1732033953402-1732033948001-1600w-97S3LYNk_RM.png',1,'2024-11-19 23:28:49','2024-11-20 00:59:59',NULL,'970416','29124997','0793963902');
/*!40000 ALTER TABLE `charity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_id` bigint DEFAULT NULL,
  `amount` bigint DEFAULT NULL,
  `campaign_id` bigint DEFAULT NULL,
  `transfer_type` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
INSERT INTO `donation` VALUES (1,1,10000000,1,2,2,'2024-11-09 12:43:22',NULL,NULL,NULL,NULL,NULL,NULL),(2,1,20000000,2,2,1,'2024-11-09 12:43:22',NULL,NULL,NULL,NULL,NULL,NULL),(3,1,500000,3,1,1,'2024-11-09 12:43:22',NULL,NULL,NULL,NULL,NULL,NULL),(4,1,1000000,4,3,2,'2024-11-09 12:43:22',NULL,NULL,NULL,NULL,NULL,NULL),(5,1,200000,5,3,2,'2024-11-09 12:43:22',NULL,NULL,NULL,NULL,NULL,NULL),(6,1,4000000,6,1,1,'2024-11-09 12:43:22',NULL,NULL,NULL,NULL,NULL,NULL),(7,1,4000000,2,1,2,'2024-11-09 12:43:22',NULL,NULL,NULL,NULL,NULL,NULL),(9,NULL,NULL,NULL,NULL,1,'2024-11-11 02:35:29',NULL,NULL,NULL,NULL,NULL,'2024-11-17 01:01:04'),(10,1,NULL,1,1,1,'2024-11-11 02:36:33',NULL,'Trần Trung Khánh','48A Dương Thi Muoi street','Ho Chi Minh','Ho Chi Minh','2024-11-17 01:01:08'),(11,1,2222222,1,3,1,'2024-11-11 02:37:46',NULL,'Trần Trung Khánh','48A Dương Thi Muoi street','Ho Chi Minh','Ho Chi Minh','2024-11-17 01:01:10'),(12,1,11111111111,1,2,0,'2024-11-11 02:42:30',NULL,'Nguyễn Thị Thúy Vi','48A Dương Thi Muoi street','Ho Chi Minh','Ho Chi Minh',NULL),(13,1,11111111111,1,1,0,'2024-11-11 02:43:01',NULL,'Nguyễn Thị Thúy Vi','48A Dương Thi Muoi street','Ho Chi Minh','Ho Chi Minh',NULL),(14,1,1111111111,1,2,0,'2024-11-11 02:43:57',NULL,'Nguyễn Thị Thúy Vi','48A Dương Thi Muoi street','Ho Chi Minh','Ho Chi Minh',NULL),(15,1,9999999,1,1,0,'2024-11-11 02:45:24',NULL,'Nguyễn Thị Thúy Vi','48A Dương Thi Muoi street','Ho Chi Minh','Ho Chi Minh',NULL),(16,1,2222222,1,1,0,'2024-11-13 02:13:46',NULL,'Trần Trung Khánh','48A Dương Thi Muoi street','Trà Vinh','Trà Vinh',NULL),(17,1,2222222,1,1,0,'2024-11-13 02:33:43',NULL,'Trần Trung Khánh','48A Dương Thi Muoi street','Ho Chi Minh','Ho Chi Minh',NULL),(18,1,22222222,1,1,1,'2024-11-13 09:38:58',NULL,'Trần Trung Khánh','48A Dương Thi Muoi street','Ho Chi Minh','Ho Chi Minh','2024-11-20 00:00:19'),(19,1,10000001,1,1,1,'2024-11-13 14:41:44',NULL,'Trần Trung Khánh','48A Dương Thi Muoi street','Ho Chi Minh','Ho Chi Minh','2024-11-19 23:06:10'),(20,7,1000000,16,1,1,'2024-11-16 23:20:04',NULL,'Trần Trung Khánh','48A Dương Thi Muoi street','Ho Chi Minh','Trà Vinh','2024-11-17 01:13:34'),(21,14,500000,16,1,1,'2024-11-19 23:02:18',NULL,'Trần Trung Khánh','48A Dương Thi Muoi street','Ho Chi Minh','Ho Chi Minh','2024-11-19 23:05:50'),(22,14,1000000,16,1,1,'2024-11-20 00:45:17',NULL,'Trần Trung Khánh','48A Dương Thi Muoi street','Ho Chi Minh','Ho Chi Minh','2024-11-20 00:59:10');
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `question` text,
  `answer` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
INSERT INTO `faq` VALUES (1,'Làm thế nào để tôi đóng góp cho một chiến dịch từ thiện?','Bạn có thể dễ dàng đóng góp qua các hình thức thanh toán mà chúng tôi hỗ trợ, bao gồm chuyển khoản ngân hàng, ví điện tử, và các phương thức khác. Chỉ cần chọn chiến dịch mà bạn muốn ủng hộ, nhấn nút \"Đóng góp\" và làm theo hướng dẫn.'),(2,'Tôi có thể theo dõi số tiền mình đã đóng góp và tác động của nó như thế nào?','Chúng tôi cung cấp một trang cá nhân hóa, nơi bạn có thể xem lịch sử đóng góp của mình và theo dõi tiến trình của chiến dịch. Từng đợt chi tiết về chi tiêu và cập nhật tình hình sẽ được các tổ chức từ thiện cung cấp để bạn thấy được tác động cụ thể mà sự đóng góp của bạn mang lại.'),(3,'Làm cách nào để tạo và quản lý một chiến dịch từ thiện?','Nếu bạn là một tổ chức từ thiện, bạn có thể đăng ký tài khoản và nộp hồ sơ chiến dịch qua nền tảng của chúng tôi. Sau khi chiến dịch được phê duyệt, bạn có thể bắt đầu quản lý, cập nhật thông tin và theo dõi tiến độ quyên góp ngay từ trang cá nhân của mình.\n\n'),(4,'Tôi có thể tìm thấy những thông tin gì về tình hình bão lũ?','Chúng tôi cung cấp các cập nhật nhanh chóng và chi tiết về tình hình bão lũ, bao gồm các cảnh báo, tin tức mới nhất, và các khu vực cần hỗ trợ khẩn cấp. Thông tin được cập nhật liên tục từ các nguồn đáng tin cậy để người dùng luôn nắm rõ diễn biến và có thể hành động khi cần.\n\n'),(5,'Tại sao tôi nên tin tưởng vào nền tảng này?','Chúng tôi cam kết minh bạch và an toàn trong mọi giao dịch và cập nhật về chiến dịch. Các chiến dịch đều được kiểm duyệt cẩn thận trước khi hiển thị để đảm bảo tính xác thực, và các khoản đóng góp được quản lý chặt chẽ để đến đúng người, đúng mục đích. Bạn có thể theo dõi tiến độ quyên góp và xem báo cáo từ các tổ chức từ thiện trực tiếp trên trang.'),(6,'Những ai có thể nhận đóng góp qua nền tảng này?','Chúng tôi phục vụ cho những tổ chức từ thiện uy tín, cũng như các trường hợp khẩn cấp trong cộng đồng. Các tổ chức và cá nhân cần hỗ trợ có thể đăng ký và nộp hồ sơ chứng thực để được phê duyệt.'),(7,'Làm sao để tôi biết chiến dịch đã đạt mục tiêu chưa?','Bạn có thể xem số liệu về số tiền đã quyên góp và mục tiêu của từng chiến dịch ngay trên trang thông tin chiến dịch. Khi chiến dịch đạt được mục tiêu hoặc kết thúc, hệ thống sẽ thông báo rõ ràng.\n\n'),(8,'Nếu tôi gặp vấn đề khi đóng góp, tôi nên liên hệ với ai?','Nếu gặp bất kỳ vấn đề gì khi thực hiện quyên góp hoặc truy cập các chiến dịch, bạn có thể liên hệ đội ngũ hỗ trợ của chúng tôi qua email hoặc số hotline trên trang Liên hệ. Chúng tôi sẽ hỗ trợ bạn nhanh chóng và hiệu quả.'),(9,'Tôi có thể hủy hoặc chỉnh sửa khoản đóng góp của mình không?','Để đảm bảo minh bạch và hiệu quả cho các chiến dịch, các khoản đóng góp sau khi xác nhận sẽ không thể hủy. Tuy nhiên, nếu có trường hợp đặc biệt, bạn có thể liên hệ đội ngũ hỗ trợ của chúng tôi để được hỗ trợ thêm.\n\n');
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tuthien'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-20  1:10:30
