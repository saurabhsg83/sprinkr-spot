define(function() {
  return {
    "login_url": "/user/login.json",
    "Settings": {
      "Query_Options": "/restaurant/restaurant_product/get_query_list",
      "POS_Settings": "/restaurant/restaurant_product/fetch_pos_settings?version=2.0.0",
      "Firebase_Settings": "/restaurant/restaurant_product/fetch_firebase_token"
    },
    "Restaurants": {
      "get_restro_details": "/restaurant/restaurant_product/login_details",
      "items": "/restaurant/items",
      "chefs":"/restaurant/chefs",
      "new_chef":'/restaurant/chefs/new',
      "slots":"/restaurant/timings?restaurant_id=5503036b983a529e7000002d&timing_type=1"
    },
    "Orders": {
      "live_order_url": "/restaurant/restaurant_product/fetch_orders",
      "history": "/restaurant/restaurant_product/fetch_history",
      "Single_Order_Url": "/restaurant/restaurant_product/fetch_live_order",
      "Query_Submit": "/restaurant/restaurant_product/restaurant_query_submit",
      "Order_Summary": "/restaurant/restaurant_product/fetch_order_summary",
      "Order_Action": "/restaurant/restaurant_product/action",
      "Dispatch_url": "/restaurant/restaurant_product/order_dispatched"
    },
    "Offers": {
      "toggle_offer_state": "/restaurant/restaurant_product/toggle_offer_status",
      "get_offer_list": "/restaurant/restaurant_product/get_offers",
      "change_offer_date": "/restaurant/restaurant_product/edit_offer_timing",
      "add_Offer": "/restaurant/restaurant_product/create_offer"
    }
  }
});
