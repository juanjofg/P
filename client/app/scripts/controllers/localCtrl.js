'use strict';

angular.module('PintxApp')
  .controller('LocalCtrl', ['$scope', '$routeParams', 'StoreLocal', 'Events',
    function($scope, $routeParams, StoreLocal, Events){
      
      var eventName = $routeParams.name.replace(/_/g, ' '),
          localId = $routeParams.id;

      function drawData (res) {
        $scope.selectedLocal = res[0];
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