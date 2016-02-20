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
       var table_style = {
        border: '1px solid rgba(150,150,150,0.42)',
        background: '#DCD6D6',
        padding: '60px 80px 60px 80px',
        display: 'inline-block'
      };
      return (
        <div>
          <div className="project-table" style={table_style}>
            Table-{this.props.number}
          </div>
        </div>
      );
    }
  });
});
