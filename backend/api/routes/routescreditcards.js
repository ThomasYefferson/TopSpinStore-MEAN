var CreditCardsController = require(__dirname + '/../controladores/CreditCardscontroller.js').creditcards

app.post("/CreditCards/Save", function (request, response) {
    CreditCardsController.Save(request, response)
})

app.post("/CreditCards/LoadById", function (request, response) {
    CreditCardsController.LoadById(request, response)
})

app.post("/CreditCards/UpdateById", function (request, response) {
    CreditCardsController.UpdateById(request, response)
})

app.post("/CreditCards/DeleteById", function (request, response) {
    CreditCardsController.DeleteById(request, response)
})