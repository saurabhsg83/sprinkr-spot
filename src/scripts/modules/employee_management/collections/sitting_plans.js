define([
  'jquery',
  'underscore',
  'backbone',
  'urlStore',
  'modules/employee_management/models/project'
], function ($, _, Backbone, urlStore, ProjectModel) {
  return Backbone.Collection.extend({
    model: ProjectModel,
    comparator: 'table',
    initialize: function (options) {
      _.extend(this, options);
    },

    url: '',

    parse: function (response) {
      return response.payload;
    },

    set_model_collection: function() {
      this.map(function (model){
        var employees = model.get('employees');
        employees.reset(model.employees);
        model.set('employees', employees);
      });
    }

  });
});
