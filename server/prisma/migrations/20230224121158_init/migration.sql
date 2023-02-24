/*
  Warnings:

  - You are about to drop the column `opt_expired` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "opt_expired",
ADD COLUMN     "otp_expired" BOOLEAN NOT NULL DEFAULT false;
