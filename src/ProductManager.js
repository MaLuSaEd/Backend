import fs from 'fs'

const ruta = './files/Products.json';

function haveProduct(products, title ){
    let res = false;
    products.forEach(product => {
        if (product.title === title){
            res = true
        }
    })
    return res;
}


class ProductManager{
    
    constructor(path){     
        this.path = path; // products: [product,..., product]
    }

    // methods

    getProducts() {
        try {
            if (fs.existsSync(this.path)){
                const products = fs.readFileSync(this.path, 'utf-8');
                return JSON.parse(products);
            } else{
                const products = []
                return products;
            }
            
           
        } catch (error) {
            return [];
        }
    }

    addProduct(newProduct){

    if(!newProduct.title){
        console.log("Falta campo titulo")
        return
    } else if(!newProduct.description){
        console.log("Falta campo description")
        return
    } else if(!newProduct.code){
        console.log("Falta campo code")
        return
    }else if(!newProduct.price){
        console.log("Falta campo price")
        return
    }else if(!newProduct.stock){
        console.log("Falta campo stock")
        return
    }else if(!newProduct.category){
        console.log("Falta campo category")
        return
    }else if(!newProduct.thumbnails){
        newProduct.thumbnails = ""
    }

    let products = this.getProducts();
        
    if(products.length === 0){
        newProduct.id = 1;
        products.push(newProduct);
        fs.writeFileSync(this.path, JSON.stringify(products, null, '\t'));  
    }else{
        if (haveProduct(products,newProduct.title)){
            console.log('Producto repetido');
        } else {
            newProduct.id = products[products.length - 1].id + 1;
            products.push(newProduct);
            fs.writeFileSync(this.path, JSON.stringify(products, null, '\t'));   
        }
    }
    return newProduct;
    }

    getProductById(id){
        
        const products =  JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        let prod
        let encontrada = false;
        products.forEach(product => {
            if (product.id == id){
                prod = product;
                encontrada = true;
            }
        })

        if (encontrada) {
            console.log('Id encontrado')
            return prod
        }else{
            console.log('Id no encontrada');
        }
        
    }

    updateProduct(id, campo, nuevoValor){
        
        const campos = {"title":"","description":"","code": "","price": -1,"status":true,"stock": -1,"category":""};


        if (campo in campos){
            const products =  JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            let index;
            let encontrada = false;
            products.forEach((product, i) => {
                if (product.id == id){
                    index = i;
                    encontrada = true;
                }
            })

            if(encontrada){
                products[index][campo] = nuevoValor;

                fs.unlinkSync(this.path);

                fs.writeFileSync(this.path, JSON.stringify(products, null, '\t')); 

                console.log('Campo actualizado');
                
            }else{
                console.log('Id no encontrada');
            }
        }else{
            console.log('Campo no encontrado');
        }

    }

    deleteProduct(id){

        const products =  JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        let index;
        let encontrada = false;
        products.forEach((product, i) => {
            if (product.id == id){
                index = i;
                encontrada = true;
            }
        })

        if (encontrada) {
            products.splice(index,1);
            fs.unlinkSync(this.path);
            fs.writeFileSync(this.path, JSON.stringify(products, null, '\t')); 
            console.log('Producto Borrado');
            
        }else{
            console.log('Id no encontrada');
        }

    }
}

export default ProductManager;