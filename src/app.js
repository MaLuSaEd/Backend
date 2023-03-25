import  express from 'express';
import ProductManager from './ProductManager.js'
import productsRouter from './routes/products.router.js';
import __dirname from './utils/utils.js';
import path from 'path';



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const ruta = path.dirname(__dirname) + '/files/Products.json';
let pm = new ProductManager(ruta);

console.log(__dirname)

app.use('/static', express.static(path.dirname(__dirname) + '/public')) // Defino (prefijo virtual) carpeta estatica y publica


app.use('/api/products', productsRouter) // endpoint products

app.use('/api/carts', cartsRouter); //endpoint carrito


app.use((err,req,res,next) => {         // No estoy usando el next asi que este middlewar
    console.log(err);                   //  va a cortar por que hay un error
   res.status(500).send('Todo mal')
})


const port = 8080;
app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ' + port)
})