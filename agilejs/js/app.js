var app = angular.module('app', ['ui.sortable']);
app.controller('MainCtrl', function($scope) {
	$scope.name = 'World';
	$scope.ver = angular.version.full;
	$scope.itemsA = ['#100', '#101', '#102', '#103', '#104', '#105', '#106', '#107', '#108', '#109', '#110', '#111', '#112', '#113'];
	$scope.itemsB = ['#000'];

	$scope.listStories = function () {
		for (var i = 0; i < $scope.itemsA.length; i++) {
			console.log($scope.itemsA[i]);
		}

		for (var i = 0; i < $scope.itemsB.length; i++) {
			console.log($scope.itemsB[i]);
		}
	};

	 $scope.sortableOptions = {
    	placeholder: "grid",
    	connectWith: [".source", ".target"]
  	};

});

