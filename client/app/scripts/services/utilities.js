'use strict';

angular.module('PintxApp')
	.factory('utilities', [function () {
		return {
			generateGrid: function (localInfo, callback) {
				var locals = [],
					geoLocationInfo = [], i = 0;

				for (i; i < localInfo.length; i++) {
					if (i % 4 === 0) {
						locals.push([]);
					}

					locals[locals.length - 1].push(localInfo[i]);

					if (localInfo[i].loc && localInfo[i].loc.lat) {
						geoLocationInfo.push([
							localInfo[i].name,
							localInfo[i].loc.lat,
							localInfo[i].loc.lon,
							localInfo[i].address,
							localInfo[i].snack,
							i,
							'restaurant'
						]);
					}
				}
				var newGrid = {
					locals: locals,
					geoLocationInfo: geoLocationInfo
				};
				callback(newGrid);
			}
		};
	}]);