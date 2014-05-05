'use strict';

angular.module('PintxApp')
  .controller('MainCtrl', ['$scope', 'Events', '$location',
    function ($scope, Events, $location) {

      function drawCities (res){
        $scope.cities = res.cities;
      }
      function drawEvents (res){
        $scope.days = res;
      }
      function errorHandler (err) {
        $scope.cities = [
          {id:0, name: 'No hay ciudades disponibles'}
        ];
        $scope.days = [
          {id:0, name: 'No hay ciudades disponibles'}
        ];
      }
      Events.getCities(drawCities, errorHandler);
      $scope.showEvents = function(){
        Events.getCityEvents($scope.p.city.name, drawEvents, errorHandler);
      };

      $scope.showLocals = function(){
        var eventName = $scope.p.days.name.replace(/ /g, '_');
        $location.path('/event/' + eventName);
      };
    }
  ]);