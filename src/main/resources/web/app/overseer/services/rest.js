app.service('rest', RestService);

RestService.$inject = ['$http','$state'];

function RestService($http,$state) {

  this.login = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/kanbanik/api?command={"commandName":"login","userName":"admin","password":"admin"}',
    }).success(function(response) {
      return response.data;
    });
  };

  this.getUser = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/kanbanik/api?command={"commandName":"login","userName":"admin","password":"admin"}',
    }).success(function(response) {
      return response.data;
    });
  }

  this.getAllBoards = function(sessionId) {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/kanbanik/api?command={"commandName":"getAllBoardsWithProjects","includeTasks":true,"sessionId":'+'"'+sessionId+'"'+ '}',
    }).success(function(response) {
      return response.data;
    });
  }

}
