var ModelUsuarios = {}
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var UsuariosSchema = new Schema({
    Rol:Number,
    Cedula:{
        type: Number,
        unique: true,
        require: true
    },
    Name: {
        type: String,
        require: true
    },
    LastName: String,
    Email:{
        type: String,
        unique: true,
        require: true
    },
    Password: String,
    Age: Number | null,
    Phone: Number | null,
    Address: String,
    Estado:Number,
    Codigo:String,
    Credicards:{type: mongoose.Schema.Types.ObjectId, ref: 'CreditCard'},
})

const MyModel = mongoose.model('Users', UsuariosSchema)

/**************************************************************/
/******************           CREATE         ******************/
ModelUsuarios.Save = function (post, callback) {
    MyModel.find({Email:post.Email.toLowerCase()}, {}, (error, documentos) => {
        if (documentos.length > 0) {
            return callback({ state: false, data: error })
        }
        MyModel.find({ Cedula: post.Cedula }, {}, (error, documentos) => {
            if (documentos.length > 0) {
                return callback({ state: false, data: error })
            }
            else {
                const instancia = new MyModel
                instancia.Cedula = parseInt(post.Cedula)
                instancia.Name =  post.Name
                instancia.LastName= post.LastName,
                instancia.Email = post.Email.toLowerCase()
                instancia.Age= parseInt(post.Age),
                instancia.Phone= parseInt(post.Phone),
                instancia.Address= post.Address,
                instancia.Rol = post.Rol
                instancia.save((err,created) =>{
                    if(err){
                        return callback({state:false,data:err})
                    }
                    else{
                        return callback({state:true})
                    }
                })
            }

        })
    })
}


/******************           Register         ******************/
ModelUsuarios.Register = function (post, callback) {
    MyModel.find({Email:post.Email.toLowerCase()}, {}, (error, documentos) => {
        if (documentos.length > 0) {
            return callback({ state: false, data: error })
        }
        MyModel.find({ Cedula: post.Cedula }, {}, (error, documentos) => {
            if (documentos.length > 0) {
                return callback({ state: false, data: error })
            }
            else {
                const instancia = new MyModel
                instancia.Cedula = parseInt(post.Cedula)
                instancia.Name =  post.Name
                instancia.Email = post.Email.toLowerCase()
                instancia.Password = post.Password
                instancia.Rol = "2"
                instancia.Estado = "0"
                instancia.Codigo = post.Codigo
                instancia.save((err,created) =>{
                    if(err){
                        return callback({state:false,data:err})
                    }
                    else{
                        return callback({state:true})
                    }
                })
            }

        })
    })
}

/**************************************************************/
/******************           READ           ******************/
ModelUsuarios.Login = function (post, callback) {
    MyModel.find({Email:post.Email,Password:post.Password}, {Name:1, Rol:1}, (error, documentos) => {
        if (error) {
            return callback({ state: false, mensaje: error })
        }
        else {
            if (documentos.length == 0) {
                return callback({ state: false, mensaje:"Datos invalidos"})
            }
            else {
                return callback({ state: true, data:documentos})
            }
        }
    })
}

/*Listar todos los Usuarios*/
ModelUsuarios.LoadAllUsers = function (post, callback) {
    MyModel.find({}, {}, (error, documentos) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            return callback({ state: true, data: documentos })
        }
    })
}
/**********   Listar Usuarios por Id  **************/
ModelUsuarios.LoadById = function(post,callback) {
    MyModel.findById(post._id,{},(error, documentos) =>{
        if(error){
            return callback({state:false, data:error})
        }else{
            return callback({state:true, data:documentos})
        }
    })
}

/*Actualizar Usuarios por Id*/
ModelUsuarios.UpdateById = function(post, callback){
    MyModel.findByIdAndUpdate(post._id,{
        Rol: parseInt(post.Rol),
        Cedula: parseInt(post.Cedula),
        Name: post.Name,
        LastName: post.LastName,
        Email: post.Email.toLowerCase(),
        Age: parseInt(post.Age),
        Phone: parseInt(post.Phone),
        Address: post.Address,
    },(err,doc)=>{
        if (err) {
            console.log(err)
            return callback({ state: false, mensaje: err })
        }
        else {
            return callback({ state: true })
        }
    })
}

/***************************************************************/
/******************         DELETE            ******************/
ModelUsuarios.DeleteByDocument = function (post, callback) {
    MyModel.find({ Cedula: post.Cedula }, {}, (error, documentos) => {
        if (documentos.length == 0)
            return callback({ state: false, error })
        else {
            {

                MyModel.findOneAndDelete(post.Cedula, (error, eliminado) => {
                    if (error) {
                        return callback({ state: false, data: error })
                    }
                    else {
                        return callback({ state: true })
                    }
                })
            }
        }
    })
}

ModelUsuarios.DeleteById = function(post, callback){
    MyModel.findByIdAndDelete(post._id,(error, eliminado) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            return callback({ state: true })
        }
    })
}




/******************************************************************************************/
/************************Validacion de activacion por email *******************************/

ModelUsuarios.ValidarEstado = function(post,callback) {
    MyModel.find({Email:post.Email},{Estado:1},(error, documentos) =>{
        if(error){
            return callback({state:false, data:error})
        }else{
            return callback({state:true, data:documentos})
        }
    })
}


ModelUsuarios.Activar = function(post,callback) {
    MyModel.find({Email:post.Email, Codigo:post.Codigo},{Estado:1},(error, documentos) =>{
        if(error){
            return callback({state:false, data:error})
        }else{
            return callback({state:true, data:documentos})
        }
    
    })
}

ModelUsuarios.ActualizarEstado = function(post, callback){
    
    MyModel.findByIdAndUpdate(post.id,{
        Estado:1,
    },(error,doc)=>{
        if (error) {
            console.log(error)
            return callback({state: false, mensaje: error })
        }
        else {
            return callback({state: true })
        }
    })
}

module.exports.usuarios = ModelUsuarios