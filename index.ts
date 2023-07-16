import { Cliente, PrismaClient, Produto } from "@prisma/client"

const prisma = new PrismaClient();

console.log('Listando produtos: ---- > >');
console.log(await prisma.produto.findMany());
console.log('---------------- > >')

export class ProdutoPedido {
  produto: any;
  quantidade: number;
}

const realizaPedido = async (usuario: string, produtos: ProdutoPedido[]) => {

  try {

    const cliente = await prisma.cliente.findFirst({
      where: {
        nome: usuario,
      }
    });

    if (!cliente) {
      throw new Error('Cliente não encontrado.');
    }

    if (produtos.length <= 0) {
      throw new Error('Obrigatorio um produto no pedido.');
    }

    const produtosValidos: ProdutoPedido[] = []

    for (let index = 0; index < produtos.length; index++) {

      const produto = await prisma.produto.findFirst({
        where: {
          nome: produtos[index].produto,
        }
      });

      if (!produto) {
        throw new Error('Produto não encontrado.');
       }

      if (produto.estoque < produtos[index].quantidade) {
        throw new Error('Estoque insuficiente.');
      }

      produtosValidos.push({
        produto: produto,
        quantidade: produtos[index].quantidade,
      });

    }

    if (produtosValidos.length <= 0) {
      throw new Error('Erro ao selecionar produtos.');
    }

    const pedido = await prisma.pedido.create({
      data: {
        cliente_id: cliente.id,
        valor_total: 0,
      }
    })

    if (!pedido) {
      throw new Error('Erro ao criar pedido.');
    }

    for (let index = 0; index < produtosValidos.length; index++) {
      const atualizaItemDoPedido = await prisma.pedido.update({
        where: {
          id: pedido.id,
        },
        data: {
          ItemDoPedido: {
            create: {
              produto_id: produtosValidos[index].produto.id,
              quantidade: produtosValidos[index].quantidade,
              valor: (produtosValidos[index].produto.valor * produtosValidos[index].quantidade),
            }
          },
          valor_total: {
            increment: produtosValidos[index].produto.valor * produtosValidos[index].quantidade,
          }
        }
      });

      if (!atualizaItemDoPedido) {
        throw new Error('Erro ao atualizar ItemDoPedido.');
      }

      const atualizaEstoque = await prisma.produto.update({
        where: {
          id: produtosValidos[index].produto.id,
        },
        data: {
          estoque: {
            decrement: produtosValidos[index].quantidade,
          }
        }
      });

      if (!atualizaEstoque) {
        throw new Error('Erro ao atualizar estoque.');
      }
    }

    const finalizaPedido = prisma.pedido.findFirst({
      where: {
        id: pedido.id,
      },
      include: {
        Cliente: true,
        ItemDoPedido: {
          select: {
            Produto: true,
            quantidade: true,
          }
        }
      }
    });

    return await prisma.$transaction([finalizaPedido]);

  } catch (error) {
    console.log(error.message);
  }

}



const teste = await realizaPedido('Maicom',
  [
    // {
    //   produto: 'Café Pilao 1kg',
    //   quantidade: 1,
    // },
    // {
    //   produto: 'Filtro de Café 102',
    //   quantidade: 2,
    // }
  ]
);

console.log(teste);
