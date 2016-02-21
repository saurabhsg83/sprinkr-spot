define([
  'jquery',
  'underscore',
  'backbone'
],
function ($, _, Backbone) {
  return Backbone.Model.extend({
    urlRoot: 'https://dry-lowlands-91593.herokuapp.com/spot/employee',
    initialize: function (options) {
     _.extend(this, options);
    }
  });
});
