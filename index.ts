import * as fs from 'fs';
import sharp from 'sharp';


console.clear()

function main() {

  console.log('starting..')

  let path = 'capetinha.png';

  let exist = fs.existsSync(`./public/${path}`);

  if (exist) {
    console.log(`processando arquivo`)
    fs.mkdir(`./public/processado`, (res) => {
      console.log(res)
    });
    sharp(`./public/${path}`)
      .resize(1366, 768)
      .toFile(`./public/processado/${path}`, (err, info) => {
        if (info) {
          console.log(`Sucesss`)
          console.log(info)
        } else {
          console.log(err)
        }

      })

  } else {
    console.log(`arquivo nao encontrado`)
  }

}

main()
