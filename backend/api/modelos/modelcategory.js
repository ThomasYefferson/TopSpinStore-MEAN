var ModelCategory = {}
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


var CategorySchema = new Schema({
    Code: {
        type: Number,
        unique: true,
        require: true
    },
    Name: {
        type: String,
        unique: true,
        require: true
    }
})

const MyModel = mongoose.model('Category', CategorySchema)

/**************************************************************/
/******************           CREATE         ******************/
ModelCategory.Save = function (post, callback) {
    MyModel.find({ Code: post.Code }, {}, (error, documentos) => {
        if (documentos.length > 0) {
            return callback({ state: false, message: "The code already exists", data: error })
        }
        MyModel.find({ Name: post.Name }, {}, (error, documentos) => {
            if (documentos.length > 0) {
                return callback({ state: false, message: `The ${post.Name} category already exists`, data: error })
            }
            else {
                const instancia = new MyModel
                instancia.Code = parseInt(post.Code)
                instancia.Name = post.Name
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
/******************  Listar Category por Id  ******************/
ModelCategory.LoadById = function (post, callback) {
    MyModel.findById(post._id, {}, (error, documentos) => {
        if (error) {
            return callback({ state: false, data: error })
        } else {
            return callback({ state: true, data: documentos })
        }
    })
}

ModelCategory.LoadAllCategory = function (post, callback) {
    MyModel.find({}, {}, (error, documentos) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            return callback({ state: true, data: documentos })
        }
    })
}

/***************************************************************/
/******************        UPDATE             ******************/
/******************  Update Category por Id   ******************/

ModelCategory.UpdateById = function (post, callback) {
    MyModel.find({ Name: post.Name }, {}, (error, document) => {
        if (error) {
            console.log("Error Name")
            return callback({ state: false, error})
        }
        else {
            if (document.length > 0) {
                return callback({ state: false, message: `The ${post.Name} category already exists`})
            }
            else{
                MyModel.findByIdAndUpdate(post._id,{Name: post.Name.trim()},
                (error, categoryupdate) => {
                if (error) {
                    return callback({ state: false, message: error})
                }
                else {
                    return callback({ state: true, message: `Category updated successfully` })
                }
            })           
        }}
    })
}
/***************************************************************/
/******************         DELETE            ******************/
ModelCategory.DeleteById = function (post, callback) {
    MyModel.findByIdAndDelete(post._id, (error, eliminado) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            return callback({ state: true })
        }
    })
}

module.exports.category = ModelCategory