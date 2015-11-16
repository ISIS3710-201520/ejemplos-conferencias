var app = angular.module("conferencesApp")
  .controller( "conferenceListController", 
    ['$scope', '$location', 'conferenceService',
      function($scope, $location, conferenceService) {
    
    $scope.service = conferenceService;
    
    $scope.$watch('service.conferences', function(){
      $scope.conferences = $scope.service.conferences;  
    });
    
    $scope.editConference = function ( conf ) {
      conferenceService.setCurrentConference ( conf );
      $location.path('/edit');
    };
    
    $scope.addConference = function () {
      conferenceService.setCurrentConference( conferenceService.newConference());
      $location.path('/edit');
    };
    
  }]);