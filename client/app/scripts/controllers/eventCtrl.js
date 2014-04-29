'use strict';

angular.module('PintxApp')
  .controller('EventCtrl', ['$scope','$routeParams', 'Events',
    function($scope, $routeParams, Events){
      function drawEvents (res){
        //$scope.locals = res[0].locals;
        var locals = [];
        for (var i = 0; i < res[0].locals.length; i++){
          if (i % 4 === 0){
            locals.push([]);
          }
          locals[locals.length-1].push(res[0].locals[i]);
        }
        $scope.locals = locals;
      }
      function errorHandler (err) {
        console.log(err);
      }
      Events.getEventLocals($routeParams.id, drawEvents, errorHandler);
    }
  ]);