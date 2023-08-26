import { BSON } from "bson";
import { deflate, inflate } from "pako";

export class DataCompressor {
  // Método para compactar dados com BSON e retornar o tempo em milissegundos
  static compressWithBSON(data: any): { compressedData: Uint8Array; timeTaken: number } {
    try {
      const startTime = Date.now();
      const serializedData = BSON.serialize(data);
      const compressedData = deflate(serializedData);
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      return { compressedData, timeTaken };
    } catch (error) {
      throw new Error(`Erro ao compactar com BSON: ${error.message}`);
    }
  }

  // Método para descompactar dados com BSON e retornar o tempo em milissegundos
  static decompressWithBSON(compressedData: Uint8Array): { decompressedData: any; timeTaken: number } {
    try {
      const startTime = Date.now();
      const decompressedData = inflate(compressedData);
      const deserializedData = BSON.deserialize(decompressedData);
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      return { decompressedData: deserializedData, timeTaken };
    } catch (error) {
      throw new Error(`Erro ao descompactar com BSON: ${error.message}`);
    }
  }

  // Método para compactar dados com JSON e retornar o tempo em milissegundos
  static compressWithJSON(data: any): { compressedData: Uint8Array; timeTaken: number } {
    try {
      const startTime = Date.now();
      const jsonString = JSON.stringify(data);
      const compressedData = deflate(jsonString, { to: "string" });
      const encodedData = new TextEncoder().encode(compressedData);
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      return { compressedData: encodedData, timeTaken };
    } catch (error) {
      throw new Error(`Erro ao compactar com JSON: ${error.message}`);
    }
  }

  // Método para descompactar dados com JSON e retornar o tempo em milissegundos
  static decompressWithJSON(compressedData: Uint8Array): { decompressedData: any; timeTaken: number } {
    try {
      const startTime = Date.now();
      const decodedData = new TextDecoder().decode(compressedData);
      const decompressedString = inflate(decodedData, { to: "string" });
      const deserializedData = JSON.parse(decompressedString);
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      return { decompressedData: deserializedData, timeTaken };
    } catch (error) {
      throw new Error(`Erro ao descompactar com JSON: ${error.message}`);
    }
  }

  static getSmallest(data: any): { smallestData: Uint8Array; format: string; timeTaken: number } {
    try {
      // Compactar com BSON e medir o tempo
      const { compressedData: compressedBSON, timeTaken: compressTimeBSON } = DataCompressor.compressWithBSON(data);

      // Compactar com JSON e medir o tempo
      const { compressedData: compressedJSON, timeTaken: compressTimeJSON } = DataCompressor.compressWithJSON(data);

      // Determinar o formato mais curto
      let smallestData: Uint8Array;
      let format: string;

      if (compressedBSON.byteLength < compressedJSON.byteLength) {
        smallestData = compressedBSON;
        format = "BSON";
      } else {
        smallestData = compressedJSON;
        format = "JSON";
      }

      return { smallestData, format, timeTaken: Math.min(compressTimeBSON, compressTimeJSON) };
    } catch (error) {
      throw new Error(`Erro ao determinar o formato mais curto: ${error.message}`);
    }
  }

  static decode(data: { BSONData?: Uint8Array; JSONData?: string }, format: string): any {
    try {
      if (format === "BSON" && data.BSONData) {
        const decodedData = BSON.deserialize(data.BSONData);
        return decodedData;
      } else if (format === "JSON" && data.JSONData) {
        const decodedData = JSON.parse(inflate(data.JSONData, { to: "string" }));
        return decodedData;
      } else {
        throw new Error("Formato de dados inválido ou ausente.");
      }
    } catch (error) {
      throw new Error(`Erro ao decodificar dados: ${error.message}`);
    }
  }

}

// Exemplo de uso:

// const originalData = { nome: "Exemplo", idade: 30, cidade: "Exemploville" };

// // Compactar com BSON e obter o tempo
// const { compressedData: compressedBSON, timeTaken: compressTimeBSON } = DataCompressor.compressWithBSON(originalData);
// console.log("BSON Compactado:", compressedBSON);
// console.log("Tempo de Compactação com BSON (ms):", compressTimeBSON);

// // Descompactar com BSON e obter o tempo
// const { decompressedData: decompressedBSON, timeTaken: decompressTimeBSON } = DataCompressor.decompressWithBSON(compressedBSON);
// console.log("BSON Descompactado:", decompressedBSON);
// console.log("Tempo de Descompactação com BSON (ms):", decompressTimeBSON);

// // Compactar com JSON e obter o tempo
// const { compressedData: compressedJSON, timeTaken: compressTimeJSON } = DataCompressor.compressWithJSON(originalData);
// console.log("JSON Compactado:", compressedJSON);
// console.log("Tempo de Compactação com JSON (ms):", compressTimeJSON);

// // Descompactar com JSON e obter o tempo
// const { decompressedData: decompressedJSON, timeTaken: decompressTimeJSON } = DataCompressor.decompressWithJSON(compressedJSON);
// console.log("JSON Descompactado:", decompressedJSON);
// console.log("Tempo de Descompactação com JSON (ms):", decompressTimeJSON);

// // Identificar a versão compactada mais curta e obter o tempo
// const { smallestData, format, timeTaken } = DataCompressor.getSmallest(originalData);
// console.log(`${format} Compactado (menor):`, smallestData);
// console.log(`Tempo de Compactação (ms) (${format}):`, timeTaken);

// // Decodificar os dados compactados
// const decodedData = DataCompressor.decode({ [format === "BSON" ? "BSONData" : "JSONData"]: smallestData }, format);
// console.log(`Dados Decodificados (${format}):`, decodedData);
