-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: hftgpro
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail_type` enum('payment_info','processing_log','error_log') COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` json DEFAULT NULL COMMENT '详情内容',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_order_id` (`order_id`),
  KEY `idx_detail_type` (`detail_type`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单详情表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '订单唯一标识',
  `chat_id` bigint NOT NULL COMMENT 'Telegram用户ID',
  `username` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Telegram用户名',
  `product_type` enum('3_month','6_month','12_month') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '产品类型',
  `amount` decimal(10,2) NOT NULL COMMENT '订单金额(USDT)',
  `status` enum('pending','processing','completed','failed','cancelled','expired') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending' COMMENT '订单状态',
  `payment_method` enum('balance','crypto') COLLATE utf8mb4_unicode_ci DEFAULT 'balance' COMMENT '支付方式',
  `transaction_hash` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '交易哈希',
  `failure_reason` text COLLATE utf8mb4_unicode_ci COMMENT '失败原因',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `completed_at` timestamp NULL DEFAULT NULL COMMENT '完成时间',
  `expires_at` timestamp NULL DEFAULT NULL COMMENT '过期时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_id` (`order_id`),
  KEY `idx_chat_id` (`chat_id`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_order_id` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'migrated_8351849555_1761811780',8351849555,'user_8351849555','3_month',40.16,'completed','crypto',NULL,NULL,'2025-10-23 14:58:29','2025-10-23 14:58:29',NULL,NULL),(2,'migrated_825512163_1761811780',825512163,'user_825512163','3_month',40.13,'completed','crypto',NULL,NULL,'2025-10-27 19:40:47','2025-10-27 19:40:47',NULL,NULL),(4,'order_825512163_1761816435',825512163,'zxc1866','3_month',15.08,'pending','balance',NULL,NULL,'2025-10-30 09:27:15','2025-10-30 09:27:15',NULL,NULL),(5,'order_825512163_1761816823',825512163,'zxc1866','3_month',15.06,'pending','balance',NULL,NULL,'2025-10-30 09:33:43','2025-10-30 09:33:43',NULL,NULL),(6,'order_825512163_1761817584',825512163,'zxc1866','3_month',15.03,'pending','balance',NULL,NULL,'2025-10-30 09:46:24','2025-10-30 09:46:24',NULL,NULL),(7,'order_825512163_1761818137',825512163,'zxc1866','3_month',15.16,'pending','balance',NULL,NULL,'2025-10-30 09:55:37','2025-10-30 09:55:37',NULL,NULL),(8,'order_825512163_1761818469',825512163,'agentaigc','3_month',15.15,'pending','balance',NULL,NULL,'2025-10-30 10:01:09','2025-10-30 10:01:09',NULL,NULL),(9,'order_825512163_1761819104',825512163,'agentaigc','3_month',15.11,'pending','balance',NULL,NULL,'2025-10-30 10:11:44','2025-10-30 10:11:44',NULL,NULL),(10,'order_825512163_1761819801',825512163,'agentaigc','3_month',15.12,'pending','balance',NULL,NULL,'2025-10-30 10:23:21','2025-10-30 10:23:21',NULL,NULL),(11,'order_825512163_1761820864',825512163,'agentaigc','3_month',15.05,'pending','balance',NULL,NULL,'2025-10-30 10:41:04','2025-10-30 10:41:04',NULL,NULL),(12,'order_825512163_1761822051',825512163,'agentaigc','3_month',15.15,'pending','balance',NULL,NULL,'2025-10-30 11:00:51','2025-10-30 11:00:51',NULL,NULL),(13,'order_825512163_1761823953',825512163,'agentaigc','3_month',15.04,'pending','balance',NULL,NULL,'2025-10-30 11:32:33','2025-10-30 11:32:33',NULL,NULL),(14,'order_825512163_1761830386',825512163,'agentaigc','3_month',15.16,'pending','balance',NULL,NULL,'2025-10-30 13:19:46','2025-10-30 13:19:46',NULL,NULL),(15,'order_825512163_1761835096',825512163,'TGCCTG','3_month',15.11,'pending','balance',NULL,NULL,'2025-10-30 14:38:16','2025-10-30 14:38:16',NULL,NULL),(16,'order_825512163_1761835127',825512163,'agentaigc','3_month',15.06,'pending','balance',NULL,NULL,'2025-10-30 14:38:47','2025-10-30 14:38:47',NULL,NULL),(17,'order_825512163_1761835174',825512163,'agentaigc','3_month',15.07,'pending','balance',NULL,NULL,'2025-10-30 14:39:34','2025-10-30 14:39:34',NULL,NULL),(18,'order_825512163_1761836832',825512163,'HFTGID','3_month',15.19,'pending','balance',NULL,NULL,'2025-10-30 15:07:12','2025-10-30 15:07:12',NULL,NULL),(19,'order_825512163_1761837167',825512163,'HFTGID','3_month',15.08,'pending','balance',NULL,NULL,'2025-10-30 15:12:47','2025-10-30 15:12:47',NULL,NULL),(20,'order_825512163_1761837586',825512163,'HFTGID','3_month',15.16,'pending','balance',NULL,NULL,'2025-10-30 15:19:46','2025-10-30 15:19:46',NULL,NULL),(21,'order_825512163_1761837613',825512163,'agentaigc','3_month',15.06,'pending','balance',NULL,NULL,'2025-10-30 15:20:13','2025-10-30 15:20:13',NULL,NULL),(22,'order_825512163_1761837959',825512163,'agentaigc','3_month',15.14,'pending','balance',NULL,NULL,'2025-10-30 15:25:59','2025-10-30 15:25:59',NULL,NULL),(23,'order_825512163_1761838203',825512163,'agentaigc','3_month',15.01,'pending','balance',NULL,NULL,'2025-10-30 15:30:03','2025-10-30 15:30:03',NULL,NULL),(24,'order_825512163_1761838711',825512163,'agentaigc','3_month',15.07,'pending','balance',NULL,NULL,'2025-10-30 15:38:31','2025-10-30 15:38:31',NULL,NULL),(25,'order_825512163_1761839006',825512163,'agentaigc','3_month',15.01,'pending','balance',NULL,NULL,'2025-10-30 15:43:26','2025-10-30 15:43:26',NULL,NULL),(26,'order_825512163_1761839132',825512163,'HFTGID','3_month',15.05,'pending','balance',NULL,NULL,'2025-10-30 15:45:32','2025-10-30 15:45:32',NULL,NULL),(27,'order_825512163_1761839158',825512163,'agentaigc','3_month',15.16,'pending','balance',NULL,NULL,'2025-10-30 15:45:58','2025-10-30 15:45:58',NULL,NULL),(28,'order_825512163_1761839889',825512163,'agentaigc','3_month',15.06,'pending','balance',NULL,NULL,'2025-10-30 15:58:09','2025-10-30 15:58:09',NULL,NULL),(29,'order_825512163_1761840442',825512163,'agentaigc','3_month',15.10,'pending','balance',NULL,NULL,'2025-10-30 16:07:22','2025-10-30 16:07:22',NULL,NULL),(30,'order_825512163_1761840796',825512163,'HFTGID','3_month',15.17,'pending','balance',NULL,NULL,'2025-10-30 16:13:16','2025-10-30 16:13:16',NULL,NULL),(31,'order_825512163_1761840822',825512163,'agentaigc','3_month',15.06,'pending','balance',NULL,NULL,'2025-10-30 16:13:42','2025-10-30 16:13:42',NULL,NULL),(32,'order_825512163_1761841104',825512163,'HFTGID','3_month',15.05,'pending','balance',NULL,NULL,'2025-10-30 16:18:24','2025-10-30 16:18:24',NULL,NULL),(33,'order_825512163_1761841515',825512163,'agentaigc','3_month',15.14,'pending','balance',NULL,NULL,'2025-10-30 16:25:15','2025-10-30 16:25:15',NULL,NULL),(34,'order_825512163_1761841694',825512163,'agentaigc','3_month',15.18,'pending','balance',NULL,NULL,'2025-10-30 16:28:14','2025-10-30 16:28:14',NULL,NULL),(35,'order_825512163_1761842002',825512163,'HFTGID','3_month',15.17,'pending','balance',NULL,NULL,'2025-10-30 16:33:22','2025-10-30 16:33:22',NULL,NULL),(36,'order_825512163_1761845284',825512163,'HFTGID','3_month',15.03,'pending','balance',NULL,NULL,'2025-10-30 17:28:04','2025-10-30 17:28:04',NULL,NULL),(37,'order_825512163_1761849309',825512163,'agentaigc','3_month',15.04,'pending','balance',NULL,NULL,'2025-10-30 18:35:09','2025-10-30 18:35:09',NULL,NULL),(38,'order_825512163_1761849519',825512163,'HFTGID','3_month',15.14,'pending','balance',NULL,NULL,'2025-10-30 18:38:39','2025-10-30 18:38:39',NULL,NULL),(39,'order_825512163_1761850394',825512163,'agentaigc','3_month',15.09,'pending','balance',NULL,NULL,'2025-10-30 18:53:14','2025-10-30 18:53:14',NULL,NULL),(40,'order_825512163_1761850411',825512163,'agentaigc','3_month',15.17,'pending','balance',NULL,NULL,'2025-10-30 18:53:31','2025-10-30 18:53:31',NULL,NULL),(41,'order_825512163_1761850690',825512163,'agentaigc','3_month',15.03,'pending','balance',NULL,NULL,'2025-10-30 18:58:10','2025-10-30 18:58:10',NULL,NULL),(42,'order_825512163_1761851310',825512163,'agentaigc','3_month',15.06,'pending','balance',NULL,NULL,'2025-10-30 19:08:30','2025-10-30 19:08:30',NULL,NULL),(43,'order_825512163_1761851546',825512163,'agentaigc','3_month',15.17,'pending','balance',NULL,NULL,'2025-10-30 19:12:26','2025-10-30 19:12:26',NULL,NULL),(44,'order_825512163_1761851761',825512163,'agentaigc','3_month',15.06,'pending','balance',NULL,NULL,'2025-10-30 19:16:01','2025-10-30 19:16:01',NULL,NULL),(45,'order_825512163_1761852631',825512163,'agentaigc','3_month',15.01,'pending','balance',NULL,NULL,'2025-10-30 19:30:31','2025-10-30 19:30:31',NULL,NULL),(46,'order_825512163_1761853334',825512163,'agentaigc','3_month',15.05,'pending','balance',NULL,NULL,'2025-10-30 19:42:14','2025-10-30 19:42:14',NULL,NULL),(47,'order_825512163_1761854249',825512163,'agentaigc','3_month',15.04,'pending','balance',NULL,NULL,'2025-10-30 19:57:29','2025-10-30 19:57:29',NULL,NULL),(48,'order_825512163_1761854540',825512163,'agentaigc','3_month',15.18,'pending','balance',NULL,NULL,'2025-10-30 20:02:20','2025-10-30 20:02:20',NULL,NULL),(49,'order_825512163_1761855130',825512163,'agentaigc','3_month',15.07,'pending','balance',NULL,NULL,'2025-10-30 20:12:10','2025-10-30 20:12:10',NULL,NULL),(50,'order_825512163_1761855691',825512163,'agentaigc','3_month',15.14,'pending','balance',NULL,NULL,'2025-10-30 20:21:31','2025-10-30 20:21:31',NULL,NULL),(51,'order_825512163_1761855984',825512163,'agentaigc','3_month',15.09,'pending','balance',NULL,NULL,'2025-10-30 20:26:24','2025-10-30 20:26:24',NULL,NULL),(52,'order_825512163_1761856165',825512163,'agentaigc','3_month',15.06,'pending','balance',NULL,NULL,'2025-10-30 20:29:25','2025-10-30 20:29:25',NULL,NULL),(53,'order_825512163_1761856446',825512163,'agentaigc','3_month',15.03,'pending','balance',NULL,NULL,'2025-10-30 20:34:06','2025-10-30 20:34:06',NULL,NULL),(54,'order_825512163_1761856835',825512163,'agentaigc','3_month',15.18,'pending','balance',NULL,NULL,'2025-10-30 20:40:35','2025-10-30 20:40:35',NULL,NULL),(55,'order_825512163_1761896870',825512163,'agentaigc','3_month',15.17,'pending','balance',NULL,NULL,'2025-10-31 07:47:50','2025-10-31 07:47:50',NULL,NULL),(56,'order_825512163_1761897884',825512163,'agentaigc','3_month',15.12,'pending','balance',NULL,NULL,'2025-10-31 08:04:44','2025-10-31 08:04:44',NULL,NULL),(57,'order_825512163_1761898837',825512163,'agentaigc','3_month',15.07,'pending','balance',NULL,NULL,'2025-10-31 08:20:37','2025-10-31 08:20:37',NULL,NULL),(58,'order_825512163_1761899286',825512163,'agentaigc','3_month',15.13,'pending','balance',NULL,NULL,'2025-10-31 08:28:06','2025-10-31 08:28:06',NULL,NULL),(59,'order_825512163_1761900352',825512163,'agentaigc','3_month',15.15,'pending','balance',NULL,NULL,'2025-10-31 08:45:52','2025-10-31 08:45:52',NULL,NULL),(60,'order_825512163_1761901547',825512163,'agentaigc','3_month',15.07,'pending','balance',NULL,NULL,'2025-10-31 09:05:47','2025-10-31 09:05:47',NULL,NULL),(61,'order_825512163_1761902801',825512163,'agentaigc','3_month',15.15,'pending','balance',NULL,NULL,'2025-10-31 09:26:41','2025-10-31 09:26:41',NULL,NULL),(62,'order_825512163_1761903467',825512163,'agentaigc','3_month',15.11,'pending','balance',NULL,NULL,'2025-10-31 09:37:47','2025-10-31 09:37:47',NULL,NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_users`
--

DROP TABLE IF EXISTS `system_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `status` enum('active','inactive') DEFAULT 'active',
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='系统用户';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_users`
--

LOCK TABLES `system_users` WRITE;
/*!40000 ALTER TABLE `system_users` DISABLE KEYS */;
INSERT INTO `system_users` VALUES (2,'user1','508d60f6438dcf81dd5e182e3d7019f9:210fa97da60967cba41b4a1dc1641403b34f62ce586e49d872210a2d8d932634233e41c2a5a4f9077e2041f9ab91b3564f7d37816b988060eef6cacc7b7949e0','user1@tgpro.com','user','active','2025-10-15 20:29:12','2025-09-27 02:25:10','2025-10-15 20:29:12'),(3,'user2','$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','user2@tgpro.com','user','active',NULL,'2025-09-27 02:25:10','2025-09-27 02:25:10'),(4,'admin','d0ee28174ff0f87f7f034ada71b8cd1b71266d9ce762f3eb56bdd6a5f62165a2:7de0e8206e20593290ac74597b66d2f71ad569d67b4eeec77e4c35432d1b1133efeb167788b2128ed98935b63b12d7cbe46f6616d593c5fa0efe315c98cadb8b','admin@tgpro.com','admin','active','2025-10-31 18:42:06','2025-10-15 17:33:52','2025-10-31 18:42:06');
/*!40000 ALTER TABLE `system_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chat_id` bigint NOT NULL,
  `amount` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='tg用户';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (18,825512163,768428888,'2025-10-15 08:50:15'),(19,6352959958,0,'2025-10-15 11:24:50'),(20,8351849555,0,'2025-10-23 14:42:46'),(21,6766293725,0,'2025-10-29 06:41:19');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'hftgpro'
--

--
-- Dumping routines for database 'hftgpro'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-01 18:21:46
