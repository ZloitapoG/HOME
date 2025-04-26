/*
  Warnings:

  - A unique constraint covering the columns `[serialNumder]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "serialNumder" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Event_serialNumder_key" ON "Event"("serialNumder");
