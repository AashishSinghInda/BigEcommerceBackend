let express = require("express")
const { faqInsert, faqView, singleFaqView, faqDelete, faqMultiDelete, faqUpdate, changeFaqStatus } = require("../../controllers/faqController")
let faqRoutes = express.Router()

faqRoutes.post("/insert",faqInsert)
faqRoutes.get("/view",faqView)
faqRoutes.get("/view/:id",singleFaqView)
faqRoutes.delete("/delete",faqDelete)
faqRoutes.post("/delete-multi",faqMultiDelete)
faqRoutes.put("/update/:id",faqUpdate)
faqRoutes.post("/change-status",changeFaqStatus)



module.exports = {faqRoutes}