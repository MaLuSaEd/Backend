import { Router } from "express";
import uploader from '../utils/multer.js'

const userRouter = Router();


let users = []

const mid1 = (req , res, next) => {
    req.dato1 = 'dato 1';
    next();
}


// GET http://localhost:xxxx /api/usuarios/ 
userRouter.get('/', (req,res) => {

    res.send('get de usuarios') 
});


// POST http://localhost:xxxx/api/usuarios

userRouter.post('/', (req,res) => {
    const {name, last_name, email, phone} = req.body
    users.push({id:Date.now(), name,last_name, email, phone})
    return res.json({
        status : 'success',
        message : 'usuario agregado correctamente',
        users
    })

})



export default userRouter;