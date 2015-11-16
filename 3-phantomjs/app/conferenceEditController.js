var app = angular.module("conferencesApp")
  .controller( "conferenceEditController", 
    ['$scope', '$location', 'conferenceService',
      function($scope, $location, conferenceService) {
    
    $scope.service = conferenceService;

    $scope.$watch('service.currentConference', function() {
      $scope.conference = $scope.service.currentConference;
    });
    
    $scope.createOrUpdate = function() {
      conferenceService.createOrUpdate( $scope.conference );
      $location.path("/list");
    };
    
  }]);