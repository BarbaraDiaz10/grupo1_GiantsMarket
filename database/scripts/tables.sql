USE giantmarket_db;

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
`role_id` INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
`role_name` varchar(50) NOT NULL
);

DROP TABLE IF EXISTS category;
CREATE TABLE category (
`id` INT(10) PRIMARY KEY NOT NULL,
`category_name` varchar(50) NOT NULL);


DROP TABLE IF EXISTS users;
CREATE TABLE users (
`id` INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
`first_name` varchar(30) NOT NULL,
`last_name` varchar(30) NOT NULL,
`email` varchar(30) NOT NULL,
`gender` varchar(20) NOT NULL,
`date` date not null,
`password` varchar(20) NOT NULL,
`role_id` INT(10) NOT NULL,
`image` varchar(500) NOT NULL,

foreign key (`role_id`) references `roles` (`role_id`)
);

DROP TABLE IF EXISTS products;
CREATE TABLE `products` (
`id` INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
`name` varchar(50) NOT NULL,
`description` text NOT NULL,
`description_detail` text NOT NULL,
`price` int(100) NOT NULL,
`discount` int(50) NOT NULL,
`category_id` INT(10) NOT NULL,
`image` varchar(100) NOT NULL,
`transferable` varchar(1) NOT NULL,
`shipping` int(10) NOT NULL,
`stock` int(10) NOT NULL,

foreign key (`category_id`) references `category` (`id`)
);

DROP TABLE IF EXISTS product_user;
CREATE TABLE `product_user` (
`product_user_id` INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
`user_id` INT(10) NOT NULL,
`product_id` INT(10) NOT NULL,
foreign key (`user_id`) references `users` (`user_id`),
foreign key (`product_id`) references `products` (`id`)
);
