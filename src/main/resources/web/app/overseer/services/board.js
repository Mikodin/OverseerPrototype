app.service('board', BoardService);

BoardService.$inject = ['$http', '$state'];

function BoardService($http, $state) {

  var allBoards = '';

  function BoardObject() {
    this.boardName = '';
    this.projectsOnBoard = [];
    this.workFlow = {};
    this.tasks = [];
    this.asignees = [];
    this.pictureUrl = '';
  }

  function parseBoards(boards) {
    console.log('in parse boards');
    for (var i = 0; i < boards.values.length; i++) {
      console.log(boards.values[i]);
    }
  }

  this.getAllBoards = function(sessionId) {
    var testUrl = 'http://localhost:8080/kanbanik/api?command={"commandName":"getAllBoardsWithProjects","includeTasks":true,"sessionId":' +
      '"' + sessionId + '"' + '}';
    return $http({
      method: 'GET',
      url: testUrl,
    }).success(function(response) {
      allBoards = response;
      parseBoards(response);
      console.log('Board');
      return response.data;
    });
  };

}
