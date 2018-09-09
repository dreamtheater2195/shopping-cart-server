const Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ShoppingCart', { useNewUrlParser: true });

const products = [
    {
        imagePath: 'https://esportsranks.com/wp-content/uploads/2017/04/League-of-Legends-News-Ranks.png',
        title: 'League of Legends',
        description: 'League of Legends (abbreviated LoL) is a multiplayer online battle arena video game developed and published by Riot Games',
        price: 10
    },
    {
        imagePath: 'https://cdn.arstechnica.net/wp-content/uploads/2017/08/bg_03.jpg',
        title: 'Dota 2',
        description: 'Every day, millions of players worldwide enter battle as one of over a hundred Dota heroes.',
        price: 20
    },
    {
        imagePath: 'http://media.steampowered.com/apps/csgo/blog/images/posts/Halloween.png',
        title: 'Counter-Strike: Global Offensive',
        description: 'Counter-Strike: Global Offensive (CS: GO) will expand upon the team-based action gameplay that it pioneered when it was launched 14 years ago',
        price: 15
    },
    {
        imagePath: 'https://d1pqlgpcx1bu0k.cloudfront.net/static/img/GOW-OG-image.jpg',
        title: 'God of War 4',
        description: 'God of War is an upcoming third-person action-adventure video game in development by Santa Monica Studio',
        price: 50
    },
];

Product.insertMany(products, function (err, docs) {

});