var app = angular.module('app', ['snap']);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
  $scope.ver = angular.version.full;
});