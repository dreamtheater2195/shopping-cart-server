const UsersController = require('../controllers/users.controller');
const Passport = require('../middlewares/passport');
const config = require('../config/config.json');

module.exports = function (app) {
    app.get('/api/users', [
        Passport.validJWTNeeded,
        //middleware permission to get all users
        UsersController.list
    ]);
    app.get('/api/users/:userId', [
        Passport.validJWTNeeded,
        //middleware to check only this user or admin can access the route
        UsersController.getById
    ]);
    app.patch('/api/users/:userId', [
        Passport.validJWTNeeded,
        //middleware to check only this user or admin can access the route
        UsersController.patchById
    ]);
    app.delete('/api/users/:userId', [
        Passport.validJWTNeeded,
        //middleware to check only admin can access the route
        UsersController.deleteById
    ]);
}