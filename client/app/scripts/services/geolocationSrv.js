/***************************************************************
* Servicio basico para replicar la API de geolocalizacion HTML5
***************************************************************/
'use strict';

angular.module('PintxApp')
  .service('geolocationSrv', [function(){
    var geolocation = null;
    if (window.navigator && window.navigator.geolocation){
      geolocation = window.navigator.geolocation;
    }
    return {
      getPosition: function(success, error){
        if (geolocation){
          geolocation.getCurrentPosition(success, error, {maximumAge: 0});
        }
      },
      watchPosition: function(success, error){
        if (geolocation){
          geolocation.watchPosition(success, error, {maximumAge: 0});
        }
      },
      clearWatch: function(identifier){
        if (geolocation){
          geolocation.clearWatch(identifier);
        }
      }
    };
  }]);