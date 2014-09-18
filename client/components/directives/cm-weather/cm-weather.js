(function(){
  /* jshint camelcase:false*/
  'use strict';

  angular.module('cmWeatherModule', [])
  .factory('WeatherApi', ['$http', function($http){
    function weather(query){
      return $http.jsonp('http://api.wunderground.com/api/467fe65116e04adf/conditions/q/'+ query +'.json?callback=JSON_CALLBACK');
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

                      $scope.$on('position', function(event, pos){
                        if($scope.zip){return;}
                        console.log('i am the weather', pos);
                        var query = pos.coords.latitude + ',' + pos.coords.longitude;
                        console.log(query);
                        getWeather(query);
                      });

                     function getWeather(query){
                       WeatherApi.weather(query).then(function(response){
                       //debugger;
                        $scope.temp = response.data.current_observation.temp_c;
                        $scope.icon = response.data.current_observation.icon_url;
                        $scope.loc = response.data.current_observation.display_location.full;
                     });
                    }

                     $scope.id = $interval(getWeather, 300000);
                     if($scope.zip){getWeather($scope.zip);}
                    }];


    return o;
  }]);
})();
