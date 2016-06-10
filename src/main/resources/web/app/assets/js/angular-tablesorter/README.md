# angular-tablesorter


*angular-tablesorter* is a wrapper directive for [Mottie's](//github.com/Mottie/) fork of the jQuery plugin [Tablesorter](//github.com/Mottie/tablesorter/). It's ideal for displaying tabular data within an application, and supports most of the features included in the original plugin. Please refer to the plugin's [documentation](//github.com/Mottie/tablesorter/docs/) for details. 

This module was developed for experimental purposes and is still on its early stages.


## Getting Started

 1. Install with bower 

  ```$ bower install angular-tablesorter```

   or [download](//github.com/jmcenteno/angular-tablesorter/archive/master.zip) all files

 2. Include angular-tablesorter.js in your html

**Note:** Make sure to include jQuery and Tablesorter plugin, along with theme stylesheets and widgets that extend the core functionality of Tablesorter.


## Example

**Configuration:**

```javascirpt
angular.module('MyModule').controller('MyCtrl', ['$scope', 
	function ($scope) {

		// tablesorter configuration options
		$scope.tblConfig = {
		  	theme : 'defaut', // include theme stylesheet
		  	headerTemplate : '{content} {icon}',
		  	sortReset: true,
		  	widgets: ['uitheme', 'stickyHeaders', 'pager']
		};

		// table data
		$scope.tblData = [
		  	{ "ID": 4155966, "City": "Fort Lauderdale", "Latitude": 26.122311, "Longitude": -80.143379 },
		  	{ "ID": 4152772, "City": "Dania Beach", "Latitude": 26.052311, "Longitude": -80.143929 },
		  	{ "ID": 4168139, "City": "Pembroke Pines", "Latitude": 26.003151, "Longitude": -80.223938 },
		  	{ "ID": 4146429, "City": "Aventura", "Latitude": 25.95648, "Longitude": -80.139214 },
		  	{ "ID": 7172778, "City": "Boulevard Gardens", "Latitude": 26.12326, "Longitude": -80.17997 },
		  	{ "ID": 4166638, "City": "Oakland Park", "Latitude": 26.17231, "Longitude": -80.131989 },
			{ "ID": 4177492, "City": "Washington Park", "Latitude": 26.132589, "Longitude": -80.18116 },
			{ "ID": 7172798, "City": "Roosevelt Gardens", "Latitude": 26.140869, "Longitude": -80.180267 },
			{ "ID": 4163994, "City": "Melrose Park", "Latitude": 26.11342, "Longitude": -80.193382 },
			{ "ID": 4149010, "City": "Broward Estates", "Latitude": 26.125641, "Longitude": -80.193382 }
		];

	}
]);
```

**Calling the directive:**

```html
<tablesorter config="tblConfig" ng-model="tblData"></tablesorter>
```


## License

*angular-tablesorter* is licensed under the [MIT License](http://opensource.org/licenses/MIT) and [GNU General Public License](https://www.gnu.org/licenses/gpl.html).


