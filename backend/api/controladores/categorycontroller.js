var ModelCategory = require(__dirname + '/../modelos/modelcategory.js').category
var CategoryController = {}
const emailValidator = require('email-validator')

/**************************************************************/
/******************           CREATE         ******************/
/******************      Create Category     ******************/
CategoryController.Save = function(request, response){
    var post = {
        Code:request.body.Code,
        Name:request.body.Name.trim(),
    }

    /*Validacion campo Code */
    if (post.Code == "" || post.Code == null || post.Code == undefined) {
        response.json({ state: false, mensaje: "El campo Code es obligatorio" })
        return false
    }

    if (isNaN(post.Code)) {
        response.json({ state: false, mensaje: "El campo Code solo acepta valores numericos" })
        return false;
    }

    if (post.Code < 0) {
        response.json({ state: false, mensaje: "El campo Code debe ser mayor a 0" })
        return false
    }

    if (post.Code > 100) {
        response.json({ state: false, mensaje: "El campo Code no debe ser mayor a 100" })
        return false
    }

    /*Validacion campo nombre */
    if (post.Name == "" || post.Name == null || post.Name == undefined) {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    if (post.Name.length <= 2) {
        response.json({ state: false, mensaje: "El campo nombre debe ser superior a 2 caracteres" })
        return false
    }

    if (post.Name.length > 15) {
        response.json({ state: false, mensaje: "El campo nombre no debe ser superior a 15 caracteres" })
        return false
    }

    ModelCategory.Save(post, function(respuesta){
        console.log(respuesta)
        if(respuesta.state == true){
            response.json({state:true,mensaje:"It was saved correctly"})
        }
        else{
            response.json({state:false,mensaje:respuesta.message})
        }
    })

}

/**************************************************************/
/******************           READ           ******************/
/******************       Load All Category  ******************/
CategoryController.LoadAllCategory = function (request, response) {
    ModelCategory.LoadAllCategory(null, function (respuesta) {
        response.json(respuesta)
    })
}

/******************  Load Category By Id    ******************/
CategoryController.LoadById = function (request, response) {
    console.log('conexion')
    var post = {
        _id: request.body._id.trim(),
    }

    if (post._id == "" || post._id == null || post._id == undefined) {
        response.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false
    }

    ModelCategory.LoadById(post, function (Respuesta) {
        if (Respuesta.state == true) {
            console.log(Respuesta.data)
            response.json({ state: true, message: `The registered category has been uploaded successfully`, data: Respuesta.data })
        } else {
            response.json({ state: false, message: `There isn't category registered` })
        }
    })
}

/**************************************************************/
/******************        UPDATE            ******************/
/******************  Update Category By Id   ******************/
CategoryController.UpdateById = function (request, response) {
    var post = {
        _id: request.body._id.trim(),
        Code: request.body.Code,
        Name: request.body.Name.trim(),
    }

    /*Validacion campo _id */
    if (post._id == "" || post._id == null || post._id == undefined) {
        response.json({ state: false, mensaje: "El campo Id es obligatorio" })
        return false}

        /*Validacion campo Code */
        if (post.Code == "" || post.Code == null || post.Code == undefined) {
            response.json({ state: false, mensaje: "El campo Code es obligatorio" })
            return false
        }
    
        if (isNaN(post.Code)) {
            response.json({ state: false, mensaje: "El campo Code solo acepta valores numericos" })
            return false;
        }
    
        if (post.Code < 0) {
            response.json({ state: false, mensaje: "El campo Code debe ser mayor a 0" })
            return false
        }
    
        if (post.Code > 100) {
            response.json({ state: false, mensaje: "El campo Code no debe ser mayor a 100" })
            return false
        }
    
        /*Validacion campo nombre */
        if (post.Name == "" || post.Name == null || post.Name == undefined) {
            response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
            return false
        }
    
        if (post.Name.length <= 2) {
            response.json({ state: false, mensaje: "El campo nombre debe ser superior a 2 caracteres" })
            return false
        }
    
        if (post.Name.length > 15) {
            response.json({ state: false, mensaje: "El campo nombre no debe ser superior a 15 caracteres" })
            return false
        }
    
    ModelCategory.UpdateById(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: respuesta.state, mensaje: respuesta.message })
        }
        else {
            response.json({ state: respuesta.state, mensaje:  respuesta.message })
        }
    })
}

/***************************************************************/
/******************         DELETE            ******************/
/******************   Delete Users By Id     *******************/
CategoryController.DeleteById = function(request, response){
    var post = {
        _id:request.body._id.trim(),
    }
    if (post._id ==  "" || post._id == undefined || post._id == null){
        response.json({state:false,mensaje:"El campo codigo es obligatorio"})
        return false
    }

    ModelCategory.DeleteById(post, function(respuesta){

        console.log(respuesta)
        if(respuesta.state == true){
            response.json({state:true,mensaje:`The category has been successfully deleted`})
        }
        else{
            response.json({state:false,mensaje:"The category does not exist"})
        }
    })
}
module.exports.category = CategoryController