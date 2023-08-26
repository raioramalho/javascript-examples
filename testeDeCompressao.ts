import { BSON } from "bson";
import { deflate, inflate } from "pako";
import * as fs from 'fs';

const testPerformance = async () => {
  try {
    const dados = await fs.readFileSync('produtos.json', 'utf8');
    const objeto = JSON.parse(dados.toString());
    const testSizes = [10, 50, 100, 500, 1000]; // Tamanhos de teste em número de objetos

    for (const size of testSizes) {
      const testObject = { lista: objeto.slice(0, size) }; // Criar objeto de teste com tamanho específico

      // Testar JSON
      const jsonStartTime = Date.now();
      const jsonString = JSON.stringify(testObject);
      const jsonCompressed = deflate(jsonString, { to: 'string' });
      const jsonDecompressed = inflate(jsonCompressed, { to: 'string' });
      const jsonEndTime = Date.now();

      // Tamanho do JSON comprimido e descomprimido
      const jsonCompressedSize = jsonCompressed.length;
      const jsonDecompressedSize = jsonDecompressed.length;

      // Testar BSON
      const bsonStartTime = Date.now();
      const bsonSerialized = BSON.serialize(testObject);
      const bsonCompressed = deflate(bsonSerialized);
      const bsonDecompressed = BSON.deserialize(inflate(bsonCompressed));
      const bsonEndTime = Date.now();

      // Tamanho do BSON comprimido e descomprimido
      const bsonCompressedSize = bsonCompressed.length;
      const bsonDecompressedSize = BSON.serialize(bsonDecompressed).length;

      // Medir tempos
      const jsonTime = jsonEndTime - jsonStartTime;
      const bsonTime = bsonEndTime - bsonStartTime;

      // Medir tempo para JSON puro
      const pureJsonStartTime = Date.now();
      // Nenhuma compactação/desserialização para o JSON puro aqui
      const pureJsonEndTime = Date.now();

      const pureJsonTime = pureJsonEndTime - pureJsonStartTime;

      console.log(`Tamanho do Teste (número de objetos): ${size}`);
      console.log('Tempo de Compressão (ms) (JSON):', jsonTime);
      console.log('Tamanho JSON Comprimido:', jsonCompressedSize);
      console.log('Tamanho JSON Descomprimido:', jsonDecompressedSize);

      console.log('Tempo de Compressão (ms) (BSON):', bsonTime);
      console.log('Tamanho BSON Comprimido:', bsonCompressedSize);
      console.log('Tamanho BSON Descomprimido:', bsonDecompressedSize);

      console.log('Tempo (ms) para JSON puro:', pureJsonTime);
      console.log('-------------------------------------');
    }
  } catch (error) {
    console.error(`Erro ao realizar testes: ${error.message}`);
  }
}

testPerformance();
