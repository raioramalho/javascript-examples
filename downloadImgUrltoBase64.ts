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

/*
Análise e pontuação do código:

Profissionalismo:
Estrutura e organização do código: 7/10
- O código está bem estruturado, mas há comentários desnecessários e código comentado.

Uso de interfaces e tipos: 6/10
- Há uma interface IDownloadedImage, mas não é utilizada no retorno da função download.

Tratamento de erros: 4/10
- O tratamento de erros está incompleto, com um catch vazio.

Comentários e documentação: 5/10
- Há alguns comentários úteis, mas também há comentários desnecessários e código comentado.

Agilidade/Performance:
Uso de async/await: 8/10
- O uso de async/await está correto e bem implementado.

Eficiência nas operações assíncronas: 7/10
- A operação assíncrona principal (axios.get) está bem implementada.

Implementação de cache: 0/10
- Não há implementação de cache para otimizar requisições repetidas.

Outras otimizações de performance: 5/10
- O código é relativamente eficiente, mas há espaço para melhorias, como tipagem mais precisa e melhor tratamento de erros.

Pontuação total: 42/80
*/
