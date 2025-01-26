// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/timestamp/:date?", (req, res) => {
  let responseObject = {};
  const dateParam = req.params.date;
  let date;

  // Check if dateParam exists and determine the date object
  if (!dateParam) {
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // Parse as a timestamp if it's numeric
    date = new Date(parseInt(dateParam));
  } else {
    // Parse as a standard date string
    date = new Date(dateParam);
  }

  // Handle invalid date
  if (date.toString() === "Invalid Date") {
    responseObject.error = "Invalid Date";
  } else {
    responseObject.unix = date.getTime(); // Unix timestamp in milliseconds
    responseObject.utc = date.toUTCString(); // UTC string
  }

  // Send the response
  res.json(responseObject);
});

