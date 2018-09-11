const CategoriesController = require('../controllers/categories.controller');
const Passport = require('../middlewares/passport');

module.exports = function (app) {
    app.get('/api/categories', [
        CategoriesController.list
    ]);
    app.get('/api/categories/:categoryId', [
        CategoriesController.getById
    ]);
    app.post('/api/categories', [
        CategoriesController.insert
    ]);
    app.patch('/api/categories/:categoryId', [
        Passport.validJWTNeeded,
        //middleware permission to edit category
        CategoriesController.patchById
    ]);
    app.delete('/api/categories/:categoryId', [
        Passport.validJWTNeeded,
        //middleware permission to delete category
        CategoriesController.deleteById
    ]);
}