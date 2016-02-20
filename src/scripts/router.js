// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone_extend',
  'routemap',
  'config',
  'user'
],
function ($, _, Backbone, routeMap, tinyPos, UserModel) {
  'use strict';
  var Router = Backbone.Router.extend({
    routes: {
      '': 'showLandingPage',
      logout: 'Logout',
      spot: 'spot',
      '*path': 'defaultView'
    },


    initialize: function () {
      console.log("router initialized");
    },

    execute: function (callback, args) {
      _.each(tinyPos.currentViews, function (CurrentView) {
        CurrentView.remove();
      });
      Backbone.off();

      if (callback) {
        callback.apply(this, args);
      }
    },

    Logout: function() {
      require([routeMap.logoutPage], function () {
        require([routeMap.logoutPage.replace(/\..*/, '')], function (View) {
          var current_view = new View();
          tinyPos.currentViews.push(current_view);
          current_view.render()
        });
      });
    },

    showLandingPage: function() {
      require([routeMap.SittingPlan], function () {
        require([routeMap.SittingPlan.replace(/\..*/, '')], function (View) {
          var current_view = new View();
          tinyPos.currentViews.push(current_view);
          current_view.render()
        });
      });
    },

    spot: function() {
      require([routeMap.SittingPlan], function () {
        require([routeMap.SittingPlan.replace(/\..*/, '')], function (View) {
          var current_view = new View();
          tinyPos.currentViews.push(current_view);
          current_view.render()
        });
      });
    },

    defaultView: function() {
      Backbone.history.navigate('spot', {
        trigger: true
      })
    }
  });
  return Router;
});
