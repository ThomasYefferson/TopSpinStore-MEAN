var ModelProductos = {}
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var ProductosSchema = new Schema({
    Codigo: {
        type: String,
        unique: true,
        require: true
    },
    Nombre: {
        type: String,
        require: true
    },
    Cantidad: {
        type: Number,
        require: true
    },
    Precio: {
        type: Number,
        require: true
    },
    Categoria: String,
    Poster: String,
    FechaV: String,
    Descripcion: String,
    created_at: {
        type: Date,
        default: Date("<YYYY-mm-dd THH:MM:ss>")
    }
})

const MyModel = mongoose.model('Products', ProductosSchema)

/**************************************************************/
/******************           CREATE         ******************/

ModelProductos.Save = function (post, callback) {
    MyModel.find({ Codigo: post.Codigo }, {}, (error, doc) => {
        if (doc.length > 0) {
            return callback({ state: false, message: `The product code ${post.Codigo} has already been assigned.` })
        }
        else {
            MyModel.find({ Nombre: post.Nombre }, {}, (error, doc) => {
                if (doc.length > 0) {
                    return callback({ state: false, message: `The product name "${post.Nombre}" has already been assigned.` })
                } else {
                    const instancia = new MyModel
                    instancia.Codigo = post.Codigo
                    instancia.Nombre = post.Nombre
                    instancia.Cantidad = parseInt(post.Cantidad)
                    instancia.Precio = parseFloat(post.Precio)
                    instancia.Categoria = post.Categoria
                    instancia.Poster = post.Poster
                    instancia.Descripcion = post.Descripcion
                    instancia.save((err, created) => {
                        if (err) { return callback({ state: false, data: err }) }
                        else {
                            return callback({ state: true, message: `The product ${post.Codigo} was created successfully.` })
                        }
                    })
                }
            })
        }
    })
}

/**************************************************************/
/******************           READ           ******************/
ModelProductos.LoadAllProducts = function (post, callback) {
    MyModel.find({}, {}, (error, documentos) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            return callback({ state: true, data: documentos })
        }
    })
}

ModelProductos.LoadById = function (post, callback) {
    MyModel.findById(post.Id, {}, (error, documentos) => {
        if (error) {
            return callback({ state: false, data: error })
        } else {
            return callback({ state: true, data: documentos })
        }
    })
}

ModelProductos.LoadByCode = function (post, callback) {
    MyModel.find({ Codigo: post.Codigo }, {}, (error, documentos) => {
        if (documentos.length > 0) {
            if (error) {
                return callback({ state: false, data: error })
            }
            else {
                return callback({ state: true, data: documentos })
            }
        } else {
            return callback({ state: false })
        }
    })
}

/**************************************************************/
/******************        UPDATE            ******************/

ModelProductos.UpdateById = function (post, callback) {
    MyModel.findByIdAndUpdate(post._id, {
        Nombre: post.Nombre,
        Cantidad: parseInt(post.Cantidad),
        Precio: parseFloat(post.Precio),
        Categoria: post.Categoria,
        Color: post.Color,
        Poster: post.Poster,
        FechaV: post.FechaV,
        Descripcion: post.Descripcion
    }, (err, doc) => {
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
ModelProductos.DeleteById = function (post, callback) {
    MyModel.findByIdAndDelete(post._id, (error, eliminado) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            return callback({ state: true })
        }
    })
}

ModelProductos.DeleteByCode = function (post, callback) {
    MyModel.find({ Codigo: post.Codigo }, {}, (error, documentos) => {
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

module.exports.productos = ModelProductos