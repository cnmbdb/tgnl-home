-- MySQL dump 10.13  Distrib 8.0.24, for Linux (x86_64)
--
-- Host: localhost    Database: nl-admin
-- ------------------------------------------------------
-- Server version	8.0.24

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
-- Table structure for table `licenses`
--

DROP TABLE IF EXISTS `licenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `licenses` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `order_number` varchar(255) NOT NULL COMMENT '订单号',
  `order_id` varchar(255) DEFAULT NULL COMMENT 'WordPress订单ID',
  `email` varchar(255) DEFAULT NULL COMMENT '客户邮箱',
  `customer_name` varchar(255) DEFAULT NULL COMMENT '客户姓名',
  `product_info` text COMMENT '产品信息(JSON)',
  `license_type` enum('standard','professional','enterprise','monthly','yearly') DEFAULT 'standard' COMMENT '授权类型',
  `status` enum('active','inactive','expired') DEFAULT 'active' COMMENT '授权状态',
  `activated_at` datetime DEFAULT NULL COMMENT '激活时间',
  `expiry_date` date DEFAULT NULL COMMENT '到期日期',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`),
  KEY `idx_order_number` (`order_number`),
  KEY `idx_email` (`email`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='授权许可证表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `licenses`
--

LOCK TABLES `licenses` WRITE;
/*!40000 ALTER TABLE `licenses` DISABLE KEYS */;
/*!40000 ALTER TABLE `licenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `license_history`
--

DROP TABLE IF EXISTS `license_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `license_history` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `order_number` varchar(255) NOT NULL COMMENT '订单号',
  `action` enum('activate','deactivate','renew','expire') NOT NULL COMMENT '操作类型',
  `server_ip` varchar(50) DEFAULT NULL COMMENT '服务器IP',
  `details` text COMMENT '操作详情',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
  PRIMARY KEY (`id`),
  KEY `idx_order_number` (`order_number`),
  KEY `idx_action` (`action`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='授权操作历史表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `license_history`
--

LOCK TABLES `license_history` WRITE;
/*!40000 ALTER TABLE `license_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `license_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_configs`
--

DROP TABLE IF EXISTS `system_configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_configs` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'UUID主键',
  `config_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '配置键',
  `config_value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '配置值',
  `updated_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '更新者',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `config_key` (`config_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统配置表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_configs`
--

LOCK TABLES `system_configs` WRITE;
/*!40000 ALTER TABLE `system_configs` DISABLE KEYS */;
INSERT INTO `system_configs` VALUES ('099d720f-80ee-481e-aa5e-b047b5a3e8db','adminEmail','admin@hfcloud.com','d3dbc343-5d77-49c5-a538-014565764a77','2025-09-14 00:26:03'),('360aa343-eb22-4d2b-b155-cc4f424ff790','maintenanceMode','false','d3dbc343-5d77-49c5-a538-014565764a77','2025-09-14 00:26:03'),('4de61f8c-7a3e-4fa6-99c6-a4a8cbfdb868','faviconUrl','/favicon.ico','d3dbc343-5d77-49c5-a538-014565764a77','2025-09-14 00:26:03'),('7a48bc4c-8737-4686-ba71-4731d461f636','announcement','欢迎使用 HFCloud 系统','d3dbc343-5d77-49c5-a538-014565764a77','2025-09-14 00:26:03'),('8c0f497a-10ba-4cee-b941-ec9bf7a979b8','logoSize','128','d3dbc343-5d77-49c5-a538-014565764a77','2025-09-14 00:26:03'),('a45cf867-c0c7-450a-8ca3-0d7d27eb1c98','logoUrl','https://hfstore.xyz/wp-content/uploads/2025/08/未命名-份-份-份-份-份-16.png','d3dbc343-5d77-49c5-a538-014565764a77','2025-09-14 00:26:03'),('c1e6ba59-876b-4bef-888a-cfb74235ce02','systemName','HFCloud 系统','d3dbc343-5d77-49c5-a538-014565764a77','2025-09-14 00:26:03');
/*!40000 ALTER TABLE `system_configs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_users`
--

DROP TABLE IF EXISTS `system_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_users`
--

LOCK TABLES `system_users` WRITE;
/*!40000 ALTER TABLE `system_users` DISABLE KEYS */;
INSERT INTO `system_users` VALUES (1,'admin','a8de8c6e399c25b2ceb3f1ace71041c1:d0d4c3ad1940d246320f71a7788e2bfd1a49d94ce4e2ea521b9c0e60e6072a92d6ae1ff681aa78b04d5c3da48067423244cca8ed3a9c698aed0c5e621f1cdc1b','admin@example.com','admin','active','2025-11-06 13:27:46','2025-11-06 13:27:35','2025-11-06 13:27:46');
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
  `user_nickname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `amount` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,276600603,'测试昵称','test_user',100500000,'2024-08-12 14:41:11','2025-09-24 10:28:55'),(2,825512163,'HF','HFTGID',10000000,'2024-08-12 14:51:46','2025-09-24 10:31:43'),(3,923284681,'AER','AER00001',0,'2024-08-12 15:23:55','2025-09-24 10:28:36'),(4,6833491453,'ccy','ccy888888888',0,'2024-08-12 15:47:13','2025-09-24 10:28:36'),(5,5987552454,'处理 事务','swcl857',0,'2024-08-12 17:04:08','2025-09-24 10:28:36'),(6,5205064877,'野猪','yezhu008',0,'2024-08-13 07:51:48','2025-09-24 10:28:36'),(7,5082342899,'Li mark','Mark_Zzx',0,'2024-08-13 08:30:52','2025-09-24 10:28:36'),(8,5133050668,'程序猿老王（18年程序员接各种脚本定制）','laowang668868',0,'2024-08-14 09:39:40','2025-09-24 10:28:36'),(10,5453498619,'mOnkEy 大师兄','MonkeyMonkeyhappy',0,'2025-09-13 09:54:13','2025-09-24 10:28:36'),(11,2064967864,'Mableb','mableb',0,'2025-09-13 16:15:37','2025-09-24 10:28:36'),(12,5158269587,'无用 🌹','jnd28_vip',0,'2025-09-13 18:54:03','2025-09-24 10:28:36'),(13,6368691398,NULL,NULL,0,'2025-09-21 01:01:12','2025-09-24 10:28:36'),(14,7503801458,NULL,NULL,0,'2025-09-21 06:24:23','2025-09-24 10:28:36'),(15,7986937230,NULL,NULL,0,'2025-09-24 10:14:46','2025-09-24 10:28:36'),(16,7244664832,NULL,NULL,0,'2025-09-24 12:12:01','2025-09-24 12:12:01');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_sessions`
--

DROP TABLE IF EXISTS `user_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `session_token` (`session_token`),
  KEY `idx_session_token` (`session_token`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_expires_at` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_sessions`
--

LOCK TABLES `user_sessions` WRITE;
/*!40000 ALTER TABLE `user_sessions` DISABLE KEYS */;
INSERT INTO `user_sessions` VALUES (1,'d3dbc343-5d77-49c5-a538-014565764a77','nqr1quzcf9mfwyc1oz','2025-09-30 19:32:12','2025-09-23 19:32:13');
/*!40000 ALTER TABLE `user_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'UUID主键',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '邮箱',
  `password_hash` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码哈希',
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'user' COMMENT '角色',
  `role_label` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '普通用户' COMMENT '角色标签',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'active' COMMENT '状态',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_role` (`role`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('8e853808-0336-49d2-a415-746f1d2da754','admin','admin@hfcloud.com','admin123','admin','管理员','active','2025-08-07 17:15:11','2025-10-14 05:08:13','$2b$10$n0rBljothcdIpkDG5SYMNeTgH9psXrz6nU7PjNwnrEiNpjjKPPETq'),('afa5af83-a822-11f0-b77d-525400ec1c03','test','test@example.com','test123','admin','普通用户','active','2025-10-13 10:52:17','2025-10-13 10:52:17',''),('fdb081b7-7682-4a30-acfa-1af64ac6d81b','user1','user1@hfcloud.com','admin123','user','普通用户','active','2025-08-07 17:15:11','2025-08-07 17:15:11','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'nl-admin'
--

--
-- Dumping routines for database 'nl-admin'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-06 21:45:43
