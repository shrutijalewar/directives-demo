(function(){
  'use strict';

  angular.module('directives-demo', ['ngRoute', 'LocalForageModule','cmGreetingModule', 'cmClockModule', 'cmStockModule', 'cmWeatherModule', 'cmMovieModule', 'cmLocateModule'])
  .config(['$routeProvider', '$httpProvider', '$localForageProvider', function($routeProvider, $httpProvider, $localForageProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/register', {templateUrl:'/views/register/register.html', controller:'RegisterCtrl'})
    .when('/login',    {templateUrl:'/views/login/login.html',       controller:'LoginCtrl'})
    .when('/logout',   {templateUrl:'/views/logout/logout.html',     controller:'LogoutCtrl'})
    .otherwise({redirectTo:'/'});

    $httpProvider.interceptors.push('HttpInterceptor');
    $localForageProvider.config({name:'directives-demo', storeName:'cache', version:1.0});
  }]);
})();

