let express = require('express');
const { slider, homeProduct, megaMenu } = require('../../controllers/web/homePageController');

let homepageRoutes = express.Router();

homepageRoutes.get('/slider',slider)
homepageRoutes.get('/home-product',homeProduct)
homepageRoutes.get('/mega-menu',megaMenu)

module.exports = {homepageRoutes}