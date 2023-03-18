import  express from 'express';
import ProductManager from './ProductManager.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const ruta = './files/Products.json';
let pm = new ProductManager(ruta);

app.get('/products', (req,res) => {
    const {limit} = req.query;

    if (limit < 0) return res.status(400).send('Limit negativo') 

    const arrayProducts = pm.getProducts().slice(0,limit)
    res.status(200).json({
        status:'succes',
        payload : arrayProducts
    })
});


app.get('/products/:pid', (req,res) => {
    
    const {pid} = req.params;
    const arrayProducts = pm.getProducts();
    const product = arrayProducts.find(product => product.id == pid);
    
    if(!product) return res.status(400).send('No se encontro el producto`')

    res.status(200).json({
        status:'succes',
        producto : product
    })
});





const port = 8080;
app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ' + port)
})