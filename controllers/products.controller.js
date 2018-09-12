// const ProductModel = require('../models/product.model');
// const _ = require('lodash');

// exports.list = (req, res) => {
//     let perPage = req.query.limit ? parseInt(req.query.limit) : 10;
//     let page = req.query.page ? parseInt(req.query.page) : 0;
//     ProductModel.find()
//         .limit(perPage)
//         .skip(page * perPage)
//         .exec((err, products) => {
//             if (err) {
//                 return res.status(400).send(err);
//             }
//             res.send({ products });
//         });
// }

// exports.getProductsForCategory = (req, res) => {
//     let { categoryId } = req.params;
// }

// exports.getById = (req, res) => {
//     let categoryId = req.params.categoryId;
//     CategoryModel.findById(categoryId, (err, category) => {
//         if (err)
//             return res.status(400).send(err);
//         res.send({ category });
//     });
// }

// exports.patchById = async (req, res) => {
//     let categoryId = req.params.categoryId;
//     const body = _.pick(req.body, ['name', 'description']);
//     CategoryModel.findById(categoryId, (err, category) => {
//         if (err)
//             return res.status(400).send(err);
//         Object.keys(body).forEach((key) => {
//             category[key] = body[key];
//         });
//         category.save((err) => {
//             if (err)
//                 return res.status(400).send(err);
//             res.send({ category });
//         });
//     });
// }

// exports.deleteById = (req, res) => {
//     CategoryModel.findOneAndRemove({ _id: req.params.categoryId }).then((category) => {
//         if (!category) {
//             return res.status(404).send();
//         }
//         res.send({ category });
//     }).catch((err) => {
//         res.status(400).send(err);
//     });
// }
