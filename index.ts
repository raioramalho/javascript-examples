import { Prisma, PrismaClient, Produto } from "@prisma/client";
import axios from "axios";
import { createWriteStream } from 'fs';
console.clear();
console.log('Starting..')

const main = async () => {

  let reqs: any[] = []

  try {
    const req1 = await axios.get('https://cep.awesomeapi.com.br/json/25041390');
    reqs.push({ REQ1: req1.data });
  } catch (error) {
    reqs.push({ REQ1: { error: error.response.data.message } });
  }

  try {
    const req2 = await axios.get('https://cep.awesomeapi.com.br/json/20521100000');
    reqs.push({ REQ2: req2.data });
  } catch (error) {
    reqs.push({ REQ2: { error: error.response.data.message } });
  }

  console.log(JSON.stringify(reqs))


};

main();
