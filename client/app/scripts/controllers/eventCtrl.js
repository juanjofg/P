'use strict';

angular.module('PintxApp')
  .controller('EventCtrl', ['$scope','$routeParams', 'Events',
    function($scope, $routeParams, Events){
      function drawEvents (res){
        $scope.locals = res[0].locals;
      }
      function errorHandler (err) {
        console.log(err);
      }
      Events.getEventLocals($routeParams.id, drawEvents, errorHandler);
    }
  ]);