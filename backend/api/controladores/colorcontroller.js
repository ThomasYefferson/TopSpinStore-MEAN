var ModelColor = require(__dirname + '/../modelos/modelcolor.js').color
var ColorController = {}
const emailValidator = require('email-validator')

/**************************************************************/
/******************           CREATE         ******************/
/******************      Create Color     ******************/
ColorController.Save = function(request, response){
    var post = {
        Code:request.body.Code,
        Name:request.body.Name.trim(),
        Value:request.body.Value.trim(),
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

    ModelColor.Save(post, function(respuesta){
        console.log(respuesta)
        if(respuesta.state == true){
            response.json({state:true,mensaje:respuesta.message})
        }
        else{
            response.json({state:false,mensaje:respuesta.message})
        }
    })

}

/**************************************************************/
/******************           READ           ******************/
/******************       Load All Color  ******************/
ColorController.LoadAllColor = function (request, response) {
    ModelColor.LoadAllColor(null, function (respuesta) {
        response.json(respuesta)
    })
}

/******************  Load Color By Id    ******************/
ColorController.LoadById = function (request, response) {
    console.log('conexion')
    var post = {
        _id: request.body._id.trim(),
    }

    if (post._id == "" || post._id == null || post._id == undefined) {
        response.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false
    }

    ModelColor.LoadById(post, function (Respuesta) {
        if (Respuesta.state == true) {
            console.log(Respuesta.data)
            response.json({ state: true, message: `The registered Color has been uploaded successfully`, data: Respuesta.data })
        } else {
            response.json({ state: false, message: `There isn't Color registered` })
        }
    })
}

/**************************************************************/
/******************        UPDATE            ******************/
/******************  Update Color By Id   ******************/
ColorController.UpdateById = function (request, response) {
    var post = {
        _id: request.body._id.trim(),
        Code: request.body.Code,
        Name: request.body.Name.trim(),
        Value: request.body.Value.trim(),
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
    
    ModelColor.UpdateById(post, function (respuesta) {
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
ColorController.DeleteById = function(request, response){
    var post = {
        _id:request.body._id.trim(),
    }
    if (post._id ==  "" || post._id == undefined || post._id == null){
        response.json({state:false,mensaje:"The field id is required"})
        return false
    }

    ModelColor.DeleteById(post, function(respuesta){

        console.log(respuesta)
        if(respuesta.state == true){
            response.json({state:true,mensaje:respuesta.message})
        }
        else{
            response.json({state:false,mensaje:`The Color does not exist`})
        }
    })
}
module.exports.color = ColorController