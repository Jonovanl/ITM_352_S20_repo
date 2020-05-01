var fs = require('fs');
var user_info_file = './user_data.json';
var express = require('express');
var app = express();
var myParser = require("body-parser");

if(fs.existsSync(user_info_file)){//runs it there is a certain file and searches for user data
    var file_stats = fs.statSync(user_info_file);

    var data = fs.readFileSync(user_info_file, 'utf-8');//read's file connected to it
    var userdata = JSON.parse(data);//turns it into an object
    
    console.log(`${user_info_file} has ${file_stats.szie} characters`);//gives an object
} else  {
    console.log("hey!" + user_info_file + "doesn't exist!");//responds if it doesn't exist
}

app.use(myParser.urlencoded({ extended: true }));

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
</body>
    `;
    response.send(str);
 });

app.post("/check_login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.query);
    var err_str ="";
    var login_username = request.body["username"];
    //chec if username exists in reg data. If so, check if password matches
    if(typeof userdata[login_username] !='undefined' ) {
        //check if password stored for username matches what user typed in
        var user_info = userdata[login_username];
        if(user_info.password == request.body["password"]) {
            err_str = 'bad_password';
        } else {
            response.end('${login_username} is logged in ${JSON.stringify(request.query}');
            return;
        }    
        
    } else {
        err_str = 'bad_username';
    }
    response.lredirect('./login?$username=${login_username}&error=${err_str}');
});

app.listen(8080, () => console.log(`listening on port 8080`));
