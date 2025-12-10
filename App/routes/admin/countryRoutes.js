let express = require("express")
const { countryInsert, countryView, singleCountryView, countryDelete, countryMultiDelete, countryUpdate, changeCountryStatus } = require("../../controllers/countryController")


let countryRoutes = express.Router()

countryRoutes.post("/insert",countryInsert)
countryRoutes.get("/view",countryView)
countryRoutes.get("/view/:id",singleCountryView)
countryRoutes.delete("/delete",countryDelete)
countryRoutes.post("/multi-delete",countryMultiDelete)
countryRoutes.put("/update/:id",countryUpdate)
countryRoutes.post("/change-status",changeCountryStatus)

module.exports = {countryRoutes}