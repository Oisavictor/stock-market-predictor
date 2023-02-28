/*
  Warnings:

  - You are about to drop the `reset` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `uniqueId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "reset" DROP CONSTRAINT "reset_resetId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "expirer_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "reset_password" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "uniqueId" SET NOT NULL;

-- DropTable
DROP TABLE "reset";
