/*
  Warnings:

  - You are about to drop the column `livroId` on the `Emprestimo` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "LivrosDoEmprestimo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emprestimoId" INTEGER NOT NULL,
    "livroId" INTEGER NOT NULL,
    CONSTRAINT "LivrosDoEmprestimo_emprestimoId_fkey" FOREIGN KEY ("emprestimoId") REFERENCES "Emprestimo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LivrosDoEmprestimo_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Emprestimo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alunoId" INTEGER,
    "colaboradorId" INTEGER,
    CONSTRAINT "Emprestimo_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Emprestimo_colaboradorId_fkey" FOREIGN KEY ("colaboradorId") REFERENCES "Colaborador" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Emprestimo" ("alunoId", "colaboradorId", "id") SELECT "alunoId", "colaboradorId", "id" FROM "Emprestimo";
DROP TABLE "Emprestimo";
ALTER TABLE "new_Emprestimo" RENAME TO "Emprestimo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
