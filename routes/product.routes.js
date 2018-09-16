const ProductsController = require('../controllers/products.controller');
const Passport = require('../middlewares/passport');

module.exports = function (app) {
    //get all products
    app.get('/api/products', [
        ProductsController.list
    ]);
    //insert new product for category
    app.post('/api/categories/:categoryId/products', [
        ProductsController.postProductForCategory
    ]);
    //get products for category
    app.get('/api/categories/:categoryId/products', [
        ProductsController.getProductsForCategory
    ]);
    //get product for category
    app.get('/api/categories/:categoryId/products/:productId', [
        ProductsController.getProductForCategory
    ]);
    //patch existing category
    app.patch('/api/categories/:categoryId/products/:productId', [
        Passport.validJWTNeeded,
        //middleware permission to edit category
        ProductsController.patchProductForCategory
    ]);
    //delete existing category
    app.delete('/api/categories/:categoryId/products/:productId', [
        Passport.validJWTNeeded,
        //middleware permission to delete category
        ProductsController.deleteProductForCategory
    ]);
}