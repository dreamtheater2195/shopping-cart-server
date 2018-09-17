const ProductModel = require('../models/product.model');
const CategoryModel = require('../models/category.model');
const _ = require('lodash');
var { ObjectID } = require('mongodb');

exports.list = (req, res) => {
    let perPage = req.query.limit ? parseInt(req.query.limit) : 10;
    let page = req.query.page ? parseInt(req.query.page) : 0;
    ProductModel.find()
        .limit(perPage)
        .skip(page * perPage)
        .exec((err, products) => {
            if (err) {
                return res.status(400).send(err);
            }
            res.send({ products });
        });
}

exports.postProductForCategory = (req, res) => {
    const body = _.pick(req.body, ["name", "description", "imagePath", "price", "quantity"]);
    body.categoryId = req.params.categoryId;

    CategoryModel.findById(req.params.categoryId).then(category => {
        if (!category) {
            return res.status(404).send();
        }
        const product = new ProductModel(body);
        product.save(err => {
            if (err) return res.status(400).send(err);
            res.status(201).send({ product });
        });
    }, err => {
        res.status(400).send(err);
    });
}

exports.getProductsForCategory = (req, res) => {
    let { categoryId } = req.params;

    if (!ObjectID.isValid(categoryId)) {
        return res.status(404).send();
    }

    ProductModel.find({ categoryId }).then((products) => {
        res.send({ products });
    }, (err) => {
        res.status(400).send(err);
    });
}

exports.getProductForCategory = (req, res) => {
    let { categoryId, productId } = req.params;

    if (!ObjectID.isValid(categoryId) || !ObjectID.isValid(productId)) {
        return res.status(404).send();
    }

    ProductModel.findOne({ _id: productId, categoryId }).then((product) => {
        if (!product) {
            return res.status(404).send();
        }
        res.send({ product });
    }, (err) => {
        res.status(400).send(err);
    });
}

exports.patchProductForCategory = async (req, res) => {
    let { categoryId, productId } = req.params;

    if (!ObjectID.isValid(categoryId) || !ObjectID.isValid(productId)) {
        return res.status(404).send();
    }

    const body = _.pick(req.body, ["name", "description", "imagePath", "price", "quantity"]);

    ProductModel.findOneAndUpdate(
        { _id: productId, categoryId },
        { $set: body },
        { new: true }
    ).then((product) => {
        if (!product) {
            return res.status(404).send();
        }
        res.send({ product });
    }, (err) => {
        res.status(400).send(err);
    });
}

exports.deleteProductForCategory = (req, res) => {
    let { categoryId, productId } = req.params;

    if (!ObjectID.isValid(categoryId) || !ObjectID.isValid(productId)) {
        return res.status(404).send();
    }

    ProductModel.findOneAndRemove({ _id: productId, categoryId }).then((product) => {
        if (!product) {
            return res.status(404).send();
        }
        res.send({ product });
    }).catch((err) => {
        res.status(400).send(err);
    });
}
