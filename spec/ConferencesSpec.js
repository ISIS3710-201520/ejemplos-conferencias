/* Prueba de Conferencias */

describe ("Software de Conferencias", function() {

  // Inicialización de cada prueba
  // =============================
  
  var conferenceService;
  var conferenceEditCtrl, conferenceEditScope;
  var conferenceListCtrl, conferenceListScope;
  
  beforeEach(function() {
    
    // app : conferencesApp
    module('conferencesApp');
    
    // servicio : conferenceService
    inject(function($injector){
      conferenceService = $injector.get('conferenceService');
    });
    
    // controller : conferenceEditController
    inject(function($rootScope, $controller, $location, conferenceService){
      // crea un scope para el controlador
      conferenceEditScope = $rootScope.$new();
      // crea un controlador para este scope
      conferenceEditCtrl = $controller('conferenceEditController',{ 
        $scope:conferenceEditScope
      });
    });

    // controller : conferenceEditController
    inject(function($rootScope, $controller, $location, conferenceService){
      // crea un scope para el controlador
      conferenceListScope = $rootScope.$new();
      // crea un controlador para este scope
      conferenceListCtrl = $controller('conferenceListController',{ 
        $scope:conferenceEditScope
      });
    });

  });

  // Pruebas
  // =======
  
  it('debe crear objetos conferencias con todos los datos', function(){

    var conf = conferenceService.newConference();
    
    expect(conf.id).toBeDefined();
    expect(conf.name).toBeDefined();
    expect(conf.description).toBeDefined();
    expect(conf.place).toBeDefined();
    expect(conf.deadline).toBeDefined();
    expect(conf.notification).toBeDefined();
    expect(conf.event).toBeDefined();
    
  });
  
});
