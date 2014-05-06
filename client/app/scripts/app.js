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
      .when('/event/:id', {
        templateUrl: 'views/locals.html',
        controller: 'EventCtrl'
      })
      .when('/event/:local', {
        templateUrl: 'views/local.html',
        controller: 'LocalCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
