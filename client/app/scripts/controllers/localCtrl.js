'use strict';

angular.module('PintxApp')
  .controller('LocalCtrl', ['$scope', '$routeParams', 'StoreLocal', 'Events', '$cookieStore',
    function($scope, $routeParams, StoreLocal, Events, $cookieStore){
      
      var eventName = $routeParams.name.replace(/_/g, ' '),
          localId = $routeParams.local,
          local = $cookieStore.get('local');

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

      function updateCounter (type) {
        
        if (local === localId){
          return;
        } else {
          $cookieStore.put('local', localId);
          if (type === 'visit'){
            Events.putVisit(eventName, localId, updateVisits, errorHandler);  
          } else {
            Events.putVote(eventName, localId, updateVotes, errorHandler);
          }
        }
      }
  
      function updateVisits (res) {
        if (res){
          $scope.selectedLocal.visits =+ 1;  
        }
      }

      function updateVotes (res) {
        if (res){
          $scope.selectedLocal.votes =+ 1;  
        }
      }

      function drawData (res) {
        if (res && res.locals){
          $scope.selectedLocal = res.locals[0];
          drawMapPoint(res.locals[0]);
        } else {
          $scope.selectedLocal = res;
        }
        updateCounter('visit');
      }

      function errorHandler (err) {
        //Define error handler :P err
      }

      $scope.updateLocal = function () {
        updateCounter('vote');
      };
      $scope.canVote = function () {
        return local !== 'undefined' ? false : true;
      };
      // Datos del local recuperados de la lista de locales
      if (StoreLocal.info && StoreLocal.info.id){
        $scope.selectedLocal = StoreLocal.info;
        drawMapPoint(StoreLocal.info);
        updateCounter('visit');
      } else {
        Events.getLocalData(eventName, localId, drawData, errorHandler);
      }

    }
  ]);