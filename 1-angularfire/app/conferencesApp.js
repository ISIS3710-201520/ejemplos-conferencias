var app = angular.module("conferencesApp", [
    'ngRoute',
    'firebase'
  ]);

// configura las rutas
app.config(['$routeProvider', function($routeProvider) {
  
  // cuando es /list
  $routeProvider
  .when('/list', {
    templateUrl : 'views/conferenceListView.html',
    controller  : 'conferenceListController'   

  // cuando es /edit
  }).when('/edit', {
    templateUrl : 'views/conferenceEditView.html',
    controller  : 'conferenceEditController'
    
  // en caso contrario
  }).otherwise({
    redirectTo: '/list'
  }) 
  
}]);