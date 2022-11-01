const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const dbConnect = require('./config/dbConnect');
const cities = require('./routes/route.js');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/cities',cities);