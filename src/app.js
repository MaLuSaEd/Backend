import  express from 'express';
import ProductManager from './ProductManager.js'
import productsRouter from './routes/products.router.js';
import userRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils/utils.js';
import path from 'path';
import { Server } from 'socket.io'; // Este import es nuevo, este server se creara a partir del server HTTP

const app = express();
const port = 8080;
const httpServer = app.listen(port, ()=>{
    console.log('Servidor escuchando en el puerto ' + port)
})

//instanciando un socket server
const socketServer = new Server(httpServer);

socketServer.on('connection', socket =>{
    console.log('Nuevo Cliente conectado')

    socket.on('', dataCliente => {
        console.log(dataCliente)
    })

    socket.emit('evento-para-scoket-individual','Este mensaje solo lo deberecibir el socket')
    socket.broadcast.emit('evento-para-todos-menos-para-el-socket-actual', 'Este evento lo veran todos los socket conectados, menos el actual ')
    socketServer.emit('evento-para-todos', 'Este lo reciben todos los socket')
})

// habdelbars config --------------------------------------------------------

import handlebars from 'express-handlebars';
import cartsRouter from './routes/carts.router.js';
app.engine('handlebars', handlebars.engine());
app.set('views', path.dirname(__dirname) + '/views');
app.set('view engine', 'handlebars');

// habdelbars config --------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const ruta = path.dirname(__dirname) + '/files/Products.json';
let pm = new ProductManager(ruta);

console.log(__dirname)

app.use('/static', express.static(path.dirname(__dirname) + '/public')) // Defino (prefijo virtual) carpeta estatica y publica

app.use((req,res,next) => {
    console.log('Time', Date.now())
    next() // Para que avance
})

app.use('/api/products', productsRouter) // endpoint products


app.use('/api/usuarios', userRouter) // endpoint products

app.use('/api/carts', cartsRouter); //endpoint carrito

app.use('/views', viewsRouter);     //endpoint views


app.use((err,req,res,next) => {         // No estoy usando el next asi que este middlewar
    console.log(err);                   //  va a cortar por que hay un error
   res.status(500).send('Todo mal')
})


