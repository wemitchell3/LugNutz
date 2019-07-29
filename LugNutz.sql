CREATE TABLE `users`
(
  `id` int PRIMARY KEY,
  `userName` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `phoneNumber` numeric
);

CREATE TABLE `messages`
(
  `id` int PRIMARY KEY,
  `user_id` int,
  `messageTimeStamp` datetime,
  `message` varchar(255)
);

CREATE TABLE `garage`
(
  `id` int PRIMARY KEY,
  `user_id` int,
  `modelYear` varchar(255),
  `make` varchar(255),
  `model` varchar(255),
  `edition` varchar(255),
  `engineSize` varchar(255),
  `vehicleMileage` varchar(255),
  `vehicleImageURL` varchar(255)
);

CREATE TABLE `maintenanceTasks`
(
  `id` int PRIMARY KEY,
  `vehicle_id` int,
  `maintenanceTask` varchar(255),
  `maintenanceDescription` varchar(255),
  `targetCompleteDate` date,
  `taskMileage` int,
  `isComplete` boolean,
  `apptRequest` boolean,
  `maintenanceTaskTimeStamp` datetime
);

CREATE TABLE `wishList`
(
  `id` int PRIMARY KEY,
  `vehicle_id` int,
  `maintenanceTitle` varchar(255),
  `maintenanceDescription` varchar(255),
  `wishTimeStamp` datetime
);

ALTER TABLE `messages` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `garage` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `maintenanceTasks` ADD FOREIGN KEY (`vehicle_id`) REFERENCES `garage` (`id`);

ALTER TABLE `wishList` ADD FOREIGN KEY (`vehicle_id`) REFERENCES `garage` (`id`);

