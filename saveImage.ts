import { Prisma, PrismaClient, Produto } from "@prisma/client";
import { createWriteStream } from 'fs';


console.clear();

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
})
prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
});


function determineFileExtension(firstBytes) {
    // Implemente sua lógica para determinar a extensão com base nos primeiros bytes
    const hexBytes = firstBytes.toString('hex');

    if (hexBytes.startsWith('89504e47')) {
        return 'png';
    } else if (hexBytes.startsWith('ffd8ff')) {
        return 'jpg';
    } else if (hexBytes.startsWith('47494638')) {
        return 'gif';
    } else {
        // Adicione mais verificações conforme necessário
        return 'bin'; // Extensão padrão se não for reconhecido
    }
}

function saveBase64Image(base64String, outputPath) {
    return new Promise(async (resolve, reject) => {
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
        const binaryBuffer = Buffer.from(base64Data, 'base64');

        // Determina a extensão com base nos primeiros bytes do Buffer
        const extensaoDoArquivo = determineFileExtension(binaryBuffer.slice(0, 4));
        const caminhoComExtensao = `${outputPath}.${extensaoDoArquivo}`;

        const writeStream = await createWriteStream(caminhoComExtensao);

        writeStream.on('error', (error) => {
            reject(error);
        });

        writeStream.on('finish', () => {
            resolve(caminhoComExtensao);
        });

        writeStream.write(binaryBuffer);
      writeStream.end();
      console.log(extensaoDoArquivo);


    });
}


const main = async () => {
  console.log("starting..");

  const base64 = `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`;

  const save = await saveBase64Image(base64, 'public/teste');
  console.log(`A imagem foi salva!:`, save)







};



main();
