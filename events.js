console.clear()

const { EventEmitter } = require('events')

const ev = new EventEmitter()

ev.on('saySomething', ()=>{
    console.log("Olá")
})


ev.emit('saySomething')
ev.emit('saySomething')
