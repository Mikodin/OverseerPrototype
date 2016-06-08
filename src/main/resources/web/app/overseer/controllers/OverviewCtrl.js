app.controller('OverviewCtrl', OverviewCtrl);

OverviewCtrl.inject = ['$scope', '$http', '$q','$rest'];

function OverviewCtrl($scope,$http,$q, rest) {
  $scope.message = 'Hello World';
  $scope.user;
  $scope.allBoards;
  $scope.sessionId;

  rest.getUser()
  .success(function(response) {
    console.log('User');
    console.log(response);
    $scope.user = response;
    $scope.sessionId = response.sessionId;

    rest.getAllBoards($scope.sessionId)
    .success(function(response) {
      console.log('All Boards');
      console.log(response);
      $scope.allBoards = response;
    })
    .error(function(response) {
      console.log(response);
    });

  })
  .error(function(response) {
    console.log('Sowwies no work');
  });

}
