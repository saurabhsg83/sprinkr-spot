/** @jsx React.DOM */
define([
'jquery',
'underscore',
'backbone',
'react',
'reactbackbone'
],
function($, _, Backbone, React, BackBoneReact) {
"use strict";
var LoginTemplate = React.createBackboneClass({
render: function() {
return (
<div>
  <div className='login-container'></div>
  <div className='overlayBg'></div>
  <div className='LoginOverLay text-center'>
    <div className='loginBox col-sm-12 col-md-4 col-md-push-4'>
      <div className='main_TinyLogo'>
        <img src='images/TinyOwlLogo.png' />
      </div>
      <div className='TinyHeader'>
        <div>Business</div>
      </div>
      <div className='form-group row'>
        <div className='col-sm-12'>
          <input type='text' placeholder='Mobile No.' name='email' autofocus='true' className='form-control' />
        </div>
      </div>
      <div className='form-group row'>
        <div className='col-sm-12'>
          <input type='password' placeholder='Password' id='password' name='password' className='form-control' />
        </div>
      </div>
      <div className='form-group row'>
        <div className='col-sm-12'>
          <button className='btn loginBtn'>Log In &nbsp;&nbsp;
            <span className='fa fa-spinner fa-spin hide'></span>
          </button>
          <div className='errorToast hide'>Incorrect Mobile No. or Password</div>
        </div>
      </div>
    </div>
  </div>

  <netError>
    <div className='net_error_overlay hide'></div>
    <div className='net_error_modal hide'>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title text-center" id="myModalLabel">Tinyowl Business</h3>
          </div>
          <div className="modal-body">
            <div className='net_conn_error text-center'>
              <img src='images/connection_problem.png' />
              <div className='modal-title proxima'>
                <h4>There seemes to be an error with your internet connection.</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </netError>
</div>
);
}
});
return LoginTemplate;
});
