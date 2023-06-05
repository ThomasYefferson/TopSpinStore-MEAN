const { request, response } = require("express")

var UsuariosController = require(__dirname + '/../controladores/usuarioscontroller.js').usuarios

var validarSesion = function(request, response,next){
    if(request.session.Rol == undefined || request.session.Rol == "" || request.session.Rol == null){
        response.json({state:false, mensaje:"Su sesión a expirado, Inicie sesión nuevamente",redireccion:true})
        return false
    }else{
        next()
    }
}

app.post("/Users/Register", function (request, response) {
    UsuariosController.Register(request, response)
})

app.get("/Activar/:Email/:Codigo", function (request, response){
    UsuariosController.Activar(request, response)
    
})

app.post("/Users/Save", function (request, response) {
    UsuariosController.Save(request, response)
})

app.post("/Users/LoadAllUsers", function (request, response) {
    UsuariosController.LoadAllUsers(request, response)
})

app.post("/Users/LoadById", function (request, response) {
    UsuariosController.LoadById(request, response)
})


app.post("/Users/UpdateById", function (request, response) {
    UsuariosController.UpdateById(request, response)
})

app.post("/Users/UpdateSession", function (request, response) {
    UsuariosController.UpdateSession(request, response)
})

app.post("/Users/DeleteById", function (request, response) {
    UsuariosController.DeleteById(request, response)
})

app.post("/Users/Login", function (request, response) {
    UsuariosController.Login(request, response)
})

app.post("/Users/ViewCookie", function (request, response) {
    if (request.session.User_id != undefined) {
        response.json({ state: true, clave: request.session })
    } else {
        response.json({ state: false, message: 'Your session has expired, please log in again' })
    }
})

app.post("/Users/MenuRol", validarSesion, function (request, response) {
    if (parseInt(request.session.Rol) == 1) {
        response.json({
            state: true, Data: {
                MenuRol: [
                    { Name: '', destino: 'admin', icon: "users" },
                    { Name: 'Users', destino: 'users', icon: "users" },
                    { Name: 'Category', destino: 'category', icon: "pen" },
                    { Name: 'Products', destino: 'products', icon: "shop" }
                ],
                MenuLog: [
                    { Name: "Payment methods", destino: 'pay', Icon: "wallet" },
                    { Name: "Shipping addresses", destino: '', Icon: "truck-fast" },
                    { Name: "Set password", destino: '', Icon: "key" },
                    { Name: "Manage account", destino: 'admin', Icon: "gear" },
                    { Name: "Shopping cart", destino: 'shop', Icon: "cart-shopping" },
                ],
            }
        })
    }
    else if (request.session.Rol == 2) {
        response.json({
            state: true, Data: {
                MenuRol: [
                    { Name: '',        destino: 'user', icon: "user" },
                    { Name: 'Account', destino: 'data', icon: "user" },
                    { Name: 'Pay',     destino: 'pay',  icon: "wallet" },
                    { Name: 'Shop',    destino: 'shop', icon: "cart-shopping" }
                ],
                MenuLog: [
                    { Name: "Payment methods", destino: 'pay', Icon: "wallet" },
                    { Name: "Shipping addresses", destino: '', Icon: "truck-fast" },
                    { Name: "Set password", destino: '', Icon: "key" },
                    { Name: "Manage account", destino: 'admin', Icon: "gear" },
                    { Name: "Shopping cart", destino: 'shop', Icon: "cart-shopping" },
                ]
            }
        })
    }
})

app.post("/CloseSession", function (request, response) {
    request.session.destroy()
    response.json({ state: true, mensaje: "Cierre de sesion" })
})