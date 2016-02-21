define([
  'jquery',
  'underscore',
  'backbone',
  'reactbackbone',
  'react-bootstrap',
  'react-dnd',
  'react-dnd-html5-backend'
],
function ($, _, Backbone, React, ReactBootstrap, ReactDnD, HTML5Backend) {
  'use strict';
  var knightSource = {
    beginDrag: function (props) {
      window.draggedModel = {
        model: props.model,
        table: props.table
      }
      return {
        seat: props.model
      };
    }
  };

  function collect(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    }
  }

  var Seat = React.createBackboneClass({
    componentWillMount: function () {

    },

    componentDidMount: function () {
      var connectDragPreview = this.props.connectDragPreview;
      var img = new Image();
      img.src = "images/seat.png";
      img.onload = function () {
        connectDragPreview(img);
      };
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
        if (!!!this.getModel().get('found_type')) {
          this.show_popover();
        }

      }

      if (!!this.props.isDragging) {
        seat_color = 'red';
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
          <Popover id={this.getModel().get('seat')} style={{background: '#f0f0f0'}}>
            <div className="row">
              <div className="col-xs-6">
                <img className='seatBubble' src='images/seat.png'/>
              </div>
              <div className="col-xs-6">
                <div className="employee-name">
                  {_.capitalize(this.getModel().get('name'))}
                </div>
                <div className="employee-designation heading-tag">
                  {_.capitalize(this.getModel().get('designation'))}
                </div>
              </div>

            </div>
              <div className="team-info topMarginBlock LeftMarginBlock">
                <div className="heading-tag">
                  Team
                </div>
                <div className="team-name">
                  {_.capitalize(this.getModel().get('team'))}
                </div>
              </div>
              <div className="project-info topMarginBlock LeftMarginBlock">
                <div className="heading-tag">
                  Current Project:
                </div>
                <div className="project-name">
                  {_.capitalize(this.getModel().get('project'))}
                </div>
              </div>
          </Popover>
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
      var connectDragSource = this.props.connectDragSource;
      var isDragging = this.props.isDragging;

      return connectDragSource(
        <div style={{display: 'inline-block'}}>
          <OverlayTrigger trigger="manual" ref='myPopover' placement="right" overlay={this.show_employee_info()}>
            <div className="seat" style={this.seat_style()} onMouseEnter={this.show_popover} onMouseLeave={this.hide_popover}>
              {this.props.number}
            </div>
          </OverlayTrigger>
        </div>
      );
    }
  });

  return ReactDnD.DragSource('seat', knightSource, collect)(Seat);
});
