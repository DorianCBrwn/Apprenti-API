/*
  Warnings:

  - You are about to drop the column `role_description` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `role_name` on the `Role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Role_role_name_key";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "role_description",
DROP COLUMN "role_name",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
