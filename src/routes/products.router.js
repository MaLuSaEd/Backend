import ProductManager from "../ProductManager.js";
import { Router } from "express";
import uploader from '../utils/multer.js'


const ruta = './src/files/Products.json';
let pm = new ProductManager(ruta);

const productsRouter = Router();

// GET http://localhost:xxxx /api/products/ 
productsRouter.get('/', (req,res) => {
    const {limit} = req.query;
    if (limit < 0) return res.status(400).send('Limite negativo') 
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
productsRouter.post('/', uploader.single('file'), (req,res)=>{                     // Active un middleware
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;
    pm.addProduct({title, description, code, price, status:true, stock, category, thumbnails});
    const arrayProducts = pm.getProducts();
    return res.json({
        arrayProducts,
    })
})

// PUT http://localhost:xxxx /api/products/:pid

productsRouter.put('/:pid', (req,res) => {
    
    const {pid} = req.params;
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;
    const arrayProducts = pm.getProducts();
    const product = arrayProducts.find(product => product.id == pid);
    if(!product){
        return res.status(400).send('No se encontro el producto`')
    }else{
        if(title){
            pm.updateProduct(pid, 'title', title)
        } else if (description){
            pm.updateProduct(pid, 'description', description)
        } else if (code){
            pm.updateProduct(pid, 'code', code)
        } else if (price){
            pm.updateProduct(pid, 'price', price)
        } else if (status){
            pm.updateProduct(pid, 'status', status)
        } else if (stock){
            pm.updateProduct(pid, 'stock', stock)
        } else if (category){
            pm.updateProduct(pid, 'category', category)
        } else if (thumbnails){
            pm.updateProduct(pid, 'thumbnails', title)
        }
        
    }

    res.status(200).json({
        status:'succes',
        producto : product
    })
});

productsRouter.delete('/:pid', (req,res) => {
    
    const {pid} = req.params;
    const arrayProducts = pm.getProducts();
    const product = arrayProducts.find(product => product.id == pid);
    if(!product){
        return res.status(400).send('No se encontro el producto`')
    }else{
        pm.deleteProduct(pid)
    }

    res.status(200).json({
        status:'succes',
        producto : pm.getProducts()
    })
});



export default productsRouter;