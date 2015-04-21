var app = angular.module('app', ['ngRoute', 'ui.sortable', 'ui.bootstrap']);

app.run(function ($rootScope, $location, AuthService) {
	app._baseURL = 'http://localhost:8080';

	$rootScope.$on('$routeChangeStart', function (event, next, current) {
	
	});

	$rootScope.$on('$locationChangeStart', function (event, next, current) {
	console.log('in $locationChangeStart...');
		for (var i in window.routes) {
			console.log(i + '  ' + next.indexOf(i));
			if (next.indexOf(i) != -1) {

				if (window.routes[i].requireLogin && AuthService.userCredentials.authenticated !== true) {
					alert("You need to be authenticated to see this page!");
					$location.path('/login');
					//event.preventDefault();

				}
			}
		}
	});
});


app.config(['$routeProvider', function($routeProvider) {
	
	
	window.routes =	{
			
			"/backlog": {
			templateUrl: 'views/backlog.html',
			controller: '',
			requireLogin: true
		},
			
			"/notdone": {
			templateUrl: 'views/notdone.html', 
			controller: '', 
			requireLogin: true
		},
			
			"/login": {
			templateUrl: 'views/login.html', 
			controller: '', 
			requireLogin: false
		},
			
			"/settings": {
			templateUrl: 'views/account_settings.html', 
			controller: '', 
			requireLogin: true
		}
	};

    //this loads up our routes dynamically from the previous object 
    for(var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    }
    $routeProvider.otherwise({redirectTo: 'login'});
	
	
	  
}]);





app.factory('AuthService', function ($http) {
	_this = this;
	var authService = {};
	authService.userCredentials = { firstName : "", lastName : "", authenticated: false, email : "", password : "", rememberMe : true};

  	authService.login = function (credentials) {
		return $http.post( app._baseURL + "/login", credentials).
			// success(function(data, status, headers, config) {
			success(function(data) {
				if (data.error === false) {
					authService.userCredentials._id = data._id;
					authService.userCredentials.firstName = data.firstName;
					authService.userCredentials.lastName = data.lastName;
					authService.userCredentials.email = data.email;
					authService.userCredentials.password = data.password;
					authService.userCredentials.authenticated = true;
				} else {
					authService.userCredentials._id = "";
					authService.userCredentials.firstName = "";
					authService.userCredentials.lastName = "";
					authService.userCredentials.email = "";
					authService.userCredentials.password = "";
					authService.userCredentials.authenticated = false;
				}
			}).
			error(function(data, status, headers, config) {
				console.log(data);
				authService.userCredentials._id = "";
				authService.userCredentials.firstName = "";
				authService.userCredentials.lastName = "";
				authService.userCredentials.email = "";
				authService.userCredentials.password = "";
				authService.userCredentials.authenticated = false;
			});
  };
 
	authService.logout = function () {
		authService.userCredentials._id = "";
		authService.userCredentials.firstName = "";
		authService.userCredentials.lastName = "";
		authService.userCredentials.email = "";
		authService.userCredentials.password = "";
		authService.userCredentials.authenticated = false;
  };
 

  authService.isAuthenticated = function () {
    return !!authService.userCredentials.authenticated;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
 
  return authService;
});

app.controller('AgileCtrl', function($scope, $location, $http, AuthService) {
	var _this = this;
	this.ver = angular.version.full;
	this.listTypes = ["List", "Grid"];
	this.listType = "Grid";
	this.loginForm = { email : "rbaine@symbience.com", password : "wave", rememberMe : true};
	this.projectForm = 	{
        "userId" : "",
        "name" : "",
        "enableIterations" : true,
        "enableAcceptanceCriteria" : false,
        "enableTimeTracking" : false,
        "agileEstimationType" : 0
	};

	this.User = {};
	this.Account = {};
	this.Projects = [];
	
	this.errMsg = "";

	this.itemsA = [
		{"id": "100", "sel": false}, 
		{"id": "101", "sel": false}, 
		{"id": "102", "sel": false}, 
		{"id": "103", "sel": false},
		{"id": "104", "sel": false},
		{"id": "105", "sel": false},
		{"id": "106", "sel": false}
	];

	this.itemsB = [
		{"id": "200", "sel": false}, 
		{"id": "201", "sel": false}, 
		{"id": "202", "sel": false}, 
		{"id": "203", "sel": false}
	];

	this.curCard = "n/a";
	this.modelList = "";


	


	//----------------------------------------------------------------
	// User Authentication Functions
	//

	this.login = function (userInfo) {
		//AuthService.login return a promise
		AuthService.login(userInfo)
			.then(function (user) {
				console.log("user:" + JSON.stringify(user));
				if (user.data.error === false) {
					//todo: need to get user & account object here
					getUser(AuthService.userCredentials._id);
					_this.errMsg = "";
					$location.path("/notdone");
				} else {
					//alert("bad");
					_this.errMsg = "bad";
				};
			}, function () {
				console.log("assume bad?");
				_this.errMsg = "bad";
			});

	};




	this.userAuthenticated = function () {
		return AuthService.userCredentials.authenticated;
	};

	this.userName = function () {
		return AuthService.userCredentials.firstName + ' ' + AuthService.userCredentials.lastName;
	};

	this.logout = function () {
		//todo: implement logout function in AuthService
		AuthService.logout();
		$location.path("/login");
	};

	var getUser = function (id) {
		$http.get( app._baseURL + "/user/" + id).
		  success(function(data, status, headers, config) {
		  	console.log(data);
		  	_this.User = data;
		  	_this.projectList(id);
		  	console.log(_this.User);
		  }).
		  error(function(data, status, headers, config) {
		    console.log(data);
		    _this.User = {};
		  });

	};



	this.newProject = function (newProject) {
		newProject.userId = AuthService.userCredentials._id;
		$http.post( app._baseURL + "/project", newProject).
		  success(function(data, status, headers, config) {
		  	//todo: refresh project list here
		  	//todo: reset new project form
		  	_this.projectForm.name = "";
		  	_this.projectList(AuthService.userCredentials._id);
		  	console.log(data);
		  }).
		  error(function(data, status, headers, config) {
		    console.log(data);
		  });
	};

	this.projectList = function (userId) {
		$http.get( app._baseURL + "/projectList/" + userId).
		  success(function(data, status, headers, config) {
		  	_this.Projects = data;
		  	console.log(data);
		  }).
		  error(function(data, status, headers, config) {
		  	_this.Projects = [];
		    console.log(data);
		  });
	};

	this.projectDelete = function (id) {
		$http.delete( app._baseURL + "/project/" + id).
		  success(function(data, status, headers, config) {
		  	_this.projectList(AuthService.userCredentials._id);
		  	console.log(data);
		  }).
		  error(function(data, status, headers, config) {
		  	_this.Projects = [];
		    console.log(data);
		  });
	};




	this.updateView = function() {
		console.log(_this.listType);
		_this.sortableOptions.placeholder = (_this.listType === 'List') ? "placeholder-list" : "placeholder-grid";
  	};
	

	this.listStories = function () {
		_this.modelList = 'Left List:\n';
		for (var iA = 0; iA < _this.itemsA.length; iA++) {
			console.log(_this.itemsA[iA]);
			_this.modelList += _this.itemsA[iA].id + ', ';
		}
		_this.modelList += '\n\nRight List:\n';
		for (var iB = 0; iB < _this.itemsB.length; iB++) {
			console.log(_this.itemsB[iB]);
			_this.modelList += _this.itemsB[iB].id + ', ';
		}
	};

	this.select = function(item){
		for (var iA = 0; iA < _this.itemsA.length; iA++) {
			_this.itemsA[iA].sel = false;
		}
		for (var iB = 0; iB < _this.itemsB.length; iB++) {
			_this.itemsB[iB].sel = false;
		}
		_this.curCard = item.id;
		item.sel = true;
	};

	 this.sortableOptions = {
	 	
    	//placeholder: "placeholder-list",
    	placeholder: (_this.listType === 'List') ? "placeholder-list" : "placeholder-grid",
    	connectWith: [".stories", ".iterations"]
  	};

});

