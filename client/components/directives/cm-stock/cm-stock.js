(function(){
  'use strict';

  angular.module('cmStockModule', [])
  .factory('StockApi', ['$http', function($http){
    function quote(symbol){
      return $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+symbol+'&callback=JSON_CALLBACK');
    }

    return {quote:quote};
  }])
  .directive('cmStock', ['$interval', function($interval){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/cm-stock/cm-stock.html';
    o.scope       = {symbol:'@'};
    o.link        = function(scope, element, attrs){
                      element.on('$destroy', function(){
                        $interval.cancel(scope.id);
                      });
                    };
    o.controller = ['$scope', 'StockApi', function($scope, StockApi){
                     function getQuote(){
                       StockApi.quote($scope.symbol).then(function(response){
                       //debugger;
                        $scope.quote = response.data.LastPrice;
                        $scope.name = response.data.Name;
                     });
                    }

                     $scope.id = $interval(getQuote, 30000);
                     getQuote();
                    }];


    return o;
  }]);
})();
