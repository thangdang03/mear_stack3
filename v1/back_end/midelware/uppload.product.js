const multer = require("multer");
const path = require("path");
//Define storage and how to get files
var storage = multer.diskStorage({
    destination:(req,file,res)=>{
          console.log({})

        res(null,'upload/')
    },
    filename:(req,file,res)=>{
        let ext = path.extname(file.originalname);
        res(null,Date.now()+ext);
    }
})
//define onject multer
var uppload = multer({
    storage: storage,
    //filter img 
    fileFilter:(req,file,callback)=>{
         if(file.mimetype === 'image/png'||
            file.mimetype === 'image/jpg'   
        ){
            callback(null,true);
        }else{
            console.log("only jpg or png file supported");
            callback(null,false);
        }
    },
    limits:{
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = uppload;

