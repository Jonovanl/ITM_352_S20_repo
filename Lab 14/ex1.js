var fs = require('fs');
var user_info_file = './user_data.json';

var data = fs.readFileSync(user_info_file, 'utf-8');//read's file connected to it

data = JSON.parse(data);//turns it into an object

console.log(data["kazman"]["password"],data.kazman.email);//[] can also be used for getting information
console.log(data.kazman.password, data.kazman.email);//tells you what's in the identifier of kazman after the kazman. it will tell you what information is given. You can also request multiple outputs
//console.log(typeof data);//reads in the terminal what type of data type 
