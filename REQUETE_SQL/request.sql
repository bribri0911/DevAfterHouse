

-- Crée la data base, les exo sont en dessous

CREATE DATABASE `testafterhouse`
USE `testafterhouse`;


CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE `tache` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(50) DEFAULT NULL,
  `est_terminee` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tache_users` (`user_id`),
  CONSTRAINT `FK_tache_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);



-- Les exo  :

SELECT *
FROM users 
INNER JOIN tache ON users.id = user_id



SELECT users.name, COUNT(tache.id)
FROM users 
INNER JOIN tache ON users.id = user_id
GROUP BY users.name



SELECT users.name, COUNT(tache.id) AS task_count
FROM users
LEFT JOIN tache ON users.id = tache.user_id
GROUP BY users.name
HAVING task_count = 0;
