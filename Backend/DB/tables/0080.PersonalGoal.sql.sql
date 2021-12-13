CREATE TABLE `PersonalGoal` (
  `GoalId` bigint NOT NULL AUTO_INCREMENT,
  `PlayerId` bigint NOT NULL,
  `Name` varchar(150) NOT NULL,
  `Sport` varchar(75) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `TimeFrame` varchar(100) DEFAULT NULL,
  `Plan` varchar(500) DEFAULT NULL,
  `IsComplete` bit(1) DEFAULT NULL,
  PRIMARY KEY (`GoalId`),
  KEY `FK_PersonalGoal_PlayerId` (`PlayerId`),
  CONSTRAINT `FK_PersonalGoal_PlayerId` FOREIGN KEY (`PlayerId`) REFERENCES `Player` (`PlayerId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
