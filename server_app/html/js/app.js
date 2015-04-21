var app = angular.module('app', ['ngRoute', 'ui.sortable']);

app.config(['$routeProvider', function($routeProvider) {
	
	
	window.routes =	{
			
			"/backlog": {
			templateUrl: 'views/backlog.html',
			controller: '',
			requireLogin: false
		},
			
			"/notdone": {
			templateUrl: 'views/notdone.html', 
			controller: '', 
			requireLogin: false
		}
	};

    //this loads up our routes dynamically from the previous object 
    for(var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    }
    $routeProvider.otherwise({redirectTo: 'notdone'});
	
	
	  
  }]);

app.controller('AgileCtrl', function($scope) {
	var _this = this;
	this.name = 'World';
	this.ver = angular.version.full;
	this.listTypes = ["List", "Grid"];
	this.listType = "Grid";

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

app.controller('RegisterCtrl', function($scope, $http) {
	var _this = this;
	var _baseURL = 'http://localhost:8080';
	this.errEmail = false;
	this.errPassword = false;
	this.errMsg = "";

	this.User = {
		//_id : "",
		firstName : "",
		lastName : "",
		password : "",
		email : "",
		admin : false,
		fullName : function () {
		    return this.firstName + " " + this.lastName;
		}

	}


    this.userEmailInUse = function(email) {
    	email = (email === undefined) ? "" : email;
		if (email.length === 0 ) {
			_this.errEmail = true;
			return;
		}

		$http.get( _baseURL + "/userByEmail/" + email).
		  success(function(data, status, headers, config) {
		  	_this.errEmail = (data.count !== 0 ? true : false);
		  	_this.errMsg = (data.count !== 0 ? "Email is already in use..." : "");
		  }).
		  error(function(data, status, headers, config) {
		    console.log(data);
		    _this.errEmail = true;
		  	_this.errMsg = "Could not verify use email... try again later... ";
		  });
    };

   

    this.register = function() {
		$http.post( _baseURL + "/user/", _this.User).
		  success(function(data, status, headers, config) {
		    console.log("Made a user...");
		    console.log(data);
		  }).
		  error(function(data, status, headers, config) {
		    console.log(data);
		  });
    };
});

