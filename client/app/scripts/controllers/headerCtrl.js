//TODO
//DEPRECATED -> ha pasado a MainCtrl
/*
* Servicio que recupere las ciudades, localidades donde hay eventos
* Servicio que recupere los eventos para cada ciudad/localidad
*/
'use strict';

angular.module('PintxApp')
  .controller('HeaderCtrl', ['$scope', 'Events',
    function ($scope, Events) {

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
    }
  ]);