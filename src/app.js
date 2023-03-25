import  express from 'express';
import ProductManager from './ProductManager.js'
import productsRouter from './routes/products.router.js';
import userRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils/utils.js';
import path from 'path';



const app = express();

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


const port = 8080;
app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ' + port)
})