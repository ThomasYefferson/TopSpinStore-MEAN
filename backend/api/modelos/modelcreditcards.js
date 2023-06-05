var ModelCreditCards = {}
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var CreditCardsSchema = new Schema({
    User_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Users',
        require: true
    },
    Cedula: Number,
    Name:String,
    CardNumber:{
        type:Number,
        require: true,
    },
    CSV:{
        type:Number,
        require: true,
    },
    ExpDate:{
        type:String,
        require: true,
    },
    Email:String,
    Phone:Number,
})

const MyModel = mongoose.model('CreditCards', CreditCardsSchema)

/**************************************************************/
/******************           CREATE         ******************/
ModelCreditCards.Save = function (post, callback) {
    MyModel.find({CardNumber:post.CardNumber}, {}, (error, Data) => {
        if (Data.length > 0) {
            if(Data.length>=3){
                return callback({ state: false, message:`The credit card number ${post.CardNumber} has been previously registered.` })
            }
            else if (Data.filter( element => element.User_id == post.User_id).length > 0) {
                return callback({ state: false, message:`The credit card number ${post.CardNumber} has been previously registered.` })
            }else{
                MyModel.find({ Cedula: post.Cedula }, {}, (error, documentos) => {
                    if (documentos.length > 0) {
                        return callback({ state: false, data: error })
                    }
                    else {
                        const instancia = new MyModel
                        instancia.User_id = post.User_id
                        instancia.Cedula= post.Cedula
                        instancia.Name= post.Name
                        instancia.CardNumber= post.CardNumber
                        instancia.CVV= post.CVV
                        instancia.ExpDate= post.ExpDate
                        instancia.Email= post.Email
                        instancia.Phone= post.Phone
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
            }
        }
    })
}

/**************************************************************/
/******************           READ           ******************/
/**********   Listar CreditCards por Id  **************/
ModelCreditCards.LoadById = function(post,callback) {
    MyModel.findById(post._id,{},(error, documentos) =>{
        if(error){
            return callback({state:false, data:error})
        }else{
            return callback({state:true, data:documentos})
        }
    })
}

/*Actualizar CreditCards por Id*/
ModelCreditCards.UpdateById = function(post, callback){
    console.log(post.Age)
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

ModelCreditCards.DeleteById = function(post, callback){
    MyModel.findByIdAndDelete(post._id,(error, eliminado) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            return callback({ state: true })
        }
    })
}

module.exports.creditcards = ModelCreditCards