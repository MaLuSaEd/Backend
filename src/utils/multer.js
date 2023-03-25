import multer from 'multer';
import __dirname from './utils.js';
import path from 'path';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.dirname(__dirname)+'/public/uploads')
        //cb(null, __dirname+'/public/uploads')
    } ,
    filename: function(req, file, cb){
        cb(null, file.originalname)
    },
});

const uploader = multer({storage})
export default uploader;


