import { DataCompressor } from "./classeCompressao"

console.log('Starting..')


const compressTool = new DataCompressor();


const test = () => {
  const obj = {
    CODPROD: 1,
    PRODUTO: 'Mouse',
    FABRICANTE: 'Asus',
    PRECO: 20,
  }

  const comp = DataCompressor.getSmallest(obj);
  console.log(comp.format);
  console.log(obj)
  console.log(comp.smallestData);
  console.log(DataCompressor.decompressWithBSON(comp.smallestData).decompressedData);
}

test();
