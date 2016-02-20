define([
  'jquery',
  'underscore',
  'backbone',
  'user'
],

function($, _, Backbone, UserModel) {
  'use strict';
  var LogoutPage = Backbone.View.extend({
  /**
   * @lends LogoutPage.prototype
   * @memberof module:Users
   * @class LogoutPage
   */

    el: $('#main'),

    events: {},

    initialize: function() {},

    render: function() {
      var user = new UserModel();
      user.deleteTokens();
      Backbone.history.navigate('', {
        trigger: true
      });
    }
  });
  return LogoutPage;
});
