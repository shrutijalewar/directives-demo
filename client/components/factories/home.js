(function(){
  'use strict';

  angular.module('directives-demo')
  .factory('Home', ['$http', function($http){

    function getMessage(){
      return $http.get('/home');
    }
    function addMovie(title){
      return $http.post('/movie', title);
    }
    function indexMovie(title){
      return $http.get('/movie', title);
    }
    function removeMovie(title){
      return $http.delet('/movie', title);
    }

    return {getMessage:getMessage, addMovie:addMovie, indexMovie:indexMovie, removeMovie:removeMovie};


  }]);
})();

