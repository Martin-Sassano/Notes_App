-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: notes_app
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `note_tags`
--

DROP TABLE IF EXISTS `note_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note_tags` (
  `note_id` bigint NOT NULL,
  `tag_id` bigint NOT NULL,
  PRIMARY KEY (`note_id`,`tag_id`),
  KEY `FK8babdwu6uqiu4rdkeuy8dkna0` (`tag_id`),
  CONSTRAINT `FK8babdwu6uqiu4rdkeuy8dkna0` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`),
  CONSTRAINT `FKb15yxop81senc5xs5tjrsy4k4` FOREIGN KEY (`note_id`) REFERENCES `notes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note_tags`
--

LOCK TABLES `note_tags` WRITE;
/*!40000 ALTER TABLE `note_tags` DISABLE KEYS */;
INSERT INTO `note_tags` VALUES (3,3),(1,4),(9,4),(1,5),(10,9),(11,16),(1,20),(13,22);
/*!40000 ALTER TABLE `note_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `archived` bit(1) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `title` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKechaouoa6kus6k1dpix1u91c` (`user_id`),
  CONSTRAINT `FKechaouoa6kus6k1dpix1u91c` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES (1,_binary '\0','zMake a Note App with SpringBoot and ReactJS.','2025-03-01 19:13:29.546370','Note App ','2025-03-03 03:56:18.517706',1),(3,_binary '\0','qweqeqweqwe','2025-03-02 18:26:25.788396','xzczxxzc','2025-03-03 03:55:35.334077',1),(9,_binary '\0','zxczx','2025-03-03 03:14:39.889940','sadasdasd','2025-03-03 03:15:02.887367',1),(10,_binary '\0','test','2025-03-03 03:16:51.437352','Testing...','2025-03-03 03:38:06.031425',2),(11,_binary '\0','zxczxcczxczxzxcc','2025-03-03 03:52:34.232169','asdasdasdad','2025-03-03 03:55:22.667356',3),(13,_binary '\0','xzczxczcx','2025-03-03 15:36:03.916903','sadasd','2025-03-03 15:36:25.981505',15);
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKt48xdq560gs3gap9g7jg36kgc` (`name`),
  UNIQUE KEY `UKiwqlfjwokoqh9jgt0htkvgjeh` (`name`,`user_id`),
  KEY `FKpsynysaxl7cyw8mr5c8xevneg` (`user_id`),
  CONSTRAINT `FKpsynysaxl7cyw8mr5c8xevneg` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (13,'asdasdasdasd',3),(2,'Backend',1),(20,'Cloud',1),(4,'Done',1),(1,'Frontend',1),(5,'FullStack',1),(22,'test',15),(3,'To Do',1),(18,'To Do ASAP!',3),(9,'To Do...',2),(16,'ToDo!',3);
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(60) NOT NULL,
  `username` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'$2a$10$pDiJo/NQrpi1izqAHz.AVuSn1.9IkCtbsMXMNtzxnByUxvQYJlcOG','testuser'),(2,'$2a$10$C3/9fRxwSEiDPJahIoFoz.iFxm0Xz6CWrkAMBiBCEC7cvlnRDAVWK','testuser2'),(3,'$2a$10$S0RG.Bap29eGnYwfVwKjMOUUdYfo5QODNNz9X6rVcE1N6rEEY8/5W','testuser3'),(4,'$2a$10$UBiC/1lud.pZjXnaAwOxeu4lSQ9Plze0j0V5E9DQVePkP7/jYBJc2',''),(5,'$2a$10$6MzoEK6tCJ3anQSCebfQluPRONodEXA6UzsG4T3mTkbkXk6hN3ipC','testuser4'),(6,'$2a$10$69QC.be5kiC8/G1CUWR/Q.T7EEQObVeyrMfJMQ7QbBJSNfnUbJvEq','testuser5'),(7,'$2a$10$tZouxB1aATEoTJflvNyN8.Cw9Bmvaq30s1bJuOeJnsfzwixfcGsx2','testuser6'),(8,'$2a$10$9Man3fOeVQ/eUY6MAejOpuutIChteAjMt463uNfPvwNZ8uIgKnR2m','testuser7'),(9,'$2a$10$VnK.6CH3zEy.mFA4Qi4EIuPaIwWSWGGmZhzS4SjEQwnwFLv0KgkhS','testuser8'),(10,'$2a$10$Oxcd3incQIur3a5TO2nRpup8cy6u/MyEfXZMn0SiJHb/Gh6/Ey0om','testuser9'),(11,'$2a$10$0N7QRiJUbcHrErsH6ZIc5.hab2Y96CsGgjlTJ/3Y3tHdzboRzE2Gm','testuser10'),(12,'$2a$10$iyJLyBZhQ1JgA9kYRA3Dbu7Laou4TDnPCIMqRL8617kUGCUAuky9e','testuser11'),(13,'$2a$10$i7Sr7fQ5U8.aEeoWxPcml.XOqUPW.v.GHo5oXZEvUfiVumUmluht6','testuser12'),(14,'$2a$10$frntj2EFPPJwvmDxIugdyONeZO5B.JVSTd9jVyMnT6u1xeyrbrkL6','1testuser1'),(15,'$2a$10$4qB2d7.DvMg5Oxxq6DT3reRrW9KnsJolQxsoERcQ.ExQJyfx.2rke','2testuser2');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-03 13:36:06
