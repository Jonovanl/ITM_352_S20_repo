var fs = require('fs');
var user_info_file = './user_data.json';
var express = require('express');
var app = express();
var myParser = require("body-parser");
var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('./user_data,.json')
app.use(session({secret: "ITM352 rocks!",}));

if(fs.existsSync(user_info_file)){//runs it there is a certain file and searches for user data
    var file_stats = fs.statSync(user_info_file);

    var data = fs.readFileSync(user_info_file, 'utf-8');//read's file connected to it
    var userdata = JSON.parse(data);//turns it into an object
    
    console.log(`${user_info_file} has ${file_stats.szie} characters`);//gives an object
} else  {
    console.log("hey!" + user_info_file + "doesn't exist!");//responds if it doesn't exist
}

app.use(myParser.urlencoded({ extended: true }));
//add a route to a cookie that may have been set here
app.get('/set_cookie', function(request, response){
console.log('In GET /set_cookie');
var my_name = 'Jonovan'
response.cookie('your_name', my_name, {maxAge: 5*1000000}).send('cookie set'); //Sets name = express. max age will set a time for how long it will last
});

app.get('/use_cookie', function(request, response){
    console.log('In GET /use_cookie', request.cookies);
    var the_name = request.cookies["your name"]; 
    response.send('welcome to the cookie page' + the_name); //Sets name = express
    });

app.get('/use_session', function(request, response){
    console.log('In GET /use_session', request.cookies);
    var the_sess_id = request.session.id;
    response.send('welcome, your session id is' + the_sess_id); //Sets name = express
    });

app.get("/login", function (request, response) {
    console.log(request.query);//print out q-str
    // Give a simple login form
    str = `
<body>
<form action="/check_login?quantity=999" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
<a href="./register">New user register</a>
</body>
    `;
    response.send(str);
 });

app.post("/register_user", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);
    user_name = request.body.username;
    //check if username is taken
    if(typeof userdata[username] !='undefined') {
        TextEncoderStream.push = "username taken";
    } else {
        userdata[username] = {};
    }
    if(requrest["body"]["password"] != request["body"]["repeat_password"]) {
        TextEncoderStream.push = "passwords don't match";
    } else {
        userdata[username].password = request["body"]["password"]
    }
    userdata[username].email = request.body.email;



    userdata[username] = {};
    userdata[username].password = request.body.password;
    userdata[username].email = request.body.email;
    //assume all data good, write to reg data file
    fs.writeFileSync(user_info_file, JSON.stringify(userdata));
    response.end(`New user ${username} registered`);
});

app.listen(8080, () => console.log(`listening on port 8080`));