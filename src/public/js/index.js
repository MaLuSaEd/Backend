console.log('Esta js de index.html')

const socket = io();

socket.emit('message', 'Hola soy mensaje del cliente')

socket.on('evento-para-socket-individual', data=>{
    console.log(data)
})