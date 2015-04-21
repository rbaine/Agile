// var MongoClient = require('mongodb').MongoClient;
var MongoDB = require('mongodb').MongoClient;

var Express = require('express');
var Morgan = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer'); 
var Utils = require('./js/utils');

var State = require('./js/state');
var AgileEstimation = require('./js/agileestimation');
var AgileEstimationType = require('./js/agileestimationtype');
var User = require('./js/user');
var Project = require('./js/project');
var Team = require('./js/team');
var Story = require('./js/story');
var StoryType = require('./js/storytype');
var TaskType = require('./js/tasktype');
var Task = require('./js/task');
var Iteration = require('./js/iteration');
var AcceptanceCriteria  = require('./js/acceptancecriteria');
var Test = require('./js/test');
var TestRun = require('./js/testrun');

var app = Express();

var dbHost = 'mongodb://127.0.0.1';
var dbPort = 27017;
var dbName = '/agile';
var dbConn = null;
var _this = this;

app.use(Morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data



// ***** AGILE ESTIMATION ROUTES *****
app.get('/agileestimation/:id', function (request, response){
     AgileEstimation.get(_this.dbConn, request.params.id, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.get('/agileestimationList/:agileestimationtype', function (request, response){
    AgileEstimation.list(_this.dbConn, request.params.agileestimationtype, function (data){
        response.type('application/json');
        response.send( data );
    });
});

// ***** AGILE ESTIMATION TYPE ROUTES *****
app.get('/agileestimationtypeList', function (request, response){
    AgileEstimationType.list(_this.dbConn, function (data){
        response.type('application/json');
        response.send( data );
    });
});

// ***** STATE ROUTES *****
app.get('/state/:id', function (request, response){
     State.get(_this.dbConn, request.params.id, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.get('/stateList/:projectid', function (request, response){
    State.list(_this.dbConn, request.params.projectid, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.delete('/state/:id', function (request, response){
    State.delete(_this.dbConn, request.params.id, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.post('/state', function (request, response){
    var data = request.body;
    State.post(_this.dbConn, data, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.put('/state', function (request, response){
    var data = request.body;
    State.put(_this.dbConn, data, function (data){
        response.type('application/json');
        response.send( data );
    });
});



// ***** TEAM ROUTES *****
app.get('/team/:id', function (request, response){
     Team.get(_this.dbConn, request.params.id, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.get('/teamList/:projectid', function (request, response){
    Team.list(_this.dbConn, request.params.projectid, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.delete('/team/:id', function (request, response){
    Team.delete(_this.dbConn, request.params.id, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.post('/team', function (request, response){
    var data = request.body;
    Team.post(_this.dbConn, data, function (data){
        response.type('application/json');
        response.send( data );
    });
});


// ***** USER ROUTES *****
app.get('/user/:id', function (request, response){
	 User.get(_this.dbConn, request.params.id, function (data){
	 	response.type('application/json');
		response.send( data );
	});
});

app.get('/userList', function (request, response){
	User.list(_this.dbConn, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.get('/userByEmail/:email', function (request, response){
	User.getByEmail(_this.dbConn, request.params.email, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.delete('/user/:id', function (request, response){
	User.delete(_this.dbConn, request.params.id, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.post('/user', function (request, response){
	var data = request.body;
	User.post(_this.dbConn, data, function (data){
		response.type('application/json');
		response.send( data );
	});
});


app.post('/login', function (request, response){
    var data = request.body;
    User.login(_this.dbConn, data, function (data){
        response.type('application/json');
        response.send( data );
    });
});


app.put('/user', function (request, response){
	var data = request.body;
	User.put(_this.dbConn, data, function (data){
		response.type('application/json');
		response.send( data );
	});
});

// ***** PROJECT ROUTES *****
app.get('/project/:id', function(request, response) {
	Project.get(_this.dbConn, request.params.id, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.get('/projectList/:userid', function (request, response){
	Project.list(_this.dbConn, request.params.userid, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.delete('/project/:id', function (request, response){
	Project.delete(_this.dbConn, request.params.id, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.post('/project', function (request, response){
	var data = request.body;
	Project.post(_this.dbConn, data, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.put('/project', function (request, response){
	var data = request.body;
	Project.put(_this.dbConn, data, function (data){
		response.type('application/json');
		response.send( data );
	});
});



// ***** STORYTYPE ROUTES *****
app.get('/storyType/:id', function(request, response) {
	StoryType.get(_this.dbConn, request.params.id, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.get('/storyTypeList/:projectid', function (request, response){
	StoryType.list(_this.dbConn, request.params.projectid, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.delete('/storyType/:id', function (request, response){
	StoryType.delete(_this.dbConn, request.params.id, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.post('/storyType', function (request, response){
	var data = request.body;
	StoryType.post(_this.dbConn, data, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.put('/storyType', function (request, response){
	var data = request.body;
	StoryType.put(_this.dbConn, data, function (data){
		response.type('application/json');
		response.send( data );
	});
});

// ***** ITERATION ROUTES *****
app.get('/iteration/:id', function(request, response) {
	Iteration.get(_this.dbConn, request.params.id, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.get('/iterationList/:projectid', function (request, response){
	Iteration.list(_this.dbConn, request.params.projectid, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.delete('/iteration/:id', function (request, response){
	Iteration.delete(_this.dbConn, request.params.id, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.post('/iteration', function (request, response){
	var data = request.body;
	Iteration.post(_this.dbConn, data, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.put('/iteration', function (request, response){
	var data = request.body;
	Iteration.put(_this.dbConn, data, function (data){
		response.type('application/json');
		response.send( data );
	});
});


// ***** STORY ROUTES *****
app.get('/story/:id', function(request, response) {
    Story.get(_this.dbConn, request.params.id, function (data){
        response.type('application/json');
        response.send( data );
    });
});


//todo: testing collection joins
app.get('/storyFull/:id', function(request, response) {
    Story.full(_this.dbConn, request.params.id, function (data){
        response.type('application/json');
        response.send( data );
    });
    // var t = this;
    // var s = "";
    // Story.get(_this.dbConn, request.params.id, function (data){
    //     t.s = JSON.parse(data);
    //     Task.list(_this.dbConn, request.params.id, function (data){
    //         t.s.tasks = JSON.parse(data);
    //         response.type('application/json');
    //         response.send( t.s );
    //     });
    // });
});


app.get('/storyList/:projectid', function (request, response){
    Story.list(_this.dbConn, request.params.projectid, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.delete('/story/:id', function (request, response){
    Story.delete(_this.dbConn, request.params.id, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.post('/story', function (request, response){
    var data = request.body;
    Story.post(_this.dbConn, data, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.put('/story', function (request, response){
    var data = request.body;
    Story.put(_this.dbConn, data, function (data){
        response.type('application/json');
        response.send( data );
    });
});




// ***** ACCEPTANCECRITERIA ROUTES *****
app.get('/acceptancecriteria/:id', function(request, response) {
    AcceptanceCriteria.get(_this.dbConn, request.params.id, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.get('/acceptancecriteriaList/:storyid', function (request, response){
    AcceptanceCriteria.list(_this.dbConn, request.params.storyid, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.delete('/acceptancecriteria/:id', function (request, response){
    AcceptanceCriteria.delete(_this.dbConn, request.params.id, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.post('/acceptancecriteria', function (request, response){
    var data = request.body;
    AcceptanceCriteria.post(_this.dbConn, data, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.put('/acceptancecriteria', function (request, response){
    var data = request.body;
    AcceptanceCriteria.put(_this.dbConn, data, function (data){
        response.type('application/json');
        response.send( data );
    });
});


// ***** TEST ROUTES *****
app.get('/test/:id', function(request, response) {
    Test.get(_this.dbConn, request.params.id, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.get('/testList/:storyid', function (request, response){
    Test.list(_this.dbConn, request.params.storyid, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.delete('/test/:id', function (request, response){
    Test.delete(_this.dbConn, request.params.id, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.post('/test', function (request, response){
    var data = request.body;
    Test.post(_this.dbConn, data, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.put('/test', function (request, response){
    var data = request.body;
    Test.put(_this.dbConn, data, function (data){
        response.type('application/json');
        response.send( data );
    });
});



// ***** TESTRUN ROUTES *****
app.get('/testrun/:id', function(request, response) {
    TestRun.get(_this.dbConn, request.params.id, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.get('/testrunList/:testid', function (request, response){
    TestRun.list(_this.dbConn, request.params.testid, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.delete('/testrun/:id', function (request, response){
    TestRun.delete(_this.dbConn, request.params.id, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.post('/testrun', function (request, response){
    var data = request.body;
    TestRun.post(_this.dbConn, data, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.put('/testrun', function (request, response){
    var data = request.body;
    TestRun.put(_this.dbConn, data, function (data){
        response.type('application/json');
        response.send( data );
    });
});


// ***** TASKTYPE ROUTES *****
app.get('/tasktype/:id', function(request, response) {
    TaskType.get(_this.dbConn, request.params.id, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.get('/tasktypeList/:projectid', function (request, response){
    TaskType.list(_this.dbConn, request.params.projectid, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.delete('/tasktype/:id', function (request, response){
    TaskType.delete(_this.dbConn, request.params.id, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.post('/tasktype', function (request, response){
    var data = request.body;
    TaskType.post(_this.dbConn, data, function (data){
        response.type('application/json');
        response.send( data );
    });
});

app.put('/tasktype', function (request, response){
    var data = request.body;
    TaskType.put(_this.dbConn, data, function (data){
        response.type('application/json');
        response.send( data );
    });
});


// ***** TASK ROUTES *****
app.get('/task/:id', function(request, response) {
	Task.get(_this.dbConn, request.params.id, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.post('/task', function(request, response) {
	var data = request.body;
	Task.post(_this.dbConn, data, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.delete('/task/:id', function(request, response) {
	Task.delete(_this.dbConn, request.params.id, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.put('/task', function(request, response) {
	var data = request.body;
	Task.put(_this.dbConn, data, function (data){
		response.type('application/json');
		response.send( data );
	});
});

app.get('/taskList/:storyid', function(request, response) {
	Task.list(_this.dbConn, request.params.storyid, function (data){
		response.type('application/json');
		response.send( data );
	});
});



/* serves all the static files */
 app.get(/^(.+)$/, function(req, res){ 
     // console.log('dir : ' + __dirname);
     console.log('static file request : ' + req.params);
     res.sendFile( __dirname + req.params[0]); 
 });



var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

	MongoDB.connect(dbHost + ':' + dbPort.toString() + dbName, function(err, db) {
		if(err) throw err;
		_this.dbConn = db;
	});

  console.log('Agile_Node app listening at: %s:%s', host, port);
});

