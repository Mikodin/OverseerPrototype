// Use DATATABLES https://l-lin.github.io/angular-datatables/#/withColumnFilter

app.controller('OverviewCtrl', OverviewCtrl);

OverviewCtrl.inject = ['$rootScope','$scope', '$http', '$q', 'board', 'DTOptionsBuilder', 'DTColumnBuilder'];

function OverviewCtrl($rootScope, $scope, $http, $q, board, DTOptionsBuilder, DTColumnBuilder) {

  $scope.dtCtrl = this;

  var getTableData = function() {
    var deferred = $q.defer();
    deferred.resolve($rootScope.selectedBoard.projects);
    console.log(deferred.promise);
    return deferred.promise;
  };

  //DataTables
  $scope.dtCtrl.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
    return getTableData();
  })
  .withPaginationType('simple_numbers')
    .withColumnFilter({
      aoColumns: [{
        type: 'text',
        bRegex: true,
        bSmart: true
      }, {
        type: 'number'
      }, {
        type: 'text',
        bRegex: true,
        bSmart: true
      }]
    });

  $scope.dtCtrl.cols = [
    DTColumnBuilder.newColumn('name').withTitle('Project Name'),
    DTColumnBuilder.newColumn('tasks.length').withTitle('Tasks'),
    DTColumnBuilder.newColumn('teamString').withTitle('Team')
  ];

  $scope.dtCtrl.dtInstance = {};

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
    var resetPaging = true;
    $rootScope.selectedBoard = board.getBoard(id);
    $scope.dtCtrl.dtInstance.reloadData(null, resetPaging);
  };

}
