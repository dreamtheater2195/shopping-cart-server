const CartController = require('../controllers/cart.controller');
const Passport = require('../middlewares/passport');
const config = require('../config/config.json');

module.exports = function (app) {
    //return user's cart
    // app.get('/api/cart/:owner', [
    //     //Passport.validJWTNeeded,
    //     CartController.getCart
    // ]);
    //add a product to user's cart
    app.post('/api/cart/:owner/add/:productId', [
        //Passport.validJWTNeeded,
        CartController.addProductToCart
    ]);
    //remove a product from user's cart
    app.post('/api/cart/:owner/remove/:productId', [
        //Passport.validJWTNeeded,
        CartController.removeProductFromCart
    ]);
}