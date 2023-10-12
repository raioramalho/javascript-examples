import * as fs from 'fs';
import axios from 'axios';

export default class ImageService {
  async baixarImagem(url: string, path: string, name: any): Promise<boolean| undefined> {
    try {

      fs.rm(`${path}/${name}`, (resolve) => {

      })
      const response = await axios.get(url, { responseType: 'stream' });
      response.data.pipe(fs.createWriteStream(`${path}/${name}`));

      let status = false;

      await new Promise((resolve: any, reject: any) => {
        response.data.on('end', () => {
          resolve();
          console.log(`Baixou: ${name}`);
          status = true;
        });

        response.data.on('error', () => {
          console.log(`Não Baixou: ${name}`);
          resolve();
          status = false;
        }, 200);
      });

      return status;

    } catch (error) {
      console.log(`Não Baixou: ${name}`);
    }
  }

  async findImage(path: string, name: string) {
    try {
      await fs.accessSync(`${path}/${name}`);
      return true;
    } catch (error) {
      return false;
    }
  }

}
