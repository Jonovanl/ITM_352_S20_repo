//Author: Jonovan Lee//
//File Description: Server//
var fs = require('fs');
const querystring = require('querystring');
const product_data = require('./public/product.js').products;//gets data from product.js
var express = require('express');//requires express to run
var app = express();//creates variable to start up express
var myParser = require('body-parser');//creates a variable to require body parser

app.use(myParser.urlencoded({extended: true}));

var filename = 'user_data.json'

if (fs.existsSync(filename)) {
    
    data = fs.readFileSync(filename, 'utf-8');
    user_reg_data = JSON.parse(data);
    } else {
        console.log(filename + 'does not exist');
    }
    //grabbed from lab 14 with port's help in class
    // go to invoice if quantity values are good, if not, redirect back to order page
    app.post("/login.html", function (req, res){
        var LogError = [];
        console.log(req.body);
        the_username = req.body.username.toLowerCase();
        if (typeof users_reg_data[the_username]!= 'undefined'){
            //asks object if it has a matching user name, if not it goes undefined
            if (users_reg_data[the_username].password == req.body.password){
                req.query.username = username;
                console.log(users_reg_data[req.query.username].name);
                res.redirect('/invoice.html?' + querystring.stringify(req.query));
                return;
                //if logged in correctly user will be taken to the invoice page
            }
            } else {
                LogError.push = ('Invalid Password');
                console.log(LogError);
                req.query.username= the_username;
                req.query.password= req.body.password;
                req.query.LogError=LogError.join(';');
            }
            res.redirect('/login.html?' + querystring.stringify(req.query));
        });

        app.post("/register.html",function(req,res){
            qstr = req.body
            console.log(qstr);
            var errors = [];
            if(/^[A-Za-z]+$/.test(req.body.name)){
            }
            else {
                errors.push('Use letters only for full name')
            }
            //checks name
            if (req.body.name == ""){
                errors.push('Invalid Full Name');
            }
            //user login checks for length of the user's fullname
            if ((req.body.fullname.length> 30)) {
                errors.push('Full name too long')
            }
            //length of the fullname is between 1-29
            if((req.fullname.length > 29 && req.body.fullname.length <0)) {
                errors.push('Full name too long')
            }
            var reguser = req.body.username.toLowerCase();
            if (typeof users_reg_data[reguser] != 'undefined') {
                errors.push('Username taken')
            }

            if(/^[A-Za-z]+$/.test(req.body.username)) {
        }
        else {
            errors.push('Letters and numbers only for username')
        }

        //password needs to be at least 8 characters
        if((req.body.password.length < 8 && req.body.username.length  > 20)) {
            errors.push('Password too short')
        }
        //checks if the passwords are correct
        if(req.body.password !== req.body.repeat_password){
            errors.push('Password do not match')
        }
        if(errprs.length ==0){
            console.log('none');
            req.query.username = reguser;
            req.query.name = req.body.name;
            res.redirect('./invoice.html?' + querystring.stringify(req.query))
        }
        if (errors.length > 0) {
            console.log(errors)
            req.query.name = req.body.name;
            req.query.username = req.body.username;
            req.query.password = req.body.password;
            req.query.repeat_password = req.body.repeat_password;
            req.query.email = req.body.email;

            req.query.errors = errors.join(';');
            res.redirect('register.html' + querystring.stringify(req.query))
        }
    });

    app.post("/purchase", function (req, res, next) {//data from form will become purchase
        //checks for the correct quantities
        let POST = req.body;//hold contens of the body
        var hasValidQuantities = true;// makes hasValidQuantities true
        var numPurchases = false; //makes numPurchases false
        console.log(product_data);//console shows what product data is
        for (i = 0; i < product_data.length; i++){//for loop makes products 1
            q = POST['quantity' +i];//assigns q to variable of quantity submitted from the user by the form
            console.log(q);
            if(isNonNegInt(q) == false ) {
                hasValidQuantities = false;
            }
            if (q>0) {
                numPurchases = true;
            }
            console.log(hasValidQuantities, numPurchases);
        } 
        if (hasValidQuantities == true && numPurchases == true) {//want both quantities and purchases number to be true
            res.redirect('./login.html?' + querystring.stringify(POST));//redirect to the invoice page with the query entered in the form
        }
        else {
            req.query = POST;
            req.query["hasValidQuantities"] = hasValidQuantities;// if they are false
            req.query["hasPurchases"] = numPurchases;//request the query for haspurchases
            console.log(req.query);//log the query in the console
            res.redirect('./index.html?' + querystring.stringify(req.query));//redirect to form
        }
    });

    app.use(express.static('./public'));//creates a static server using express from the public folder

    var listener = app.listen(8080,() => {console.log(`listening on port` + listener.address().port)});
    
    function checkQuantityTextBox() {
        errs_array = isNonNegInt(quantity_textbox.value, true);
        qty_textbox_message.innerHTML = errs_array.join(';');
    }
    //Used from assignment 1 example
    //checks if string is a non-negative integer
    function isNonNegInt(q, returnErrors = false) {
        errors = [];
        if(q==  '') q = 0;
        if(Number(q)!=q)errors.push('Not a number!');
        if(q<0) errors.push('Negative value!');
        if (parseInt(q)!=q) errors.push('Not an integer!');
        return returnErrors ? errors : (errors.length ==0);
    }