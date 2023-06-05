var ProductosController = require(__dirname + '/../controladores/productoscontroller.js').productos

/**     SAVE PRODUCTS  */
app.post("/Products/Save", function(request, response){
    ProductosController.Save(request, response)
})

/**     LOADS PRODUCTS  */
app.post("/Products/LoadAllProducts", function(request, response){
    ProductosController.LoadAllProducts(request, response)
})

app.post("/Products/LoadById", function(request, response){
    ProductosController.LoadById(request, response)
})

app.post("/Products/LoadByCode", function(request, response){
    ProductosController.LoadByCode(request, response)
})

app.post("/Products/LoadByCategory", function(request, response){
    ProductosController.LoadByCategory(request, response)
})

/**   UPDATE PRODUCTS  */
app.post("/Products/UpdateById", function(request, response){
    ProductosController.UpdateById(request, response)
})

app.post("/Products/UpdateByCode", function(request, response){
    ProductosController.UpdateByCode(request, response)
})

/**   DELETE PRODUCTS  */
app.post("/Products/DeleteById", function(request, response){
    ProductosController.DeleteById(request, response)
})

app.post("/Products/DeleteByCode", function(request, response){
    ProductosController.DeleteByCode(request, response)
})