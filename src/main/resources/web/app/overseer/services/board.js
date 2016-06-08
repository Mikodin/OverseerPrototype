app.service('board', BoardService);

BoardService.$inject = ['$http', '$state'];

function BoardService($http, $state) {
 function userObject = {
    this.username = '',
    this.realName = '',
    this.sessionId = '',
    this.pictureUrl = ''
 };
  this.getAllBoards = function(sessionId) {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/kanbanik/api?command={"commandName":"getAllBoardsWithProjects","includeTasks":true,"sessionId":' +
        '"' + sessionId + '"' + '}',
    }).success(function(response) {
      console.log('Board');
      return response.data;
    });
  };

}
