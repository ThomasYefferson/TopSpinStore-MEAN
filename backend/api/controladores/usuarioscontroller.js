var ModelUsuarios = require(__dirname + '/../modelos/modelusuarios.js').usuarios
var UsuariosController = {}
const emailValidator = require('email-validator')

function Aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**************************************************************/
/******************           CREATE         ******************/
/******************          Save Users      ******************/
UsuariosController.Save = function (request, response) {
    var post = {
        Cedula: request.body.Cedula,
        Name: request.body.Name.trim(),
        Email: request.body.Email.trim(),
        Age: request.body.Age,
        Phone: request.body.Phone,
        Address: request.body.Address,
        CreditCard: request.body.CreditCards_id,
    }

    /*Validacion campo cedula */
    if (post.Cedula == "" || post.Cedula == null || post.Cedula == undefined) {
        response.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false
    }

    if (isNaN(post.Cedula)) {
        response.json({ state: false, mensaje: "El campo cedula solo acepta valores numericos" })
        return false;
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

    ModelUsuarios.Save(post, function (respuesta) {
        console.log(respuesta)
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "Se guardo correctamente" })
        }
        else {
            response.json({ state: false, mensaje: "El codigo ya existe" })
        }
    })

}

/******************     Registro      ******************/
UsuariosController.Register = function (request, response) {
    console.log('conexion')
    var post = {
        Cedula: request.body.Cedula.trim(),
        Name: request.body.Name.trim(),
        Email: request.body.Email.trim(),
        Password: sha256(request.body.Password + config.Clave).trim(),
    }

    /*Validacion campo cedula */
    if (post.Cedula == "" || post.Cedula == null || post.Cedula == undefined) {
        response.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false
    }

    if (isNaN(post.Cedula)) {
        response.json({ state: false, mensaje: "El campo cedula solo acepta valores numericos" })
        return false;
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

    /*Validacion campo password */

    if (post.Password == "" || post.Password == null || post.Password == undefined) {
        response.json({ state: false, mensaje: "El campo password es obligatorio" })
        return false
    }

    if (post.Password.length < 6) {
        response.json({ state: false, mensaje: "El campo password debe ser superior a 6 caracteres" })
        return false
    }

    post.Codigo = Aleatorio(1000, 9999)

     /*npm i nodemailer --save  paquete para envio de emails */
    /*contraseña: qovvijijfstyfqfv*/
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
   host:"smtp.gmail.com", 
   port:587,
   secure:false,
   requireTLS:true,
   auth:{
    user:"tsstoreibero@gmail.com",
    pass:"hcocpkbmghwxhupb"
   },
   tls: {
    rejectUnauthorized:false
   }
})

let mailOptions = {
    from:"tsstoreibero@gmail.com",
    to:post.Email,
    subject:"Verifica tu cuenta codigo: " + post.Codigo,
    html:"<div><a href='http://localhost:3000/Activar/"+post.Email+"/"+post.Codigo+"'>Click aqui para activar</a></div>",
}

transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
        response.json({state:'error'})
    }else{
        ModelUsuarios.Register(post, function (respuesta) {
            
            if (respuesta.state == true) {
                response.json({ state:true, mensaje: "You have been successfully Registered" })
            }
            else {
                response.json({ state: false, mensaje: "The Cedula or Email is already Registered" })
            }
        })
    }
});

}

/**************************************************************/
/****************Activacion de cuenta por email****************/
UsuariosController.Activar = function (request, response) {
    var post = {
        Email: request.params.Email,
        Codigo: request.params.Codigo

    }

    if (post.Email == "" || post.Email == null || post.Email == undefined) {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    if (emailValidator.validate(post.Email) == false) {
        response.json({ state: false, mensaje: "El campo Email no es correcto" })
        return false
    }

    if (post.Codigo == "" || post.Codigo == null || post.Codigo == undefined) {
        response.json({ state: false, mensaje: "El Codigo de activacion es obligatorio" })
        return false
    }

    ModelUsuarios.Activar(post, function (verestado) {

        if (verestado.data.length == 0) {
            response.json({ state: false, mensaje: "El email o el codigo son invalidos" })

        } else {
            if (verestado.data[0].Estado == 1) {
                response.send("<div style=background-color:#74E5FE;><a href="+"http://localhost:4200/"+"><button>click aquí</button></a> La cuenta ya fue activada</div>")
            } else {
                post.id = verestado.data[0]._id
                ModelUsuarios.ActualizarEstado(post, function (res) {
                    if (res.state == true) {
                        response.send("<div style=background-color:#84F7B8;><a href="+"http://localhost:4200/"+"><button>click aquí</button></a>!Bienvenido, Cuenta activada correctamente</div>")
                    } else {
                        response.json({ state: false, mensaje: "Se presento un error al activar" })
                    }
                })
            }
        }
    })
}


/**************************************************************/
/******************           READ           ******************/
/******************          Login           ******************/
UsuariosController.Login = function (request, response) {
    var post = {
        Email: request.body.Email,
        Password: sha256(request.body.Password + config.Clave)
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

    ModelUsuarios.ValidarEstado(post, function (Estado) {
        if (Estado.data[0].Estado == null || Estado.data[0].Estado == undefined) {
            response.json({ state: false, mensaje: "El usuario aun no ha realizado su registro " })
        }
        else if (Estado.data[0].Estado == 0) {
            response.json({ state: false, mensaje: "Debe activar su cuenta por medio de su email " })
        } 
        else
            ModelUsuarios.Login(post, function (respuesta) {
                console.log(respuesta)
                if (respuesta.state == true) {
                    request.session.User_id = respuesta.data[0]._id
                    request.session.Name = respuesta.data[0].Name
                    request.session.Rol = respuesta.data[0].Rol
                    response.json({ state: true, mensaje: "Welcome" })
                } else {
                    response.json({ state: false, mensaje: "Invalid email or password" })
                }
            })
        })
}

/******************       Load All User      ******************/
UsuariosController.LoadAllUsers = function (request, response) {
    ModelUsuarios.LoadAllUsers(null, function (respuesta) {
        response.json(respuesta)
    })
}

/******************     Load Users By Id    ******************/

UsuariosController.LoadById = function (request, response) {
    console.log('conexion')
    var post = {
        _id: request.body._id.trim(),
    }

    if (post._id == "" || post._id == null || post._id == undefined) {
        response.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false
    }

    ModelUsuarios.LoadById(post, function (Respuesta) {
        if (Respuesta.state == true) {
            console.log(Respuesta.data)
            response.json({ state: true, message: `The registered user has been uploaded successfully`, data: Respuesta.data })
        } else {
            response.json({ state: false, message: `There is no user registered with the Id number ${post.Id}` })
        }
    })
}

/****************** Load Users By Document  ******************/
UsuariosController.LoadByDocument = function (request, response) {
    console.log('conexion')
    var post = {
        Cedula: request.body.Cedula.trim(),
    }

    if (post._id == "" || post._id == null || post._id == undefined) {
        response.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false
    }

    if (post.Cedula == "" || post.Cedula == null || post.Cedula == undefined) {
        response.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false
    }

    if (isNaN(post.Cedula)) {
        response.json({ state: false, mensaje: "El campo cedula solo acepta valores numericos" })
        return false;
    }

    if (post.Cedula.length < 8) {
        response.json({ state: false, mensaje: "El campo cedula debe ser superior a 7 digitos" })
        return false
    }

    if (post.Cedula.length > 12) {
        response.json({ state: false, mensaje: "El campo cedula no debe ser superior a 12 digitos" })
        return false
    }

    ModelUsuarios.LoadByDocument(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ respuesta, mensaje: "Se cargo correctamente" })
        }
        else {
            response.json({ state: false, mensaje: "El documento no exixte" })
        }
    })
}

/**************************************************************/
/******************        UPDATE            ******************/
/****************** Update Users By Document ******************/
UsuariosController.UpdateByDocument = function (request, response) {
    var post = {
        Cedula: request.body.Cedula.trim(),
        Name: request.body.Name.trim(),
        Password: sha256(request.body.Password + config.Clave).trim(),
    }

    /*Validacion campo cedula */
    if (post.Cedula == "" || post.Cedula == null || post.Cedula == undefined) {
        response.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false}

    if (isNaN(post.Cedula)) {
        response.json({ state: false, mensaje: "El campo cedula solo acepta valores numericos" })
        return false}

    if (post.Cedula.length < 8) {
        response.json({ state: false, mensaje: "El campo cedula debe ser superior a 7 digitos" })
        return false}

    if (post.Cedula.length > 12) {
        response.json({ state: false, mensaje: "El campo cedula no debe ser superior a 12 digitos" })
        return false}

    /*Validacion campo nombre */
    if (post.Name == "" || post.Name == null || post.Name == undefined) {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false}

    if (post.Name.length <= 2) {
        response.json({ state: false, mensaje: "El campo nombre debe ser superior a 2 caracteres" })
        return false}

    if (post.Name.length > 15) {
        response.json({ state: false, mensaje: "El campo nombre no debe ser superior a 15 caracteres" })
        return false}

    /*Validacion campo password */
    if (post.Password == "" || post.Password == null || post.Password == undefined) {
        response.json({ state: false, mensaje: "El campo password es obligatorio" })
        return false}

    if (post.Password.length < 6) {
        response.json({ state: false, mensaje: "El campo password debe ser superior a 6 caracteres" })
        return false}

    ModelUsuarios.UpdateByDocument(post, function (respuesta) {
        console.log(respuesta)
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se actualizó correctamente" })
        }
        else {
            response.json({ state: false, mensaje: "La cedula no existe" })
        }
    })
}

/****************** Update Users By Id ******************/
UsuariosController.UpdateById = function (request, response) {
    var post = {
        _id: request.body._id,
        Rol: request.body.Rol,
        Cedula: request.body.Cedula,
        Name: request.body.Name.trim(),
        LastName: request.body.LastName.trim(),
        Email: request.body.Email.trim(),
        Password: request.body.Password.trim(),
        Age: request.body.Age,
        Phone: request.body.Phone,
        Address: request.body.Address.trim(),
    }
    /*Validacion campo _id */
    if (post._id == "" || post._id == null || post._id == undefined) {
        response.json({ state: false, mensaje: "El campo Id es obligatorio" })
        return false}

    ModelUsuarios.UpdateById(post, function (respuesta) {
        console.log(respuesta)
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se actualizó correctamente" })
        }
        else {
            response.json({ state: false, mensaje: "El usuario no ha sido registrado" })
        }
    })
}

UsuariosController.UpdateById = function (request, response) {
    var post = {
        _id: request.body._id,
        Rol: request.body.Rol,
        Cedula: request.body.Cedula,
        Name: request.body.Name.trim(),
        LastName: request.body.LastName.trim(),
        Email: request.body.Email.trim(),
        Password: request.body.Password,
        Age: request.body.Age,
        Phone: request.body.Phone,
        Address: request.body.Address.trim(),
    }
    /*Validacion campo _id */
    if (post._id == "" || post._id == null || post._id == undefined) {
        response.json({ state: false, mensaje: "El campo Id es obligatorio" })
        return false}

    ModelUsuarios.UpdateById(post, function (respuesta) {
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
UsuariosController.DeleteById = function(request, response){
    var post = {
        _id:request.body._id.trim(),
    }
    if (post._id ==  "" || post._id == undefined || post._id == null){
        response.json({state:false,mensaje:"El campo codigo es obligatorio"})
        return false
    }

    ModelUsuarios.DeleteById(post, function(respuesta){

        console.log(respuesta)
        if(respuesta.state == true){
            response.json({state:true,mensaje:`The product has been successfully deleted`})
        }
        else{
            response.json({state:false,mensaje:"El codigo no existe"})
        }
    })
}

UsuariosController.DeleteByDocument = function (request, response) {
    var post = {
        Cedula: request.body.Cedula.trim(),

    }

    /*Validacion campo cedula */

    if (post.Cedula == "" || post.Cedula == null || post.Cedula == undefined) {
        response.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false
    }
    if (isNaN(post.Cedula)) {
        response.json({ state: false, mensaje: "El campo cedula solo acepta valores numericos" })
        return false;
    }

    if (post.Cedula.length < 8) {
        response.json({ state: false, mensaje: "El campo cedula debe ser superior a 7 digitos" })
        return false
    }

    if (post.Cedula.length > 12) {
        response.json({ state: false, mensaje: "El campo cedula no debe ser superior a 12 digitos" })
        return false
    }

    ModelUsuarios.DeleteByDocument(post, function (respuesta) {
        console.log(respuesta)
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "se eliminó correctamente" })
        }
        else {
            response.json({ state: false, mensaje: "La cedula no existe" })
        }
    })
}

module.exports.usuarios = UsuariosController