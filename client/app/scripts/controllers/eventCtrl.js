'use strict';

angular.module('PintxApp')
  .controller('EventCtrl', ['$scope','$routeParams', 'Events',
    function($scope, $routeParams, Events){
      function drawEvents (res){
        if (res.length){
          var locals = [];
          for (var i = 0; i < res[0].locals.length; i++){
            if (i % 4 === 0){
              locals.push([]);
            }
            locals[locals.length-1].push(res[0].locals[i]);
          }
          $scope.locals = locals;
        }
      }
      function errorHandler (err) {
        console.log(err);
      }
      var eventName = $routeParams.id.replace(/_/g, ' ');
      Events.getEventLocals(eventName, drawEvents, errorHandler);
    }
  ]);