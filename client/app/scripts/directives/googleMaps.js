'use strict';

angular.module('PintxApp')
  .directive('gMaps', ['googleApi', '$window', '$rootScope',
    function(googleApi, $window, $rootScope){
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'views/map.html',
      link: function (scope, element, attrs) {
        var lat, long, currentLocals;
        lat = scope.currentPosition ? scope.currentPosition.latitude :  43.3694868,
        long = scope.currentPosition? scope.currentPosition.longitude : -5.8486578;

        currentLocals = scope.originalLocals;

        function initGoogleMaps() {
        // Load your Google map stuff here
        // Remember to wrap scope variables inside `scope.$apply(function(){...});`
          var map, mapOptions = {
            zoom: 15,
            center: new $window.google.maps.LatLng(lat,long)
          };

          map = new $window.google.maps.Map(document.getElementById('map-canvas'), mapOptions);
          if (scope.originalLocals && scope.originalLocals.length > 0) {
            setMarkers(map, scope.originalLocals/*bares*/);
          }
        }

        // If Google maps is already present then just initialise my map
        if (googleApi.mapsLoaded()) {
          scope.$watch('originalLocals', function(){
            initGoogleMaps();
          });
        } else {
          googleApi.loadGoogleMapsAsync();
        }
        $rootScope.$on('googlemapsLoaded', initGoogleMaps);

        /**
         * Data for the markers consisting of a name, a LatLng, a zIndex for
         * the order in which these markers should display on top of each
         * other and the type of location
         */
         // Now, dummy data
        var bares = [
          ['La Patatina', 43.363375,-5.866001, 4, 'restaurant_tapas'],
          ['Pizzeria Buenavista', 43.359541,-5.864645, 5, 'pizzaria'],
          ['Restaurante Compostela', 43.362297,-5.864639, 3, 'restaurant'],
          ['La Jamonería', 43.359793,-5.864288, 2, 'restaurant']
        ];
        /*
        * Infowindows
        */
        var infos = [];
        function closeInfos(){
          if(infos.length > 0){
           /* detach the info-window from the marker ... undocumented in the API docs */
            infos[0].set('marker', null);
             /* and close it */
            infos[0].close();
             /* blank the array */
            infos.length = 0;
          }
        }
        function attachInfoWindow(map, marker,content,infoWindow){
          $window.google.maps.event.addListener(marker, 'click', (function(marker,content,infoWindow){
            return function() {

              /* close the previous info-window */
              closeInfos();

              infoWindow.setContent(content);
              infoWindow.open(map,marker);

              /* keep the handle, in order to close it on next click event */
              infos[0]=infoWindow;

            };
          })(marker,content,infoWindow));
        }
        function setMarkers(map, locations) {
          // Add markers to the map
          for (var i = 0; i < locations.length; i++) {
            var bar = locations[i];
            var myLatLng = new $window.google.maps.LatLng(bar[1], bar[2]);
            var marker = new $window.google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: 'images/map/rest_icons/' + bar[6] + '.png',
                title: bar[0],
                zIndex: bar[5]
              });
            map.setCenter(marker.getPosition());
            var content = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h3 id="firstHeading" class="firstHeading">' + bar[0] + '</h3>'+
              '<div id="bodyContent">'+
              '<p><b>' + bar[4] + '</b><br/>' + bar[3] + '</p>' +
              '</div>'+
              '</div>';
            var infoWindow = new $window.google.maps.InfoWindow();
            //
            attachInfoWindow(map, marker,content,infoWindow);

          }
        }

      }
    };
  }]);