const express = require('express');
const route = express.Router();

route.get('/home', (req, res, next) => {
    const myIpAddress = req.connection.remoteAddress; 

    console.log(myIpAddress);
    res.status(200).json('cors enabled');
});

route.get('/about', (req, res, next) => {
    res.status(200).json('about')
});

route.get('/contact', (req, res, next) => {
    res.status(200).json('contact')
});

module.exports = route;