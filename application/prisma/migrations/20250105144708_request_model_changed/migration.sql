/*
  Warnings:

  - You are about to drop the column `description` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `donation_type` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `request_id` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DonationToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `post_id` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `NGOPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_request_id_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_DonationToUser" DROP CONSTRAINT "_DonationToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_DonationToUser" DROP CONSTRAINT "_DonationToUser_B_fkey";

-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "description",
DROP COLUMN "donation_type",
DROP COLUMN "request_id",
ADD COLUMN     "courier_number" TEXT,
ADD COLUMN     "post_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "NGOPost" ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Request";

-- DropTable
DROP TABLE "_DonationToUser";

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "NGOPost"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;
