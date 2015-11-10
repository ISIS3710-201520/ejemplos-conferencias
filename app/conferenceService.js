var app = angular.module("conferencesApp")
  .factory( 'conferenceService', 
    ['$firebaseArray',
      function( $firebaseArray) {
    
    var service = { };
    
    service.ref = new Firebase('https://conferencias.firebaseio.com/conferences');
    
    service.conferences = $firebaseArray(service.ref);
    
    service.addConference = function(conf) {
        service.conferences.$add(conf);
    };
    
    service.newConference = function() {
      return {
        id            : "",
        name          : "",
        description   : "",
        place         : "",
        deadline      : "",
        notification  : "",
        event         : ""
      };
    }
      
    service.currentConference = service.newConference();
    
    service.setCurrentConference = function(conf) {
      service.currentConference = conf;
    }
      
    service.createOrUpdate = function(conf) {
      if (typeof conf.$id == 'undefined') {
        service.conferences.$add(conf);
      } else {
        service.conferences.$save(conf);
      } 
    };
    
    service.conferences.$watch(function(event) {
      console.log(event);
    });
    
    return service;
    
  }]);