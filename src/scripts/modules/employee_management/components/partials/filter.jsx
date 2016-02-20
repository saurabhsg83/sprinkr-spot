define([
  'jquery',
  'underscore',
  'backbone',
  'react',
  'react-bootstrap',
  'jsx!modules/employee_management/components/partials/search_popover'
], function ($, _, Backbone, React, ReactBootstrap, SearchPopover) {
  'use strict';
  return React.createClass({
    render: function () {
      var OverlayTrigger = ReactBootstrap.OverlayTrigger;
      return (
        <OverlayTrigger trigger="click" placement="bottom" rootClose={true} overlay={<SearchPopover collection={this.props.collection}/>}>
          <div className="search-filter input-group" onClick={this.test}>
            <i className="fa fa-filter fa-lg"></i>
          </div>
        </OverlayTrigger>
      );
    }
  });
});

