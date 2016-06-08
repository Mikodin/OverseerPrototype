app.controller('OverviewCtrl', OverviewCtrl);

OverviewCtrl.inject = ['$scope', '$http', '$q','$user', '$board'];

function OverviewCtrl($scope, $http, $q, user, board) {

  $scope.user = '';
  $scope.allBoards = '';
  $scope.sessionId = '';

  user.getUser()
    .success(function(response) {
      console.log('User');
      console.log(response);
      $scope.user = response;
      $scope.sessionId = response.sessionId;

      board.getAllBoards($scope.sessionId)
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
