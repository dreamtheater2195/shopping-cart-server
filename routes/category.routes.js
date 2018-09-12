const CategoriesController = require('../controllers/categories.controller');
const Passport = require('../middlewares/passport');

module.exports = function (app) {
    //get all categories
    app.get('/api/categories', [
        CategoriesController.list
    ]);
    //get category by id
    app.get('/api/categories/:categoryId', [
        CategoriesController.getById
    ]);
    //insert new category
    app.post('/api/categories', [
        CategoriesController.insert
    ]);
    //patch existing category
    app.patch('/api/categories/:categoryId', [
        Passport.validJWTNeeded,
        //middleware permission to edit category
        CategoriesController.patchById
    ]);
    //delete existing category
    app.delete('/api/categories/:categoryId', [
        Passport.validJWTNeeded,
        //middleware permission to delete category
        CategoriesController.deleteById
    ]);
}