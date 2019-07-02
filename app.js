var express= require("express");

app.get("/", function(req, res){
    app.render("index.html");
});


app.listen(3000,  function(){
    console.log("the server has started");
 });