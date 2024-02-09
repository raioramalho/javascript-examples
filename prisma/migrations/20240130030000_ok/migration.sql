-- CreateTable
CREATE TABLE "Produto" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Uuid" TEXT NOT NULL,
    "Produto" TEXT NOT NULL,
    "Fabricante" TEXT NOT NULL,
    "Test" BOOLEAN DEFAULT false,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Produto_Uuid_key" ON "Produto"("Uuid");
