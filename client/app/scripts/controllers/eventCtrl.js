'use strict';

angular.module('PintxApp')
  .controller('EventCtrl', ['$scope','$routeParams', 'Events', 'StoreLocal',
    function($scope, $routeParams, Events, StoreLocal){

      $scope.selectLocal = function (local) {
        StoreLocal.info = local;
      };

      var eventName = $routeParams.name.replace(/_/g, ' ');
      $scope.eventName = $routeParams.name;

      function drawEvents (res){
        if (res.length){
          $scope.originalLocals = [];//res[0].locals;
          var locals = [];
          for (var i = 0; i < res[0].locals.length; i++){
            if (i % 4 === 0){
              locals.push([]);
            }
            locals[locals.length-1].push(res[0].locals[i]);
            $scope.originalLocals.push([
              res[0].locals[i].name,
              res[0].locals[i].lat,
              res[0].locals[i].long,
              res[0].locals[i].address,
              res[0].locals[i].snack,
              i,
              'restaurant'
            ]);
          }
          console.log($scope.originalLocals);
          $scope.locals = locals;
        }
      }
      function errorHandler (err) {
        console.log(err);
      }

      Events.getEventLocals(eventName, drawEvents, errorHandler);
    }
  ]);