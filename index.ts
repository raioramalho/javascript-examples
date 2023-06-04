import fetch from 'node-fetch';
import * as fs from 'fs';
class ImageService {
  async download(url: string, path: string) {
    fetch(url)
      .then(async (response: any) => {
        const dest = fs.createWriteStream(path);
        await response.body.pipe(dest);

        dest.on('finish', () => {
          console.log('Download concluído!');
          return true;
        });

        dest.on('error', (err) => {
          console.error(`Ocorreu um erro durante o download: ${err.message}`);
          return false;
        });
      })
      .catch(error => {
        console.error(`Ocorreu um erro durante a solicitação: ${error.message}`);
        return false;
      });
  }
}

const imageService = new ImageService();

let imgUrl = "https://images.unsplash.com/photo-1662010021854-e67c538ea7a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2427&q=80";


const test = imageService.download(imgUrl, './public/img.jpg');

if (!test) {
  console.log('not ok');
} else {
  console.log('ok!')
}
