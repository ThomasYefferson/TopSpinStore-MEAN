var MarketController = require(__dirname + '/../controladores/marketcontroller.js').market

/**     SAVE Market  */
app.post("/Market/AddMarket", function(request, response){
    MarketController.AddMarket(request, response)
})

/**     LOADS Market  */
app.post("/Market/LoadMyMarket", function(request, response){
    MarketController.LoadMyMarket(request, response)
})

/**   UPDATE Market  */
app.post("/Market/UpdateQuantity", function(request, response){
    MarketController.UpdateQuantity(request, response)
})

/**   DELETE Market  */
app.post("/Market/DeleteItem", function(request, response){
    MarketController.DeleteItem(request, response)
})

app.post("/Market/DeleteAllItems", function(request, response){
    MarketController.DeleteAllItems(request, response)
})

app.post("/Market/SubMyMarket", function(request, response){
    MarketController.SubMyMarket(request, response)
})