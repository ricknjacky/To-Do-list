const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = ["Study", "Play", "Gym"];
let workItem = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
// const request = require("request");

app.get("/", function(req, res){
    var today = new Date();
    // var currentDay = today.getDay();
    // var day = "";

var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};

var day = today.toLocaleDateString("en-US", options);

    
    res.render("list", { listTitle: day, newListItem: items });
    
});

app.post("/", function(req, res){
    var item = req.body.newItem;

    if(req.body.list === "Work"){
        workItem.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req,res){
    res.render("list", {listTitle:"Work List", newListItem: workItem})
});

app.listen(process.env.PORT || 3000, function(){
    console.log("server started on port 3000");
});