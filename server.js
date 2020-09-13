// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

//timestamp api
app.use("/api/timestamp",(req, res)=>{
    const time = new Date();
    res.json({"unix":time.getTime(),"utc":time.toUTCString()})
})
app.use("/api/timestamp/:date_string",(req,res)=> {
    const theTime = req.params.date_string
    if(theTime==parseInt(theTime)){
        theTime = parseInt(theTime) }
    let time = new Date(theTime)
    !time.getTime()?res.json({"error" : "Invalid Date" }):
    res.json({"unix":time.getTime(),"utc":time.toUTCString()})
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
