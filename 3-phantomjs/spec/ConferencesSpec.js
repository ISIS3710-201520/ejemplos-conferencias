/* Prueba de Conferencias */

describe ("Software de Conferencias", function() {

  // Base de datos para la prueba
  // ============================

  var databaseURL = 'https://conferencias.firebaseio.com/conferences';

  // Datos a usar en las pruebas
  // ===========================
  
  var conferenceService;
  var conferenceEditCtrl, conferenceEditScope;
  var conferenceListCtrl, conferenceListScope;

  // Objetos de infraestructura de la prueba
  // =======================================

  // Cambia el timeout usado en Jasmine. Esto permite invocar a FireBase
  // y que la prueba no falle por la demora.
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  var $timeout, $interval, $browser;

  // Inicialización de cada prueba
  // =============================

  beforeEach(function(done) {
    
    // app : conferencesApp
    module('conferencesApp');
    
    // servicio : conferenceService
    inject(function($injector, $rootScope){
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
        $scope:conferenceListScope
      });
    });

    // otros objetos usados en las pruebas
    inject(function(_$timeout_, _$interval_, _$browser_){
      $timeout = _$timeout_;
      $interval = _$interval_;
      $browser = _$browser_;
    });

    // crearDatosPrueba(done);
    done();
  });

  // Pruebas
  // =======

  // 1.
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


  // 2.
  // la prueba recibe como parámetro la función "done"
  // se debe invocar "done()" al terminar la prueba
  it('debe almacenar la nueva conferencia en la BD en firebase', function(done){

    // crea un id usando random
    var randomId = Math.round(Math.random()*10000000000);

    // crea un objeto nuevo
    var conf = {
      id : randomId,
      name : "Conferencia de Prueba",
      description : "Conferencia de Prueba",
      place : "Universidad",
      deadline : "2015-10-11",
      notification : "2015-10-30",
      event : "2015-11-11"
    };
    var confInDatabase = undefined;

    // Usa el método del servicio (a probar)
    conferenceService.createOrUpdate(conf);

    // espera un segundo antes de ejecutar el resto de la prueba
    flushAll();

    // carga las conferencias usando el API de Javascript
    var database = new Firebase(databaseURL);

    // al cargar los datos
    database.once("value", function(snapshot) {

      // obtiene el objeto de las conferencias
      conferences = snapshot.val();
      // busca la conferencia con el mismo id
      for( c in conferences ) {
        if (conferences[c].id == conf.id) {
          confInDatabase = conferences[c];
        }
      }

      // debe encontrar la conferencia
      if(typeof confInDatabase == 'undefined') {
        expect("error al leer la conferencia en la base de datos").toBe(false);

      } else {
        // revisa los datos
        expect(conf.id).toEqual(confInDatabase.id);
        expect(conf.name).toEqual(confInDatabase.name);
        expect(conf.description).toEqual(confInDatabase.description);
        expect(conf.place).toEqual(confInDatabase.place);
        expect(conf.deadline).toEqual(confInDatabase.deadline);
        expect(conf.notification).toEqual(confInDatabase.notification);
        expect(conf.event).toEqual(confInDatabase.event);
      }

      // termina la prueba
      done();

    }, function (errorObject) {

      // si hay un error al leer firebase
      console.log("The read failed: " + errorObject.code);
      // genera un error en la prueba
      expect("Errores al conectarse a la base de datos").toBe(false);
      done();
    });
  });

  // 3.
  it('debe modificar una conferencia existente en la BD en firebase', function(done){
    inject (function($firebaseArray, $rootScope){

      // crea un id usando random
      var randomId = Math.round(Math.random()*10000000000);

      // crea un objeto nuevo
      var conf = {
        id : randomId,
        name : "Conferencia de Prueba",
        description : "Conferencia de Prueba",
        place : "Universidad",
        deadline : "2015-10-11",
        notification : "2015-10-30",
        event : "2015-11-11"
      };

      var confInDatabase = {};

      // Crea la conferencia
      conferenceService.createOrUpdate(conf);

      // espera un segundo antes de ejecutar el resto de la prueba
      flushAll();

      var database = new Firebase(databaseURL);
      var query = database.orderByChild("id").equalTo(randomId);

      query.once("value", function(snapshot) {

        // obtiene el objeto de las conferencias
        var resultado = snapshot.val();

        if (typeof resultado == 'undefined' || resultado == null) {
          expect("Conferencia que se acaba de grabar no aparece en base de datos").toBe(false);
          done();

        } else {

          // modifica los datos
          conf.nombre = "Nuevo nombre";
          conf.description = "Nueva descripción";

          // Usa el método del servicio (a probar)
          conferenceService.createOrUpdate(conf);

          // espera un segundo antes de seguir con la prueba
          flushAll();

          // carga las conferencias usando el API de Javascript
          var database = new Firebase(databaseURL);
          database.once("value", function(snapshot) {

            // obtiene el objeto de las conferencias
            conferences = snapshot.val();
            // busca la conferencia con el mismo id
            for( c in conferences ) {
              if (conferences[c].id == conf.id) {
                confInDatabase = conferences[c];
              }
            }

            // debe encontrar la conferencia
            if(typeof confInDatabase == 'undefined') {
              // termina la prueba si no encuentra la conferencia
              expect("la conferencia no esta en la base de datos").toBe(false);

            } else {
              // revisa los datos
              expect(conf.id).toEqual(confInDatabase.id);
              expect(conf.name).toEqual(confInDatabase.name);
              expect(conf.description).toEqual(confInDatabase.description);
              expect(conf.place).toEqual(confInDatabase.place);
              expect(conf.deadline).toEqual(confInDatabase.deadline);
              expect(conf.notification).toEqual(confInDatabase.notification);
              expect(conf.event).toEqual(confInDatabase.event);
            }

            done();

          }, function (errorObject) {

            // si hay un error al leer firebase
            console.log("The read failed: " + errorObject.code);
            // genera un error en la prueba
            expect("Errores al conectarse a la base de datos").toBe(false);
            done();
          });
        }
      });
    });
  });


  // Finalización de cada prueba
  // ===========================

  // al terminar cada prueba
  afterEach(function(done){
    // elimina los datos de prueba
    var database = new Firebase(databaseURL);
    database.remove(function(error){
      // error al eliminar la conferencia
      if (error) {
        expect("Errores al eliminar conferencia de prueba en la base de datos").toBe(false);
      }
      done();
    });
  });


  // Funciones de utilidad
  // =====================

  // flushAll
  function flushAll() {
    Array.prototype.slice.call(arguments, 0).forEach(function (o) {
      try{ angular.isFunction(o.resolve) ? o.resolve() : o.flush(); }
      catch(e){}
    });
    try { $interval.flush(500); }
    catch(e) {}
    try { $timeout.flush(); }
    catch (e) {}
    try { $browser.defer.flush(); }
    catch(e) {}
  }

});
