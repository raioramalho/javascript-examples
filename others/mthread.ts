import { execFileSync, execSync } from "child_process"
import { cpus } from "os"
import {
  Worker
} from 'node:worker_threads'
import { resolve } from "path"

function getCurrentThCount() {
  return parseInt(execSync(`ps -M ${process.pid} | wc -l`).toString())
}

function creatTh() {
  const worker = new Worker('./thread.ts')
  const p = new Promise((resolve) => {
    worker.once('message', (message) => {
      return resolve(message)
    })
  })

  worker.postMessage('ok')
  return p;
}

const noddef = getCurrentThCount() - 1
console.log(
  `Im runn at ${process.pid}, def th: ${noddef}`
)

// const intervalId = setInterval(() => {
//   const currTh = getCurrentThCount() - noddef
//   console.log(currTh)
// })


// for (let i = 0; i < 1e20; i++);


async function show() {
  const data: any = await creatTh()
  return data?.id;
}

const info = show()

console.log(info)

