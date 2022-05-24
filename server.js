/* Start global variable */
//requires
const express = require('express'); //express
const cors = require('cors'); //cors
const bodyParser = require('body-parser'); //body parser
// creating instance of app
const app = express();
const port = 5000;
/* End global variable */

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

app.get('/getData', (req, res) => {
  res.send(projectData);
});
app.post('/userData', (req, res) => {
  projectData = { ...req.body };
  res.end();
});

// Setup Server
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port} `);
});
