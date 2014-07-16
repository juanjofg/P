'use strict';

angular.module('PintxApp')
  .controller('EventCtrl', ['$scope','$routeParams', '$filter', 'Events', 'StoreLocal', 'geolocationSrv', 'utilities',
    function($scope, $routeParams, $filter, Events, StoreLocal, geolocationSrv, utilities){
      // Variable para almacenar los locales y filtrar las tabs
      var eventLocals;
      $scope.selectLocal = function (local) {
        StoreLocal.info = local;
      };

      var eventName = $routeParams.name.replace(/_/g, ' ');
      $scope.eventName = eventName;

      function updateGrid (grid) {
        $scope.originalLocals = grid.geoLocationInfo;
        $scope.locals = grid.locals;
      }

      function drawEvents (res){
        if (res.length){
          eventLocals = res;
          $scope.eventName = res[0].name;
          $scope.eventInfo = res[0].info;
          if (res[0].locals){
            utilities.generateGrid(res[0].locals, updateGrid);
          }
        }
      }
      function errorHandler (err) {
        console.log(err);
      }
      $scope.showAll = function () {
        utilities.generateGrid(eventLocals[0].locals, updateGrid);
        $scope.$emit('googlemapsLoaded');
      };
      $scope.showTop = function () {
        //TODO
      };
      /*
      * With $scope.currentPosition and saved eventLocals, we can get nearest locals
      * Then, we can filter (order and limit) the actual view
      */
      $scope.showNear = function () {
        var i = 0, nearestLocals, sorted, nearest, newGrid;
        nearestLocals = angular.copy(eventLocals[0].locals);
        for (i; i < nearestLocals.length; i++){
          nearestLocals[i].distance = geolocationSrv.getDistance(
                                        $scope.currentPosition.latitude,
                                        $scope.currentPosition.longitude,
                                        nearestLocals[i].loc.lat,
                                        nearestLocals[i].loc.lon);
        }
        sorted = $filter('orderBy')(nearestLocals, 'distance');
        nearest = $filter('limitTo')(sorted, 10);
        nearestLocals.length = 0;
        nearestLocals = nearest;
        newGrid = utilities.generateGrid(nearest, updateGrid);
        $scope.$emit('googlemapsLoaded');
      };

      Events.getEventLocals(eventName, drawEvents, errorHandler);
    }
  ]);