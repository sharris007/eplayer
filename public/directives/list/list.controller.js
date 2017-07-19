myApp.controller('AppCtrl', ['$scope', 'list', function($scope, list) {
    console.log("Hello World from controller");

$scope.editing = false;
var refresh = function() {
  $scope.editing = false;
  // $http.get('/list').then(function(response) {
  list.allUsers().then(function(response) {
    console.log("I got the data I requested");
    $scope.contactlist = response.data;
    $scope.contact = {};
  });
};

refresh();

$scope.addContact = function() {
  console.log($scope.contact);
  // $http.post('/list', $scope.contact).then(function(response) {
  list.adduser($scope.contact).then(function(response) {
    console.log("User added successfully",response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  // $http.delete('/list/' + id).then(function(response) {
  list.deleteuser(id).then(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.editing = true;
  console.log(id);
  // $http.get('/list/' + id).then(function(response) {
  list.edituser(id).then(function(response) {
    console.log(response);
    $scope.contact = response.data;
  });
};

$scope.update = function() {
  console.log($scope.contact._id);
  // $http.put('/list/' + $scope.contact._id, $scope.contact).then(function(response) {
  list.updateuser($scope.contact).then(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.editing = false;
  $scope.contact = {};
}

}]);﻿
