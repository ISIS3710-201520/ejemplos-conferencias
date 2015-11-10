/* spec/SpecRunner.js */

// está corriendo en PanthomJS ?
if (navigator.userAgent.indexOf("PhantomJS") > 0) {
    
  // usa los reportes de pruebas en consola
  var consoleReporter = new jasmineRequire.ConsoleReporter()({
    showColors: true,
    timer: new jasmine.Timer(),
    print: function() {
      console.log.apply(console, arguments)
    }
  });
  jasmine.getEnv().addReporter(consoleReporter);
  
}