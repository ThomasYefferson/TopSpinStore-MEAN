var ModelMarket = {}
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var MarketSchema = new Schema({
    User_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users',
        require: true
    },
    Product_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Products',
        unique: true,
        require: true
    },
    Quantity: {
        type: Number,
        require: true
    }
})

const MyModel = mongoose.model('Market', MarketSchema)

/**************************************************************/
/******************           CREATE         ******************/
ModelMarket.AddMarket = function (post, callback) {
    MyModel.find({ User_id: post.User_id, Product_id: post.Product_id }, {}, (error, Data) => {
        if (Data.length > 0) {
            MyModel.findByIdAndUpdate(
                Data[0]._id, {
                Quantity: Data[0].Quantity+1
            }, (error, data) => {
                if (error) {
                    return callback({ state: false, message: error })
                } else {
                    return callback({ state: true, message: 'Unit added successfully' })
                }
            })
        }
        else {
            const instancia = new MyModel
            instancia.User_id = post.User_id
            instancia.Product_id = post.Product_id
            instancia.Quantity = 1
            instancia.save((err, created) => {
                if (err) {
                    console.log(post)
                    return callback({ state: false, message: error })
                }
                else {
                    return callback({ state: true, message: 'Product added successfully' })
                }
            })
        }
    })
}
/**************************************************************/
/******************           READ           ******************/
ModelMarket.LoadMyMarket = function (post, callback) {
    MyModel.aggregate([
        { $match: { User_id: mongoose.Types.ObjectId(post.User_id) } }, // User Filter
        {
            $lookup: {
                from: "products", // Products red
                localField: "Product_id", // Local field
                foreignField: "_id", // Destination field
                as: "Products", // Join nikname
            }
        },
        { $unwind: "$Products" }, // Object View
        {
            $project: {
                _id: 1,
                Product_id: 1,
                Quantity: 1,
                Products: { Codigo: 1, Nombre: 1, Precio: 1 , Cantidad: 1}
            }
        }
    ], (error, Datos) => {
        if (error) {
            return callback({ state: false, error: error })
        } else {
            return callback({ state: true, data: Datos })
        }
    })
}

/**************************************************************/
/******************        UPDATE            ******************/
ModelMarket.UpdateQuantity = function (post, callback) {
    MyModel.findByIdAndUpdate(post._id, {
        Quantity: post.Quantity
    }, (err, doc) => {
        if (err) {
            return callback({ state: false, mensaje: err })
        }
        else {
            return callback({ state: true, message: "Quantity upadate sucessfully" })
        }
    })
}

/***************************************************************/
/******************         DELETE            ******************/
ModelMarket.DeleteItem = function (post, callback) {
    MyModel.findByIdAndDelete(post._id, (error, eliminado) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            return callback({ state: true, message: 'Product has been removed satisfactorily' })
        }
    })
}


/******************     DELETE ONE ITEM         ******************/
ModelMarket.DeleteItem = function (post, callback) {
    MyModel.findByIdAndDelete(post._id, (error, eliminado) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            return callback({ state: true, message: 'Product has been removed satisfactorily' })
        }
    })
}

ModelMarket.SubMyMarket = function (post, callback) {
    MyModel.findById(_post_id, {}, (error, Data) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            if (Data.find(element => element.Quantity == 1)) {
                MyModel.findByIdAndDelete(post._id, (error, eliminado) => {
                    if (error) {
                        return callback({ state: false, data: error })}
                    else {
                        return callback({ state: true, message: 'Product has been removed satisfactorily' })}
                })
            }
            else {
                MyModel.findByIdAndUpdate(post._id, {
                    Quantity: Data[0].Quantity-1
                }, (err, doc) => {
                    if (err) {
                        return callback({ state: false, mensaje: err })}
                    else {
                        return callback({ state: true})}
                })
            }
        }
    })
}

ModelMarket.DeleteAllItems = function (post, callback) {
    MyModel.deleteMany({User_id: post.User_id},{}, (error, documentos) => {
        if (documentos.length == 0)
            return callback({ state: false, error })
        else {
            return callback({ state: true, message: 'Cart successfully deleted' })
        }
    })
}

module.exports.market = ModelMarket