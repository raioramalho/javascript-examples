-- CreateTable
CREATE TABLE "Moviment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origin_id" INTEGER NOT NULL,
    "target_id" INTEGER NOT NULL,
    "amount" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Moviment_origin_id_fkey" FOREIGN KEY ("origin_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Moviment_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
