app.controller('LoginCtrl', LoginCtrl);

LoginCtrl.inject = ['$rootScope','$scope', '$http', '$q', '$state', 'board', 'user'];

function LoginCtrl($rootScope, $scope, $http, $q, $state, board, user) {

  $scope.login = function(person) {
    console.log(user);
    user.login(person)
      .success(function(response) {
        $rootScope.user = response;
        $rootScope.sessionId = response.sessionId;
        $state.transitionTo('overview');
      })
    .error(function(response) {
      alert('You entered a wrong username or password');
      console.log(response);
    });
  };

}
