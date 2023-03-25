import ProductManager from "../ProductManager.js";
import { Router } from "express";
import uploader from '../utils/multer.js'


const ruta = './src/files/Products.json';
let pm = new ProductManager(ruta);

const productsRouter = Router();

const mid1 = (req , res, next) => {
    req.dato1 = 'dato 1';
    next();
}


// GET http://localhost:xxxx /api/products/ 
productsRouter.get('/', (req,res) => {
    const {limit} = req.query;
    if (limit < 0) return res.status(400).send('Limit negativo') 
    const arrayProducts = pm.getProducts().slice(0,limit)
    res.status(200).json({
        status:'succes',
        payload : arrayProducts
    })
});


// GET http://localhost:xxxx /api/products/:pid

productsRouter.get('/:pid', (req,res) => {
    
    const {pid} = req.params;
    const arrayProducts = pm.getProducts();
    const product = arrayProducts.find(product => product.id == pid);
    
    if(!product) return res.status(400).send('No se encontro el producto`')

    res.status(200).json({
        status:'succes',
        producto : product
    })
});


// POST http://localhost:xxxx /api/products/
productsRouter.post('/', uploader.single('file'), (req,res)=>{                     // Acive un middleware
    const {title, description, price, thumbnail, code, stock} = req.body;
    pm.addProduct({title, description, price, thumbnail, code, stock});
    const arrayProducts = pm.getProducts();
    return res.json({
        arrayProducts,
        dato1 :req.dato1    // borrar
    })
})



export default productsRouter;