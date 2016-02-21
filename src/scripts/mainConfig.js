/*global require*/
'use strict';
require(['amd-config'], function (AMD_CONFIG) {
  require.config(AMD_CONFIG);
  require(['libs'], function () {
    require([
      'app',
      'jquery'
    ], function (App, $) {
      App.initialize();
        $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
          var ApiAccessToken = localStorage.getItem('session_token');
          if (ApiAccessToken !== undefined) {
            jqXHR.setRequestHeader('session_token', ApiAccessToken);
          }
          options.xhrFields = {
            withCredentials: true
          };
        });
    });
  });
});
