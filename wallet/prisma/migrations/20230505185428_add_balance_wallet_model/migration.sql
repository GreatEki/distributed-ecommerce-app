/*
  Warnings:

  - Added the required column `balance` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `wallet` ADD COLUMN `balance` INTEGER NOT NULL;
