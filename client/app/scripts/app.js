'use strict';

angular
  .module('PintxApp', ['ngCookies','ngResource','ngSanitize','ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/event/:name', {
        templateUrl: 'views/locals.html',
        controller: 'EventCtrl'
      })
      .when('/event/:name/:local', {
        templateUrl: 'views/local.html',
        controller: 'LocalCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
