/*
  Warnings:

  - You are about to drop the `Estoque` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Produtos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Estoque";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Produtos";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produto" TEXT NOT NULL,
    "valor" DECIMAL NOT NULL DEFAULT 0
);
