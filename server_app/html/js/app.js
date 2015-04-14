var app = angular.module('app', []);

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

	};


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

