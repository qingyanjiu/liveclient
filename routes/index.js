var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/calculate', function(req, res) {
	res.render('calculate', 
		{
	    	title: '计算',
	    	success:req.flash('success'),
	    	error:req.flash('error'),
	    	result:req.flash('result')
		});
});


router.post('/calculate', function(req, res) { 
	var first = req.body['first'];
	var second = req.body['second'];
	var symbol = req.body['symbol'];
	var result ;
	if(symbol == '0')
		result = Number(first) + Number(second);
	else if(symbol == '1')
		result = Number(first) - Number(second);
	else if(symbol == '2')
		result = Number(first) * Number(second);
	else if(symbol == '3')
		result = Number(first) / Number(second);
	// req.flash('success', '􏿲􏿳􏱛􏴛计算完成！');
	// req.flash('result',result);

	// res.redirect('/calculate');

	res.json({success:'ok',result:result});
});



module.exports = router;
