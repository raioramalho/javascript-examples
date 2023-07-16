/*
  Warnings:

  - You are about to drop the `Carrinho` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Carrinho";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ItemDoPedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedido_id" INTEGER,
    "produto_id" INTEGER,
    "quantidade" INTEGER,
    "valor" INTEGER,
    CONSTRAINT "ItemDoPedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "Pedido" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ItemDoPedido_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
