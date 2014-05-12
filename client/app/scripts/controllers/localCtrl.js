'use strict';

angular.module('PintxApp')
  .controller('LocalCtrl', ['$scope', '$routeParams', 'StoreLocal', 'Events',
    function($scope, $routeParams, StoreLocal, Events){
      
      var eventName = $routeParams.name.replace(/_/g, ' '),
          localId = $routeParams.local;

      function drawData (res) {
        if (res && res.locals){
          $scope.selectedLocal = res.locals[0];
        } else {
          $scope.selectedLocal = res;
        }
      }
      function errorHandler (err) {
        console.log(err);
      }

      // Datos del local recuperados de la lista de locales
      if (StoreLocal.info && StoreLocal.info.id){
        $scope.selectedLocal = StoreLocal.info;
      } else {
        Events.getLocalData(eventName, localId, drawData, errorHandler);
      }

    }
  ]);