angular.module('myApp')
  .directive('list', function()
  {
    return {
    restrict : 'AE',
    templateUrl :'directives/list/list.html',
    scope:{},
    controller:"AppCtrl"
    }
  });
