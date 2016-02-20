// Filename: models/LoginModel.js
var authToken = ''
define([
  'underscore',
  'backbone',
  'urlStore'
], function(_, Backbone, urlStore) {
  'use strict';
  /**
    * @lends UserModel.prototype
    * @memberof module:UserModule
    * @class UserModel
  */
  var UserModel = Backbone.Model.extend({

    baseUrl: urlStore.login_url,

    initialize: function() {},

    url: function() {
      return this.baseUrl;
    },

    parse: function(response) {
      return response;
    },

    /**
     * [deleteTokens : remove user session object from localstorage and logout of app.]
     * @return {[type]} [null]
     */
    deleteTokens: function() {
      localStorage.clear();
    },

    logged_in: function() {
      return localStorage.getItem("session_token");
    }
  });
  return UserModel
});
