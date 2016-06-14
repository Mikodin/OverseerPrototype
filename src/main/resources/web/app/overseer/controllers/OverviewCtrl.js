app.controller('OverviewCtrl', OverviewCtrl);

OverviewCtrl.inject = ['$rootScope','$scope', '$compile', '$http', '$q', 'board', 'DTOptionsBuilder', 'DTColumnBuilder'];

function OverviewCtrl($rootScope, $scope, $compile, $http, $q, board, DTOptionsBuilder, DTColumnBuilder) {

  $scope.dtCtrl = this;

  board.getAllBoards($rootScope.sessionId)
    .success(function(response) {
      $scope.allBoards = board.constructBoards(response);
      $scope.selectedBoard = $scope.allBoards[0];
    })
  .error(function(response) {
    console.log(response);
  });

  var getTableData = function() {
    var deferred = $q.defer();
    deferred.resolve($scope.selectedBoard.projects);
    return deferred.promise;
  };

  //DataTables
  $scope.dtCtrl.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
    return getTableData();
  })
  .withPaginationType('simple_numbers')
    .withOption('createdRow',createdRow)
    .withColumnFilter({
      sPlaceHolder: 'head:after',
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
      }, {
        type: 'text',
        bRegex: true,
        bSmart: true
      }, {
        type: 'text',
        bRegex: true,
        bSmart: true
      }, {
        type: 'none'
      }]
    });

  $scope.dtCtrl.cols = [
    DTColumnBuilder.newColumn('name').withTitle('Project Name'),
    DTColumnBuilder.newColumn('tasks.length').withTitle('Tasks'),
    DTColumnBuilder.newColumn('startDateStr').withTitle('Start Date'),
    DTColumnBuilder.newColumn('endDateStr').withTitle('End Date'),
    DTColumnBuilder.newColumn('effort').withTitle('Effort'),
    DTColumnBuilder.newColumn('teamString').withTitle('Team'),
    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(detailsButtonHTML),
  ];

  $scope.dtCtrl.dtInstance = {};

  function createdRow(row, data, dataIndex) {
    $compile(angular.element(row).contents())($scope);
  }

  function detailsButtonHTML(data) {
    return '<button class="btn btn-primary btn-block" ng-click="viewDetails(' + data.name + ')"><i class="fa fa-gears"></i> View Details</button>';
  }

  $scope.viewDetails = function(projectId) {
    console.log('fire!');
    // $scope.currentProject = this.getHub(_hubId);
    console.log(projectId);
  };
  /*
     board.getAllBoards($scope.sessionId)
     .success(function(response) {
     $scope.allBoards = board.constructBoards(response);
     $scope.selectedBoard = $scope.allBoards[0];
     })
     .error(function(response) {

     });
     */

  $scope.selectBoard = function(id) {
    var resetPaging = true;
    $scope.selectedBoard = board.getBoard(id);
    $scope.dtCtrl.dtInstance.reloadData(null, resetPaging);
  };

}
