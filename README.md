# Points of Sale API

Requirements to run the project:

* docker / docker-compose (tested with 17.09.0-ce / 1.16.1)

or

* mysql (tested with 5.7.19)
* node.js (tested with 8.7)
* npm (tested with 5.3.0)

**NOTE:** It's recommended to use nvm for node.js version management

Running with docker
-------------------

Run the following command:

    docker-compose up

Done. The API is going to be available at http://localhost:8080/

Running manually
----------------

Make sure you have a MySQL database up and running to go the next steps.
If you already have a database configured to run this project, go to the next step.

If you don't, login in your privileged MySQL account (usually `mysql -u root -p`) and run:

```SQL
CREATE DATABASE pointsofsale;
CREATE USER 'pointsofsale'@'%' IDENTIFIED BY 'pointsofsale';
GRANT ALL PRIVILEGES ON pointsofsale . * TO 'pointsofsale'@'%';
FLUSH PRIVILEGES;
```

Run the following commands:

    nvm use 8 // recommend, but optional
    npm install
    npm run local

Done. The API is going to be available at http://localhost:8080/

Deploying on heroku
-------------------

Requirements:

* Make sure you have a [heroku verified account](https://heroku.com/verify)
* [Heroku cli](https://devcenter.heroku.com/articles/heroku-cli)
  * [MacOs](https://devcenter.heroku.com/articles/heroku-cli#macos)
  * [Windows](https://devcenter.heroku.com/articles/heroku-cli#windows)
  * [Debian/Ubuntu](https://devcenter.heroku.com/articles/heroku-cli#debian-ubuntu)

Firstly, sign in your heroku account and create a new app.

Then, run the following commands:

    heroku git:remote -a pointsofsale
    git push heroku master
    heroku ps:scale web=1
    heroku addons:create jawsdb:kitefin

After that, with any update in the code, just run:

    git push heroku master

Now you have to set the variables available in your just created add-on (data store / database). You can check then logged in your account and [clicking here](https://dashboard.jawsdb.com/mysql/dashboard).

```sh
heroku config:set \
  DB_HOST={property:Host} \
  DB_USERNAME={property:Username} \
  DB_PASSWORD={property:Password} \
  DB_NAME={after-the-last-slash-in-the-connection-string} \
  NODE_ENV=stage \
  NODE_CONFIG_DIR=./src/config
```

In the dashboard, you'll see a table with the settings of your app,
the example settings the environment variables for your project makes use of the data in the dashboard table that contains two columns (property / value). Replace the {} in the example with the corresponding value.

**NOTE:** The only environment variable not available in the table is in the connection string shown in the beginning of the page. You can identify that 'cause it starts with "mysql://". get the hash after the last slash (that is your database name - DB_NAME)

Your app is up and running :)

You can check the domain in the heroku dashboard, by accessing the Settings tab and going to the `Domains and certificates` section.

But it usually is like:

    https://{appname}.herokuapp.com/

Available endpoints
-------------------

Current availables endpoints:

    / - ping
    /ping - ping
    /health - check services availability
    /v1/pointsofsale - points of sale resource

It currently provides a GET and POST method and if you want to see more on the data available and how to use it, check the `apib/pointsofsale.md` file for better documentation.

Wants to use the pointsofsale in postman?
-------------------------------------

Just import the `apib/postman.collection` file.

**NOTE:** Whenever you update the documentation (located in the `apib` folder) make sure to install
and recreate the `apib/postman.collection` file. You can check the installation steps of
[apiary2postman](https://github.com/thecopy/apiary2postman) lib.
This file is a postman collection and after having the `apiary2postman` created you can recreate the file with the following command (from project root directory):

    apiary2postman blueprint apib/pointsofsale.md > apib/postman.collection

Wants to run a mock server of the pointsofsale endpoint?
--------------------------------------------------------

Requirements:

* node.js
* npm

Run:

    npm run mock-server

Done.
