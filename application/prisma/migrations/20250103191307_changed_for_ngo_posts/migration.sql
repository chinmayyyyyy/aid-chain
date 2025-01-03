/*
  Warnings:

  - You are about to drop the `EmergencyRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmergencyRequest" DROP CONSTRAINT "EmergencyRequest_request_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'Donor';

-- DropTable
DROP TABLE "EmergencyRequest";

-- CreateTable
CREATE TABLE "NGOPost" (
    "post_id" SERIAL NOT NULL,
    "ngo_id" INTEGER NOT NULL,
    "item_details" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "packaging_instructions" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'Active',

    CONSTRAINT "NGOPost_pkey" PRIMARY KEY ("post_id")
);

-- AddForeignKey
ALTER TABLE "NGOPost" ADD CONSTRAINT "NGOPost_ngo_id_fkey" FOREIGN KEY ("ngo_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
