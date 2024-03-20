/*
  Warnings:

  - Made the column `userId` on table `Area` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Area" DROP CONSTRAINT "Area_userId_fkey";

-- AlterTable
ALTER TABLE "Area" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
