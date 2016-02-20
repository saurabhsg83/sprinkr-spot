define([
    'jquery',
    'underscore',
    'backbone',
    'react-dom',
    'jqueryui'
  ],

  function($, _, Backbone, ReactDOM) {
    'use strict';
    return Backbone.View.extend({
      initialize: function(options) {
        this.options = options || {};
      },

      component: function() {
        return null;
      },

      render: function() {
        ReactDOM.render(this.component(), this.el);
        return this;
      }
    });
  });
