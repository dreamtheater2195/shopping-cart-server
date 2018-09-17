const UserModel = require('../models/user.model');
const ProductModel = require('../models/product.model');
var { ObjectID } = require('mongodb');

exports.addProductToCart = async (req, res) => {
    //add the items in the products array of the cart of user, 
    //create the cart in the process if one does not exist
    const { owner, productId } = req.params;
    if (!ObjectID.isValid(owner) || !ObjectID.isValid(productId)) {
        return res.status(404).send();
    }
    try {
        //add item to cart
        const user = await UserModel.findById(owner);
        if (!user) {
            return res.status(404).send();
        }
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).send();
        }
        if (product.quantity == 0) {
            return res.status(400).send({ error: "not enough product quantity available." })
        }
        if (!user.cart) {
            user.cart = {
                active: true,
                modifiedOn: new Date(),
                products: [{
                    productId,
                    quantity: 1
                }]
            }
        }
        else {
            user.cart.modifiedOn = new Date();
            let existingProduct = false;
            for (let i = 0; i < user.cart.products.length; i++) {
                if (user.cart.products[i].productId == productId) {
                    user.cart.products[i].quantity += 1;
                    existingProduct = true;
                    break;
                }
            }
            if (!existingProduct) {
                user.cart.products.push({
                    productId,
                    quantity: 1
                });
            }
        }

        //Reserve product inventory
        product.quantity -= 1;
        let existingUser = false;
        for (let i = 0; i < product.reservations.length; i++) {
            if (product.reservations[i].userId == owner) {
                product.reservations[i].quantity += 1;
                existingUser = true;
                break;
            }
        }
        if (!existingUser) {
            product.reservations.push({
                userId: owner,
                quantity: 1,
                createdOn: new Date()
            })
        }

        const updatedUser = await user.save();
        res.send({
            cart: updatedUser.cart
        });
    } catch (err) {
        res.status(400).send(err);
    }
}