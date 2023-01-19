const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname + "/signup.html");
});
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.post("/",function(req,res){
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const data = {
        members: [
            {
               email_address : email,
               status:"subscribed",
               merge_fields:{
                FNAME : firstname,
                LNAME : lastname
               }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    //console.log(firstname,lastname,email); 
    //res.send("hello!");
    const url = "https://us21.api.mailchimp.com/3.0/lists/c913989397"
    const options = {
        method:"POST",
        auth: "brijesh1:3d77a9af40298808900c9308404d2bfd-us21" 
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
    response.on("data",function(data){
   console.log(JSON.parse(data));
});
    })
    request.write(jsonData);
    request.end();

});
app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});


















// api key
// 1d1ccdce7426bf05036b19489f87d9e2-us21
//audience ID
//c913989397