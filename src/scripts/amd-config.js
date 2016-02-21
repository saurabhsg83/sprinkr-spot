(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // Register as an AMD module if available...
    define([], factory);
  } else if (typeof exports === 'object') {
    // Next for Node.js, CommonJS, browserify...
    module.exports = factory();
  } else {
    // Browser globals for the unenlightened...
    factory();
  }
}
(function() {
  var path = {
    appDir: '',
    baseUrl: 'scripts/',
    paths: {
      alertify:'vendor/bower_components/alertifyjs/build/alertify',
      jquery: 'vendor/bower_components/jquery/dist/jquery',
      jqueryui:'vendor/bower_components/jquery-ui/jquery-ui',
      backbone: 'vendor/bower_components/backbone/backbone',
      localstorage: 'vendor/bower_components/backbone.localStorage',
      underscore: 'vendor/bower_components/lodash/lodash',
      react: 'vendor/bower_components/react/react',
      'react-dom':'vendor/bower_components/react/react-dom',
      'react-bootstrap':'vendor/bower_components/react-bootstrap/react-bootstrap',
      JSXTransformer: 'vendor/bower_components/jsx-requirejs-plugin/js/JSXTransformer',
      jsx: 'vendor/bower_components/jsx-requirejs-plugin/js/jsx',
      text: 'vendor/bower_components/requirejs-text/text',
      reactbackbone: 'vendor/bower_components/react.backbone/react.backbone',
      BackboneReactComponentmixin: 'vendor/bower_components/backbone-react-component/lib/component',
      bootstrap: 'vendor/bower_components/bootstrap/dist/js/bootstrap.min',
      urlStore: 'modules/restaurant/helper/urlStore',
      backbone_extend: 'utilities/backbone_extend',
      user: 'modules/restaurant/users/models/UserModel',
      'react-dnd': 'vendor/bower_components/react-dnd/dist/ReactDnD.min',
      'react-dnd-html5-backend': '../../node_modules/react-dnd-html5-backend/dist/ReactDnDHTML5Backend.min'
    },
    shim: {
      bootstrap: ['jquery'],
      underscore: {
        exports: '_'
      },
      react: {
        exports: 'React'
      },
      crypto : {
        exports : 'CryptoJS'
      },
      JSXTransformer: 'JSXTransformer',
      machina: ['underscore']
    },
    waitSeconds: 0,
    jsx: {
      fileExtension: '.jsx',
      transformOptions: {
        harmony: true,
        stripTypes: false,
        inlineSourceMap: true
      },
      usePragma: false
    }
  };
  return path;
}));
