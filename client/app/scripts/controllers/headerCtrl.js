//TODO
/*
* Servicio que recupere las ciudades, localidades donde hay eventos
* Servicio que recupere los eventos para cada ciudad/localidad
*/
'use strict';

angular.module('PintxApp')
  .controller('HeaderCtrl', ['$scope',
    function ($scope) {
      $scope.cities = [
        {id:1, name: 'Oviedo'},
        {id:2, name: 'Gijón'},
        {id:3, name: 'Avilés'},
        {id:4, name: 'Pola de Siero'},
        {id:5, name: 'Cangas del Narcea'},
        {id:6, name: 'León'}
      ];
    }
  ]);