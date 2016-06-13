angular.module('overseer', [
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.showErrors',
    'ngSanitize',
    'angular.vertilize',
    'datatables',
    'datatables.columnfilter',
]);

var app = angular.module('overseer');

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/overseer/views/login.html',
      controller: 'LoginCtrl'
    })
    .state('overview', {
      url: '/overview',
      templateUrl: 'app/overseer/views/overview.html',
      controller: 'OverviewCtrl'
    });

  $urlRouterProvider.otherwise('login');
});

app.run(function($rootScope, $http, $q, user, board) {
  $rootScope.test = 'Allo';
});
