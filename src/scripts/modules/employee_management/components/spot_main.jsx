define([
  'jquery',
  'reactbackbone',
  'jsx!modules/common/components/header',
  'jsx!modules/employee_management/components/partials/draggable_seat',
  'jsx!modules/employee_management/components/partials/dropable_seat',
  'jsx!modules/employee_management/components/partials/table',
  'jsx!modules/employee_management/components/partials/searchbar',
  'jsx!modules/employee_management/components/partials/filter',
  'react-dnd',
  'react-dnd-html5-backend'
],
function ($, React, Header, DragableSeat, DropableSeat, Table, SearchBar, Filter, ReactDnD, HTML5Backend) {
  'use strict';

  return ReactDnD.DragDropContext(HTML5Backend)(React.createBackboneClass({

    getInitialState: function() {
      return {};
    },

    componentWillMount: function () {
      $('#loading').show();
      Backbone.on('collection:change', function() {
        this.forceUpdate();
      }.bind(this));
    },

    componentDidMount: function () {
      $('#loading').hide();
    },

    render_seat: function (model, seat_number) {
      var seat_model = model.get('employees').find({seat: seat_number});
      var element = (
        <DropableSeat model={seat_model} number={seat_number} collection={this.getCollection()} table={model.get('table')} />
      );

      if (!!seat_model) {
        element = (
          <DragableSeat model={seat_model} number={seat_number} collection={this.getCollection()} table={model.get('table')} />
        );
      }

      return element;
    },

    render: function () {
      var _this = this;
      return (
        <div>
          <Header></Header>
          <div className="row" id='filter-bar'>
            <div className="col-xs-3 col-xs-offset-1">
              <div className="office-name">Sprinklr Office</div>
            </div>
            <div className="col-xs-4">
              <SearchBar placeholder='Search Employees by name...' collection={this.getCollection()}></SearchBar>
            </div>
            <div className="col-xs-4">
              <Filter collection={this.getCollection()}></Filter>
            </div>
          </div>
          <div className="panel panel-default" style={{textAlign: 'center'}}>
            <div className = "panel-body sitting-structure">
              <div className="sit">
                {
                  this.getCollection().map(function (model) {
                    return (
                      <div className="sitting row" key={model.cid}>
                        <div className="col-xs-12">
                          <div className="upper-seats row">
                            <div className="col-xs-6" style={{textAlign: 'center'}}>
                              {this.render_seat(model, 1)}
                            </div>
                            <div className="col-xs-6" style={{textAlign: 'center'}}>
                              {this.render_seat(model, 2)}
                            </div>
                          </div>
                          <Table project={model.get('project')} number={model.get('table')}/>
                          <div className="lower-seats row">
                            <div className="col-xs-6" style={{textAlign: 'center'}}>
                              {this.render_seat(model, 3)}
                            </div>
                            <div className="col-xs-6" style={{textAlign: 'center'}}>
                              {this.render_seat(model, 4)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }.bind(this))
                }
              </div>
            </div>
          </div>
        </div>
      );
    }
  }));
});
