/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passwordConfirmation` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `confirmationCode` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "uniqueId" TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "passwordConfirmation" SET NOT NULL,
ALTER COLUMN "confirmationCode" SET NOT NULL;
