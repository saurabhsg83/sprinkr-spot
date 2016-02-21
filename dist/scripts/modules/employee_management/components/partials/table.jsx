define([
  'jquery',
  'underscore',
  'backbone',
  'reactbackbone',
  'jsx!modules/employee_management/components/partials/table'
], function ($, _, Backbone, React, Table) {
  'use strict';
  return React.createBackboneClass({
    componentWillMount: function () {

    },

    componentDidMount: function () {

    },


    getInitialState: function () {
      return {};
    },

    render: function () {
      var _this = this;
      return (
        <div>
          <div className="project-table">
            Table-{this.props.number}
          </div>
        </div>
      );
    }
  });
});
