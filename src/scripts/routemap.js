/* mapping of route action to the corresponding view */
define(function () {
  var routemap = {
    landingPage: 'modules/restaurant/users/views/LandingPage',
    MainTemplate: 'modules/Common/MainTemplate/views/MainTemplate',
    logoutPage: 'modules/restaurant/users/views/LogoutPage',
    homePage: 'modules/restaurant/orders/views/HomePage',
    SittingPlan: 'modules/employee_management/views/spot_main_view'
  };
  return routemap;
});
