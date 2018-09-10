const UserController = require('../controllers/user.controller');
const Passport = require('../middlewares/passport');
const config = require('../config/config.json');

module.exports = function (app) {
    app.get('/api/users', [
        Passport.validJWTNeeded,
        UserController.list
    ]);
    app.get('/api/users/:userId', [
        Passport.validJWTNeeded,
        UserController.getById
    ]);
    app.patch('/api/users/:userId', [
        Passport.validJWTNeeded,
        UserController.patchById
    ]);
    app.delete('/api/users/:userId', [
        Passport.validJWTNeeded,
        UserController.deleteById
    ]);
}