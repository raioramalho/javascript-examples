import { BSON } from "bson";
import { deflate, inflate } from "pako";
import * as fs from 'fs';

const calculo = async () => {
  const dados = await fs.readFileSync('produtos.json', 'utf8');
  const objeto = JSON.parse(dados.toString());
  // Serialize o objeto para BSON
  const objetoSerializado = BSON.serialize({ lista: objeto });

  // Agora, objetoSerializado contém a representação binária do objeto
  // console.log('OBJETO EM BINÁRIO:', objetoSerializado);
  console.log('TAMANHO EM BYTES (BSON):', objetoSerializado.byteLength);

  // Você também pode desserializar para obter o objeto de volta
  const objetoDesserializado: Object = BSON.deserialize(objetoSerializado);
  // console.log('OBJETO EM JSON (BSON):', JSON.stringify(objetoDesserializado));
  console.log('TAMANHO EM BYTES (JSON após desserialização):', new TextEncoder().encode(JSON.stringify(objetoDesserializado)).byteLength);

  // Dados comprimidos serializados (BSON)
  const objetoComprimidoBSON = deflate(objetoSerializado);
  console.log(objetoComprimidoBSON);
  // console.log(`BINÁRIO antes da compressão (BSON): ${objetoSerializado.byteLength} bytes`);
  console.log(`BINÁRIO após a compressão (BSON): ${objetoComprimidoBSON?.byteLength} bytes`);

  // Dados comprimidos em JSON
  const objetoComprimidoJSON = deflate(JSON.stringify(objeto));
  // console.log(objetoComprimidoJSON);
  console.log('OBJETO EM JSON comprimido:', objetoComprimidoJSON?.byteLength);

  // Descomprimir dados JSON
  // const objetoDescomprimidoJSON = inflate(objetoComprimidoJSON, { to: 'string' });
  // console.log('DESCOMPRIMINDO OBJETO EM JSON:', objetoDescomprimidoJSON);
}

calculo();
