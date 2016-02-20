# Tinyowl Restaurant Webapp #

* Punch in orders
* View Order History
* View and create offers
* Raise RRT Query
* POS service for tinyowl & 3pl/3pv[3rd party vendor].
  - Menu Management Service
  - Inventory Management Service

# Editor and settings #
It is recommended that all developers use Sublime Text for development.

# Linting #
All javascript files are watched for changes and linting errors will be reported in console. Please check the errors and resolve as suggested.

# Order Service #
* Accept/Decline new orders
  - Accept order by choosing delivery time.
  - Decline order with a reason to decline.
* Dispatch preparing orders.
* View order history for a 10 day period.

# Offer Service #
* Create Offer owned by restaurant.
* Send offer for approval.
* View Pending/Running/Expired offers list.
* Extend Offer duration.
* Edit unapproved order.
* Toggle offer avaliability.

# Recommended plugins to use with sublime #
 1. [JSCS](https://packagecontrol.io/packages/SublimeLinter-jscs)
 2. [JavaScript Beautify](https://github.com/enginespot/js-beautify-sublime)

# Project setup steps #
 1. Pull code from repo with fast-forward

   ```
   git pull --ff-only
   ```
 2. Remove node packages not present in package.json

   ```
   npm prune
   ```
 3. Install/update node packages from package.json
 
   ```
   npm install
   ```
 4. Install bower dependencies
 
   ```
   bower install
   ```
 5. Start server
 
   ```
   grunt serve
   ```

# Basic Webapp Usage #
### Access Management - Steps for Central Panel ###
  * Register on Tinyowl central panel [Tinyowl-central](https://github.com/Flutterbee/central) (depending on your environment) as a user. 
  * Get/grant access on central panel using the contact number you provided while registering.
  * Allot necessary roles
  * Go to Restaurants panel on central dashboard
  * Choose a restaurant and then select 'Edit'
  * Go to 'Point of Sale' settings tab on the left
  * Check the 'Is App Service ON' and 'Has Restaurant App' boxes.
  * Add contact number in 'Mobile Number' field with which you want to access webapp
  * Uncheck 'Is TinyOwl's Device' box if it is to be used in webapp
  * Now you can use your central panel login credentials to access restaurant webapp

# Order Testing #
  * Get a test consumer app for your development environment from QA test
  * Install it in genymotion or on a phone
  * Choose the restaurant which you assigned to yourself on tinyowl central panel
  * Build your cart and place an order.
  * firebase is already taking care of maintaining live socket with the restaurant server and as soon as you place an order on consumer app, webapp gets a new order

# Offer Testing #
  * Create an offer from restaurant webapp.
  * Go to tinyowl central panel and view your restaurant offers
  * Approve your offer 
  * Created offer should be visible in the consumer app for the restaurant you created the offer for. If not,check your offer availability and timing, it should match that of the restaurant

#FAQ
[Contributing/ development guidlines](../develop/CONTRIBUTING.md)
