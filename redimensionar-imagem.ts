import * as fs from 'fs';
import sharp from 'sharp';

console.clear();

function main() {
  console.log('starting..');

  let path = 'capetinha.png';

  let exist = fs.existsSync(`./public/${path}`);

  if (exist) {
    console.log(`processando arquivo`);
    fs.mkdir(`./public/processado`, (res) => {
      console.log(res);
    });
    sharp(`./public/${path}`)
      .resize(1366, 768)
      .toFile(`./public/processado/${path}`, (err, info) => {
        if (info) {
          console.log(`Sucesss`);
          console.log(info);
        } else {
          console.log(err);
        }
      });
  } else {
    console.log(`arquivo nao encontrado`);
  }
}

main();

/*
Análise do código:

Profissionalismo:
Estrutura e organização do código: 5/10
- O código tem uma estrutura básica, mas pode ser melhorado.
- Falta modularização e separação de responsabilidades.

Uso de interfaces e tipos: 0/10
- Não há uso de interfaces ou tipos TypeScript.

Tratamento de erros: 3/10
- Há um tratamento básico de erros, mas pode ser melhorado.
- Falta um tratamento mais robusto e específico para diferentes tipos de erros.

Comentários e documentação: 0/10
- Não há comentários ou documentação no código.

Agilidade/Performance:
Uso de async/await: 0/10
- Não há uso de async/await, o que poderia melhorar a legibilidade e o tratamento de operações assíncronas.

Eficiência nas operações assíncronas: 5/10
- As operações assíncronas são utilizadas, mas poderiam ser otimizadas.

Implementação de cache: 0/10
- Não há implementação de cache.

Outras otimizações de performance: 3/10
- O código realiza operações básicas, mas há espaço para otimizações, como processamento em lote ou paralelização.

Pontuação total: 16/80
*/
