import { Prisma, PrismaClient, Produto } from "@prisma/client";
import axios from "axios";
import { createWriteStream } from 'fs';
console.clear();
console.log('Starting..')

const main = async () => {

  const estoque: any[] = [
    {
      estoque: 5,
      codprod: 2
    },
    {
      estoque: 10,
      codprod: 2
    },
    {
      estoque: 20,
      codprod: 2
    },
    {
      estoque: 1,
      codprod: 3
    }
  ]

  let select = estoque.filter((item) => item.codprod === 2);

  let calc = select.reduce((acc, curr) => {
    return {
      codprod: curr.codprod,
      estoque: acc.estoque + curr.estoque
    }
  }, { codprod: 2, estoque: 0 });

  console.log(JSON.stringify(calc))

};

main();
