(function(){
  /* jshint camelcase:false*/
  'use strict';

  angular.module('cmWeatherModule', [])
  .factory('WeatherApi', ['$http', function($http){
    function weather(zip){
      return $http.jsonp('http://api.wunderground.com/api/467fe65116e04adf/conditions/q/'+ zip +'.json?callback=JSON_CALLBACK');
    }

    return {weather:weather};
  }])
  .directive('cmWeather', ['$interval', function($interval){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/cm-weather/cm-weather.html';
    o.scope       = {zip:'@'};
    o.link        = function(scope, element, attrs){
                      element.on('$destroy', function(){
                        $interval.cancel(scope.id);
                      });
                    };
    o.controller = ['$scope', 'WeatherApi', function($scope, WeatherApi){
                     function getWeather(){
                       WeatherApi.weather($scope.zip).then(function(response){
                       //debugger;
                        $scope.temp = response.data.current_observation.temp_c;
                        $scope.icon = response.data.current_observation.icon_url;
                        $scope.loc = response.data.current_observation.display_location.full;
                     });
                    }

                     $scope.id = $interval(getWeather, 300000);
                     getWeather();
                    }];


    return o;
  }]);
})();
