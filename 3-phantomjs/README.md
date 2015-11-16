# Ejemplo de Conferencias : pruebas con PhantomJS + Jasmine

Este proyecto incluye un ejemplo de pruebas para un servicio en AngularJS.
Si se desean crear nuevas pruebas, es necesario modificar `spec/ConferencesSpec.js`.

## Instalación

Las pruebas requieren [PhantomJS](http://phantomjs.org/). Es necesario instalar phantomjs antes de ejecutar las pruebas.
Se puede hacer la instalación usado `npm`.

```
npm install -g phantomjs
```

## Ejecución

Para ejecutar las pruebas, es necesario correr el comando:

```
phantomjs spec/run-jasmine.js spec/SpecRunner.html
```
