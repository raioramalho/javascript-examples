import { PrismaClient } from "@prisma/client";

console.log('Starting..');

const prisma = new PrismaClient();



const buscaDados =async () => {
  try {
    // const dados = await prisma.lancamentos.findMany();
    const dados = true;

  } catch (error) {
    console.log('Erro do catch');
  }
}

buscaDados();
