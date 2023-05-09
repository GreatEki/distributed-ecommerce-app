/*
  Warnings:

  - You are about to drop the `_carttoproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_carttoproduct` DROP FOREIGN KEY `_CartToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_carttoproduct` DROP FOREIGN KEY `_CartToProduct_B_fkey`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `cartId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_carttoproduct`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
