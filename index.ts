import EventEmitter from "events"
import * as fs from 'fs';
import axios from 'axios';

const ev = new EventEmitter()
class ImageService {
  async download(url: string, path: string) {
    const response = await axios.get(url, { responseType: 'stream' });
    response.data.pipe(fs.createWriteStream(path));

    return new Promise<void>((resolve, reject) => {
      response.data.on('end', () => {
        resolve();
        // console.log('test')
        ev.emit('saySomething')
      });

      response.data.on('error', (err) => {
        reject(err);
      });
    });
  }
}

const imageService = new ImageService();


let imgUrl = "http://dispan.nuvemdatacom.com.br:9740/mge/Produto@IMAGEM@CODPROD=23.dbimage";


let lista = 4;

for (let index = 0; index < lista; index++) {
  imageService.download(imgUrl, './public/img2.jpg')
}


ev.on('saySomething', () => {
  console.log("Baixou...")
})





