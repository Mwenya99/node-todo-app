
//entry point (main) for the application

const express = require("express");   // creates express-js server
const app = express();
const endPoints = require("./endpoints");
const port = 3000;  //tells server to listen on port 3000
const connection = require("./database");

app.use('/',endPoints);

connection.getConnection((error)=>{       // callback function
    if (error) {
        console.log("Connection to Database Failed" , error);
    }
    else {
        console.log("Connection to Database Successful");
        connection.query('SELECT * FROM tasks_table',(error, result) =>  //callback function to execute 
         {if (error) {
            console.log("Error in query", error);        //when unsuccessful connection is established
    
         }
         else{
            console.log("Result of query", result);      // when successful connection is established
         }
        });
    }
})
 

app.listen(port, () => console.log("Listening on port ", port ))
