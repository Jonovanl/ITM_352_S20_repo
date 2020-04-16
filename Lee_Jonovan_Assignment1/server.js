var express = require('express'); //express package
var mrParser = require("body-parser");//require parser used in below code
var express = myParser = require ("body-parser");

//Taken from Lab13
app.all('*', function (request, response, next) {
    console.log(request.method +' to ' + request.path);
});

//borrowed code from assignment 1 example
app.use(myParser.urlencoded({ extended: true}));
app.post("/process_form", function (request, response) {
    let POST = request.body;
    response.send(POST);

});
//Taken from lab 13
//if quanttiy data valid,  send to the invoice 
app.use(express.static('./public'));
app.listen(8080, ()=> console.log('lisetning on port 8080'));