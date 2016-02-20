define([
  'jquery',
  'underscore',
  'backbone',
  'modules/employee_management/collections/employees'
],
function ($, _, Backbone, Employees) {
  return Backbone.Model.extend({
    initialize: function (options) {
     _.extend(this, options);
     this.set('employees', new Employees());
    }
  });
});
