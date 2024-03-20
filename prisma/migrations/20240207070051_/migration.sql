/*
  Warnings:

  - You are about to drop the column `turnCompleted` on the `Area` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Area" DROP COLUMN "turnCompleted",
ADD COLUMN     "dayCompleted" INTEGER NOT NULL DEFAULT 0;
