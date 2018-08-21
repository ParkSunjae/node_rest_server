var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var jwt = require('jsonwebtoken');
var jwt_secret = 'secret';


var dbconfig   = require('../database/db.js');
var connection = mysql.createConnection(dbconfig);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/authenticate', function(req, res){
	User.findOne({email: req.body.email, password: req.body.password}, function(err, user){
		if(err) {
			res.json({
				type: false,
				data: 'Error occured' + err
			});
		} else {
			if (user) {
				res.json({
					type: true,
					data: user,
					token: user.token,
				});
			} else {
				res.json({
					type: false,
					data: 'Incorrect email/password'
				})
			}
		}
	});
});

router.get('/list', function(req, res, next) {
	connection.query('SELECT * from Persons', function(err, rows) {
		if(err){
			console.log(err);
			res.send(err.code);
		}else{
			console.log('The solution is: ', rows);
			res.send(rows);
		}

	});
	// return res.json(users);
});

router.post('/addUser', function(req, res, next) {
	// console.log(req.body.id);
	// console.log(req.body.password);
	// console.log(req.body.name);
	// console.log(req.body.age);
	var sql = "INSERT INTO Persons (id, password, name, age) VALUES ('"+req.body.id+"','"+req.body.password+"','"+req.body.name+"','"+req.body.age+"')";
	connection.query(sql, function(err) {
		if(err){
			console.log(err);
			res.send(err.code);
		}else{
			console.log('Success Insert');
			res.send('Success Insert');
		}


	});
});


module.exports = router;
