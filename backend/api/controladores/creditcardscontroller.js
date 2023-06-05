var ModelCreditCards = require(__dirname + '/../modelos/modelcreditcards.js').creditcards
var CreditCardsController = {}
const emailValidator = require('email-validator')

/**************************************************************/
/******************           CREATE         ******************/
/******************          Save Users      ******************/
CreditCardsController.Save = function(request, response){
    var post = {
        User_id:request.session.User_id,
        Cedula: request.body.Cedula,
        Name:request.body.Name.trim(),
        CardNumber:request.body.CardNumber.trim(),
        CSV:request.body.CSV.trim(),
        ExpDate:request.body.ExpDate.trim(),
        Email:request.body.Email.trim(),
        Phone:request.body.Phone.trim(),
    }

    /*Validacion campo cedula */
    if (post.Cedula == "" || post.Cedula == null || post.Cedula == undefined) {
        response.json({ state: false, mensaje: "The field Cedula is required." })
        return false
    }

    if (post.Owner == "" || post.Owner == null || post.Owner == undefined) {
        response.json({ state: false, mensaje: "The field Name is required." })
        return false
    }
    if (post.CardNumber == "" || post.CardNumber == null || post.CardNumber == undefined) {
        response.json({ state: false, mensaje: "The field Card Number is required." })
        return false
    }
    if (post.CSV == "" || post.CSV == null || post.CSV == undefined) {
        response.json({ state: false, mensaje: "The field CSV is required." })
        return false
    }
    if (post.Email == "" || post.Email == null || post.Email == undefined) {
        response.json({ state: false, mensaje: "The field Email is required." })
        return false
    }
    if (post.Phone == "" || post.Phone == null || post.Phone == undefined) {
        response.json({ state: false, mensaje: "The field Phone is required." })
        return false
    }

    if (post.Cedula.length < 8) {
        response.json({ state: false, mensaje: "El campo cedula debe ser superior a 7 digitos" })
        return false
    }

    if (post.Cedula.length > 12) {
        response.json({ state: false, mensaje: "El campo cedula no debe ser superior a 12 digitos" })
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

    /*Validacion campo email */
    if (post.Email == "" || post.Email == null || post.Email == undefined) {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    if (emailValidator.validate(post.Email) == false) {
        response.json({ state: false, mensaje: "El campo Email no es correcto" })
        return false
    }

    if (post.CSV.length !=3) {
        response.json({ state: false, mensaje: "El campo cedula debe contener 3 digitos" })
        return false
    }

    if (post.CardNumber.length > 12) {
        response.json({ state: false, mensaje: "El campo cedula no debe ser superior a 12 digitos" })
        return false
    }

    if (post.Cedula.length > 12) {
        response.json({ state: false, mensaje: "El campo cedula no debe ser superior a 12 digitos" })
        return false
    }

    ModelCreditCards.Save(post, function(respuesta){
        console.log(respuesta)
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Se guardo correctamente"})
        }
        else{
            response.json({state:false,mensaje:"El codigo ya existe"})
        }
    })

}

/**************************************************************/
/******************           READ           ******************/
/******************     Load Users By Id    ******************/
CreditCardsController.LoadById = function (request, response) {
    console.log('conexion')
    var post = {
        _id: request.body._id.trim(),
    }

    if (post._id == "" || post._id == null || post._id == undefined) {
        response.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false
    }

    ModelCreditCards.LoadById(post, function (Respuesta) {
        if (Respuesta.state == true) {
            console.log(Respuesta.data)
            response.json({ state: true, message: `The registered user has been uploaded successfully`, data: Respuesta.data })
        } else {
            response.json({ state: false, message: `There is no user registered with the Id number ${post.Id}` })
        }
    })
}

/**************************************************************/
/******************        UPDATE            ******************/
/****************** Update Credit Card By Id ******************/
CreditCardsController.UpdateById = function (request, response) {
    var post = {
        _id: request.body._id,
        User_id:request.session.User_id,
        Name:request.body.Name.trim(),
        CSV:request.body.CSV.trim(),
        ExpDate:request.body.ExpDate.trim(),
        Email:request.body.Email.trim(),
        Phone:request.body.Phone.trim(),
    }

    /*Validacion campo _id */
    if (post._id == "" || post._id == null || post._id == undefined) {
        response.json({ state: false, mensaje: "El campo Id es obligatorio" })
        return false}

    ModelCreditCards.UpdateById(post, function (respuesta) {
        console.log(respuesta)
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se actualizó correctamente" })
        }
        else {
            response.json({ state: false, mensaje: "El usuario no ha sido registrado" })
        }
    })
}

/***************************************************************/
/******************         DELETE            ******************/
/******************   Delete Users By Id     *******************/
CreditCardsController.DeleteById = function(request, response){
    var post = {
        _id:request.body._id.trim(),
    }
    if (post._id ==  "" || post._id == undefined || post._id == null){
        response.json({state:false,mensaje:"El campo codigo es obligatorio"})
        return false
    }

    ModelCreditCards.DeleteById(post, function(respuesta){

        console.log(respuesta)
        if(respuesta.state == true){
            response.json({state:true,mensaje:`The product has been successfully deleted`})
        }
        else{
            response.json({state:false,mensaje:"El codigo no existe"})
        }
    })
}

module.exports.creditcards = CreditCardsController