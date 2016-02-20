// Filename: app.js
define([
  'libs',
  'router'
],
function(lib, Router) {
  var initialize = function() {
    var router = new Router();

    Backbone.history.start({
      root: '/'
    });
  }

  return {
    'initialize': initialize
  }
});
