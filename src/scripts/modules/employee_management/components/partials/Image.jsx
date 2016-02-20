define([
  'jquery',
  'underscore',
  'backbone',
  'react',
  'react-bootstrap'
], function ($, _, Backbone, React, ReactBootstrap) {
  'use strict';
  return React.createClass({
    render: function () {
      return (
        <div className= "image-grag">
          <img src="images/seat.png" height="42" width="42"></img>
        </div>
      )
    }
  });
});
