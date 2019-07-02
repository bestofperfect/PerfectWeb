
var express= require("express");
var app=express();
app.use(express.static("views"));
// app.set('view engine', 'html');
app.get("/", function(req, res){
    res.render("index.html");
});

app.listen(3000,  function(){
    console.log("the server has started");
 });

