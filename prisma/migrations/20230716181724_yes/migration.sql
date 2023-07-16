/*
  Warnings:

  - You are about to drop the column `carrinho_id` on the `Produto` table. All the data in the column will be lost.
  - Added the required column `produto_id` to the `Carrinho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade` to the `Carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Carrinho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedido_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    CONSTRAINT "Carrinho_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "Pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Carrinho_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Carrinho" ("id", "pedido_id") SELECT "id", "pedido_id" FROM "Carrinho";
DROP TABLE "Carrinho";
ALTER TABLE "new_Carrinho" RENAME TO "Carrinho";
CREATE UNIQUE INDEX "Carrinho_pedido_id_key" ON "Carrinho"("pedido_id");
CREATE UNIQUE INDEX "Carrinho_produto_id_key" ON "Carrinho"("produto_id");
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "estoque" INTEGER NOT NULL
);
INSERT INTO "new_Produto" ("estoque", "id", "nome", "valor") SELECT "estoque", "id", "nome", "valor" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
CREATE UNIQUE INDEX "Produto_nome_key" ON "Produto"("nome");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
