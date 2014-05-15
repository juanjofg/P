'use strict';

angular.module('PintxApp')
  .directive('gMaps', [function(){
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'views/map.html',
      link: function(){

      }
    };
  }]);