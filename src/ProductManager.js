import fs from 'fs'

//const fs = require('fs');
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
        
        const campos = {'title' : 1, 'description' : 1, 'price' : 1, 'thumbnail' : 1, 'code' :1, 'stock':1};


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
                products[index].campo = nuevoValor;

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


let p1 = {
        title: "producto prueba",
        description: "Este es un producto prueba",
        price:200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock:25
}


let p2 = {
    title: "producto prueba 2",
    description: "Este es un producto prueba 2",
    price:2000,
    thumbnail: "Sin imagen",
    code: "abc1234",
    stock:2
}

let p3 = {
    title: "producto prueba 3",
    description: "Este es un producto prueba",
    price:20,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock:254
}


let p4 = {
title: "producto prueba 4",
description: "Este es un producto prueba 4",
price:2,
thumbnail: "Sin imagen",
code: "abc34",
stock:1
}

let p5 = {
    title: "producto prueba 5",
    description: "Este es un producto prueba 5",
    price:23,
    thumbnail: "Sin imagen",
    code: "hola",
    stock:2
}


let p6 = {
title: "producto prueba 6",
description: "Este es un producto prueba 6",
price:2000,
thumbnail: "Sin imagen",
code: "abc6",
stock:6
}


let pm = new ProductManager(ruta);



// pm.getProducts();

//  pm.addProduct(p1);

//pm.addProduct(p1);

//  pm.addProduct(p2);
// 
//  pm.addProduct(p3);
//  pm.addProduct(p4);
//  pm.addProduct(p5);
//  pm.addProduct(p6);

// pm.getProducts();

// pm.getProductById(3);

// pm.updateProduct(1,'stock',26);

// pm.deleteProduct(2);

// pm.deleteProduct(10);

// pm.deleteProduct(1);

// console.log(pm.getProducts());






