CREATE TABLE `Practice` (
  `Notes` varchar(3500) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `EventId` bigint NOT NULL,
  PRIMARY KEY (`EventId`),
  CONSTRAINT `FK_Practice_EventId` FOREIGN KEY (`EventId`) REFERENCES `TeamEvent` (`EventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


