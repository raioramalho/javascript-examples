import { pipeline, Readable, Writable } from "stream";
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

const readbleStream = new Readable({
  read: function () {
    this.push('Hello Streams!! - 1');
    this.push('Hello Streams!! - 2');

    this.push(null);
  }
})

const writeStream = new Writable({
  write(chunk, enc, cb) {
    console.log('msg:', chunk)
    console.log('msg:', chunk.toString())

    cb()
  }
})

await pipelineAsync(
  readbleStream,
  writeStream
)


console.log('process 01 fin')


