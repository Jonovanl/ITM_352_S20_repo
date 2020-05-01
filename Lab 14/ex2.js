var fs = require('fs');
var user_info_file = './user_data.json';

if(fs.existsSync(user_info_file)){//runs it there is a certain file and searches for user data
    var data = fs.readFileSync(user_info_file, 'utf-8');//read's file connected to it
    data = JSON.parse(data);//turns it into an object

    console.log(data["kazman"]["password"], data.kazman.email);
} else {
    console.log("hey!" + user_info_file + "doesn't exist!");//responds if it doesn't exist
}


