/** @jsx React.DOM */
define([
  'jquery',
  'underscore',
  'backbone',
  'react'
],
function ($, _, Backbone, React) {
  'use strict';
  return React.createClass({
    componentWillMount: function () {
    },

    getInitialState: function () {
      return {};
    },

    render: function () {
      return (
        <headerView>
          <div className='row reset'>
            <div className='col-xs-3'>
              <img className='SprinklrLogoBubble' src='images/sprinklr.png'/>
              <div className='SprinklrTitle reset'>Spot</div>
            </div>
          </div>
        </headerView>
      )
    }
  });
});
