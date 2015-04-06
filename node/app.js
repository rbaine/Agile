var MongoClient = require('mongodb').MongoClient
var MongoDB = require('mongodb').MongoClient
var Express = require('express')
var app = Express()

var dbHost = 'mongodb://127.0.0.1';
var dbPort = 27017;
var dbName = '/agile';
var db = null;
var _this = this;


app.get('/user/:id', function(request, response){
	getUserLean(request.params.id, function(data){
		response.send( data );
	})
});

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port

	MongoDB.connect(dbHost + ':' + dbPort.toString() + dbName, function(err, db) {
		if(err) throw err;
		_this.db = db;
	});

  console.log('Example app listening at: %s:%s', host, port);
});


getUserLean = function(uid, callback) {
	var collection = _this.db.collection('users');
	var where = {id: Number(uid)};
	console.log(where);

	collection.findOne(where, function (err, u) {
		if (u === null) {
			_this.user = JSON.stringify({err: 'error, ' + JSON.stringify(where) + ' not found.'});
		} else {
			// _this.user = u.firstname + ' ' + u.lastname;
			_this.user = JSON.stringify(u);
		}
		callback('JSON: ' + _this.user);
	});
};

getUser = function(uid, callback) {
	var _this = this;
	var user = '';
	
	MongoClient.connect('mongodb://127.0.0.1:27017/agile', function(err, db) {
		if(err) throw err;
		var collection = db.collection('users');
		var where = {id: Number(uid)};
		console.log(where);

		collection.findOne(where, function (err, u) {
			if (u === null) {
				_this.user = JSON.stringify({err: 'error, ' + JSON.stringify(where) + ' not found.'});
			} else {
				// _this.user = u.firstname + ' ' + u.lastname;
				_this.user = JSON.stringify(u);
			}
			callback('JSON: ' + _this.user);
			db.close();	
 		});
	});
	
};

// MongoClient.connect('mongodb://127.0.0.1:27017/agile', function(err, db) {
//     if(err) throw err;

//  	// var collection = db.collection('account');
//  	var collection = db.collection('users');

//  	collection.count(function (err, cnt) {
//  		if (err === null) {
// 			console.log('Count: ' + cnt);
//  		} else {
// 			console.log(err);	
//  		}

//  		collection.find().toArray(function (err, u) {
// 			err ? console.log(err) : console.log('cool... no error...');
// 			for (var i = 0; i < u.length; i++){
// 				console.log( u[i].firstname + ' ' + u[i].lastname );
// 			}
// 			db.close();	
//  		});
 		
//  		// while (c.hasNext() ){
//  		// 	console.log(c.next().firstname);
//  		// }
 		
//  	});
 	
// });	

//   