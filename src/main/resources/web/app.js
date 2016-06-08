angular.module('overseer', [
  'ui.router',
  'ui.bootstrap',
  'ui.bootstrap.showErrors',
  'ngSanitize',
  'angular.vertilize',
]);

var app = angular.module('overseer');

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
  .state('overview', {
    url: '/overview',
    templateUrl: 'app/overseer/views/overview.html',
    controller:'OverviewCtrl'
  });

  $urlRouterProvider.otherwise('overview');
});

app.run(function($rootScope, $http, $q, rest) {
  $rootScope.test = 'Allo';
});
