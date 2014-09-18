(function(){
  /* jshint camelcase:false*/
  'use strict';

  angular.module('cmMovieModule', [])
  .factory('MovieApi', ['$http', function($http){
    function movie(title){
      //title = title.split(' ').join('+');
      return $http.jsonp('http://api.rottentomatoes.com/api/public/v1.0/movies.json?q='+title+'&page_limit=1&page=1&apikey=xwycvwsa4qa2zb33k6xkrmex&callback=JSON_CALLBACK');
    }

    return {movie:movie};
  }])
  .directive('cmMovie', ['$interval', function($interval){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/cm-movie/cm-movie.html';
    o.scope       = {title:'@', remove:'&'};
    o.link        = function(scope, element, attrs){
                      element.on('$destroy', function(){
                        $interval.cancel(scope.id);
                      });
                    };
    o.controller = ['$scope', 'MovieApi', function($scope, MovieApi){
                     function getMovie(){
                       MovieApi.movie($scope.title).then(function(response){
                       //debugger;
                        $scope.title = response.data.movies[0].title;
                        $scope.rating = response.data.movies[0].ratings.audience_score;
                        $scope.year = response.data.movies[0].year;
                        $scope.poster = response.data.movies[0].posters.thumbnail.replace(/_tmb/, '_pos');
                     });
                    }

                     $scope.id = $interval(getMovie, 3000000);
                     getMovie();
                    }];


    return o;
  }]);
})();
