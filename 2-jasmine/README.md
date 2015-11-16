# Ejemplo de Conferencias : pruebas con Jasmine

Este proyecto incluye un ejemplo de pruebas para un servicio en AngularJS que usa Firebase.
Si se desean crear nuevas pruebas, es necesario modificar `spec/ConferencesSpec.js`.

## Ejecución

Para ejecutar la aplicación, es necesario cargar en un navegador la página web en `index.html`.

Si se usa [Koding](https://koding.com/):
* Cargue el archivo usando `kdopen index.html`.
* Una vez el archivo ha sido abierto, use la combinación de teclas `Crtl(Cmd) + Alt + P`.

Si se usa [WebStorm](https://www.jetbrains.com/webstorm/)
* Cargue el archivo en el editor
* Use la combinación de teclas `Alt + F2` o la opción de menú `View > Open in Browser`.

## Ejecución de Pruebas

Para ejecutar las pruebas, es necesario cargar en un navegador la página web en `spec/SpecRunner.html`

Si se usa [Koding](https://koding.com/):
* Cargue el archivo usando `kdopen spec/SpecRunner.html`.
* Una vez el archivo ha sido abierto, use la combinación de teclas `Crtl(Cmd) + Alt + P`.

Si se usa [WebStorm](https://www.jetbrains.com/webstorm/)
* Cargue el archivo en el editor
* Use la combinación de teclas `Alt + F2` o la opción de menú `View > Open in Browser`.

## Funcionamiento de las Pruebas

Para realizar pruebas con Angular y AngularFire es necesario considerar:
* La ejecución de pruebos a funciones asincrónicas (e.g. que retornan promesas)
* La ejecución de funciones asincrónicas internas en Angular

### Pruebas a funciones asincrónicas

En Javascript es común el uso de funciones asincrónicas.
Jasmine provee soporte para probar este tipo de funciones mediante el uso de una función `done`, que debe ejecutarse al terminar la prueba.

```javascript
describe("conjunto de pruebas", function(){

  // al inicio de cada prueba
  // la función recibe una función 'done'
  beforeEach(function(done){

    // por ejemplo, al ejecutar una función que retorna una promesa
    hacerAlgo().then(function(ok){
      // informar a jasmine que terminó el inicio de la prueba
      done();

    // en caso de error
    },function(error){
      // hacer que falle la prueba
      expect("Errores en ...").toBe(false);
      // también informar a jasmine de la terminación de la prueba
      done();

    });
  });

  // en cada prueba
  it("debe ejecutar una prueba", function(done){

    // por ejemplo, probar una función que retorna una promesa
    hacerOtraCosa().then(function(ok){
      // informar a jasmine que terminó el inicio de la prueba
      done();

    // en caso de error
    },function(error){
      // hacer que falle la prueba
      expect("Errores en ...").toBe(false);
      // también informar a jasmine de la terminación de la prueba
      done();

    });
  });

});
```

### Pruebas a funciones asincrónicas en Angular

Cuando se hacen pruebas en Angular usando [AngularMock](https://docs.angularjs.org/api/ngMock), las librerías hacen un "mock" de `$interval` y de `$timeout`.
Eso hace que algunas funciones no trabajen como se espera.
Si se ejecutan funciones de Angular o de librerías basadas en Angular, es posible que no funcionen a menos que se ejecute un método `flush()`.

Las pruebas puede incluir una función que realice los `flush()` correspondientes.

```javascript
function flushAll() {
  try { $interval.flush(500); }
  catch(e) {}
  try { $timeout.flush(); }
  catch (e) {}
  try { $browser.defer.flush(); }
  catch(e) {}
}
```

Así, las pruebas pueden ejecutar esta función después de cada operación que involucre la actualización de objetos en los servicios y controladores.
En las pruebas de [AngularFire](https://github.com/firebase/angularfire/tree/master/tests/unit), se ejecuta esta función luego de invocar cada `loaded()` y `$watch()`.

```javascript
describe("conjunto de pruebas", function(){

  beforeEach(function(){
    // carga el servicio a probar
  });

  it("debe ejecutar una prueba", function() {

    // ejecuta un método que usa librerías de AngularJS
    servicio.hacerAlgo();
    // hace que el método funcione
    flushAll();

  });

});
```