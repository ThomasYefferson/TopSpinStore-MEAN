var ModelProductos = require(__dirname + '/../modelos/modelproductos.js').productos
var ProductosController = {}

var FechaActual = new Date()

/**************************************************************/
/******************           CREATE         ******************/
/******************            Save          ******************/
ProductosController.Save = function(request, response){
    var post = {
        Codigo:request.body.Codigo,
        Nombre:request.body.Nombre.trim(),
        Cantidad:request.body.Cantidad.trim(),
        Precio:request.body.Precio.trim(),
        Categoria:request.body.Categoria,
        Color: request.body.Color,
        Poster: request.body.Poster,
        Descripcion:request.body.Descripcion
    }

    if (post.Codigo ==  "" || post.Codigo == undefined || post.Codigo == null){
        response.json({state:false,mensaje:"El campo codigo es obligatorio"})
        return false
    }
    
    if (post.Nombre ==  "" || post.Nombre == undefined || post.Nombre == null){
        response.json({state:false,mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if (post.Cantidad ==  "" || post.Cantidad == undefined || post.Cantidad == null){
        response.json({state:false,mensaje:"El campo cantidad es obligatorio"})
        return false
    }

    if( isNaN(post.Cantidad) ) {
        response.json({state:false,mensaje:"El cantidad solo acepta valores numericos"})
        return false;
    }
    if (post.Cantidad < 1){
        response.json({state:false,mensaje:"El campo cantidad debe ser mayor a 0"})
        return false
    }

    if (post.Precio ==  "" || post.Precio == undefined || post.Precio == null){
        response.json({state:false,mensaje:"El campo precio es obligatorio"})
        return false
    }

    if( isNaN(post.Precio) ) {
        response.json({state:false,mensaje:"El campo Precio solo acepta valores numericos"})
        return false;
    }
    if (post.Precio < 1){
        response.json({state:false,mensaje:"El campo Precio debe ser mayor a 0 "})
        return false
    }
    console.log(post)
    ModelProductos.Save(post, function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Se guardo correctamente"})
        }
        else{
            response.json({state:false,mensaje:respuesta.message});
        }
    })

}

/**************************************************************/
/******************           READ           ******************/
/******************    Load All Products     ******************/
ProductosController.LoadAllProducts = function(request, response){
    ModelProductos.LoadAllProducts(null, function(respuesta){
        response.json(respuesta)
    })  
}

ProductosController.LoadById = function(request, response){
    var post = {
        Id:request.body.Id.trim(),
    }

    if (post.Id ==  "" || post.Id == undefined || post.Id == null){
        response.json({state:false,mensaje:"El campo codigo es obligatorio"})
        return false
    }
    
    ModelProductos.LoadById(post,function(respuesta){
        if(respuesta.state == true){
            console.log(respuesta.data)
            response.json({state:respuesta.state ,data:respuesta.data})
        }
        else{
            response.json({state:false,mensaje:"El codigo no existe"})
        }
    })
}

ProductosController.LoadByCode = function(request, response){
    var post = {
        Codigo:request.body.Codigo.trim(),
    }

    if (post.Codigo ==  "" || post.Codigo == undefined || post.Codigo == null){
        response.json({state:false,mensaje:"El campo codigo es obligatorio"})
        return false
    }

    
    ModelProductos.LoadByCode(post,function(respuesta){
        if(respuesta.state == true){
            response.json({respuesta,mensaje:"Se cargo correctamente"})
        }
        else{
            response.json({state:false,mensaje:"El codigo no existe"})
        }
    })
}

/**************************************************************/
/******************        UPDATE            ******************/
/******************     Update By Id         ******************/
ProductosController.UpdateById = function(request, response){
    var post = {
        _id: request.body._id,
        Codigo: request.body.Codigo,
        Nombre:request.body.Nombre.trim(),
        Cantidad:request.body.Cantidad.trim(),
        Precio:request.body.Precio.trim(),
        Categoria:request.body.Categoria,
        Color: request.body.Color,
        Poster: request.body.Poster,
        Descripcion:request.body.Descripcion
    }
    
    if (post.Nombre ==  "" || post.Nombre == undefined || post.Nombre == null){
        response.json({state:false,mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if (post.Cantidad ==  "" || post.Cantidad == undefined || post.Cantidad == null){
        response.json({state:false,mensaje:"El campo cantidad es obligatorio"})
        return false
    }

    if( isNaN(post.Cantidad) ) {
        response.json({state:false,mensaje:"El cantidad solo acepta valores numericos"})
        return false;
    }
    if (post.Cantidad < 1){
        response.json({state:false,mensaje:"El campo cantidad debe ser mayor a 0"})
        return false
    }
    if (post.Precio ==  "" || post.Precio == undefined || post.Precio == null){
        response.json({state:false,mensaje:"El campo precio es obligatorio"})
        return false
    }
    if( isNaN(post.Precio) ) {
        response.json({state:false,mensaje:"El campo Precio solo acepta valores numericos"})
        return false;
    }
    if (post.Precio < 1){
        response.json({state:false,mensaje:"El campo Precio debe ser mayor a 0 "})
        return false
    }
    console.log(post)
    ModelProductos.UpdateById(post, function(res){
        console.log(res)
        if(res.state == true){
            response.json({state:true,mensaje:res.message})
        }
        else{
            response.json({state:false,mensaje:res.message})
        }
    })

}

ProductosController.UpdateByCode = function(request, response){
    var post = {
        Codigo:request.body.Codigo.trim(),
        Nombre:request.body.Nombre.trim(),
        Cantidad:request.body.Cantidad.trim(),
        Precio:request.body.Precio.trim()
    }

    if (post.Codigo ==  "" || post.Codigo == undefined || post.Codigo == null){
        response.json({state:false,mensaje:"El campo codigo es obligatorio"})
        return false
    }
    
    if (post.Nombre ==  "" || post.Nombre == undefined || post.Nombre == null){
        response.json({state:false,mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if (post.Cantidad ==  "" || post.Cantidad == undefined || post.Cantidad == null){
        response.json({state:false,mensaje:"El campo cantidad es obligatorio"})
        return false
    }

    if( isNaN(post.Cantidad) ) {
        response.json({state:false,mensaje:"El cantidad solo acepta valores numericos"})
        return false;
    }
    if (post.Cantidad < 1){
        response.json({state:false,mensaje:"El campo cantidad debe ser mayor a 0"})
        return false
    }

    if (post.Precio ==  "" || post.Precio == undefined || post.Precio == null){
        response.json({state:false,mensaje:"El campo precio es obligatorio"})
        return false
    }

    if( isNaN(post.Precio) ) {
        response.json({state:false,mensaje:"El campo Precio solo acepta valores numericos"})
        return false;
    }
    if (post.Precio < 1){
        response.json({state:false,mensaje:"El campo Precio debe ser mayor a 0 "})
        return false
    }

    ModelProductos.UpdateByCode(post, function(respuesta){
        console.log(respuesta)
        if(respuesta.state == true){
            response.json({state:true,mensaje:"se actualizó correctamente"})
        }
        else{
            response.json({state:false,mensaje:"El codigo no exixte"})
        }
    })

}

/***************************************************************/
/******************         DELETE            ******************/
/******************   Delete Products By Id   ******************/
ProductosController.DeleteById = function(request, response){
    var post = {
        _id:request.body._id.trim(),
    }
    if (post._id ==  "" || post._id == undefined || post._id == null){
        response.json({state:false,mensaje:"El campo codigo es obligatorio"})
        return false
    }

    ModelProductos.DeleteById(post, function(respuesta){

        console.log(respuesta)
        if(respuesta.state == true){
            response.json({state:true,mensaje:`The product has been successfully deleted`})
        }
        else{
            response.json({state:false,mensaje:"El codigo no existe"})
        }
    })

}

ProductosController.DeleteByCode = function(request, response){
    var post = {
        Codigo:request.body.Codigo.trim(),
    }
    if (post.Codigo ==  "" || post.Codigo == undefined || post.Codigo == null){
        response.json({state:false,mensaje:"El campo codigo es obligatorio"})
        return false
    }
    ModelProductos.DeleteByCode(post, function(respuesta){
        console.log(respuesta)
        if(respuesta.state == true){
            response.json({state:true,mensaje:"se eliminó correctamente"})
        }
        else{
            response.json({state:false,mensaje:"El codigo no existe"})
        }
    })
}


module.exports.productos = ProductosController