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
        },
        getEventLocals: function(name, success, error){
          $http
            .get('/p/api/event/' + name)
            .success(success)
            .error(error);
        },
        getLocalData: function(name, id, success, error){
          $http
            .get('/p/api/event/' + name + '/' + id)
            .success(success)
            .error(error);
        },
        putVisit: function(name, id, success, error){
          $http
            .post('/p/api/visit/' + name + '/' + id)
            .success(success)
            .error(error);
        },
        putVote: function(name, id, success, error){
          $http
            .post('/p/api/vote/' + name + '/' + id)
            .success(success)
            .error(error);
        }
      };
    }
  ]);