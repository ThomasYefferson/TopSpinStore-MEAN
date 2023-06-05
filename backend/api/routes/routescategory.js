var CategoryController = require(__dirname + '/../controladores/categorycontroller').category

/**     SAVE Category  */
app.post("/Category/Save", function(request, response){
    CategoryController.Save(request, response)
})

/**     LOADS Category  */
app.post("/Category/LoadAllCategory", function(request, response){
    CategoryController.LoadAllCategory(request, response)
})

app.post("/Category/LoadById", function(request, response){
    CategoryController.LoadById(request, response)
})

/**   UPDATE Category  */
app.post("/Category/UpdateById", function(request, response){
    CategoryController.UpdateById(request, response)
})

/**   DELETE Category  */
app.post("/Category/DeleteById", function(request, response){
    CategoryController.DeleteById(request, response)
})