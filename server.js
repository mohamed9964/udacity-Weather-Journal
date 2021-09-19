/* Empty JS object to act as endpoint for all routes */
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
/* Initializing the main project folder */
app.use(express.static("website"));

const port = 4000;

// Const server = app.listen(port, ()=>{console.log('running on localhost ${port}')})
// Callback to debug
function listening(){
    console.log('server running');
    console.log(`running on localhost: http://127.0.0.1:${port}/`);
};

// function to complete Get get('/all')

app.get("/all", function(req, res){
    res.status(200).send(projectData);
});

// function to complete POST post(/add)

app.post('/add', function(req, res){
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
});
// Set up the server
app.listen(port, listening);