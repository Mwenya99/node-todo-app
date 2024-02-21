// connecting project to mysql database

const mysql = require ("mysql");

const connection = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "mutengo99",
    database : "node_todo_app",

});
 
module.exports = connection; // allows connection to be exported to the modules


