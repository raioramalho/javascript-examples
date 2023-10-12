import axios from "axios";
import path from "path";
import fs from "fs";
import ImageService, { DownloadService } from "./imageDownloader";

const main = async () => {
  const imagens = [
    {
      src: "https://i.pinimg.com/564x/e0/c6/15/e0c6153b97b60a9ccb082b9768b27816.jpg",
      name: "imagem-1.jpg",
      exist: false,
    },
    {
      src: "https://i.pinimg.com/564x/1e/9b/62/1e9b62eabbe03711ae0d18eb4889a921.jpg",
      name: "imagem-2.jpg",
      exist: false,
    }
  ];


  const service = new ImageService();

  let downloaded: any[] = [];

  for (const image of imagens) {
    console.log(`Iniciando download da imagem: ${image.name}`);

    const down = await service.baixarImagem(image.src, 'public', image.name);

    if (down) {
      downloaded.push(image.name, image.exist)
    }

    const find = await service.findImage('public', image.name);

    image.exist = true;
    if (find) {
      downloaded.push(image.name, image.exist);
    }

  }

  console.log({ status: downloaded });

}

console.log("Starting..")
main();
