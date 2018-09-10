const UserModel = require('../models/user.model');
const _ = require('lodash');

exports.list = (req, res) => {
    let perPage = req.query.limit ? parseInt(req.query.limit) : 10;
    let page = req.query.page ? parseInt(req.query.page) : 0;
    UserModel.find()
        .limit(perPage)
        .skip(page * perPage)
        .exec((err, users) => {
            if (err) {
                return res.status(400).send(err);
            }
            res.send({ users });
        });
}

exports.getById = (req, res) => {
    let userId = req.params.userId;
    UserModel.findById(userId, (err, user) => {
        if (err)
            return res.status(400).send(err);
        res.send({ user });
    });
}

exports.patchById = async (req, res) => {
    let userId = req.params.userId;
    const body = _.pick(req.body, ['firstName', 'lastName', 'email', 'password']);
    UserModel.findById(userId, (err, user) => {
        if (err)
            return res.status(400).send(err);
        Object.keys(body).forEach((key) => {
            user[key] = body[key];
        });
        user.save((err, updatedUser) => {
            if (err)
                return res.status(400).send(err);
            res.send({ user });
        });
    });
}

exports.deleteById = (req, res) => {
    UserModel.findOneAndRemove({ _id: req.params.userId }).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send({ user });
    }).catch((err) => {
        res.status(400).send(err);
    });
}
