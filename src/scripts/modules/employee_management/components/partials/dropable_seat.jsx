define([
  'jquery',
  'underscore',
  'backbone',
  'reactbackbone',
  'react-bootstrap',
  'react-dnd',
  'alertify',
  'react-dnd-html5-backend'
],
function ($, _, Backbone, React, ReactBootstrap, ReactDnD, alertify, HTML5Backend) {
  'use strict';
  var squareTarget = {
    canDrop: function (props) {
      return !!props.project
    },

    drop: function (props, monitor) {
      var name = _.capitalize(window.draggedModel.model.get('name'));
      var msg =  name + ' has been moved to Table-' + window.draggedModel.table + '/Seat-' + window.draggedModel.model.get('seat') + ' to Table-' + props.table + '/Seat-' + props.number + ' and his/her project is ' + props.project + ' . Notification has been sent to ' + name;

      props.collection.find({table: window.draggedModel.table}).get('employees').remove(window.draggedModel.model);
      window.draggedModel.model.set({
        table: props.table,
        seat: props.number,
        project: props.project
      });
      props.collection.find({table: props.table}).get('employees').add(window.draggedModel.model.attributes);
      Backbone.trigger('collection:change');
      alertify.success(msg);
    }
  };

  function collect(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    };
  }

  var Seat = React.createBackboneClass({
    componentWillMount: function () {

    },

    componentDidUpdate: function () {
      if (!!this.getModel() && !this.getModel().get('found')) {
        this.hide_popover();
      }
    },


    getInitialState: function () {
      return {};
    },

    seat_style: function () {
      var seat_color = !!this.getModel() ? '#575555' : '#D6D3D3';
      var seat_cursor = !!this.getModel() ? 'pointer' : 'not-allowed';
      var opacity = 1;
      if (!!this.getModel() && !!this.getModel().get('found')) {
        seat_color = '#08C';
        this.show_popover();
      }

      if (!!this.props.isOver) {
        seat_color = 'yellow';
        opacity = 0.4
      }

      var seat_style={
        height:'30px',
        width:'60px',
        borderRadius: '90px 90px 0 0',
        background:seat_color,
        display: 'inline-block',
        textAlign: 'center',
        cursor: seat_cursor,
        opacity: opacity
      }

      var seat_style_inverted={
        height:'30px',
        width:'60px',
        borderRadius: '0 0 90px 90px',
        background:seat_color,
        display: 'inline-block',
        textAlign: 'center',
        cursor: seat_cursor,
        opacity: opacity
      }

      if (this.props.number == 1 || this.props.number == 2) {
        return seat_style;
      }else {
        return seat_style_inverted;
      }
    },

    show_employee_info: function(e) {
      var Popover = ReactBootstrap.Popover;
      var element = (<div></div>);
      if (!!this.getModel()) {
        element = (
          <Popover title="Employee Info" id={this.getModel().get('seat')}><strong>{this.getModel().get('name')}</strong></Popover>
        );
      }
      return element;
    },

    show_popover: function() {
      this.refs.myPopover.show();
    },

    hide_popover: function() {
      this.refs.myPopover.hide();
    },

    render: function () {
      var OverlayTrigger = ReactBootstrap.OverlayTrigger;
      var connectDropTarget = this.props.connectDropTarget;
      var isOver = this.props.isOver;
      var canDrop = this.props.canDrop;
      return connectDropTarget(
        <div style={{display: 'inline-block'}}>
          <OverlayTrigger trigger="manual" ref='myPopover' placement="right" overlay={this.show_employee_info()}>
            <div className="seat" style={this.seat_style()} onMouseEnter={this.show_popover} onMouseLeave={this.hide_popover} >
              {this.props.number}
            </div>
          </OverlayTrigger>
        </div>
      );
    }
  });

  return ReactDnD.DropTarget('seat', squareTarget, collect)(Seat);
});
