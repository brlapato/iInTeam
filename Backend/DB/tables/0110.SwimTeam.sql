CREATE TABLE `SwimTeam` (
  `HomePool` varchar(255) DEFAULT NULL,
  `Hometown` varchar(255) DEFAULT NULL,
  `ClubExcellenceLevel` varchar(255) DEFAULT NULL,
  `ClubRecognitionLevel` tinyint DEFAULT NULL,
  `AssistantCoach1` varchar(255) DEFAULT NULL,
  `AssistantCoach2` varchar(255) DEFAULT NULL,
  `HeadCoach` varchar(255) DEFAULT NULL,
  `TeamId` bigint NOT NULL,
  PRIMARY KEY (`TeamId`),
  CONSTRAINT `FK_SwimTeamId` FOREIGN KEY (`TeamId`) REFERENCES `Team` (`TeamId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
