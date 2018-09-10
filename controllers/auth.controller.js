const jwt = require('jwt-simple');
const UserModel = require('../models/user.model');
const _ = require('lodash');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
}

exports.signin = (req, res) => {
    res.send({
        access_token: tokenForUser(req.user)
    });
}

exports.signup = (req, res) => {
    const body = _.pick(req.body, ["firstName", "lastName", "email", "password"]);
    UserModel.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (user) return res.status(422).send({ error: 'Email is already in use' });

        const newUser = new UserModel(body);
        newUser.save((err) => {
            if (err) return res.status(500).send(err);
            res.send({ access_token: tokenForUser(newUser) });
        });
    });
}