define([
  'jquery',
  'underscore',
  'backbone',
  'urlStore',
  'modules/employee_management/models/employee'
], function ($, _, Backbone, urlStore, EmployeeModel) {
  return Backbone.Collection.extend({
    model: EmployeeModel,
    initialize: function (options) {
      _.extend(this, options);
    },

    url: '',

    parse: function (response) {
      return response.payload;
    },

    search : function(param, letters) {
      if(letters == "") return [];
      var pattern = new RegExp(letters,"gi");
      return (this.filter(function(data) {
          return pattern.test(data.get(param));
      }));
    },

    custom_search: function(param, value) {
      return (this.filter(function(data) {
          return (data.get(param).toLowerCase() == value.toLowerCase());
      }));
    }
  });
});
