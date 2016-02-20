define([
  'jquery',
  'underscore',
  'backbone'
],
function ($, _, Backbone) {
  return Backbone.Model.extend({
    initialize: function (options) {
     _.extend(this, options);
    }
  });
});
