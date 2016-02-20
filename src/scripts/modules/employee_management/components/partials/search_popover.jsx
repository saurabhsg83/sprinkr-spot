define([
  'jquery',
  'underscore',
  'backbone',
  'react',
  'react-bootstrap'
],
function ($, _, Backbone, React, ReactBootstrap) {
  'use strict';
  return React.createClass({

    getInitialState: function() {
      return {
        search_param: null,
        search_values: []
      }
    },

    is_selected: function(value) {
      return (value == this.state.search_param);
    },

    is_selected_value: function(value) {
      return (this.state.search_values.includes(value));
    },

    change_selected: function(e) {
      var value = e.currentTarget.checked ? e.currentTarget.value : '';
      this.clear_search();
      this.setState({
        search_param: value,
        search_values: []
      });
    },

    componentWillMount: function() {
      var search_param = this.state.search_param;
      var search_values = this.state.search_values;
      Backbone.trigger('clear_name_search');
      this.props.collection.map(function (model) {
        model.get('employees').map(function (employee) {
          if (!!employee.get('found')){
            var param = employee.get('type_search');
            search_values = search_values.concat(employee.get(param));
            search_param = param;
          }
        });
      });

      this.setState({
        search_param: search_param,
        search_values: _.uniq(search_values)
      });
    },

    clear_search: function() {
      this.props.collection.map(function (model) {
        model.get('employees').map(function (employee) {
          employee.set('found', false);
        });
      });
    },

    search_employees: function(e) {
      var _this = this;
      var value = e.currentTarget.value;
      var checked = e.currentTarget.checked;
      if (!this.state.search_values.length) {
        this.clear_search();
      }
      var result = [];
      this.props.collection.map(function (model) {
        result = result.concat(model.get('employees').custom_search(_this.state.search_param, value));
        result.map(function (employee) {
          employee.set({
            found: checked,
            type_search: _this.state.search_param
          });
        });
      });

      var search_values = this.state.search_values;

      if (checked) {
        search_values = search_values.concat(value);
      }else {
        var index = search_values.indexOf(value);
        search_values.splice(index, 1);
      }

      this.setState({
        search_values: _.uniq(search_values)
      });
    },

    search_params: function() {
      var _this = this;
      var search_params = []
      if (!!this.state.search_param) {
        this.props.collection.map(function (model) {
          model.get('employees').map(function (employee) {
            search_params = search_params.concat(employee.get(_this.state.search_param))
          });
        });
      }
      search_params = _.uniq(search_params);
      return search_params;
    },

    render: function () {
      var _this = this;
      var Input = ReactBootstrap.Input;
      var Popover = ReactBootstrap.Popover;

      return (
        <Popover {...this.props} style={{borderRadius: '0', zIndex: '2000'}} title={
            <div className="search-params row Flex">
              <div className="col-xs-6 heading-tag">
                <Input type="checkbox" label="Team" name="search" value="team" checked={this.is_selected("team")} onChange={this.change_selected}/>
              </div>
              <div className="col-xs-6 heading-tag">
                <Input type="checkbox" label="Job Title" name="search" value="designation" checked={this.is_selected("designation")} onChange={this.change_selected}/>
              </div>
            </div>
          }
        >
        {
          this.search_params().map(function (value) {
            return (
              <Input type="checkbox" label={_.capitalize(value)} key={value + String(this.is_selected_value(value))} name="search" value={value} checked={this.is_selected_value(value)} onChange={_this.search_employees}/>
            )
          }.bind(this))
        }
        </Popover>
      );
    }
  });
});
