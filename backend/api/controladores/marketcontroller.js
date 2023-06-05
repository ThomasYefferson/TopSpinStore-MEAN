var ModelMarket = require(__dirname + '/../modelos/modelmarket.js').market
var MarketController = {}

var FechaActual = new Date()

/**************************************************************/
/******************         CREATE           ******************/
/******************       ADD MARKET         ******************/
// MarketController.AddMarket = function(request, response){
//     var post = {
//         User_id:request.session.User_id,
//         Product_id:request.body.Product_id,
//     }

//     if (post.User_id ==  "" || post.User_id == undefined || post.User_id == null){
//         response.json({state:false,mensaje:"The User field is required"})
//         return false
//     }
    
//     if (post.Product_id ==  "" || post.Product_id == undefined || post.Product_id == null){
//         response.json({state:false,mensaje:"The Product field is required"})
//         return false
//     }

//     console.log(post)
//     ModelMarket.AddMarket(post, function(res){
//         if(res.state == true){
//             response.json({state:true,mensaje:res.message})
//         }
//         else{
//             response.json({state:false,mensaje:res.message});
//         }
//     })

// }

MarketController.AddMarket = function(request, response){
    var post = {
        User_id:request.session.User_id,
        Product_id:request.body.Product_id,
    }

    if (post.User_id ==  "" || post.User_id == undefined || post.User_id == null){
        response.json({state:false,mensaje:"The User field is required"})
        return false
    }
    
    if (post.Product_id ==  "" || post.Product_id == undefined || post.Product_id == null){
        response.json({state:false,mensaje:"The Product field is required"})
        return false
    }

    console.log(post)
    ModelMarket.AddMarket(post, function(res){
        if(res.state == true){
            response.json({state:true,mensaje:res.message})
        }
        else{
            response.json({state:false,mensaje:res.message});
        }
    })

}
/**************************************************************/
/******************           READ           ******************/
/******************    Load All Products     ******************/
MarketController.LoadMyMarket = function(request, response){
    var post = {
        User_id:request.session.User_id,
    }

    if (post.User_id ==  "" || post.User_id == undefined || post.User_id == null){
        response.json({state:false,mensaje:"El campo codigo es obligatorio"})
        return false
    }
    
    ModelMarket.LoadMyMarket(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:respuesta.state ,data:respuesta.data})
        }
        else{
            response.json({state:false,mensaje:"El codigo no existe"})
        }
    })
}

// MarketController.LoadMyMarket = function(request, response){
//     var post = {
//         User_id:request.body.User_id,
//     }

//     if (post.User_id ==  "" || post.User_id == undefined || post.User_id == null){
//         response.json({state:false,mensaje:"El campo user es obligatorio"})
//         return false
//     }
    
//     ModelMarket.LoadMyMarket(post,function(respuesta){
//         if(respuesta.state == true){
//             response.json({state:respuesta.state ,data:respuesta.data})
//         }
//         else{
//             response.json({state:false,mensaje:"El codigo no existe"})
//         }
//     })
// }
/**************************************************************/
/******************        UPDATE            ******************/
/******************     Update By Id         ******************/
MarketController.UpdateQuantity = function(request, response){
    var post = {
        _id: request.session.User_id,
        Quantity: request.body.Quantity
    }
    ModelMarket.UpdateQuantity(post, function(res){
        if(res.state == true){
            response.json({state:true,mensaje:res.message})
        }
        else{
            response.json({state:false,mensaje:res.message})
        }
    })

}

/***************************************************************/
/******************         DELETE            ******************/
/******************   Delete Products By Id   ******************/
// MarketController.SubMyMarket = function(request, response){
//     var post = {
//         User_id:request.session._id,
//         _id:request.body._id.trim(),
//     }
//     if (post.User_id ==  "" || post.User_id == undefined || post.User_id == null){
//         response.json({state:false,mensaje:"The User field is required"})
//         return false
//     }
//     if (post._id ==  "" || post._id == undefined || post._id == null){
//         response.json({state:false,mensaje:"The Id field is required"})
//         return false
//     }

//     ModelMarket.SubMyMarket(post, function(respuesta){

//         console.log(respuesta)
//         if(respuesta.state == true){
//             response.json({state:true})
//         }
//         else{
//             response.json({state:false})
//         }
//     })
// }


//MarketController.DeleteItem = function(request, response){
    //     var post = {
    //         _id:request.body._id.trim(),
    //     }
    
    //     if (post._id ==  "" || post._id == undefined || post._id == null){
    //         response.json({state:false,mensaje:"The Id field is required"})
    //         return false
    //     }
    
    //     ModelMarket.DeleteItem(post, function(respuesta){
    
    //         console.log(respuesta)
    //         if(respuesta.state == true){
    //             response.json({state:true,mensaje:`The product has been successfully removed from the shopping cart.`})
    //         }
    //         else{
    //             response.json({state:false,mensaje:"El codigo no existe"})
    //         }
    //     })
    // }
MarketController.SubMyMarket = function(request, response){
    var post = {
        User_id:request.session.User_id,
        _id:request.body._id.trim(),
    }
    if (post.User_id ==  "" || post.User_id == undefined || post.User_id == null){
        response.json({state:false,mensaje:"The User field is required"})
        return false
    }
    if (post._id ==  "" || post._id == undefined || post._id == null){
        response.json({state:false,mensaje:"The Id field is required"})
        return false
    }

    ModelMarket.SubMyMarket(post, function(respuesta){

        console.log(respuesta)
        if(respuesta.state == true){
            response.json({state:true})
        }
        else{
            response.json({state:false})
        }
    })
}

MarketController.DeleteItem = function(request, response){
    var post = {
        User_id:request.seseeion.User_id,
        _id:request.body._id.trim(),
    }

    if (post._id ==  "" || post._id == undefined || post._id == null){
        response.json({state:false,mensaje:"The Id field is required"})
        return false
    }

    ModelMarket.DeleteItem(post, function(respuesta){

        console.log(respuesta)
        if(respuesta.state == true){
            response.json({state:true,mensaje:`The product has been successfully removed from the shopping cart.`})
        }
        else{
            response.json({state:false,mensaje:"El codigo no existe"})
        }
    })
}

// MarketController.DeleteAllItems = function(request, response){
//     var post = {
//         User_id:request.session._id,
//     }
//     if (post.User_id ==  "" || post.User_id == undefined || post.User_id == null){
//         response.json({state:false,mensaje:"The User field is required"})
//         return false
//     }

//     ModelMarket.DeleteAllItems(post, function(respuesta){
//         console.log(respuesta)
//         if(respuesta.state == true){
//             response.json({state:true,mensaje:"se eliminó correctamente"})
//         }
//         else{
//             response.json({state:false,mensaje:"El codigo no existe"})
//         }
//     })
// }

MarketController.DeleteAllItems = function(request, response){
    var post = {
        User_id:request.session.User_id,
    }
    if (post.User_id ==  "" || post.User_id == undefined || post.User_id == null){
        response.json({state:false,mensaje:"The User field is required"})
        return false
    }

    ModelMarket.DeleteAllItems(post, function(respuesta){
        console.log(respuesta)
        if(respuesta.state == true){
            response.json({state:true,mensaje:"se eliminó correctamente"})
        }
        else{
            response.json({state:false,mensaje:"El codigo no existe"})
        }
    })
}


module.exports.market = MarketController