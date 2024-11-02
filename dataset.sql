-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'CartItem'
-- 
-- ---

DROP TABLE IF EXISTS `CartItem`;
		
CREATE TABLE `CartItem` (
  `cartItemId` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `cartId` INTEGER NOT NULL DEFAULT NULL,
  `product_Id` INTEGER NOT NULL DEFAULT NULL,
  `quantity` INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (`cartItemId`)
);

-- ---
-- Table 'ShoppingCart'
-- 
-- ---

DROP TABLE IF EXISTS `ShoppingCart`;
		
CREATE TABLE `ShoppingCart` (
  `shoppingCartId` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  PRIMARY KEY (`shoppingCartId`)
);

-- ---
-- Table 'User'
-- 
-- ---

DROP TABLE IF EXISTS `User`;
		
CREATE TABLE `User` (
  `userId` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `shoppingCartId` INTEGER NOT NULL DEFAULT NULL,
  `username` VARCHAR(225) NULL DEFAULT NULL,
  `email` VARCHAR(225) NULL DEFAULT NULL,
  `password` VARCHAR(225) NOT NULL DEFAULT 'NULL',
  `firstName` VARCHAR(225) NOT NULL DEFAULT 'NULL',
  `lastName` VARCHAR(225) NULL DEFAULT NULL,
  `phone` VARCHAR(225) NULL DEFAULT NULL,
  `createdUser` DATE NULL DEFAULT NULL,
  `updatedUser` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`userId`)
);

-- ---
-- Table 'Flavor'
-- 
-- ---

DROP TABLE IF EXISTS `Flavor`;
		
CREATE TABLE `Flavor` (
  `flavorID` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `product_Id` INTEGER NOT NULL DEFAULT NULL,
  `flavorName` INTEGER NULL DEFAULT NULL,
  `stockQuantity` INTEGER NULL DEFAULT NULL,
  `lastUpdated` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`flavorID`)
);

-- ---
-- Table 'Product'
-- 
-- ---

DROP TABLE IF EXISTS `Product`;
		
CREATE TABLE `Product` (
  `productId` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `brand` VARCHAR(225) NULL DEFAULT NULL,
  `category` VARCHAR(225) NULL DEFAULT NULL,
  `weight` INTEGER NOT NULL DEFAULT NULL,
  `form ` VARCHAR(50) NULL DEFAULT NULL,
  `type` VARCHAR(50) NULL DEFAULT NULL,
  `description` MEDIUMTEXT NULL DEFAULT NULL,
  `nutritionalValue` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`productId`)
);

-- ---
-- Table 'Review'
-- 
-- ---

DROP TABLE IF EXISTS `Review`;
		
CREATE TABLE `Review` (
  `reviewId` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `product_id` INTEGER NOT NULL DEFAULT NULL,
  `user_Id` INTEGER NULL DEFAULT NULL,
  `rating` INTEGER NULL DEFAULT NULL,
  `description` INTEGER NULL DEFAULT NULL,
  `createdReview` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`reviewId`)
);

-- ---
-- Table 'Order'
-- 
-- ---

DROP TABLE IF EXISTS `Order`;
		
CREATE TABLE `Order` (
  `orderId` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `user_Id` INTEGER NOT NULL DEFAULT NULL,
  `order_date` DATE NULL DEFAULT NULL,
  `total_amount` INTEGER NULL DEFAULT NULL,
  `status` ENUM NULL DEFAULT NULL,
  PRIMARY KEY (`orderId`)
);

-- ---
-- Table 'Wishlist'
-- 
-- ---

DROP TABLE IF EXISTS `Wishlist`;
		
CREATE TABLE `Wishlist` (
  `wishlistID ` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_Id` INTEGER NOT NULL DEFAULT NULL,
  `product_Id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`wishlistID `)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `CartItem` ADD FOREIGN KEY (cartId) REFERENCES `ShoppingCart` (`shoppingCartId`);
ALTER TABLE `CartItem` ADD FOREIGN KEY (product_Id) REFERENCES `Flavor` (`flavorID`);
ALTER TABLE `User` ADD FOREIGN KEY (shoppingCartId) REFERENCES `ShoppingCart` (`shoppingCartId`);
ALTER TABLE `Flavor` ADD FOREIGN KEY (product_Id) REFERENCES `Product` (`productId`);
ALTER TABLE `Review` ADD FOREIGN KEY (product_id) REFERENCES `Product` (`productId`);
ALTER TABLE `Review` ADD FOREIGN KEY (user_Id) REFERENCES `User` (`userId`);
ALTER TABLE `Order` ADD FOREIGN KEY (user_Id) REFERENCES `User` (`userId`);
ALTER TABLE `Wishlist` ADD FOREIGN KEY (user_Id) REFERENCES `User` (`userId`);
ALTER TABLE `Wishlist` ADD FOREIGN KEY (product_Id) REFERENCES `Product` (`productId`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `CartItem` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `ShoppingCart` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `User` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Flavor` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Review` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Order` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Wishlist` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `CartItem` (`cartItemId`,`cartId`,`product_Id`,`quantity`) VALUES
-- ('','','','');
-- INSERT INTO `ShoppingCart` (`shoppingCartId`) VALUES
-- ('');
-- INSERT INTO `User` (`userId`,`shoppingCartId`,`username`,`email`,`password`,`firstName`,`lastName`,`phone`,`createdUser`,`updatedUser`) VALUES
-- ('','','','','','','','','','');
-- INSERT INTO `Flavor` (`flavorID`,`product_Id`,`flavorName`,`stockQuantity`,`lastUpdated`) VALUES
-- ('','','','','');
-- INSERT INTO `Product` (`productId`,`brand`,`category`,`weight`,`form `,`type`,`description`,`nutritionalValue`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `Review` (`reviewId`,`product_id`,`user_Id`,`rating`,`description`,`createdReview`) VALUES
-- ('','','','','','');
-- INSERT INTO `Order` (`orderId`,`user_Id`,`order_date`,`total_amount`,`status`) VALUES
-- ('','','','','');
-- INSERT INTO `Wishlist` (`wishlistID `,`user_Id`,`product_Id`) VALUES
-- ('','','');