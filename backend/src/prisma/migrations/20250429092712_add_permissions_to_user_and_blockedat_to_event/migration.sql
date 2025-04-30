-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('BLOCK_EVENTS', 'ALL');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "blockedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "UserPermission"[];
