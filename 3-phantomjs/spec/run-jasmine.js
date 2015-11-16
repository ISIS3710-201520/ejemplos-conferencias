var system = require('system');

// revisa los parámetros enviados al programa
// si no se incluyó el nombre de la página
if (system.args.length !== 2) {
    // muestra un mensaje de ayuda
    console.log('Usage: run-jasmine.js URL');
    // cierra la página y termina phantom
    if (page) page.close();
    setTimeout(function(){ phantom.exit(1); }, 0);    
}

// Revisa en los mensajes de consola si se terminó
// la ejecución de las pruebas con Jasmine
var doneRegEx = /^\d+ specs, (\d+) failure/;
var noReallyDoneRegEx = /^Finished in \d[\d\.]* second/;
var rc;

// crea un browser
var page = require('webpage').create();

// enruta los mensajes de la consola en el contexto de la página
// para que aparecen en el contexto principal de Phantom
page.onConsoleMessage = function (msg) {
    
    // imprime en la salida estándar el mensaje
    system.stdout.write(msg);
    // revisa si la prueba ha terminado
    var match = doneRegEx.exec(msg);
    if (match) {
        rc = match[1]==="0" ? 0 : 1;
        return;
    }
    match = noReallyDoneRegEx.exec(msg);
    if (match) {
        system.stdout.writeLine("");
        // cierra la página y termina la ejecución de phatomjs
        if (page) page.close();
        setTimeout(function(){ phantom.exit(rc); }, 0);            
    }
};

// abre la página que contiene las pruebas
system.stdout.writeLine("");
page.open(system.args[1], function(status){
    // no se pudo cargar la página
    if (status !== "success") {
        console.log("Couldn't load the page");
        // cierra la página y termina phantom
        if (page) page.close();
        setTimeout(function(){ phantom.exit(1); }, 0);    
    }
    system.stdout.writeLine("");
});

