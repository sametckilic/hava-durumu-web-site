const express = require('express')
const path = require('path')
const app = express()
app.listen(3000);
// db connection
const dbConnect = require('./config/dbConnect');

// view engine configuration
app.set('view engine','ejs');
app.set('views','views');


// routes
const cities = require('./routes/cities.js');
const index = require('./routes/index.js');
const error = require('./routes/error.js');

app.use('/', index);

app.use('/cities', cities);

app.use(error);




