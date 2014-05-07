'use strict';
//servicio para compartir el local seleccionado entre controllers
angular.module('PintxApp')
  .factory('StoreLocal', [function(){
    return {
      info: {}
    };
  }]);