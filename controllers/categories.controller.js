const CategoryModel = require('../models/category.model');
const _ = require('lodash');
var { ObjectID } = require('mongodb');

exports.list = (req, res) => {
    let perPage = req.query.limit ? parseInt(req.query.limit) : 10;
    let page = req.query.page ? parseInt(req.query.page) : 0;
    CategoryModel.find()
        .limit(perPage)
        .skip(page * perPage)
        .exec((err, categories) => {
            if (err) {
                return res.status(400).send(err);
            }
            res.send({ categories });
        });
}

exports.insert = (req, res) => {
    const body = _.pick(req.body, ["name", "description"]);
    const category = new CategoryModel(body);
    category.save((err) => {
        if (err)
            return res.status(400).send(err);
        res.status(201).send({ category });
    });
}

exports.getById = (req, res) => {
    let categoryId = req.params.categoryId;

    if (!ObjectID.isValid(categoryId)) {
        return res.status(404).send();
    }
    CategoryModel.findById(categoryId, (err, category) => {
        if (err)
            return res.status(400).send(err);
        if (!category)
            return res.status(404).send();
        res.send({ category });
    });
}

exports.patchById = async (req, res) => {
    let categoryId = req.params.categoryId;

    if (!ObjectID.isValid(categoryId)) {
        return res.status(404).send();
    }
    const body = _.pick(req.body, ['name', 'description']);
    CategoryModel.findById(categoryId, (err, category) => {
        if (err) {
            return res.status(400).send(err);
        }
        if (!category) {
            return res.status(404).send(err);
        }
        Object.keys(body).forEach((key) => {
            category[key] = body[key];
        });
        category.save((err) => {
            if (err)
                return res.status(400).send(err);
            res.send({ category });
        });
    });
}

exports.deleteById = (req, res) => {
    CategoryModel.findOneAndRemove({ _id: req.params.categoryId }).then((category) => {
        if (!category) {
            return res.status(404).send();
        }
        res.send({ category });
    }).catch((err) => {
        res.status(400).send(err);
    });
}
