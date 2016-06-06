app.service('user', UserService);

UserService.$inject = ['$http', '$state'];

function UserService($http, $state) {

  this.login = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/kanbanik/api?command={"commandName":"login","userName":"admin","password":"admin"}',
    }).success(function(response) {
      realName = response.data.realName;
      userName = response.data.userName;
      return response;
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

}
