const express = require('express');
const path = require('path');
const app = express();

// Serve static files....
app.use(express.static(__dirname + '/dist/myNewApp'));

// Send all requests to index.html
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/myNewApp/index.html'));
});
console.log(path.join(__dirname))

// default Heroku PORT
app.listen(process.env.PORT || 3000);
console.log("Server was started on localhost:3000")