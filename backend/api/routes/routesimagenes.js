const { req, res } = require("express")
const multer = require('multer')

global.path = require ('path')



app.post("/Subir/:name", function (req, res) {
    console.log(req.params)
    var post = {
        ruta:'/../../files'
    }
    var upload = multer({
        storage: multer.diskStorage({
            destination:function(req,file,callback){
            callback(null,__dirname + post.ruta)
            },
            filename: function(req,file,callback){
                console.log(file)
                var ext = path.extname(file.originalname)
                callback(null,'prueba' + ext)
            } 

        }),
        fileFilter: function(req, file, callback){
            var ext = path.extname(file.originalname)
            
            console.log(ext)
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== 'tif' ){
                return callback({state:false, mensaje:"Solo soporta imagenes"},null)
            }
                callback(null, true)
        }
    }).single('userfile')

    upload(req,res,function(err){
        if(err){
            console.log(err)
            res.json(err)
        }else{
            console.log('ok')
            res.json({state:true,mensaje:"archivo cargado"})
        }
    })
})


app.post("/fotoperfil/:name", function (req, res) {
    console.log(req.params)
    var post = {
        ruta:'/../../fotos'
    }
    var upload = multer({
        storage: multer.diskStorage({
            destination:function(req,file,callback){
            callback(null,__dirname + post.ruta)
            },
            filename: function(req,file,callback){
                console.log(file)
                var ext = path.extname(file.originalname)
                callback(null,'prueba' + ext)
            } 

        }),
        fileFilter: function(req, file, callback){
            var ext = path.extname(file.originalname)
            
            console.log(ext)
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== 'tif' ){
                return callback({state:false, mensaje:"Solo soporta imagenes"},null)
            }
                callback(null, true)
        }
    }).single('userfile')

    upload(req,res,function(err){
        if(err){
            console.log(err)
            res.json(err)
        }else{
            console.log('ok')
            res.json({state:true,mensaje:"archivo cargado"})
        }
    })
})

app.post("/imagenproductos/:name", function (req, res) {
    console.log(req.params)
    var post = {
        ruta:'/../../productos'
    }
    var upload = multer({
        storage: multer.diskStorage({
            destination:function(req,file,callback){
            callback(null,__dirname + post.ruta)
            },
            filename: function(req,file,callback){
                console.log(file)
                var ext = path.extname(file.originalname)
                callback(null,req.params.name + ext)
            } 

        }),
        fileFilter: function(req, file, callback){
            var ext = path.extname(file.originalname)
            
            console.log(ext)
            if(ext !== '.png'){
                return callback({state:false, mensaje:"Solo soporta imagenes .png"},null)
            }
                callback(null, true)
        }
    }).single('userfile')

    upload(req,res,function(err){
        if(err){
            console.log(err)
            res.json(err)
        }else{
            console.log('ok')
            res.json({state:true,mensaje:"archivo cargado"})
        }
    })
})
