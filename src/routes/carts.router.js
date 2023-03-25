import { Router } from "express";
import CartsManager from "../CartsManager.js";


const ruta = './src/files/Carts.json';
let cm = new CartsManager(ruta);

const cartsRouter = Router();

// GET http://localhost:xxxx /api/carts/:cid

cartsRouter.get('/:cid', (req,res) => {
    
    const {cid} = req.params;
    const arrayCarts = cm.getCarts();
    const cart = arrayCarts.find(cart => cart.id == cid);
    
    if(!cart) return res.status(400).send('No se encontro el carrito`')

    res.status(200).json({
        status:'succes',
        Products : cart.products
    })
});

// POST http://localhost:xxxx /api/carts/
cartsRouter.post('/', (req,res)=>{                     
    cm.addCart();
    const arrayCarts = cm.getCarts();
    return res.json({
        arrayCarts,
    })
})

// POST http://localhost:xxxx /api/carts/:cid/product/:pid
cartsRouter.post('/:cid/product/:pid', (req,res)=>{  
    const {cid, pid} = req.params;                   
    cm.addProductToCart(cid, pid);
    const cart = cm.getCartById(cid);
    return res.json({
        cart,
    })
})


export default cartsRouter;