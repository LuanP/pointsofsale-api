# Points of Sale

## Create a database

Make sure you have a MySQL database up and running to go the next steps.
If you already have a database configured to run this project, go to the next section.

If you don't, login in your privileged MySQL account (usually `mysql -u root -p`) and run:

```SQL
CREATE DATABASE pointsofsale;
CREATE USER 'pointsofsale'@'%' IDENTIFIED BY 'pointsofsale';
GRANT ALL PRIVILEGES ON pointsofsale . * TO 'pointsofsale'@'%';
FLUSH PRIVILEGES;
```
