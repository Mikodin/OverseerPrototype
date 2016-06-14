app.controller('LoginCtrl', LoginCtrl);

LoginCtrl.inject = ['$rootScope','$scope', '$http', '$q', '$state', 'board', 'user'];

function LoginCtrl($rootScope, $scope, $http, $q, $state, board, user) {

  $scope.login = function(person) {
    console.log(user);
    user.login(person)
      .success(function(response) {
        $rootScope.user = response;
        $rootScope.sessionId = response.sessionId;

        board.getAllBoards($rootScope.sessionId)
          .success(function(response) {
            $rootScope.allBoards = board.constructBoards(response);
            $rootScope.selectedBoard = $rootScope.allBoards[0];
            $state.transitionTo('overview');
          })
        .error(function(response) {
          console.log(response);
        });

      })
    .error(function(response) {
      alert('You entered a wrong username or password');
      console.log(response);
    });
  };

}
