/*
  Warnings:

  - You are about to drop the `BLACKLIST` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CLIENTE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LOGDETRANSACAO` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PARAMETRO` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PERFIL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SISTEMA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SISTEMACLIENTE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USUARIO` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USUARIOCLIENTE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USUARIOPERFIL` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BLACKLIST";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CLIENTE";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LOGDETRANSACAO";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PARAMETRO";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PERFIL";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SISTEMA";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SISTEMACLIENTE";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "USUARIO";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "USUARIOCLIENTE";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "USUARIOPERFIL";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Colaborador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Livro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "livro" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Emprestimo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alunoId" INTEGER,
    "colaboradorId" INTEGER,
    "livroId" INTEGER NOT NULL,
    CONSTRAINT "Emprestimo_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Emprestimo_colaboradorId_fkey" FOREIGN KEY ("colaboradorId") REFERENCES "Colaborador" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Emprestimo_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
