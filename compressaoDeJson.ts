import * as zlib from 'zlib';
import * as fs from 'fs';
import { buffer } from 'stream/consumers';


console.log(`Starting..`)


try {
  const filePath = './produtos.json'; // Substitua pelo caminho correto
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(rawData);

  console.log(`Bytelen do arquivo: BYTE => ${fs.statSync(filePath).size}`)

  let qtdProdutos = 0;
  let produtos: any[] = [];

  for (let index = 0; index < jsonData.length; index++) {
    // console.log(`contando: ${jsonData[index].PRODUTO} - produto de numero ${index}`);
    produtos.push(jsonData[index]);
    qtdProdutos += index;
  }

  // console.log(produtos);
  console.log(`JSON entrada: ${produtos.length}`);


  zlib.gzip(JSON.stringify(produtos), (error, compressedData) => {
    if (error) {
      console.error('Erro ao compactar o JSON:', error);
    } else {
      // fs.writeFileSync('produtos_comprimidos.json.gz', compressedData);
      console.log(`JSON comprimido e salvo com sucesso: BYTE => ${compressedData.byteLength}`);

      zlib.gunzip(compressedData, (error, decompressedBuffer) => {
        if (error) {
          console.error('Erro ao descomprimir o JSON:', error);
        } else {
          const decompressedJsonString = decompressedBuffer.toString();
          const decompressedJson = JSON.parse(decompressedJsonString);
          console.log('JSON descomprimido:', decompressedJson.length);
        }
      });

    }
  });





} catch (error) {
  console.error('Erro ao ler o arquivo JSON:', error);
}
