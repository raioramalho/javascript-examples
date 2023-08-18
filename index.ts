import * as zlib from 'zlib';
import * as fs from 'fs';


console.log(`Starting..`)


try {
  const filePath = './produtos.json'; // Substitua pelo caminho correto
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(rawData);

  let qtdProdutos = 0;
  let produtos: any[] = [];

  for (let index = 0; index < jsonData.slice(0, 500).length; index++) {
    console.log(`contando: ${jsonData[index].PRODUTO} - produto de numero ${index}`);
    produtos.push(jsonData[index]);
    qtdProdutos += index;
  }

  // console.log(produtos);
  console.log(`Produtos: ${produtos.length}`);


  zlib.gzip(JSON.stringify(produtos), (error, compressedData) => {
    if (error) {
      console.error('Erro ao compactar o JSON:', error);
    } else {
      // fs.writeFileSync('produtos_comprimidos.json.gz', compressedData);
      console.log(`JSON comprimido e salvo com sucesso: ${compressedData.byteLength}`);
    }
  });


} catch (error) {
  console.error('Erro ao ler o arquivo JSON:', error);
}
