/**
 * New node file
 */
var express = require('express');
var router = express.Router();


//console.log(result);
router.get('/', function(req, res, next) {

	res.render('qiandao');

});

module.exports = router;
