# Spriklr Spot Webapp #

* View Sitting Plan for Employees
* Search Employees by name
* Search Employees by Team, Designation and Project(MultiSearch)
* Change Project/seat of Employee
* Notify Employees about changes

# Running Project #
Please find the running project(deployed on heroku) at https://spriklr-spot.herokuapp.com/

# Architecture #
* HTML,CSS, Javascript and Jquery
* Javascript Frameworks: React and Backbone
* Require.js as AMD
* Build tools: npm, grunt and bower
* Backend: Ruby on Rails, Postgres Database
* Both Frontend and Backend are deployable on Heroku
* Node is used for deploymenton Heroku

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
   grunt serve (FOR DEVELOPMENT ENVIRONMENT)
   ```
 6. grunt serve:dist (FOR PRODUCTION ENVIRONMENT)

# Grunt Tasks #
* JS Concatination and Uglification
* CSS, HTML, IMAGE minification and concatination
* Sass compilation
* Hashing file names to clear browser cache
* Watch task to see all changes and livereloading

# Backend Apis #
* Fetch Employee Data: https://dry-lowlands-91593.herokuapp.com/spot/employees
* Update Employee: https://dry-lowlands-91593.herokuapp.com/spot/employee/:id




