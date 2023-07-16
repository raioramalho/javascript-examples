-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Carrinho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedido_id" INTEGER NOT NULL,
    "produto_id" INTEGER,
    "quantidade" INTEGER,
    CONSTRAINT "Carrinho_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "Pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Carrinho_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Carrinho" ("id", "pedido_id", "produto_id", "quantidade") SELECT "id", "pedido_id", "produto_id", "quantidade" FROM "Carrinho";
DROP TABLE "Carrinho";
ALTER TABLE "new_Carrinho" RENAME TO "Carrinho";
CREATE UNIQUE INDEX "Carrinho_pedido_id_key" ON "Carrinho"("pedido_id");
CREATE UNIQUE INDEX "Carrinho_produto_id_key" ON "Carrinho"("produto_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
