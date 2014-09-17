(function(){
  'use strict';

  angular.module('directives-demo')
  .controller('HomeCtrl', ['$scope', '$interval', 'Home', function($scope, $interval, Home){
      $scope.people = [{name:'Bob', age:25},{name:'Sue', age: 22}];
      $scope.symbols = ['AAPL', 'GOOG', 'MSFT', 'AMZN'];

  }]);
})();

