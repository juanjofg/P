'use strict';

angular.module('PintxApp')
  .controller('MainCtrl', ['$scope', 'Events', '$location', 'StoreLocal', 'geolocationSrv',
    function ($scope, Events, $location, StoreLocal, geolocationSrv) {

      $scope.selectedLocal = StoreLocal;
      
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

      // Asociado al evento change del desplegable de eventos
      // Modifica la url visible
      $scope.showLocals = function(){
        var eventName = $scope.p.days.name.replace(/ /g, '_');
        $location.path('/event/' + eventName);
      };

      function getPositionSuccess(position){
        $scope.currentPosition = position.coords;
        console.log(position);
      }
      function getPositionErr(err){
        //TODO: ocultar mapa o centrar mapa en la ciudad seleccionada
        //err.code y err.message
        console.log(err);
      }
      //get position
      geolocationSrv.getPosition(getPositionSuccess, getPositionErr);
    }
  ]);