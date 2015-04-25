var app = angular.module('app', ['ui.sortable', 'ngAnimate']);

app.controller('MainCtrl', function($scope, $animate) {
	$scope.name = 'World';
	$scope.ver = angular.version.full;
	$scope.listType = "list";

	$scope.listTypes = ["List", "Grid"];
	$scope.listType = "List";

	$scope.itemsA = [
		{"id": "100", "sel": false}, 
		{"id": "101", "sel": false}, 
		{"id": "102", "sel": false}, 
		{"id": "103", "sel": false},
		{"id": "104", "sel": false},
		{"id": "105", "sel": false},
		{"id": "106", "sel": false}
	];

	$scope.itemsB = [
		{"id": "200", "sel": false}, 
		{"id": "201", "sel": false}, 
		{"id": "202", "sel": false}, 
		{"id": "203", "sel": false}
	];

	$scope.curCard = "n/a";
	$scope.modelList = "";

	$scope.updateView = function() {
		console.log($scope.listType);
		$scope.sortableOptions.placeholder = ($scope.listType === 'List') ? "placeholder-list" : "placeholder-grid";
  	};
	

	$scope.listStories = function () {

		$scope.modelList = 'Left List:\n';
		for (var i = 0; i < $scope.itemsA.length; i++) {
			console.log($scope.itemsA[i]);
			$scope.modelList += $scope.itemsA[i].id + ', ';
		}
		$scope.modelList += '\n\nRight List:\n';
		for (var i = 0; i < $scope.itemsB.length; i++) {
			console.log($scope.itemsB[i]);
			$scope.modelList += $scope.itemsB[i].id + ', ';
		}
	};

	$scope.select = function(item){
		
		for (var i = 0; i < $scope.itemsA.length; i++) {
			$scope.itemsA[i].sel = false;
		}
		for (var i = 0; i < $scope.itemsB.length; i++) {
			$scope.itemsB[i].sel = false;
		}
		$scope.curCard = item.id;
		item.sel = true;
	};

	 $scope.sortableOptions = {
	 	
    	//placeholder: "placeholder-list",
    	placeholder: ($scope.listType === 'List') ? "placeholder-list" : "placeholder-grid",
    	connectWith: [".stories", ".iterations"]
  	};

});

