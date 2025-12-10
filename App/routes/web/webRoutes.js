let express = require('express');
const { userauthRoutes } = require('./userAuthRoutes');
const { homepageRoutes } = require('./homePageRoutes');
const { cartRoutes } = require('./cartRoutes');
const { orderRoutes } = require('./orderRoutes');

let webRoutes = express.Router();

webRoutes.use('/user',userauthRoutes) //  http://localhost:8000/web/user
webRoutes.use('/home',homepageRoutes)   //  http://localhost:8000/web/home
webRoutes.use('/cart',cartRoutes)
webRoutes.use('/order',orderRoutes)


module.exports = {webRoutes}