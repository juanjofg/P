'use strict';

angular.module('PintxApp')
  .controller('LocalCtrl', ['$scope', '$routeParams', 'StoreLocal', 'Events',
    function($scope, $routeParams, StoreLocal, Events){
      
      var eventName = $routeParams.name.replace(/_/g, ' '),
          localId = $routeParams.local;
      $scope.originalLocals = [];
      function drawMapPoint (info) {
        //TODO: no meter los que no tienen lat/lon
        $scope.originalLocals.push([
          info.name,
          info.loc.lat,
          info.loc.lon,
          info.address,
          info.snack,
          0,
          'restaurant'
        ]);
      }
      function drawData (res) {
        if (res && res.locals){
          $scope.selectedLocal = res.locals[0];
          drawMapPoint(res.locals[0]);
        } else {
          $scope.selectedLocal = res;
        }
      }
      function errorHandler (err) {
        //Define error handler :P err
      }

      // Datos del local recuperados de la lista de locales
      if (StoreLocal.info && StoreLocal.info.id){
        $scope.selectedLocal = StoreLocal.info;
        drawMapPoint(StoreLocal.info);
      } else {
        Events.getLocalData(eventName, localId, drawData, errorHandler);
      }

    }
  ]);