import {Redis} from '@upstash/redis';
import { Kafka, logLevel } from 'kafkajs';


const kafka = new Kafka({
  brokers: ['relative-loon-9012-us1-kafka.upstash.io:9092'],
  ssl: true,
  sasl: {
      mechanism: 'scram-sha-256',
      username: 'cmVsYXRpdmUtbG9vbi05MDEyJKBqsCD42Kp5e7trq-jTRmClQ4fsGbw9Bn8V7kg',
      password: 'ZDE4MTI3NmItYzM3ZC00YjA2LThiN2YtNzkxOTdmN2ZhMzA1'
  },
  logLevel: logLevel.ERROR,
});

const producer = kafka.producer();

async function main() {
  console.clear();
  console.log("Starting... index2.ts");
  
  
  const run = async () => {
    await producer.connect();
  
    await producer.send({
        topic: 'init-topic',
        messages: [
        { value: 'Hello Kafka!' },
        ],
    });
  
    console.log("Message sent successfully");
    await producer.disconnect();
  };

  run().catch(e => console.error('[example/producer] e.message', e));

}

main();
