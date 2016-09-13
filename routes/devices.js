/**
 * New node file
 */
var express = require('express');
var router = express.Router();
var esService=require('../services/esService.js');


//console.log(result);
router.get('/', function(req, res, next) {
//  res.send('respond with devices');
  //res.send(result);
	/* GET users listing. */
  esService.testES(req, res, next);
});

module.exports = router;
