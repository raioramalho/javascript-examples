import { randomUUID } from 'crypto';
import http from 'http';
import { Readable } from 'stream';

//sim

function* run() {
  for (let index = 0; index <= 5; index++) {
    const data = (name: string) => {
      return {
        id: randomUUID(),
        name: `${name}-${index}`,
      }
    };
    yield data;
  }
}

async function handle(request, response) {
  const readble = new Readable({
    read() {
      for (const data of run()) {
        console.log(`sending: ${data(`Ramalho`).id}`)
        this.push(JSON.stringify(data(`Ramalho`)));
      }
      //para informar que os dados acabaram
      this.push(null);
    }
  });

  readble.pipe(response);

}

http.createServer(handle)
  .listen(3000)
  .on(
    'listening',
    () => {
      console.log(
        '@ - Running at [ http://localhost:3000 ] '
      );
    }
  );
