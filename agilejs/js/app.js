// var app = angular.module('app', ['snap']);
var app = angular.module('app', []);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
  $scope.ver = angular.version.full;
});