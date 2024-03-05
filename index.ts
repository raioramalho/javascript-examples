console.clear();
console.log('Starting..')

const main = async () => {

  const data = {
    CODCLI: 22,
    OBSERVACAO: "Pedido de teste - com 2 produtos",
    DESCONTO: 0,
    PRODUTOS: [
      {
        QTD: 2,
        VLRUNIT: 61.77,
        CODTABPREC: 1,
        CODPROD: 58
      },
      {
        QTD: 2,
        VLRUNIT: 61.77,
        CODTABPREC: 1,
        CODPROD: 58
      }
    ]
  }



  let itens: any[] = [];

  itens.length

  for (let produto of data.PRODUTOS) {
    let item = {
      CODPROD: produto.CODPROD,
      CODTABPREC: produto.CODTABPREC,
      QTD: produto.QTD,
      VLRVENDA: produto.VLRUNIT,
      VALORUNIT: produto.VLRUNIT
    }
    itens.push(item);
  }

  const dataSales = {
    INTEGRACAO: "true",
    CODEMP: 1,
    CODVEND: 1,
    CODTIPNEG: 17,
    CODTRANS: 1,
    ORCAMENTO: false,
    ItensPedido: itens
  }

  console.log(dataSales)



};

main();
