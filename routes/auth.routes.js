const AuthController = require('../controllers/auth.controller');
const Passport = require('../middlewares/passport');
const UserValidationMiddleware = require('../middlewares/auth.validation.middleware');

module.exports = function (app) {
    app.post('/api/signin', [
        UserValidationMiddleware.hasAuthValidFields,
        Passport.validLocalLoginNeeded,
        AuthController.signin
    ]);
    app.post('/api/signup', [
        UserValidationMiddleware.hasSignupValidFields,
        AuthController.signup
    ]);
}