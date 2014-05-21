'use strict';

angular.module('PintxApp')
  .factory('googleApi', ['$window', '$rootScope',
    function($window, $rootScope){

      $window.initialize = function () {
        $rootScope.$broadcast('googlemapsLoaded');
      };

      return {
        mapsLoaded: function () {
          return !!$window.google && !!$window.google.maps;
        },
        loadGoogleMapsAsync: function(){
          if (!this.mapsLoaded()) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initialize';
            document.body.appendChild(script);
          }
        }
      };
    }
  ]);