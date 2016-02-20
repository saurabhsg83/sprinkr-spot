define([
  'backbone',
  'user'
],
function(Backbone, UserModel) {
  var user = new UserModel();
  Backbone.on('loading', function () {
    $('#loading').show();
  });

  Backbone.on('stop_loading', function () {
    $('#loading').hide();
  });

  //add ajax filter for session token to be sent on ajax requests
  $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    var ApiAccessToken = user.logged_in();
    if (!!ApiAccessToken) {
      jqXHR.setRequestHeader('session_token', ApiAccessToken);
    }

    //to support cross domain requests
    options.xhrFields = {
      withCredentials: true
    };
  });

  _.extend(Backbone.Router.prototype, {
    before: function(route) {
      var all_routes = Object.keys(this.routes);
      var route_exception = [''];
      if (user.logged_in() || _.include(route_exception, route)) {
        return true;
      }else {
        this.navigate('', {
          trigger: true
        });
        return false;
      }
    },

    after: function(route) {},

    route: function(route, name, callback) {
      if (!_.isRegExp(route)) {
        route = this._routeToRegExp(route);
      }

      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }

      if (!callback) callback = this[name];

      var _this = this;
      Backbone.history.route(route, function(fragment) {
        var args = _this._extractParameters(route, fragment);
        if (!_this.before.apply(_this, arguments)) {
          return;
        }

        if (_this.execute(callback, args, name)) {
          _this.after.apply(_this, arguments);
          _this.trigger.apply(_this, ['route:' + name].concat(args));
          _this.trigger('route', name, args);
          Backbone.history.trigger('route', _this, name, args);
        }

      });
      return this;
    }
  });

  _.extend(Backbone.View.prototype, {
    remove: function() {
      this.killChildViews();
      this.unsubscribe();
      this.$el.empty();
      this.stopListening();
      this.undelegateEvents();
      this.unbind();
    },

    killChildViews: function() {
      var childViews = this.childViews || [];
      childViews.forEach(function(childView) {
        childView.remove();
      });
    },

    unsubscribe: function() {
      var subscriptions = this.subscriptions || [];
      subscriptions.forEach(function(subscription) {
        subscription.unsubscribe();
      });
    }

  });
  return Backbone;
});
