app.service('user', UserService);

UserService.$inject = ['$http', '$state'];

function UserService($http, $state) {

  this.login = function(person) {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/kanbanik/api?command={"commandName":"login","userName":"' + person.username + '","password":"' + person.password + '"}',
    }).success(function(response) {
      console.log(response);
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
  };
}
