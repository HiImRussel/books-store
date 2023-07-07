# Requirement

-   Node: v16.17.0
-   NPM: 8.15.0
-   TS: 5.1.6
-   MySql: 14.14

# Instalation

#### Create database:

Create MySql database and set charset to utf8_general_ci

#### App:

Before running the app remember to modify the .env file.

Go to the root directory and run the following commands:

1. npm i
2. npm run deployDB (to create tables)
3. npm run runSeeders (to create data in the tables)
4. npm run start (to start the development server) or npm run start:nodemon (to start the development server with nodemon)

# Setup

Go to file ".env" located in the root directory. Modify values if you need.

# To Do

-   Tests
