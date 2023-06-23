import * as fs from 'fs';
import axios from 'axios';

class ImageService {
  async baixarImagem(url: string, path: string, name: any): Promise<void> {
    try {

      await fs.rm(`${path}/${name}`, (resolve) => {

      })
      const response = await axios.get(url, { responseType: 'stream' });
      response.data.pipe(fs.createWriteStream(`${path}/${name}`));

      await new Promise<void>((resolve, reject) => {
        response.data.on('end', () => {
          resolve();
          console.log(`Baixou: ${name}`);
        });

        response.data.on('error', () => {
          // console.log(`Não Baixou: ${id}`);
          resolve();
        });
      });
    } catch (error) {
      console.log(`Não Baixou: ${name}`);
    }
  }

  buscaImagem = async (caminhoArquivo: string): Promise<boolean> => {
    try {
      await fs.accessSync(caminhoArquivo);
      return true;
    } catch (error) {
      return false;
    }
  };
}


const imageService = new ImageService();


const lista = [
  "https://apexensino.com.br/wp-content/uploads/2017/10/fronback.png",
  "https://blog.back4app.com/wp-content/uploads/2021/06/backend-vs-frontend-2.png",
  "http://apexensino.com.br/wp-content/uploads/2017/10/fronback.png",
  "https://www.gobacklog.com/wp-content/uploads/2020/05/Desenvolvimento-Back-End-Um-Guia-para-Empreendedores-Afinal-o-que-%C3%A9-Back-End-1-1024x536.jpg"
];

var novaLista = []

for (let index = 0; index < lista.length; index++) {
  await imageService.baixarImagem(lista[index], `./public/img${index}.jpg`, index);
  novaLista.push({src: `http://public/img${index}.jpg`});
}

console.log(novaLista);
