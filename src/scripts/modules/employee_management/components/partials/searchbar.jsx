define([
  'jquery',
  'underscore',
  'backbone',
  'react'
],
function ($, _, Backbone, React) {
  'use strict';
  return React.createClass({
    getInitialState: function() {
      return {
        value: ''
      }
    },

    componentWillMount: function() {
      Backbone.on('clear_name_search', this.clear_name_search);
    },

    search_name: function (e) {
      var pattern = this.refs.search_value.value
      this.setState({
        value: pattern
      });

      this.clear_search();
      var result = [];
      this.props.collection.map( function (model) {
        result = result.concat(model.get('employees').search('name', pattern));
        result.map(function (employee) {
          employee.set('found', true);
        });
      });
    },

    handleChange: function(e) {
      if (!$(e.currentTarget).val()) {
        this.clear_search();
        this.setState({
          value: ''
        });
      }
    },

    clear_name_search: function() {
      var pattern = this.refs.search_value.value;
      if (!!pattern) {
        var result = [];
        this.props.collection.map( function (model) {
          result = result.concat(model.get('employees').search('name', pattern));
          result.map(function (employee) {
            employee.set('found', false);
          });
        });
        this.refs.search_value.value = '';
      }
    },

    clear_search: function() {
      this.props.collection.map(function (model) {
        model.get('employees').map(function (employee) {
          employee.set('found', false);
        });
      });
    },

    render: function () {
      var placeholder = this.props.placeholder;
      return (
        <div className="input-group search-bar">
          <input className="form-control search" placeholder={placeholder} onChange={this.handleChange} ref="search_value"/>
          <div className="input-group-addon search-icon" onClick={this.search_name}>
            <i className="fa fa-search"></i>
          </div>
        </div>
      );
    }
  });
});

