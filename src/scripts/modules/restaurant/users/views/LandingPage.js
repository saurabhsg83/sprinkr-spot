define([
  'jquery',
  'underscore',
  'backbone',
  'user',
  'react',
  'jsx!modules/restaurant/users/components/LandingPage'
],

function($, _, Backbone, UserModel, React, LandingPageTemplate) {
  'use strict';
  var LandingPage = Backbone.View.extend({
    /**
     * @lends LandingPage.prototype
     * @memberof module:Users
     * @class: LandingPage
     */
    el: $('#main'),

    events: {
      //'click .loginBtn': 'login',
      'keyup #password': 'checkKey'
    },

    /**
     * initialize : landing page view constructor
     * @constructs: LandingPageView and Its components
     */
    initialize: function() {},
    /**
     * [render : Render Template to VDOM]
     * @return {[type]} [no return type]
     */
    render: function() {
      var LandingPage = React.createFactory(LandingPageTemplate);
      React.render(LandingPage(), this.el);
    },
    /**
     * [checkKey :Check if enter key is pressed in password box]
     * @param  {[type]} e [element]
     * @return {[type]}   [nill]
     */
    checkKey: function(e) {
      var code = e.which;
      if (code == 13) {
        this.login();
      }
    },
    /**
     * [login : Log into tinyowl restrowebapp]
     * @return {[type]} [no return type]
     */
    // login: function() {
    //   var that = this;
    //   if ($("input[name='email']").val().length == 0 || $("input[name='password']").val().length == 0) {
    //     helper.showErrorToast('Mobile No. / Password cannot be empty');
    //   } else {
    //     helper.showLoader('show');
    //     this.user = new UserModel();
    //     this.user.save({
    //       'email': $("input[name='email']").val(),
    //       'password': $("input[name='password']").val(),
    //     }, {
    //       success: function(response) {
    //         localStorage.setItem('user_profile', JSON.stringify(response.get('profile')));
    //         that.setUserCredentials(response.get('profile').session_token, response.get('profile').id);
    //       },
    //       error: function(jqXHR, textStatus, errorThrown) {
    //         if (textStatus.status === 0) {
    //           helper.showNoNetConnection(textStatus.status)
    //         } else {
    //           helper.showErrorToast('Incorrect Mobile No. or Password');
    //           helper.showLoader('no-show');
    //         }
    //       }
    //     });
    //   }
    // },

    /**
     * [setUserCredentials : set user_id and access_token in localstorage]
     * @param {[type]} session_token [string]
     * @param {[type]} Uid            [string]
     */
    setUserCredentials: function(ApiAccessToken, Uid) {
      localStorage.setItem('session_token', ApiAccessToken);
      localStorage.setItem('Uid', Uid);
      Backbone.history.navigate('order_panel', {
        trigger: true
      });
    }
  });
  return LandingPage;

});
