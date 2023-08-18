/*
  Warnings:

  - You are about to drop the `Classificacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lancamentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Natureza` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Classificacao";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Lancamentos";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Natureza";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produto" TEXT NOT NULL,
    "estoque" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Estoque" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produto" INTEGER NOT NULL,
    "estoque" INTEGER NOT NULL,
    "lote" TEXT NOT NULL,
    "vencimento" DATETIME NOT NULL,
    CONSTRAINT "Estoque_produto_fkey" FOREIGN KEY ("produto") REFERENCES "Produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
