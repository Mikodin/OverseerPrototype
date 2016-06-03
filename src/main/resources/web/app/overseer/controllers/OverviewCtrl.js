app.controller('OverviewCtrl', OverviewCtrl);

OverviewCtrl.inject = ['$scope', '$http', '$q'];

function OverviewCtrl($scope,$http,$q) {
  $scope.message = 'Hello World';
}
