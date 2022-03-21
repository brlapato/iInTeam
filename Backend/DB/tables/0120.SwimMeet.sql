CREATE TABLE `SwimMeet` (
  `Name` varchar(255) NOT NULL,
  `Opponent1` varchar(255) DEFAULT NULL,
  `Opponent2` varchar(255) DEFAULT NULL,
  `PostMeetNotes` varchar(3500) DEFAULT NULL,
  `PreMeetNotes` varchar(3500) DEFAULT NULL,
  `EventId` bigint NOT NULL,
  PRIMARY KEY (`EventId`),
  CONSTRAINT `FK_SwimMeet_EventId` FOREIGN KEY (`EventId`) REFERENCES `TeamEvent` (`EventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
