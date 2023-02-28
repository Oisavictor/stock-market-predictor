/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "reset" (
    "id" SERIAL NOT NULL,
    "resetId" INTEGER NOT NULL,
    "reset_code" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "reset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uniqueId_key" ON "User"("uniqueId");

-- AddForeignKey
ALTER TABLE "reset" ADD CONSTRAINT "reset_resetId_fkey" FOREIGN KEY ("resetId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
