import axios from 'axios';
import {
  Transform, Writable
} from 'stream';

const url = 'http://localhost:3000';
const chunkedData = []

async function consume() {
  const response = await axios({
    url,
    method: 'get',
    responseType: 'stream',
  });

  return response.data;
}

const stream = await consume()

stream.pipe(
  new Transform({
    transform(
      chunk,
      enc,
      cb
    ) {
      const item = JSON.parse(chunk);
      console.log(item)
      chunkedData.push(item)
      cb(null, JSON.stringify(item))
    }
  })
).pipe(
  new Writable({
    write(chunk, enc, cb) {
      console.log('Chegou aqui!', chunk.toString());
      console.log(chunkedData);
      cb()
    }
  })
)
