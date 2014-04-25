'use strict';

angular.module('PintxApp')
  .factory('Events', ['$http', 
    function($http){
      return {
        getCities: function(success, error){
          $http
            .get('/p/api/cities')
            .success(success)
            .error(error);
        },
        getCityEvents: function(city, success, error){
          $http
            .get('/p/api/events/' + city)
            .success(success)
            .error(error);
        }
      }
    }
  ]);