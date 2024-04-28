const express = require("express");
const bodyParser = require("body-parser");
const request  = require("request");
const path = require("path");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req, res) => {
    const filePath = path.resolve(__dirname, 'signup.html');
    res.sendFile(filePath);
})  

app.post('/', function(req, res){

   var firstname= req.body.fname;
   var lastname= req.body.lname;
   var email= req.body.email;



var data= {
members: [
    {
        email_address: email,
        status: "subscribed",
        merge_field:{
            FNAME:firstname,
            LNAME: lastname
        }
    }
]
};

const jsondata = JSON.stringify(data);

const url ="https://us22.api.mailchimp.com/3.0/lists/82067491ff";

const Options = {
    method: "POST",
    auth: "sangam:07daec34359f3d630bc501bc1651adce-us22" 
}
 
const request= https.request(url, Options, function(response){


    if(response.statusCode===200){
        const filePath = path.resolve(__dirname, 'success.html');
        res.sendFile(filePath);
        //res.sendfile(__dirname, 'success.html');
    }
    else {
        const filePath = path.resolve(__dirname, 'failure.html');
        res.sendFile(filePath);
        //res.sendfile(__dirname, 'failure.html');
    }
    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
})

  request.write(jsondata);
  request.end();



});

app.listen(3000, function(){
    console.log("server is running on 3000");
});

//07daec34359f3d630bc501bc1651adce-us22
// 82067491ff