import { Router } from "express";
const viewsRouter = Router();

const users = [
    {id : '1', name : 'nombre 1', last_name : 'apellido 1', genre: 'F'},
    {id : '2', name : 'nombre 2', last_name : 'apellido 2', genre: 'M'},
    {id : '3', name : 'nombre 3', last_name : 'apellido 3', genre: 'F'},
    {id : '4', name : 'nombre 4', last_name : 'apellido 4', genre: 'F'},
    {id : '5', name : 'nombre 5', last_name : 'apellido 5', genre: 'M'}
]

viewsRouter.get('/', (req,res) =>{
    res.render('chat', {})
})

viewsRouter.get('/usuarios', (req,res) => {
    let testUser = {
        name: 'Fede',
        last_name:'Osandon',
        role:'admin' 
    }
    res.render('index',{
      user: testUser,
      isAdmin: testUser.role === 'admin',
      users,
      style : 'index.css'
    }) 
})

viewsRouter.get('/register', (req,res) => {
    res.render('register', {})
})


export default viewsRouter;