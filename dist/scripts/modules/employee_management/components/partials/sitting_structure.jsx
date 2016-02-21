define([
  'jquery',
  'underscore',
  'backbone',
  'reactbackbone',
  'jsx!modules/employee_management/components/partials/table',
  'jsx!modules/employee_management/components/partials/seat'
], function ($, _, Backbone, React, Table, Seat) {
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
      var sitting_style = {
        marginRight: '15px',
        marginLeft: '15px'
      };
      return (
        <div className="sitting" style={sitting_style}>
          <div className="upper-seats">
            <Seat model={this.getModel().get('employees').find({seat: 1})} number={1} />
            <Seat model={this.getModel().get('employees').find({seat: 2})} number={2} />
          </div>
          <Table project={this.getModel().get('project')} />
          <div className="lower-seats">
            <Seat model={this.getModel().get('employees').find({seat: 3})} number={3} />
            <Seat model={this.getModel().get('employees').find({seat: 4})} number={4} />
          </div>
        </div>
      );
    }
  });
});
