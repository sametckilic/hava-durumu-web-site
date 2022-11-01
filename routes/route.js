const express = require('express')
const router = express.Router()
const app = express()
const path = require('path')
app.use(express.static(path.join(process.cwd(), 'public')));
/* 
var cityID;

router.post('/:id', (req, res) => {
   cityID = req.params.id;
  }) */

router.get('/:id', (req, res) => {
    res.send(req.params.id);
   
})

module.exports= router;



