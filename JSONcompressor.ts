import { deflate, inflate } from "pako";

export class JSONCompressor {
  // Método para compactar um objeto JSON em uma string compactada e retornar o tempo em milissegundos
  static compress(jsonObj: object): { compressedData: string; timeTaken: number } {
    try {
      const startTime = Date.now();
      const jsonString = JSON.stringify(jsonObj);
      const compressed = deflate(jsonString, { to: "string" });
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      return { compressedData: compressed, timeTaken };
    } catch (error) {
      throw new Error(`Erro ao compactar JSON: ${error.message}`);
    }
  }

  // Método para descompactar uma string compactada em um objeto JSON e retornar o tempo em milissegundos
  static decompress(compressedString: string): { decompressedData: object; timeTaken: number } {
    try {
      const startTime = Date.now();
      const decompressed = inflate(compressedString, { to: "string" });
      const jsonObject = JSON.parse(decompressed);
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      return { decompressedData: jsonObject, timeTaken };
    } catch (error) {
      throw new Error(`Erro ao descompactar JSON: ${error.message}`);
    }
  }
}

// Exemplo de uso:

const originalData = { nome: "Exemplo", idade: 30, cidade: "Exemploville" };

// Compactar JSON e obter o tempo
const { compressedData, timeTaken: compressTime } = JSONCompressor.compress(originalData);
console.log("JSON Compactado:", compressedData);
console.log("Tempo de Compactação (ms):", compressTime);

// Descompactar JSON e obter o tempo
const { decompressedData, timeTaken: decompressTime } = JSONCompressor.decompress(compressedData);
console.log("JSON Descompactado:", decompressedData);
console.log("Tempo de Descompactação (ms):", decompressTime);
