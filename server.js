const express = require('express');
const app = express();
const port = 8080;

// Load third-party frameworks
app.use('/', express.static(__dirname + '/public'));

// Launch the server
app.listen(port, () => console.log("Listening on :" + port));