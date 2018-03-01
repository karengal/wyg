var express = require('express');
var router = express.Router();
var db = require('./db.js');

router.get('', (req, res)=>{
      res.send('reservations is working');
 });

 module.exports = router;