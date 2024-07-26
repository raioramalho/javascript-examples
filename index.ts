import * as fs from 'fs';

async function main() {
  const start = performance.now();

  const dados = await fs.readFileSync('produtos.json', 'utf8');
  const objeto: any[] = JSON.parse(dados.toString());

  let comEstoque = objeto.filter((produto) => produto.ESTOQUE > 0);

  console.log(comEstoque);
  console.log('QUANTIDADE:', comEstoque.length);

  const end = performance.now();
  console.log(`Tempo de execução: ${end - start} milissegundos`);
}

main();