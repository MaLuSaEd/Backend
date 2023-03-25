import fs from 'fs'


const ruta = './files/Carts.json';

class CartManager{
    
    constructor(path){     
        this.path = path; // products: [product,..., product]
    }

    // methods

    getCarts() {
        try {
            if (fs.existsSync(this.path)){
                const carts = fs.readFileSync(this.path, 'utf-8');
                return JSON.parse(carts);
            } else{
                const carts = []
                return carts;
            }
            
           
        } catch (error) {
            return [];
        }
    }

    addCart(){
    
    let newCart = {products:[]}
    let carts = this.getCarts();
        
    if(carts.length === 0){
        newCart.id = 1;
        carts.push(newCart);
        fs.writeFileSync(this.path, JSON.stringify(carts, null, '\t'));  
    }else{ 
        newCart.id = carts[carts.length - 1].id + 1;
        carts.push(newCart);
        fs.writeFileSync(this.path, JSON.stringify(carts, null, '\t'));   
    }
    return newCart;
    }

    getCartById(id){
        
        const carts =  JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        let car;
        let encontrada = false;
        carts.forEach(cart => {
            if (cart.id == id){
                car = cart;
                encontrada = true;
            }
        })

        if (encontrada) {
            console.log('Id encontrada')
            return car
        }else{
            console.log('Id no encontrada');
            return carts
        }
        
    }

    addProductToCart(cid, pid){
        
        const carts =  JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        let car;
        let carro_encontrado = false;
        let producto_encontrado = false;
        carts.forEach(cart => {
            if (cart.id == cid){
                carro_encontrado = true;
                cart.products.forEach(product =>{
                    if(product.id == pid){
                        producto_encontrado = true;
                        product.quantity += 1;
                    }
                })
                if(!producto_encontrado){
                    cart.products.push({id: pid, quantity:1})
                }
                car = cart;
            }
        })

        if (carro_encontrado) {
            console.log('Producto Agregado')
            fs.unlinkSync(this.path);
            fs.writeFileSync(this.path, JSON.stringify(carts, null, '\t'));
            return car
        }else{
            console.log('Carro no encontrado');
            return carts
        }

    }

}

export default CartManager;