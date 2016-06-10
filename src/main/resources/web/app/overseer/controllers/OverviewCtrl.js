app.controller('OverviewCtrl', OverviewCtrl);

OverviewCtrl.inject = ['$rootScope','$scope', '$http', '$q', 'board'];

function OverviewCtrl($rootScope, $scope, $http, $q, board) {
  /*
  board.getAllBoards($rootScope.sessionId)
    .success(function(response) {
      $scope.allBoards = board.constructBoards(response);
      $scope.selectedBoard = $scope.allBoards[0];
    })
  .error(function(response) {

  });
  */

  $scope.selectBoard = function(id) {
    console.log('setting board to');
    console.log(board.getBoard(id));
    $rootScope.selectedBoard = board.getBoard(id);
  };
}
