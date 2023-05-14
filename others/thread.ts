import {
  threadId,
  parentPort
} from 'node:worker_threads'



parentPort?.once(`message`, (meessae) => {

  console.log(`bench: ${threadId}`)

  return {
    id: 1,
    name: 'Alan'
  }
})
