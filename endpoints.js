// creating the CRUD (create, read, update, delete) endpoints
// contains all the CRUD ends points 

const express = require('express');
const bodyParser = require('body-parser'); //express middleware processes incoming request bodies
const connection = require('./database');

const endPoints = express();

//parse application/json
endPoints.use(bodyParser.json());

//reading all tasks
endPoints.get('/tasks_table', (request, response) => {
    connection.query('SELECT * FROM tasks_table', (error, result) => {
        if(error){

            response.status(404).send("Error retrieving tasks");
            console.log('Error retrieving task details', error);
           
        }
             else {
           //response.send(result);
            response.status(201).send("Tasks successfully retrieved");
            console.log('Tasks successfully retrieved', result);
        }
    })
})
//reading a task with a specified id 
endPoints.get('/tasks_table/:task_id', (request, response) => { 

    const task_id = request.params.task_id; // requests individual parameter value task_id

    connection.query(`SELECT * FROM tasks_table WHERE task_id = ? `, [task_id], (error,result) =>{
     
        if(error){

            response.status(404).send("Error retrieving tasks");
            console.log('Error retrieving task', error);
        }
         if(result.length)  {  //length of the database table (number of records in table)
            
            response.status(201).send("Task retrieved successfully"); // status code 201 means request succeeded
            console.log('Task successfully retrieved with ID:', task_id, result);
        }
        else {
            response.status(404).send("Task ID not found"); //returns error if task id does not exist in database 
            console.log("Task ID not found");                  
        }
    })

})

//creating a new task
endPoints.post('/tasks_table', (request,response) => {

    // extracting request body data
    const {task, date_to_start, time_to_start, date_completed, time_completed} = request.body;

    connection.query('INSERT INTO tasks_table (task, date_to_start, time_to_start, date_completed, time_completed) VALUES (?,?,?,?,?)', [task, date_to_start, time_to_start, date_completed, time_completed], (error) =>
    { if (error) {

        response.status(400).send("Error creating task");
        console.log('Error creating task', error);
     }

     else {
        response.status(201).send("Task created successfully"); 
        console.log('Task created successfully with new ID:');
    }

    }) 

});

// updating tasks 
endPoints.put('/tasks_table/:task_id', (request, response)=> { 
    const task_id = request.params.task_id;
    const {task, date_to_start, time_to_start, date_completed, time_completed} = request.body;
    connection.query('UPDATE tasks_table SET task =? , date_to_start =?, time_to_start =?, date_completed =?, time_completed =? WHERE task_id =?', [task, date_to_start, time_to_start, date_completed, time_completed, task_id], (error, result) => 
    { if (error) {

        response.status(400).send("Error updating task");
        console.log('Error updating task', error) }

        if (result.length){
            response.status(201).send("Task updated successfully");
            console.log('Task updated successfully with ID:' ,task_id);

        } 
        else {
            response.status(404).send("Task ID not found");
            console.log("Task ID not found");
        }
        
    });
});

// Deleting a task

endPoints.delete('/tasks_table/(:task_id)', (request, response) => { //tells program that you are passing in parameter
    const task_id = request.params.task_id;
   
    connection.query('DELETE FROM tasks_table WHERE task_id =?', [task_id], (error, result) => {
        if (error){
            response.status(400).send("Error deleting task");
            console.log("Error deleting task", error)
        }
        if(result.length){
           
            response.status(200).send("Task deleted successfully");
            console.log('Task deleted successfully with ID:' ,task_id);
            
        }

        else{
            response.status(404).send("Task ID not found");
            console.log("Task ID not found"); 
        }

    })
});


module.exports = endPoints;