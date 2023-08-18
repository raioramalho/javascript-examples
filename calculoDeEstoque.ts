import { PrismaClient, Produtos } from "@prisma/client";

const prisma = new PrismaClient();

const listarProdutos = async () => {
  try {
    let listaDeProdutos: Produtos[] = [];

    const produtos = await prisma.produtos.findMany({
      include: {
        estoques: true,
      }
    });

    produtos.forEach((produtos) => {
      const totalEstoque = produtos.estoques.reduce(
        (index, estoque) => index + estoque.estoque,
        0
      )
      produtos.estoque = totalEstoque;
      listaDeProdutos.push(produtos);
    });

    console.log(produtos);
  } catch (error) {
    console.log(error);
  }
}


listarProdutos();


