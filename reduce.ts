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

  let select = estoque.filter((estoque) => estoque.codprod === 2);

  let calc = select.reduce((before, after) => {
    return {
      ...after,
      estoque: before.estoque +after.estoque
    }
  })

  console.log(JSON.stringify(calc))

};

main();
