(function(){
  'use strict';

  angular.module('cmGreetingModule', [])
  .directive('cmGreeting', [function(){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/cm-greeting/cm-greeting.html';
    o.scope       = {name:'@', age:'@'};


    return o;
  }]);
})();
