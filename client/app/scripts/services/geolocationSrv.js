/***************************************************************
* Servicios para replicar la API de geolocalizacion HTML5
***************************************************************/
'use strict';

angular.module('PintxApp')
  .service('geolocationSrv', [function(){
    var geolocation = null;
    if (window.navigator && window.navigator.geolocation){
      geolocation = window.navigator.geolocation;
    }

    function deg2grad (deg) {
      return deg * (Math.PI/180);
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
      },
      /* Calculate distance
      * http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points
      */
      getDistance: function (lat1, lon1, lat2, lon2) {
        var R = 6371, // Radius of the earth in km
          dLat = deg2grad(lat2 - lat1),
          dLon = deg2grad(lon2 - lon1),
          a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(deg2grad(lat1)) * Math.cos(deg2grad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2),
          c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
          d = R * c; //Distance in km
          return d;
      }
    };
  }]);