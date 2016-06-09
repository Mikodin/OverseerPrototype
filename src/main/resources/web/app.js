angular.module('overseer', [
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.showErrors',
    'ngSanitize',
    'angular.vertilize',
]);

var app = angular.module('overseer');

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('overview', {
      url: '/overview',
      templateUrl: 'app/overseer/views/overview.html',
      controller: 'OverviewCtrl'
    });

  $urlRouterProvider.otherwise('overview');
});

app.run(function($rootScope, $http, $q, user, board) {
  $rootScope.test = 'Allo';
  user.getUser()
    .success(function(response) {
      $rootScope.user = response;
      $rootScope.sessionId = response.sessionId;

      board.getAllBoards($rootScope.sessionId)
        .success(function(response) {
          $rootScope.allBoards = board.constructBoards(response);
        })
      .error(function(response) {
        console.log(response);
      });

    })
  .error(function(response) {
    console.log(response);
  });
});
