'use strict';

angular.module('PintxApp')
  .controller('LocalCtrl', ['$scope', '$routeParams', 'StoreLocal', 'Events', '$cookieStore', '$cookies',
    function($scope, $routeParams, StoreLocal, Events, $cookieStore, $cookies){
      
      var eventName = $routeParams.name.replace(/_/g, ' '),
          localId = $routeParams.local;

      $scope.originalLocals = [];
      function drawMapPoint (info) {
        //TODO: no meter los que no tienen lat/lon
        if (info.loc && info.loc.lat){
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
      }

      function countVisit () {
        var local = $cookieStore.get('local');

        if (local === localId){
          return;
        } else {
          $cookieStore.put('local', localId);
          Events.putVisit(eventName, localId, updateCounter, errorHandler);
        }
      }
      
      function updateCounter (res) {
        console.log(res);
      }

      function drawData (res) {
        if (res && res.locals){
          $scope.selectedLocal = res.locals[0];
          drawMapPoint(res.locals[0]);
        } else {
          $scope.selectedLocal = res;
        }
        countVisit();
      }

      function errorHandler (err) {
        //Define error handler :P err
      }

      // Datos del local recuperados de la lista de locales
      if (StoreLocal.info && StoreLocal.info.id){
        $scope.selectedLocal = StoreLocal.info;
        drawMapPoint(StoreLocal.info);
        countVisit();
      } else {
        Events.getLocalData(eventName, localId, drawData, errorHandler);
      }

    }
  ]);