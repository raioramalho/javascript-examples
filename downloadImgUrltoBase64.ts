import axios from 'axios';

interface IDownloadedImage {
  tipo: string;
  base64: string;
}

// @Injectable()
export class ImageService {
//   private readonly logger: Logger;
  constructor() {
    // this.logger = new Logger(ImageService.name);
  }
  async download(imageUrl: string): Promise<any> {
    try {
      // Fazendo a requisição HTTP para obter a imagem

      if (imageUrl === '' || imageUrl == null) {
        return null;
      }

    //   this.logger.verbose(`Download image: ${imageUrl}`);
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });

      // Convertendo o buffer da imagem para base64
      const base64 = Buffer.from(response.data, 'binary').toString('base64');

      // Determinando o mime type da imagem
      const mimeType = response.headers['content-type'];

      // Retornando a imagem em formato data URL
    //   this.logger.verbose(`Sucesso!..`);
      return {
        tipo: `${mimeType}`,
        base64: `${base64}`,
      };
    } catch (error) {
    //   throw new HttpException(error.message, error.status);
    }
  }
}
