var app= angular.module('myApp');

app.service('list', function ($http) {
  // To get all users
   this.allUsers = function ()
  {
  var alluserobjects=  $http.get('/api/listing').then(function(response) {
      var data=response;
       return data;
      });
    return alluserobjects;
  };


  this.adduser = function (user)
 {
   console.log("In service user to be added",user);
 var addeduser= $http.post('/api/listing', user).then(function(response) {
     console.log("user added in service");
     });
   return addeduser;
 };

 this.deleteuser = function (id)
{
var deleteduser= $http.delete('/api/listing/' + id).then(function(response) {
    console.log("user deletes in service");
    });
  return deleteduser;
};
this.edituser = function (id)
{
var editeduser= $http.get('/api/listing/' + id).then(function(response) {
  var data=response;
   return data;
  });
return editeduser;
};

this.updateuser = function(user)
{
  var updateduser=user;
  return $http.put('/api/listing/' + updateduser._id, updateduser);
};

});
