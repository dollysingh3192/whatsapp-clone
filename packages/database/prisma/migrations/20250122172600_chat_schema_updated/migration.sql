/*
  Warnings:

  - Added the required column `createdBy` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Made the column `lastMessageAt` on table `Chat` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "createdBy" TEXT NOT NULL,
ALTER COLUMN "lastMessageAt" SET NOT NULL,
ALTER COLUMN "lastMessageAt" SET DEFAULT CURRENT_TIMESTAMP;
