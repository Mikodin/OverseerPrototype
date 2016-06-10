angular.module('angular-tablesorter', [])

.directive('tablesorter', ['$timeout', 
	function ($timeout) {

		var thead = '<thead><tr><th ng-repeat="col in columns">{{col.text}}</th></tr></thead>';
		var tbody = '<tbody><tr ng-repeat="row in rows"><td ng-repeat="value in row">{{value}}</td></tr></tbody>';

		var pager = '<form class="form-inline">' +
			'<button type="button" class="first btn btn-sm btn-default">First</button> ' +
			'<button type="button" class="prev btn btn-sm btn-default">Prev</button> ' +
			'<span class="pagedisplay"></span> ' +
			'<button type="button" class="next btn btn-sm btn-default">Next</button> ' +
			'<button type="button" class="last btn btn-sm btn-default">Last</button> ' + 
		    '<select class="pagesize form-control input-sm"><option ng-repeat="value in [ 10, 20, 30, 40, 50 ]" value="{{value}}">{{value}}</option></select>' +
		    '</form>';

		var tfoot = '<tfoot ng-if="showPager && rows.length > 10"><tr><td colspan="{{columns.length}}" class="pager">' + pager + '</td></tr></tfoot>';

		return {
			restrict: 'E',
			replace: true,
			template: '<table>' + thead + tfoot + tbody + '</table>',
			require: 'ngModel',
			link: function ($scope, iElement, iAttrs, ngModel) {
				
				var options = $scope.$eval(iAttrs.config)
				
				var config = {
					widgets: [],
					widgetOptions: {

					}
				}

				angular.extend(config, options);

				$scope.showPager = false;

				$scope.$watch(function () {
				
					return ngModel.$modelValue;
				
				}, function (data) {

					if (angular.isDefined(data)) {

						$scope.columns = [];
						$scope.rows = [];

						angular.forEach(data[0], function (item, key) {
							$scope.columns.push({ text: key });
						});

						angular.forEach(data, function (item, index) {

							var row = [];

							angular.forEach(item, function (value, key) {
								row.push(value);
							});

							$scope.rows.push(row);

						});

						if (config.widgets.indexOf('pager') != -1) {

							config.widgetOptions.pager_selectors = {
								container: '.pager',       		// target the pager markup (wrapper)
								first: '.first',       			// go to first page arrow
								prev: '.prev',        			// previous page arrow
								next: '.next',        			// next page arrow
								last: '.last',        			// go to last page arrow
								gotoPage: '.gotoPage',    		// go to page selector - select dropdown that sets the current page
								pageDisplay: '.pagedisplay', 	// location of where the "output" is displayed
								pageSize: '.pagesize'     		// page size selector - select dropdown that sets the "size" option
							}

							$scope.showPager = true;

						}

						$timeout(function () {
							iElement.tablesorter(config);
						});

					}

				}, true);			

			}
		};
		
	}
]);