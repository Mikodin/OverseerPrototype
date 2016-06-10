angular.module('myApp', [
	'angular-tablesorter'
])

.controller('MainCtrl', ['$scope', 'api', 
	function ($scope, api) {

		// tablesorter configuration
		$scope.tblConfig = {
			theme : 'bootstrap',
			headerTemplate : '{content} {icon}',
			sortReset: true,
			widgets: [ 'uitheme', 'stickyHeaders', 'pager' ]
		};

		// get sample data from factory method
		api.getData(100).then(function (data) {

			$scope.tblData = [];
			
			angular.forEach(data.list, function (item, key) {
				$scope.tblData.push({
					'ID': item.id,
					'City': item.name,
					'Latitude': item.coord.lat,
					'Longitude': item.coord.lon
				});
			});

		});

	}
])

.factory('api', ['$http', 
	function ($http) {

		return {
			getData: function (cnt) {
				return  $http.get('http://api.openweathermap.org/data/2.5/find?lat=47.6097&lon=-122.331&cnt=' + cnt).then(function (response) {
					return response.data;
				});
			}
		};

	}
])

.run([
	function () {

	}
]);