const express = require('express')
const cities = express.Router()
const City = require(process.cwd() +"/model/City.js")

cities.get("/:city",(req, res) => {
   res.send(`<h1> ${req.params.city} </h1>`);
});

module.exports = cities;



