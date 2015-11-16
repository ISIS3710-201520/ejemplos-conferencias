var app = angular.module("conferencesApp")
  .factory( 'conferenceService', 
    ['$firebaseArray',
      function($firebaseArray) {
    
    var service = { };

    // referencia la BD Firebase
    service.ref = new Firebase('https://conferencias.firebaseio.com/conferences');
    service.conferences = $firebaseArray(service.ref);

    service.conferences.$loaded().then(function(datos){
      console.log(datos);
    });

    // creates an empty conference
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
    };

    // Conferencia actual
    service.currentConference = service.newConference();
    
    service.setCurrentConference = function(conf) {
      service.currentConference = conf;
    };

    // operaciones sobre la BD
    service.addConference = function(conf) {
      return service.conferences.$add(conf);
    };

    service.createOrUpdate = function(conf) {
      if (typeof conf.$id == 'undefined') {
        return service.conferences.$add(conf);
      } else {
        return service.conferences.$save(conf);
      } 
    };
    
    service.conferences.$watch(function(event) {
      console.log(event);
    });
    
    return service;
    
  }]);