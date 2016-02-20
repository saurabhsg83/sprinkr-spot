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
      Backbone.on('collection:change', function() {
        this.forceUpdate();
      }.bind(this));
    },

    componentDidMount: function () {

    },

    render_seat: function (model, seat_number) {
      var seat_model = model.get('employees').find({seat: seat_number});
      var element = (
        <DropableSeat model={seat_model} number={seat_number} collection={this.getCollection()} table={model.get('table')} project={model.get('project')} />
      );

      if (!!seat_model) {
        element = (
          <DragableSeat model={seat_model} number={seat_number} collection={this.getCollection()} table={model.get('table')} project={model.get('project')} />
        );
      }

      return element;
    },

    // render_sittings: function() {
    //   var _this = this;
    //   var element = this.props.tables.map(function (index) {
    //     return (
    //       <div className="sitting" style={sitting_style}>
    //         <Seat model={this.getCollection().find({seat: 1, table: index})} number={1} />
    //         <Seat model={this.getCollection().find({seat: 2, table: index})} number={2} />
    //         <Table number={index} />
    //         <Seat model={this.getCollection().find({seat: 3, table: index})} number={3} />
    //         <Seat model={this.getCollection().find({seat: 4, table: index})} number={4} />
    //       </div>
    //     );
    //   });
    // },

    render: function () {
      var _this = this;
      var sitting_style = {
        display: 'inline-block',
        margin: '25px'
      };

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
            <div className = "panel-body sitting-structure" style={{width: '80%', margin: '20px auto 20px auto', border: '1px solid black', background: '#f0f0f0'}}>
              <div className="sit">
                {
                  this.getCollection().map(function (model) {
                    return (
                      <div className="sitting row" style={sitting_style} key={model.cid}>
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
