/*
  Warnings:

  - You are about to drop the column `caption` on the `CoffeeShop` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CoffeeShop" DROP COLUMN "caption";

-- CreateIndex
CREATE UNIQUE INDEX "Category.slug_unique" ON "Category"("slug");
